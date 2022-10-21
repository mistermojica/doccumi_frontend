/* eslint-disable no-unused-vars */

import React, {useState, useEffect, useContext} from 'react';
import {Button} from '@components';
import {
  MoreHoriz as MoreHorizIcon,
  Info as InfoIcon,
  AddOutlined as MoreIcon
} from '@mui/icons-material';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import {mlCL, omomentnohour} from '@app/utils/helpers';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AppContext from '@app/contexts/AppContext';
import * as Config from '@app/utils/config';
import './Subscription.css';

const Account = (props) => {
  const AppCtx = useContext(AppContext);
  const {user} = props;

  const [customer, setCustomer] = useState({});
  const [subscriptions, setSubscriptions] = useState([]);
  const [cards, setCards] = useState([]);
  const [defaultPM, setDefaultPM] = useState({});
  const [interval, setInterval] = useState('');

  const NombreEntidad = 'Subscripciones';
  const NombreEntidadMin = NombreEntidad.toLowerCase();
  const [UrlBase] = useState(
    Config.gatDomainName().concat('/'.concat(NombreEntidadMin).concat('/'))
  );

  const handleAddNew = () => {
    AppCtx.setNavigate({
      to: 'prices',
      data: {
        subscription: ['active'].includes(
          AppCtx.StripeData.subscriptionsi[0]?.status
        )
          ? AppCtx.StripeData.subscriptionsi[0]
          : null,
        defaultPaymentMethod: defaultPM
      }
    });
  };

  const handleCancel = () => {
    AppCtx.setNavigate({
      to: 'cancel',
      data: {subscription: AppCtx.StripeData.subscriptionsi[0]}
    });
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

  function compareStatus(a, b) {
    console.log(a.status);
    if (a.status < b.status) {
      return -1;
    }
    if (a.status > b.status) {
      return 1;
    }
    return 0;
  }

  const getSubscriptions = () => {
    const subslocal = {
      ...AppCtx?.StripeData?.subscriptionsi.sort(compareStatus)
    };

    // setSubscriptions(subslocal);

    let inter = '';

    if (subslocal[0]?.items?.data[0]?.plan?.interval === 'month') {
      if (subslocal[0]?.items?.data[0]?.plan?.interval_count === 1) {
        inter = 'mes';
      } else {
        inter = 'meses';
      }
    } else if (subslocal[0]?.items?.data[0]?.plan?.interval === 'year') {
      if (subslocal[0]?.items?.data[0]?.plan?.interval_count === 1) {
        inter = 'año';
      } else {
        inter = 'años';
      }
    }

    setInterval(inter);

    // const fetchData = async () => {
    //   const {subscriptions} = await fetch(
    //     UrlBase.concat('subscriptions-by-status'),
    //     {
    //       method: 'POST',
    //       headers: {'Content-Type': 'application/json'},
    //       body: JSON.stringify({
    //         customerId: user.profile.usuario_stripe,
    //         statusCode: 'active'
    //       })
    //     }
    //   ).then((r) => r.json());

    //   // subscriptions.data.sort(compareStatus);

    //   // subscriptions.data.map((s) => {
    //   //   console.log(s.id, s.status);
    //   // });

    //   setSubscriptions(subscriptions.data.sort(compareStatus));

    //   // subscriptions.data.map((s) => {
    //   //   console.log(s.id, s.status);
    //   // });

    //   let inter = '';

    //   if (subscriptions.data[0]?.items?.data[0]?.plan?.interval === 'month') {
    //     if (subscriptions.data[0]?.items?.data[0]?.plan?.interval_count === 1) {
    //       inter = 'mes';
    //     } else {
    //       inter = 'meses';
    //     }
    //   } else if (
    //     subscriptions.data[0]?.items?.data[0]?.plan?.interval === 'year'
    //   ) {
    //     if (subscriptions.data[0]?.items?.data[0]?.plan?.interval_count === 1) {
    //       inter = 'año';
    //     } else {
    //       inter = 'años';
    //     }
    //   }

    //   setInterval(inter);
    // };

    // fetchData();
  };

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

  useEffect(() => {
    // console.log(
    //   'Account1 - useEffect() || AppCtx.StripeData.subscriptions:',
    //   AppCtx.StripeData.subscriptions
    // );
    getCustomer();
    getSubscriptions();
    getPaymentMethods();
  }, []);

  useEffect(() => {
    // if (subscriptions) {
    // console.log(
    //   'Account2 - useEffect() || AppCtx.StripeData.subscriptions:',
    //   AppCtx.StripeData.subscriptions
    // );

    // const StripeData = {...AppCtx.StripeData};
    // StripeData.subscriptions = subscriptions;
    // AppCtx.setStripeData(StripeData);

    // console.log(
    //   'Account3 - useEffect() || AppCtx.StripeData.subscriptions:',
    //   AppCtx.StripeData.subscriptions
    // );
    // }

    if (AppCtx.StripeData.subscriptionsi) {
      console.log(AppCtx.StripeData.subscriptionsi);
      console.log(
        'subscriptions.length:',
        AppCtx.StripeData.subscriptionsi.length
      );
      console.log(
        'subscriptions.filter:',
        AppCtx.StripeData.subscriptionsi.filter(
          (doc) => doc.status == 'active'
        )[0]
      );
      if (
        AppCtx.StripeData.subscriptionsi.length === 0 ||
        AppCtx.StripeData.subscriptionsi.filter(
          (doc) => doc.status == 'active'
        )[0] === undefined
      ) {
        handleAddNew();
      }
    }
  }, []);

  useEffect(() => {
    // console.log(
    //   'Account4 - useEffect() || AppCtx.StripeData:',
    //   AppCtx.StripeData
    // );
  }, [AppCtx]);

  useEffect(() => {
    if (cards && customer) {
      cards.forEach((card) => {
        if (customer?.invoice_settings?.default_payment_method === card.id) {
          console.log('useEffect:', {card});
          setDefaultPM(card);
        }
      });
    }
  }, [cards, customer]);

  if (!AppCtx.StripeData.subscriptionsi && !cards && !customer) {
    return null;
  }

  return (
    <>
      <div>
        <h5>
          <strong>PLAN ACTUAL</strong>
        </h5>
        <hr />
        {AppCtx.StripeData.subscriptionsi.length === 0 ||
        AppCtx.StripeData.subscriptionsi.filter((doc) => {
          return doc.status == 'active';
        })[0] === undefined ? (
          <Button
            type="button"
            theme="primary"
            onClick={handleAddNew}
            style={{width: '200px', height: '50px'}}
          >
            Obtener plan
          </Button>
        ) : (
          <>
            <div className="form-group row">
              <div className="col-md-7">
                <h5>
                  <strong>
                    {AppCtx.StripeData.subscriptionsi[0]?.plan?.product?.name}
                  </strong>
                </h5>
                <br />
                Monto:{' '}
                <strong>
                  {AppCtx.StripeData.subscriptionsi[0]?.items?.data[0]?.plan?.currency.toUpperCase()}
                  $
                  {AppCtx.StripeData.subscriptionsi[0]?.items?.data[0]?.plan
                    ?.amount / 100}
                </strong>{' '}
                por{' '}
                <strong>
                  {
                    AppCtx.StripeData.subscriptionsi[0]?.items?.data[0]?.plan
                      ?.interval_count
                  }{' '}
                </strong>
                {interval}
                .
                <br />
                <br />
                Fecha de renovación:{' '}
                <strong>
                  {AppCtx.StripeData.subscriptionsi[0] &&
                    omomentnohour(
                      new Date(
                        AppCtx.StripeData.subscriptionsi[0]
                          ?.current_period_end * 1000
                      ).toString()
                    )}
                </strong>
                .
                <br />
                <br />
                Estado subscripción:{' '}
                <strong>
                  {AppCtx.StripeData.subscriptionsi[0] &&
                  AppCtx.StripeData.subscriptionsi[0]?.status === 'active'
                    ? 'Activo'
                    : 'Inactivo'}
                </strong>
                .
              </div>
              <div className="col-md-3 mt-4 text-center">
                <Button
                  type="button"
                  theme="primary"
                  onClick={handleAddNew}
                  style={{width: '200px', height: '50px'}}
                >
                  Cambiar plan
                </Button>
                <br />
                <br />
                <Button
                  type="button"
                  theme="danger"
                  onClick={handleCancel}
                  style={{width: '200px', height: '50px'}}
                  // onClick={() => createSubscription(price.id)}
                >
                  Cancelar plan
                </Button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <hr />
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
            <div className="row">
              <div className="col-md-12">
                <hr />
                <strong>HISTORIAL DE FACTURAS</strong>
                <div id="subscriptions">
                  {AppCtx.StripeData.subscriptionsi.map((s) => {
                    return <AccountSubscription key={s.id} subscription={s} />;
                  })}
                </div>
              </div>
            </div>
          </>
        )}
        {/* &nbsp; */}
        {/* <a href="/profile">Restart demo</a> */}
        {/* <h2>Subscriptions</h2> */}
        {/* <div id="subscriptions">
          {subscriptions.map((s) => {
            return <AccountSubscription key={s.id} subscription={s} />;
          })}
        </div> */}
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

const AccountSubscription = ({subscription}) => {
  return (
    <section>
      <hr />
      {/* <a
        href={`https://dashboard.stripe.com/test/subscriptions/${subscription.id}`}
      ></a> */}
      <div className="row">
        <div className="col-3" style={{whiteSpace: 'nowrap'}}>
          <a
            href={subscription?.latest_invoice?.hosted_invoice_url}
            target="_blank"
            rel="noreferrer"
          >
            {omomentnohour(
              new Date(subscription?.start_date * 1000).toString()
            )}
          </a>
        </div>
        <div className="col-3">
          {subscription?.items?.data[0]?.plan?.currency.toUpperCase()}$
          {subscription?.items?.data[0]?.plan?.amount / 100}
        </div>
        <div className="col-3">
          {subscription.status === 'active'
            ? 'Pagada'
            : subscription.status === 'canceled'
            ? 'Cancelada'
            : 'Inactiva'}
        </div>
        <div className="col-3">{subscription?.plan?.product?.name}</div>
      </div>
    </section>
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
        <div className="col-1 mr-2" style={{whiteSpace: 'nowrap'}}>
          {paymentMethod?.card?.brand.toUpperCase()}
        </div>
        <div className="col-2" style={{whiteSpace: 'nowrap'}}>
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
        <div className="col-2" style={{whiteSpace: 'nowrap'}}>
          {' Expira '}
        </div>
        <div className="col-2" style={{whiteSpace: 'nowrap'}}>
          {paymentMethod?.card?.exp_month +
            ' / ' +
            paymentMethod?.card?.exp_year}
        </div>
        <div className="col-2" style={{whiteSpace: 'nowrap'}}>
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

export default Account;
