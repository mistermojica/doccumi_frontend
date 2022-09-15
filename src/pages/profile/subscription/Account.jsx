/* eslint-disable no-unused-vars */

import React, {useState, useEffect, useContext} from 'react';
import {Button} from '@components';
import moment from 'moment';
import 'moment/locale/es-do';
// import Moment from 'react-moment';
// import 'moment-timezone';
import {
  MoreHoriz as MoreHorizIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import AppContext from '@app/contexts/AppContext';
import './Subscription.css';

// Moment.globalLocale = 'es-do';

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
          {moment(new Date(subscription?.start_date * 1000).toString())
            .locale('es-do')
            .format('LL')}
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

const PaymentMethods = ({paymentMethod, defaultPM}) => {
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
        <div className="col-md-1">
          {paymentMethod?.card?.brand.toUpperCase()}
        </div>
        <div className="col-md-1">
          ....
          {paymentMethod?.card?.last4}
        </div>
        <div className="col-md-2">
          {defaultPM === true ? 'Predeterminado' : ''}
        </div>
        <div className="col-md-1">{' Expira '}</div>
        <div className="col-md-1.5">
          {paymentMethod?.card?.exp_month +
            ' / ' +
            paymentMethod?.card?.exp_year}
        </div>
        <div className="col-md-1">
          {/* <a href="#"> */}
          <span style={{cursor: 'pointer'}}>
            {defaultPM === true ? <MoreHorizIcon /> : <DeleteIcon />}
          </span>
          {/* </a> */}
        </div>
      </div>
    </section>
  );
};

const Account = () => {
  const AppCtx = useContext(AppContext);

  const [customer, setCustomer] = useState({});
  const [subscriptions, setSubscriptions] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const [interval, setInterval] = useState('');

  const handleAddNew = () => {
    AppCtx.setNavigate({to: 'prices', data: {}});
  };

  const handleCancel = () => {
    AppCtx.setNavigate({
      to: 'cancel',
      data: {subscription: subscriptions[0]}
    });
  };

  useEffect(() => {
    getCustomer();
    getSubscriptions();
    getPaymentMethods();
  }, []);

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
      const {payment_methods} = await fetch(
        'http://localhost:8004/list-payment-methods'
      ).then((r) => r.json());

      setPaymentMethods(payment_methods.data);
    };

    fetchData();
  };

  if (!subscriptions && !paymentMethods) {
    return '';
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
                {/* <br />
              <br />
              Método de pago:{' '}
              <strong>
                {subscriptions[0] &&
                  subscriptions[0]?.default_payment_method?.card?.last4}
              </strong>
              . */}
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
                  {paymentMethods.length > 1
                    ? 'MÉTODOS DE PAGO'
                    : 'MÉTODO DE PAGO'}
                </strong>
                <div id="paymentMethods">
                  {paymentMethods.map((s) => {
                    const defaultPM =
                      customer.invoice_settings.default_payment_method === s.id;
                    return (
                      <PaymentMethods
                        key={s.id}
                        paymentMethod={s}
                        defaultPM={defaultPM}
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

export default Account;
