/* eslint-disable no-unused-vars */

import React, {useState, useEffect, useContext} from 'react';
import {Button} from '@components';
import * as moment from 'moment';
import AppContext from '@app/contexts/AppContext';
import './Subscription.css';

const AccountSubscription = ({subscription}) => {
  const AppCtx = useContext(AppContext);

  const handleCancel = () => {
    AppCtx.setNavigate({to: 'cancel', data: {subscription: subscription.id}});
  };

  return (
    <section>
      <hr />
      {/* <a
        href={`https://dashboard.stripe.com/test/subscriptions/${subscription.id}`}
      ></a> */}
      <p>Status: {subscription.status}</p>
      <p>Card last4: {subscription.default_payment_method?.card?.last4}</p>
      <p>
        Current period end:
        {new Date(subscription.current_period_end * 1000).toString()}
      </p>
      {/* <Link to={{pathname: '/change-plan', state: {subscription: subscription.id }}}>Change plan</Link><br /> */}
      {/* <Link to={{pathname: '/cancel', state: {subscription: subscription.id }}}>Cancel</Link> */}
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </section>
  );
};

const Account = () => {
  const AppCtx = useContext(AppContext);

  const [subscriptions, setSubscriptions] = useState([]);
  const [price, setPrice] = useState(AppCtx?.Navigate?.data?.price);

  const handleAddNew = () => {
    AppCtx.setNavigate({to: 'prices', data: {}});
  };

  const handleCancel = () => {
    AppCtx.setNavigate({
      to: 'cancel',
      data: {subscription: subscriptions[0].id}
    });
  };

  useEffect(() => {
    console.log('price:', AppCtx?.Navigate?.data?.price);
    console.log('price:', price);

    const fetchData = async () => {
      const {subscriptions} = await fetch(
        'http://localhost:8004/subscriptions'
      ).then((r) => r.json());

      setSubscriptions(subscriptions.data);
    };

    fetchData();
  }, []);

  if (!subscriptions) {
    return '';
  }

  return (
    <div>
      <h5>PLAN ACTUAL</h5>
      <hr />
      {subscriptions.length === 0 ? (
        <Button
          type="button"
          theme="primary"
          onClick={handleAddNew}
          style={{width: '200px', height: '50px'}}
        >
          Obtener plan
        </Button>
      ) : (
        <div className="form-group row">
          <div className="col-md-7">
            <h5>
              <strong>{subscriptions[0]?.plan?.product?.name}</strong>
            </h5>
            <br />
            Monto:{' '}
            <strong>
              {subscriptions[0]?.items?.data[0]?.price?.currency.toUpperCase()}$
              {subscriptions[0]?.items?.data[0]?.price?.unit_amount / 100}
            </strong>{' '}
            por mes.
            <br />
            <br />
            Tu plan se renueva el:{' '}
            <strong>
              {subscriptions[0] &&
                moment(
                  new Date(
                    subscriptions[0]?.current_period_end * 1000
                  ).toString()
                ).format('DD-MMM-YYYY')}
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
            <br />
            <br />
            Método de pago:{' '}
            <strong>
              {subscriptions[0] &&
                subscriptions[0]?.default_payment_method?.card?.last4}
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
              theme="secondary"
              onClick={handleCancel}
              style={{width: '200px', height: '50px'}}
              // onClick={() => createSubscription(price.id)}
            >
              Cancelar plan
            </Button>
          </div>
        </div>
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
  );
};

export default Account;
