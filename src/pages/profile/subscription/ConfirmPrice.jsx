/* eslint-disable no-unused-vars */

import React, {useState, useEffect, useContext} from 'react';
import {Button} from '@components';
import {toast} from 'react-toastify';
import Collapse from 'react-bootstrap/Collapse';
import {
  MoreHoriz as MoreHorizIcon,
  Info as InfoIcon,
  AddOutlined as MoreIcon
} from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {styled} from '@mui/material/styles';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import Loading from '@app/components/loadings/Loading';
import AppContext from '@app/contexts/AppContext';
import * as Config from '@app/utils/config';

const ConfirmPrice = (props) => {
  const AppCtx = useContext(AppContext);
  const {user} = props;

  const [price] = useState(AppCtx.Navigate.data.price);
  const [subscription] = useState(AppCtx.Navigate.data.subscription);
  const [defaultPaymentMethod] = useState(
    AppCtx.Navigate.data.defaultPaymentMethod
  );
  const [currentPriceId, setCurrentPriceId] = useState('');
  const [invoicePreview, setInvoicePreview] = useState({});
  const [interval, setInterval] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [clientSecret, setClientSecret] = useState('');
  const [subscriptionId, setSubscriptionId] = useState(
    AppCtx?.StripeData?.current_subscription?.id || ''
  );

  const [currencyLetters, setCurrencyLetters] = useState(
    AppCtx?.StripeData?.current_subscription?.items?.data[0]?.plan?.currency?.toUpperCase() ||
      'USD'
  );

  const [subscriptionCreated, setSubscriptionCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cards, setCards] = useState([]);
  const [customer, setCustomer] = useState({});
  const [defaultPM, setDefaultPM] = useState({});

  console.log(
    'AppCtx?.StripeData?.current_subscription:',
    AppCtx?.StripeData?.current_subscription
  );

  const NombreEntidad = 'Subscripciones';
  const NombreEntidadMin = NombreEntidad.toLowerCase();
  const [UrlBase] = useState(
    Config.gatDomainName().concat('/'.concat(NombreEntidadMin).concat('/'))
  );

  // const navigate = useNavigate();

  const getPaymentMethods = () => {
    const fetchData = async () => {
      const {cards} = await fetch(UrlBase.concat('list-payment-methods'), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({customerId: user.profile.usuario_stripe})
      }).then((r) => r.json());

      setCards(cards);
    };

    fetchData();
  };

  const deletePaymentMethod = (pmId) => {
    const fetchData = async () => {
      const {paymentMethod} = await fetch(
        UrlBase.concat('delete-payment-method'),
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({paymentMethodId: pmId})
        }
      ).then((r) => r.json());

      getPaymentMethods();
    };

    fetchData();
  };

  const setDefaultPaymentMethod = (pmId) => {
    const fetchData = async () => {
      const {customerUpdated} = await fetch(
        UrlBase.concat('set-default-payment-method'),
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({customerId: customer.id, paymentMethodId: pmId})
        }
      ).then((r) => r.json());

      setCustomer(customerUpdated);
      getPaymentMethods();
      cards.forEach((card) => {
        if (
          customerUpdated?.invoice_settings?.default_payment_method === card.id
        ) {
          console.log('setDefaultPaymentMethod:', {card});
          setDefaultPM(card);
        }
      });
    };

    fetchData();
  };

  const handleGoAddCard = (e) => {
    e.preventDefault();

    AppCtx.setNavigate({
      to: 'addcard',
      data: {}
    });
  };

  const getCustomer = () => {
    const custlocal = {...AppCtx?.StripeData?.customer};
    setCustomer(custlocal);

    // console.log({custlocal});

    // const fetchData = async () => {
    //   const {customer} = await fetch(UrlBase.concat('load-customer'), {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({customerId: user.profile.usuario_stripe})
    //   }).then((r) => r.json());

    //   setCustomer(customer);
    // };

    // fetchData();
  };

  useEffect(() => {
    console.log({subscriptionId});

    if (price && subscriptionId === '') {
      console.log({clientSecret, price, subscriptionId});
      createSubscription();
    }

    let inter = '';

    if (price?.recurring?.interval === 'month') {
      if (price?.recurring?.interval_count === 1) {
        inter = 'mes';
      } else {
        inter = 'meses';
      }
    } else if (price?.recurring?.interval === 'year') {
      if (price?.recurring?.interval_count === 1) {
        inter = 'año';
      } else {
        inter = 'años';
      }
    }

    setInterval(inter);
    if (subscription && price) {
      getInvoicePreview();
    }

    getCustomer();
    getPaymentMethods();
  }, []);

  useEffect(() => {
    console.log({invoicePreview});
    console.log({defaultPaymentMethod});
  }, [invoicePreview]);

  useEffect(() => {
    console.log('CAMBIÓ EL subscriptionId:', {subscriptionId});
  }, [subscriptionId]);

  const getInvoicePreview = async () => {
    const {invoice} = await fetch(UrlBase.concat('invoice-preview'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subscriptionId: subscription.id,
        priceId: price.id,
        customerId: user.profile.usuario_stripe
      })
    }).then((r) => r.json());

    setInvoicePreview(invoice);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({subscriptionId});

    updateSubscription({
      priceId: price.id,
      subscriptionId: subscriptionId,
      customerId: user.profile.usuario_stripe,
      subscriptionCreated
    });
  };

  const handleBack = async () => {
    AppCtx.setNavigate({to: 'account', data: {}});
  };

  const createSubscription = async () => {
    const {subscriptionId, clientSecret, items} = await fetch(
      UrlBase.concat('create-subscription'),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          priceId: price.id,
          customerId: user.profile.usuario_stripe
        })
      }
    ).then((r) => r.json());

    setSubscriptionId(subscriptionId);
    setClientSecret(clientSecret);
    setSubscriptionCreated(true);
  };

  const updateSubscription = (ctx) => {
    setIsLoading(true);

    const fetchData = async () => {
      const {succeed, message, code} = await fetch(
        UrlBase.concat('update-subscription'),
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(ctx)
        }
      ).then((r) => r.json());

      setIsLoading(false);
      console.log({message, code, succeed});
      if (succeed) {
        toast.success(message);
      } else {
        toast.error(message || 'Failed');
      }

      AppCtx.loadStripeInit().then((resLSI) => {
        console.log({resLSI});
        AppCtx.setNavigate({
          to: 'account',
          data: {price}
        });
      });
    };

    fetchData();
  };

  const handleShowHideDetails = (e) => {
    e.preventDefault();
    setShowDetails(!showDetails);
  };

  // if (subscriptionData) {
  //   // navigate('/subscribe', subscriptionData);
  //   AppCtx.setNavigate({to: 'subscribe', data: subscriptionData});
  //   // return <Redirect to={{
  //   //   pathname: '/subscribe',
  //   //   state: subscriptionData
  //   // }} />
  // }

  function createMarkup(texto, busqueda, reemplazo) {
    return {__html: texto?.replaceAll(busqueda, reemplazo)};
  }

  return (
    <div>
      <h4>
        <strong>Confirma tu nuevo plan</strong>
      </h4>
      <br />
      NUEVO PLAN:
      <hr />
      <div>
        {price && interval && invoicePreview && (
          <div key={price.id}>
            <h5 className="text-left">
              <strong>{price.product.name}</strong>
            </h5>
            <div
              dangerouslySetInnerHTML={createMarkup(
                price.product.description,
                '- ',
                '<br/>⦿ '
              )}
            />
            <br />
            <div className="row">
              <div className="col-md-10">
                <p>
                  Lo que pagarás por{' '}
                  <strong>{price?.recurring?.interval_count} </strong>
                  {interval} a partir del{' '}
                  {invoicePreview?.lines !== undefined
                    ? new Date(
                        parseFloat(
                          invoicePreview?.lines?.data[0]?.period?.end
                            ?.toString()
                            ?.concat('000')
                        )
                      ).toLocaleDateString('es-DO')
                    : new Date().toLocaleDateString('es-DO')}
                </p>
              </div>
              <div className="col-md-2 text-right">
                <strong>
                  {currencyLetters +
                    new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(price.unit_amount / 100)}
                </strong>
              </div>
            </div>
            <hr />
            {invoicePreview?.lines !== undefined ? (
              <>
                <Collapse in={showDetails}>
                  <div
                    id="collapse-details"
                    className="pl-2 pr-2 mb-3 pt-3 pb-1 border rounded bg-light align-middle"
                  >
                    <div className="row">
                      <div className="col-md-10">
                        <p>Crédito prorrateado del plan anterior:</p>
                      </div>
                      <div className="col-md-2 text-right">
                        <strong>
                          <strong>
                            {invoicePreview?.lines !== undefined
                              ? currencyLetters +
                                new Intl.NumberFormat('en-US', {
                                  style: 'currency',
                                  currency: 'USD'
                                }).format(
                                  invoicePreview?.lines?.data[0]?.amount / 100
                                )
                              : 'USD$0.00'}
                          </strong>
                        </strong>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-10">
                        <p>Cargo prorrateado del plan {price.product.name}:</p>
                      </div>
                      <div className="col-md-2 text-right">
                        <strong>
                          {invoicePreview?.lines !== undefined
                            ? currencyLetters +
                              new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                              }).format(
                                invoicePreview?.lines?.data[1]?.plan?.amount /
                                  100
                              )
                            : 'USD$0.00'}
                        </strong>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-10">
                        <p>
                          <strong>Total</strong>
                        </p>
                      </div>
                      <div className="col-md-2 text-right">
                        <strong>
                          {invoicePreview?.lines !== undefined
                            ? currencyLetters +
                              new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                              }).format(invoicePreview.amount_remaining / 100)
                            : 'USD$0.00'}
                        </strong>
                      </div>
                    </div>
                  </div>
                </Collapse>

                <div className="row">
                  {/* Pagar con tarjeta: */}
                  <div className="col-md-10">
                    <p>Importe adeudado: hoy</p>
                  </div>
                  <div className="col-md-2 text-right">
                    <strong>
                      {invoicePreview?.lines !== undefined
                        ? currencyLetters +
                          new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                          }).format(invoicePreview.amount_remaining / 100)
                        : currencyLetters +
                          new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                          }).format(price.unit_amount / 100)}
                    </strong>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-10">
                    <a
                      // type="button"
                      href="#"
                      aria-controls="collapse-details"
                      aria-expanded={showDetails}
                      onClick={handleShowHideDetails}
                    >
                      Ver detalles
                    </a>
                  </div>
                  <div className="col-md-2 text-right">
                    {defaultPaymentMethod?.card?.brand.toUpperCase()} ....{' '}
                    {defaultPaymentMethod?.card?.last4}
                  </div>
                </div>
                <hr />
              </>
            ) : null}
            <div className="row">
              <div className="col-md-12">
                <strong>
                  {cards.length > 1 ? 'MÉTODOS DE PAGO' : 'MÉTODO DE PAGO'}
                </strong>
                <div id="cards">
                  {cards.map((s) => {
                    const isDefaultPM =
                      customer?.invoice_settings?.default_payment_method ===
                      s.id;
                    return (
                      <PaymentMethod
                        key={s.id}
                        paymentMethod={s}
                        defaultPM={isDefaultPM}
                        deletePaymentMethodCB={deletePaymentMethod}
                        setDefaultPaymentMethodCB={setDefaultPaymentMethod}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="col-md-12">
                <a href="#" onClick={handleGoAddCard}>
                  <p style={{marginTop: 20, color: 'black'}}>
                    <MoreIcon /> Agregar método de pago
                  </p>
                </a>
              </div>
            </div>
            <hr />
            <div className="form-group row">
              <div className="col-md-12 text-center">
                {subscriptionId && price.id !== currentPriceId ? (
                  <>
                    <Button
                      id="submit"
                      onClick={handleSubmit}
                      theme="primary"
                      disabled={isLoading}
                      style={{width: '200px', height: '50px'}}
                    >
                      <span id="button-text">
                        {isLoading ? (
                          <div className="spinner" id="spinner"></div>
                        ) : (
                          'Confirmar'
                        )}
                      </span>
                    </Button>
                    <br />
                    <br />
                    <Button
                      type="button"
                      theme="secondary"
                      onClick={handleBack}
                      style={{width: '200px', height: '50px'}}
                    >
                      Volver
                    </Button>
                  </>
                ) : (
                  <Loading show />
                  // <Button
                  //   type="button"
                  //   theme={
                  //     price.id === currentPriceId ? 'secondary' : 'primary'
                  //   }
                  //   disabled={price.id === currentPriceId}
                  //   onClick={() => setNavigateTo(price)}
                  // >
                  //   Confirmar
                  // </Button>
                  // <>
                  //   <CheckIcon />
                  //   &nbsp;
                  //   <span>Plan actual</span>
                  // </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PaymentMethod = ({
  paymentMethod,
  defaultPM,
  deletePaymentMethodCB,
  setDefaultPaymentMethodCB
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log('handleClose');
    setAnchorEl(null);
  };

  const handleDeletePaymentMethod = (id) => {
    console.log('handleDeletePaymentMethod');
    deletePaymentMethodCB(id);
    handleClose();
  };

  const handleSetDefaultPaymentMethod = (id) => {
    console.log('handleSetDefaultPaymentMethod');
    setDefaultPaymentMethodCB(id);
    handleClose();
  };

  return (
    <>
      <hr />
      {/* <a
        href={`https://dashboard.stripe.com/test/subscriptions/${subscription.id}`}
      ></a> */}
      <div className="row">
        <div className="col-1 mr-5" style={{whiteSpace: 'nowrap'}}>
          {paymentMethod?.card?.brand.toUpperCase()}
        </div>
        <div className="col-2 ml-4" style={{whiteSpace: 'nowrap'}}>
          ....
          {paymentMethod?.card?.last4}
        </div>
        <div className="col-2">
          {defaultPM === true ? (
            <span
              className="small bg-secondary rounded pl-1 pr-1 pb-1 pt-1"
              style={{whiteSpace: 'nowrap'}}
            >
              {' Defecto '}
            </span>
          ) : (
            ''
          )}
        </div>
        <div className="col-1 mr-1" style={{whiteSpace: 'nowrap'}}>
          {'Exp:'}
        </div>
        <div className="col-2" style={{whiteSpace: 'nowrap'}}>
          {paymentMethod?.card?.exp_month +
            ' / ' +
            paymentMethod?.card?.exp_year}
        </div>
        <div className="col-1" style={{whiteSpace: 'nowrap'}}>
          {/* <span style={{cursor: 'pointer'}}> */}
          {defaultPM === true ? (
            <HtmlTooltip
              placement="top"
              title={
                <React.Fragment>
                  <Typography color="inherit">
                    <small>
                      Tu método de pago predeterminado no puede ser eliminado.
                      <br />
                      Para eliminar este método de pago, debes agregar uno nuevo
                      y marcarlo como predeterminado.
                    </small>
                  </Typography>
                </React.Fragment>
              }
            >
              <InfoIcon style={{marginLeft: 10}} />
            </HtmlTooltip>
          ) : (
            <>
              <IconButton
                aria-label="fingerprint"
                color="default"
                onClick={handleClick}
              >
                <MoreHorizIcon
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}
              >
                <MenuItem
                  key={'def_' + paymentMethod?.id}
                  onClick={() => {
                    handleSetDefaultPaymentMethod(paymentMethod?.id);
                  }}
                >
                  Hacer predeterminada
                </MenuItem>
                <MenuItem
                  key={'del_' + paymentMethod?.id}
                  onClick={() => {
                    handleDeletePaymentMethod(paymentMethod?.id);
                  }}
                >
                  Eliminar
                </MenuItem>
              </Menu>
            </>
          )}
          {/* </span> */}
        </div>
      </div>
    </>
  );
};

const HtmlTooltip = styled(({className, ...props}) => (
  <Tooltip {...props} classes={{popper: className}} />
))(({theme}) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 270,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}));

export default ConfirmPrice;
