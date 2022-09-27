/* eslint-disable no-unused-vars */

import React, {useState, useContext, useEffect} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import AppContext from '@app/contexts/AppContext';
import AddCardForm from './AddCardForm';
import * as Config from '@app/utils/config';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const AddCard = (props) => {
  const AppCtx = useContext(AppContext);
  const {user} = props;

  console.log('AppCtx.price', AppCtx.Navigate.data.price);
  console.log('AppCtx.data', AppCtx.Navigate.data);
  console.log('props', props);

  // Get the lookup key for the price from the previous page redirect.
  const [clientSecret, setClientSecret] = useState('');
  const [price] = useState(AppCtx.Navigate.data.price);
  const [subscriptionId, setSubscriptionId] = useState('');

  const NombreEntidad = 'Subscripciones';
  const NombreEntidadMin = NombreEntidad.toLowerCase();
  const [UrlBase] = useState(
    Config.gatDomainName().concat('/'.concat(NombreEntidadMin).concat('/'))
  );

  useEffect(() => {
    if (price) {
      console.log({clientSecret, price});
      createSubscription();
    }
  }, []);

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

    setClientSecret(clientSecret);

    // AppCtx.setNavigate({
    //   to: 'subscribe',
    //   data: {subscriptionId, clientSecret, price, items}
    // });

    // setSubscriptionData({subscriptionId, clientSecret});
  };

  const options = {
    clientSecret: clientSecret,
    theme: 'stripe'
  };

  // if (!clientSecret || !subscriptionId) {
  //   return;
  // }

  return (
    <>
      <h5>
        <strong>Agrega un método de pago</strong>
      </h5>
      <hr />
      {/* <form onSubmit={handleSubmit}>
        <label>
          Nombre Completo
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <hr />
        <CardElement />
        <hr />
        <PaymentElement />
        <br />
        <div className="form-group row">
          <div className="">
            <Button type="submit" theme="primary">
              Subscribir
            </Button>
          </div>
        </div>
        <div>{messages}</div>
      </form> */}
      {/* <form id="payment-form" onSubmit={handleSubmit} style={{width: '70%'}}> */}
      {/* <PaymentElement id="payment-element" /> */}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <AddCardForm
            clientSecret={clientSecret}
            user={user}
            subscriptionId={subscriptionId}
          />
        </Elements>
      )}
      {/* <hr /> */}
      {/* <Button
          id="submit"
          type="submit"
          theme="primary"
          disabled={isLoading || !stripe || !elements}
          style={{width: '200px', height: '50px'}}
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              'Realizar pago'
            )}
          </span>
        </Button> */}
      {/* <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              'Realizar pago'
            )}
          </span>
        </button> */}
      {/* Show any error or success messages */}
      {/* {messages && <div id="payment-message">{messages}</div>} */}
      {/* </form> */}
      <br />
      <br />
      <p>
        Try the successful test card: <span>4242424242424242</span>.
      </p>
      <p>
        Try the test card that requires SCA: <span>4000002500003155</span>.
      </p>
      <p>
        Use any <i>future</i> expiry date, CVC,5 digit postal code
      </p>
    </>
  );
};

export default AddCard;
