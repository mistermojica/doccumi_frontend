/* eslint-disable no-unused-vars */

import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '@components';
import moment from 'moment';
import 'moment/locale/es-do';
import {
  MoreHoriz as MoreHorizIcon,
  Info as InfoIcon,
  AddOutlined as MoreIcon
} from '@mui/icons-material';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AppContext from '@app/contexts/AppContext';
import * as AuthService from '@app/services/auth';
import * as Config from '@app/utils/config';
import './Subscription.css';

// Moment.globalLocale = 'es-do';

const Account = (props) => {
  const AppCtx = useContext(AppContext);

  const navigate = useNavigate();

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
    navigate('/profile?activetab=SUBSCRIPTION');
  };

  const getCustomer = () => {
    const fetchData = async () => {
      const {customer} = await fetch(UrlBase.concat('load-customer'), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({customerId: AuthService.getProfileStripeId()})
      }).then((r) => r.json());

      setCustomer(customer);
    };

    fetchData();
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
    const fetchData = async () => {
      const {subscriptions} = await fetch(
        UrlBase.concat('subscriptions-by-status'),
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            customerId: AuthService.getProfileStripeId(),
            statusCode: 'active'
          })
        }
      ).then((r) => r.json());

      setSubscriptions(subscriptions.data.sort(compareStatus));

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
      const {cards} = await fetch(UrlBase.concat('list-payment-methods'), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({customerId: AuthService.getProfileStripeId()})
      }).then((r) => r.json());

      setCards(cards);
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
        {subscriptions.length === 0 ||
        subscriptions.filter((doc) => {
          return doc.status == 'active';
        })[0] === undefined ? (
          <Button
            type="button"
            theme="primary"
            onClick={handleAddNew}
            style={{width: '150px', height: '40px'}}
          >
            Planes de Servicio
          </Button>
        ) : (
          <div>
            Plan Actual:{' '}
            <strong>
              {subscriptions[0]?.plan?.product?.name?.toUpperCase()}
            </strong>
          </div>
        )}
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
            <span className="small bg-secondary rounded pl-1 pr-1 pb-1 pt-1">
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
