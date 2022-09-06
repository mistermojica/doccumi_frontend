/* eslint-disable no-unused-vars */

import React, {useState, useContext} from 'react';
// import {PaymentElement} from '@stripe/react-stripe-js';
import {Button} from '@components';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import AppContext from '@app/contexts/AppContext';

const Subscribe = (props) => {
  const AppCtx = useContext(AppContext);
  const {user} = props;

  console.log('AppCtx.Navigate.data', AppCtx.Navigate.data);

  // Get the lookup key for the price from the previous page redirect.
  const [clientSecret] = useState(AppCtx.Navigate.data.clientSecret);
  // const [subscriptionId] = useState(AppCtx.Navigate.data.subscriptionId);
  const [name, setName] = useState(user.profile.nombre);
  const [messages, _setMessages] = useState('');
  // const [paymentIntent, setPaymentIntent] = useState();

  // helper for displaying status messages.
  const setMessage = (message) => {
    _setMessages(`${messages}\n\n${message}`);
  };

  // Initialize an instance of stripe.
  const stripe = useStripe();
  const elements = useElements();

  // console.log('stripe:', stripe);
  // console.log('elements:', elements);

  if (!stripe || !elements) {
    // Stripe.js has not loaded yet. Make sure to disable
    // form submission until Stripe.js has loaded.
    return '';
  }

  // When the subscribe-form is submitted we do a few things:
  //
  //   1. Tokenize the payment method
  //   2. Create the subscription
  //   3. Handle any next actions like 3D Secure that are required for SCA.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use card Element to tokenize payment details
    stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: name
          }
        }
      })
      .then((result) => {
        let {paymentIntent} = result;
        if (paymentIntent && paymentIntent.status === 'succeeded') {
          // return <Redirect to={{pathname: '/account'}} />
          AppCtx.setNavigate({to: 'account', data: {}});
        }
      })
      .catch((error) => {
        console.log('error:', error);
        setMessage(error.message);
        // setPaymentIntent(paymentIntent);
        return;
      });

    // if(error) {
    //   // show error and collect new card details.
    //   setMessage(error.message);
    //   return;
    // }
    // setPaymentIntent(paymentIntent);
  };

  // if(paymentIntent && paymentIntent.status === 'succeeded') {
  //   return <Redirect to={{pathname: '/account'}} />
  // }

  const options = {
    theme: 'stripe'
  };

  return (
    <>
      <h1>Subscribe</h1>
      <p>
        Try the successful test card: <span>4242424242424242</span>.
      </p>
      <p>
        Try the test card that requires SCA: <span>4000002500003155</span>.
      </p>
      <p>
        Use any <i>future</i> expiry date, CVC,5 digit postal code
      </p>
      <hr />
      <form onSubmit={handleSubmit}>
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
        {/* <PaymentElement /> */}
        <br />
        {/* <button type="submit">Subscribe</button> */}
        <div className="form-group row">
          <div className="">
            <Button type="submit" theme="primary">
              Subscribir
            </Button>
          </div>
        </div>
        <div>{messages}</div>
      </form>
      <br />
      <br />
    </>
  );
};

export default Subscribe;
