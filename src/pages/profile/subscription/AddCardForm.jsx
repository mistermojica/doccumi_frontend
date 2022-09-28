/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import React, {useEffect, useState, useContext, useRef} from 'react';
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

  const refName = useRef(null);
  const refPostal = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('inside handleSubmit');

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      console.log('!stripe || !elements');
      return;
    }

    setIsLoading(true);

    // what we had
    const cardNumber = elements.getElement(CardNumberElement);
    const cardExpiry = elements.getElement(CardExpiryElement);
    const cardCVC = elements.getElement(CardCvcElement);

    console.log({cardNumber});
    console.log({cardExpiry});
    console.log({cardCVC});

    console.log('refName:', refName.current.value);
    console.log('refPostal:', refPostal.current.value);

    /*
      Returns:
      result.paymentMethod: a PaymentMethod was created successfully.
      result.error: there was an error.
      */

    // PARA CREAR NUEVO METODO DE PAGO
    const {paymentMethod, error: paymentMethodError} =
      await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumber,
        billing_details: {
          name: refName.current.value
          // postal: refPostal.current.value
        }
      });

    if (paymentMethodError) {
      console.log({paymentMethodError});
    }

    console.log({paymentMethod});

    // updateSubscription({
    //   priceId: AppCtx.Navigate.data.price.id,
    //   subscriptionId: subscriptionId,
    //   customerId: user.profile.usuario_stripe
    // });

    const ctx = {
      paymentMethodId: paymentMethod.id,
      customerId: user.profile.usuario_stripe
    };

    console.log('handleSubmit ctx:', {ctx});

    const resultado = await createPaymentMethodToCustomer(ctx);

    console.log({resultado});

    AppCtx.setNavigate({
      to: 'account',
      data: {price: AppCtx.Navigate.data.price}
    });

    setIsLoading(false);
  };

  const createPaymentMethodToCustomer = (ctx) => {
    const fetchData = async () => {
      const {paymentMethod} = await fetch(
        UrlBase.concat('create-payment-method'),
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(ctx)
        }
      ).then((r) => r.json());

      return paymentMethod;

      // getPaymentMethods();
    };

    fetchData();
  };

  const handleBlur = () => {
    console.log('[blur]');
  };
  const handleChange = (e) => {
    console.log('[change]', e);
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

  useEffect(() => {}, []);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nombre en la tarjeta: </label>
      <br />
      <input
        id="name"
        ref={refName}
        required
        placeholder="Maria Pérez"
        defaultValue={name}
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
          onChange={handleChange}
          // onChange={logEvent('change')}
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
        ref={refPostal}
        required
        placeholder="12345"
        defaultValue={postal}
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
