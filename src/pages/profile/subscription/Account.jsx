/* eslint-disable no-unused-vars */

import React, {useState, useEffect, useContext} from 'react';
import {Button} from '@components';
import moment from 'moment';
import 'moment/locale/es-do';
// import Moment from 'react-moment';
// import 'moment-timezone';
import {
  MoreHoriz as MoreHorizIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AppContext from '@app/contexts/AppContext';
import './Subscription.css';

// Moment.globalLocale = 'es-do';

const Account = () => {
  const AppCtx = useContext(AppContext);

  const [customer, setCustomer] = useState({});
  const [subscriptions, setSubscriptions] = useState([]);
  const [cards, setCards] = useState([]);
  const [defaultPM, setDefaultPM] = useState({});
  const [interval, setInterval] = useState('');

  const handleAddNew = () => {
    AppCtx.setNavigate({
      to: 'prices',
      data: {
        subscription: ['active'].includes(subscriptions[0].status)
          ? subscriptions[0]
          : null,
        defaultPaymentMethod: defaultPM
      }
    });
  };

  const handleCancel = () => {
    AppCtx.setNavigate({
      to: 'cancel',
      data: {subscription: subscriptions[0]}
    });
  };

  const getCustomer = () => {
    const fetchData = async () => {
      const {customer} = await fetch(
        'http://localhost:8004/load-customer'
      ).then((r) => r.json());

      setCustomer(customer);
    };

    fetchData();
  };

  const getSubscriptions = () => {
    const fetchData = async () => {
      const {subscriptions} = await fetch(
        'http://localhost:8004/subscriptions'
      ).then((r) => r.json());

      setSubscriptions(subscriptions.data);

      let inter = '';

      if (subscriptions.data[0]?.items?.data[0]?.plan?.interval === 'month') {
        if (subscriptions.data[0]?.items?.data[0]?.plan?.interval_count === 1) {
          inter = 'mes';
        } else {
          inter = 'meses';
        }
      } else if (
        subscriptions.data[0]?.items?.data[0]?.plan?.interval === 'year'
      ) {
        if (subscriptions.data[0]?.items?.data[0]?.plan?.interval_count === 1) {
          inter = 'año';
        } else {
          inter = 'años';
        }
      }

      setInterval(inter);
    };

    fetchData();
  };

  const getPaymentMethods = () => {
    const fetchData = async () => {
      const {cards} = await fetch(
        'http://localhost:8004/list-payment-methods'
      ).then((r) => r.json());

      setCards(cards);
    };

    fetchData();
  };

  const deletePaymentMethod = (pmId) => {
    const fetchData = async () => {
      const {paymentMethod} = await fetch(
        'http://localhost:8004/delete-payment-method',
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
        'http://localhost:8004/set-default-payment-method',
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
    getCustomer();
    getSubscriptions();
    getPaymentMethods();
  }, []);

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

  if (!subscriptions && !cards && !customer) {
    return null;
  }

  return (
    <>
      <div>
        <h5>
          <strong>PLAN ACTUAL</strong>
        </h5>
        <hr />
        {subscriptions.length === 0 ||
        subscriptions.filter((doc) => {
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
                  <strong>{subscriptions[0]?.plan?.product?.name}</strong>
                </h5>
                <br />
                Monto:{' '}
                <strong>
                  {subscriptions[0]?.items?.data[0]?.plan?.currency.toUpperCase()}
                  ${subscriptions[0]?.items?.data[0]?.plan?.amount / 100}
                </strong>{' '}
                por{' '}
                <strong>
                  {subscriptions[0]?.items?.data[0]?.plan?.interval_count}{' '}
                </strong>
                {interval}
                .
                <br />
                <br />
                Fecha de renovación:{' '}
                <strong>
                  {subscriptions[0] &&
                    moment(
                      new Date(
                        subscriptions[0]?.current_period_end * 1000
                      ).toString()
                    ).format('LL')}
                </strong>
                .
                <br />
                <br />
                Estado subscripción:{' '}
                <strong>
                  {subscriptions[0] && subscriptions[0]?.status === 'active'
                    ? 'Activo'
                    : 'Inactivo'}
                </strong>
                .
              </div>
              <div className="col-md-3 text-center">
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
            </div>
            <div className="row">
              <div className="col-md-12">
                <hr />
                <strong>HISTORIAL DE FACTURAS</strong>
                <div id="subscriptions">
                  {subscriptions.map((s) => {
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
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}));

const AccountSubscription = ({subscription}) => {
  // const AppCtx = useContext(AppContext);

  // const handleCancel = () => {
  //   AppCtx.setNavigate({to: 'cancel', data: {subscription: subscription.id}});
  // };

  return (
    <section>
      <hr />
      {/* <a
        href={`https://dashboard.stripe.com/test/subscriptions/${subscription.id}`}
      ></a> */}
      <div className="row">
        <div className="col-md-3">
          <a
            href={subscription?.latest_invoice?.hosted_invoice_url}
            target="_blank"
            rel="noreferrer"
          >
            {moment(new Date(subscription?.start_date * 1000).toString())
              .locale('es-do')
              .format('LL')}
          </a>
        </div>
        <div className="col-md-3">
          {subscription?.items?.data[0]?.plan?.currency.toUpperCase()}$
          {subscription?.items?.data[0]?.plan?.amount / 100}
        </div>
        <div className="col-md-3">
          {subscription.status === 'active'
            ? 'Pagada'
            : subscription.status === 'canceled'
            ? 'Cancelada'
            : 'Inactiva'}
        </div>
        <div className="col-md-3">{subscription?.plan?.product?.name}</div>
      </div>
      {/* <p>Card last4: {subscription.default_payment_method?.card?.last4}</p> */}
      {/* <Link to={{pathname: '/change-plan', state: {subscription: subscription.id }}}>Change plan</Link><br /> */}
      {/* <Link to={{pathname: '/cancel', state: {subscription: subscription.id }}}>Cancel</Link> */}
      {/* <button type="button" onClick={handleCancel}>
        Cancel
      </button> */}
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
        <div className="col-md-1">
          {paymentMethod?.card?.brand.toUpperCase()}
        </div>
        <div className="col-md-1" style={{whiteSpace: 'nowrap'}}>
          ....
          {paymentMethod?.card?.last4}
        </div>
        <div className="col-md-2">
          {defaultPM === true ? (
            <span className="small bg-secondary rounded pl-1 pr-1 pb-1">
              Predeterminado
            </span>
          ) : (
            ''
          )}
        </div>
        <div className="col-md-1" style={{whiteSpace: 'nowrap'}}>
          {' Expira '}
        </div>
        <div className="col-md-1.5">
          {paymentMethod?.card?.exp_month +
            ' / ' +
            paymentMethod?.card?.exp_year}
        </div>
        <div className="col-md-1">
          {/* <span style={{cursor: 'pointer'}}> */}
          {defaultPM === true ? (
            <HtmlTooltip
              placement="top"
              title={
                <React.Fragment>
                  <Typography color="inherit">
                    <small>
                      Tu método de pago predeterminado no puede ser eliminado
                      debido a que tienes un plan activo.
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
