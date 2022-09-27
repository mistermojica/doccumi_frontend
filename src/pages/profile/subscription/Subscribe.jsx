/* eslint-disable no-unused-vars */

import React, {useState, useContext, useEffect} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
// import {PaymentElement} from '@stripe/react-stripe-js';
// import {CardElement} from '@stripe/react-stripe-js';
// import {Button} from '@components';
import axios from 'axios';
import {mlCL} from '@app/utils/helpers';
// import {useStripe, useElements} from '@stripe/react-stripe-js';
import AppContext from '@app/contexts/AppContext';
import SubscribeForm from './SubscribeForm';
import * as Config from '@app/utils/config';
// import '../subscription/Stripe.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Subscribe = (props) => {
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

  // const [items] = useState(AppCtx.Navigate.data.items);
  // const [name, setName] = useState(user.profile.nombre);
  // const [email, setEmail] = useState(user.profile.email);
  // const [messages, _setMessages] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  // const [clientSecretNew, setClientSecretNew] = useState('');

  // const [paymentIntent, setPaymentIntent] = useState();

  // helper for displaying status messages.
  // const setMessage = (message) => {
  //   _setMessages(`${messages}\n\n${message}`);
  // };

  // Initialize an instance of stripe.
  // const stripe = useStripe();
  // const elements = useElements();

  useEffect(() => {
    if (price) {
      console.log({clientSecret, price});
      createSubscription();
    }
  }, []);

  useEffect(() => {
    // stripeCreatePaymentIntent();
    // console.log({items});
    // stripe.retrievePaymentIntent(clientSecret2).then(({paymentIntent}) => {
    // switch (paymentIntent.status) {
    //   case 'succeeded':
    //     setMessage('Pago exitoso!');
    //     AppCtx.setNavigate({to: 'account', data: {}});
    //     break;
    //   case 'processing':
    //     setMessage('Tu pago se está procesando...');
    //     break;
    //   case 'requires_payment_method':
    //     setMessage(
    //       'Tu pago no pudo ser procesado, por favor trata de nuevo.'
    //     );
    //     break;
    //   default:
    //     setMessage('Ocurrió un error inesperado.');
    //     break;
    // }
    // });
  }, []);

  // const stripeCreatePaymentIntent = () => {
  //   const customConfig = {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   };
  //   const url = 'http://delete/create-payment-intent';
  //   const body = {
  //     priceId: price.id,
  //     customerId: user.profile.usuario_stripe
  //   };

  //   axios
  //     .post(url, body, customConfig)
  //     .then((response) => {
  //       const result = response.data;
  //       mlCL('result:', result);
  //       setClientSecretNew(result.clientSecret);
  //     })
  //     .catch((err) => {
  //       mlCL('err:', err);
  //     });
  // };

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

    // AppCtx.setNavigate({
    //   to: 'subscribe',
    //   data: {subscriptionId, clientSecret, price, items}
    // });

    // setSubscriptionData({subscriptionId, clientSecret});
  };

  // When the subscribe-form is submitted we do a few things:
  //
  //   1. Tokenize the payment method
  //   2. Create the subscription
  //   3. Handle any next actions like 3D Secure that are required for SCA.
  // const handleSubmit = async (e) => {
  // e.preventDefault();

  // if (!stripe || !elements) {
  //   // Stripe.js has not loaded yet. Make sure to disable
  //   // form submission until Stripe.js has loaded.
  //   return '';
  // }

  // setIsLoading(true);

  // Get a reference to a mounted CardElement. Elements knows how
  // to find your CardElement because there can only ever be one of
  // each type of element.
  // const cardElement = elements.getElement(CardElement);
  // const paymentElement = elements.getElement(PaymentElement);

  // Use card Element to tokenize payment details

  // const {error} = await stripe.confirmPayment({
  //   elements,
  //   confirmParams: {
  //     // Make sure to change this to your payment completion page
  //     return_url: '',
  //     payment_method_data: {
  //       billing_details: {
  //         name: name,
  //         email: email
  //       }
  //     }
  //   },
  //   redirect: 'if_required'
  // });

  // if (
  //   error &&
  //   (error?.type === 'card_error' || error?.type === 'validation_error')
  // ) {
  //   setMessage(error.message);
  // } else {
  //   console.log('paymentIntent 2:', paymentIntent);
  //   switch (paymentIntent?.status) {
  //     case 'succeeded':
  //       setMessage('Pago exitoso!');
  //       AppCtx.setNavigate({
  //         to: 'account',
  //         data: {price: AppCtx.Navigate.data.price}
  //       });
  //       break;
  //     case 'processing':
  //       setMessage('Tu pago se está procesando...');
  //       break;
  //     case 'requires_payment_method':
  //       setMessage(
  //         'Tu pago no pudo ser procesado, por favor trata de nuevo.'
  //       );
  //       break;
  //     default:
  //       setMessage('Ocurrió un error inesperado al procesar el pago.');
  //       break;
  //   }
  // }

  // stripe
  //   .confirmCardPayment(clientSecret, {
  //     payment_method: {
  //       card: cardElement,
  //       billing_details: {
  //         name: name
  //       }
  //       // receipt_email: email
  //     }
  //   })
  //   .then((result) => {
  //     setIsLoading(false);

  //     let {paymentIntent} = result;

  //     if (paymentIntent && paymentIntent.status === 'succeeded') {
  //       setMessage('Pago exitoso!');
  //       // return <Redirect to={{pathname: '/account'}} />
  //       AppCtx.setNavigate({
  //         to: 'account',
  //         data: {price: AppCtx.Navigate.data.price}
  //       });
  //     }
  //   })
  //   .catch((error) => {
  //     if (error) {
  //       console.log('error:', error);
  //       setMessage(error.message);
  //       return;
  //     }
  //     setPaymentIntent(paymentIntent);
  //   });

  // if(error) {
  //   // show error and collect new card details.
  //   setMessage(error.message);
  //   return;
  // }
  // setPaymentIntent(paymentIntent);
  // };

  // if(paymentIntent && paymentIntent.status === 'succeeded') {
  //   return <Redirect to={{pathname: '/account'}} />
  // }

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
        <strong>Subscribción</strong>
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
      {clientSecret && subscriptionId && (
        <Elements options={options} stripe={stripePromise}>
          <SubscribeForm
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

export default Subscribe;
