/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import React, {useEffect, useState, useContext} from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
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
  const [elementFontSize, setElementFontSize] = useState('18px');

  const NombreEntidad = 'Subscripciones';
  const NombreEntidadMin = NombreEntidad.toLowerCase();
  const [UrlBase] = useState(
    Config.gatDomainName().concat('/'.concat(NombreEntidadMin).concat('/'))
  );

  useEffect(() => {
    if (!stripe) {
      return;
    }

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

    updateSubscription({
      priceId: AppCtx.Navigate.data.price.id,
      subscriptionId: subscriptionId,
      customerId: user.profile.usuario_stripe
    });

    AppCtx.setNavigate({
      to: 'account',
      data: {price: AppCtx.Navigate.data.price}
    });

    setIsLoading(false);
  };

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

  const handleBlur = () => {
    console.log('[blur]');
  };
  const handleChange = (change) => {
    console.log('[change]', change);
  };
  const handleClick = () => {
    console.log('[click]');
  };
  const handleFocus = () => {
    console.log('[focus]');
  };
  const handleReady = () => {
    console.log('[ready]');
  };

  const createOptions = (fontSize, padding) => {
    return {
      style: {
        base: {
          fontSize,
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4'
          },
          ...(padding ? {padding} : {})
        },
        invalid: {
          color: '#9e2146'
        }
      }
    };
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Card number
        <CardNumberElement
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onReady={handleReady}
          {...createOptions(elementFontSize)}
        />
      </label>
      <label>
        Expiration date
        <CardExpiryElement
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onReady={handleReady}
          {...createOptions(elementFontSize)}
        />
      </label>
      <label>
        CVC
        <CardCvcElement
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onReady={handleReady}
          {...createOptions(elementFontSize)}
        />
      </label>
      <button>Pay</button>
    </form>
    // <form
    //   id="payment-form"
    //   onSubmit={handleSubmit}
    //   style={{width: '70%'}}
    //   className="strForm"
    // >
    //   <CardElement />
    //   <Button
    //     id="submit"
    //     type="submit"
    //     theme="primary"
    //     disabled={isLoading || !stripe || !elements}
    //     style={{width: '200px', height: '50px'}}
    //   >
    //     <span id="button-text">
    //       {isLoading ? (
    //         <div className="spinner" id="spinner"></div>
    //       ) : (
    //         'Realizar pago'
    //       )}
    //     </span>
    //   </Button>
    //   {message && <div id="payment-message">{message}</div>}
    // </form>
  );
};

export default SubscribeForm;
