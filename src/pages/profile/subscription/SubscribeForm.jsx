/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import React, {useEffect, useState, useContext} from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import AppContext from '@app/contexts/AppContext';
import * as Config from '@app/utils/config';
import {Button} from '@components';
import '../subscription/Stripe.css';

const SubscribeForm = (props) => {
  const AppCtx = useContext(AppContext);
  const stripe = useStripe();
  const elements = useElements();
  const {user, subscriptionId} = props;

  const [clientSecret] = useState(props.clientSecret);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [paymentIntent, setPaymentIntent] = useState();

  const NombreEntidad = 'Subscripciones';
  const NombreEntidadMin = NombreEntidad.toLowerCase();
  const [UrlBase] = useState(
    Config.gatDomainName().concat('/'.concat(NombreEntidadMin).concat('/'))
  );

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // const clientSecret = new URLSearchParams(window.location.search).get(
    //   'payment_intent_client_secret'
    // );

    // console.log({clientSecret});

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Se requiere un método de pago');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

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
    // return <Redirect to={{pathname: '/account'}} />
    // ROMG ACTIVAR

    updateSubscription({
      priceId: AppCtx.Navigate.data.price.id,
      subscriptionId: subscriptionId,
      customerId: user.profile.usuario_stripe
    });

    AppCtx.setNavigate({
      to: 'account',
      data: {price: AppCtx.Navigate.data.price}
    });
    // }
    // })
    // .catch((error) => {
    //   if (error) {
    //     console.log('error:', error);
    //     setMessage(error.message);
    //     return;
    //   }
    //   setPaymentIntent(paymentIntent);
    // });

    // const {error} = await stripe.confirmPayment({
    //   elements,
    //   confirmParams: {
    //     // Make sure to change this to your payment completion page
    //     return_url: 'http://delete/doccumi-payment-response'
    //   }
    // });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    // if (error.type === 'card_error' || error.type === 'validation_error') {
    //   setMessage(error.message);
    // } else {
    //   setMessage('An unexpected error occurred.');
    // }

    setIsLoading(false);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!stripe || !elements) {
  //     // Stripe.js has not yet loaded.
  //     // Make sure to disable form submission until Stripe.js has loaded.
  //     return;
  //   }

  //   setIsLoading(true);

  //   const cardElement = elements.getElement(CardElement);

  //   stripe
  //     .confirmCardPayment(clientSecret, {
  //       payment_method: {
  //         card: cardElement,
  //         billing_details: {
  //           name: name
  //         }
  //         // receipt_email: email
  //       }
  //     })
  //     .then((result) => {
  //       setIsLoading(false);

  //       let {paymentIntent} = result;

  //       if (paymentIntent && paymentIntent.status === 'succeeded') {
  //         setMessage('Pago exitoso!');
  //         // return <Redirect to={{pathname: '/account'}} />
  //         // ROMG ACTIVAR

  //         updateSubscription({
  //           priceId: AppCtx.Navigate.data.price.id,
  //           subscriptionId: subscriptionId,
  //           customerId: user.profile.usuario_stripe
  //         });

  //         AppCtx.setNavigate({
  //           to: 'account',
  //           data: {price: AppCtx.Navigate.data.price}
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       if (error) {
  //         console.log('error:', error);
  //         setMessage(error.message);
  //         return;
  //       }
  //       setPaymentIntent(paymentIntent);
  //     });

  //   // const {error} = await stripe.confirmPayment({
  //   //   elements,
  //   //   confirmParams: {
  //   //     // Make sure to change this to your payment completion page
  //   //     return_url: 'http://delete/doccumi-payment-response'
  //   //   }
  //   // });

  //   // This point will only be reached if there is an immediate error when
  //   // confirming the payment. Otherwise, your customer will be redirected to
  //   // your `return_url`. For some payment methods like iDEAL, your customer will
  //   // be redirected to an intermediate site first to authorize the payment, then
  //   // redirected to the `return_url`.
  //   // if (error.type === 'card_error' || error.type === 'validation_error') {
  //   //   setMessage(error.message);
  //   // } else {
  //   //   setMessage('An unexpected error occurred.');
  //   // }

  //   setIsLoading(false);
  // };

  const updateSubscription = (ctx) => {
    const fetchData = async () => {
      const {paymentMethod} = await fetch(
        UrlBase.concat('update-subscription'),
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(ctx)
        }
      ).then((r) => r.json());

      // getPaymentMethods();
    };

    fetchData();
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      style={{width: '70%'}}
      className="strForm"
    >
      <CardElement />
      <Button
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
      </Button>
      {/* <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="strButton"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner" /> : 'Pagar ahora'}
        </span>
      </button> */}
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default SubscribeForm;
