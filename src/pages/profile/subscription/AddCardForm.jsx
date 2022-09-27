/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import React, {useEffect, useState, useContext} from 'react';
import {
  Elements,
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

  const [name, setName] = useState('');
  const [postal, setPostal] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  useEffect(() => {
    // if (!stripe) {
    //   return;
    // }
    // if (!clientSecret) {
    //   return;
    // }
    // stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
    //   switch (paymentIntent.status) {
    //     case 'succeeded':
    //       setMessage('Payment succeeded!');
    //       break;
    //     case 'processing':
    //       setMessage('Your payment is processing.');
    //       break;
    //     case 'requires_payment_method':
    //       setMessage('Se requiere un método de pago');
    //       break;
    //     default:
    //       setMessage('Something went wrong.');
    //       break;
    //   }
    // });
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

  const logEvent = (name) => (event) => {
    console.log(`[${name}]`, event);
  };

  const ELEMENT_OPTIONS = {
    style: {
      base: {
        fontSize: useDynamicFontSize(),
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#9e2146'
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nombre en la tarjeta: </label>
      <br />
      <input
        id="name"
        required
        placeholder="Maria Pérez"
        value={name}
        style={{
          height: '30px',
          padding: '5px',
          border: '1px solid #ccc',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4'
          },
          width: useDynamicWidthCN()
        }}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="cardNumber">Número de Tarjeta:</label>
      <div
        style={{
          height: '30px',
          padding: '5px',
          border: '1px solid #ccc',
          width: useDynamicWidthCN()
        }}
      >
        <CardNumberElement
          id="cardNumber"
          onBlur={logEvent('blur')}
          onChange={logEvent('change')}
          onFocus={logEvent('focus')}
          onReady={logEvent('ready')}
          options={ELEMENT_OPTIONS}
        />
      </div>
      <label htmlFor="expiry">Fecha de Expiración:</label>
      <div
        style={{
          height: '30px',
          padding: '5px',
          border: '1px solid #ccc',
          width: useDynamicWidthDC()
        }}
      >
        <CardExpiryElement
          id="expiry"
          onBlur={logEvent('blur')}
          onChange={logEvent('change')}
          onFocus={logEvent('focus')}
          onReady={logEvent('ready')}
          options={ELEMENT_OPTIONS}
        />
      </div>
      <label htmlFor="cvc">CVC:</label>
      <div
        style={{
          height: '30px',
          padding: '5px',
          border: '1px solid #ccc',
          width: useDynamicWidthDC()
        }}
      >
        <CardCvcElement
          id="cvc"
          onBlur={logEvent('blur')}
          onChange={logEvent('change')}
          onFocus={logEvent('focus')}
          onReady={logEvent('ready')}
          options={ELEMENT_OPTIONS}
        />
      </div>
      <label htmlFor="postal">Código Postal:</label>
      <br />
      <input
        id="postal"
        required
        placeholder="12345"
        value={postal}
        style={{
          height: '30px',
          padding: '5px',
          border: '1px solid #ccc',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4'
          },
          width: useDynamicWidthDC()
        }}
        onChange={(event) => {
          handleChange({postal: event.target.value});
        }}
      />
      {errorMessage && <ErrorResult>{errorMessage}</ErrorResult>}
      {paymentMethod && <Result>Got PaymentMethod: {paymentMethod.id}</Result>}
      <hr />
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
            'Guardar tarjeta'
          )}
        </span>
      </Button>
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

const ErrorResult = ({children}) => <div className="error">{children}</div>;

const Result = ({children}) => <div className="result">{children}</div>;

const useDynamicFontSize = () => {
  const [fontSize, setFontSize] = useState(
    window.innerWidth < 450 ? '14px' : '16px'
  );

  useEffect(() => {
    const onResize = () => {
      setFontSize(window.innerWidth < 450 ? '14px' : '16px');
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return fontSize;
};

const useDynamicWidthCN = () => {
  const [widthCN, setFontSize] = useState(
    window.innerWidth < 450 ? '100%' : '300px'
  );

  useEffect(() => {
    const onResize = () => {
      setFontSize(window.innerWidth < 450 ? '100%' : '300px');
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return widthCN;
};

const useDynamicWidthDC = () => {
  const [widthDC, setFontSize] = useState(
    window.innerWidth < 450 ? '100%' : '100px'
  );

  useEffect(() => {
    const onResize = () => {
      setFontSize(window.innerWidth < 450 ? '100%' : '100px');
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return widthDC;
};

export default SubscribeForm;
