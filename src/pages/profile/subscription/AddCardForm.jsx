/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import React, {useEffect, useState, useContext, useRef} from 'react';
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
  const {user} = props;

  const [isLoading, setIsLoading] = useState(false);

  const NombreEntidad = 'Subscripciones';
  const NombreEntidadMin = NombreEntidad.toLowerCase();
  const [UrlBase] = useState(
    Config.gatDomainName().concat('/'.concat(NombreEntidadMin).concat('/'))
  );

  const [name, setName] = useState('');
  const [postal, setPostal] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null);

  const refName = useRef(null);
  const refPostal = useRef(null);
  const refMakeDefault = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    // what we had
    const cardNumber = elements.getElement(CardNumberElement);
    const cardExpiry = elements.getElement(CardExpiryElement);
    const cardCVC = elements.getElement(CardCvcElement);

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

    const ctx = {
      paymentMethodId: paymentMethod.id,
      customerId: user.profile.usuario_stripe,
      makeDefault: refMakeDefault.current.checked
    };

    console.log({ctx});

    const resultado = createPaymentMethodToCustomer(ctx)
      .then((result) => {
        console.log({result});
        AppCtx.setNavigate({
          to: 'account',
          data: {price: AppCtx.Navigate.data.price}
        });
      })
      .catch((error) => {
        console.log({error});
        setErrorMessage(error.message);
      });

    console.log({resultado});

    setIsLoading(false);
  };

  const createPaymentMethodToCustomer = (ctx) => {
    const promise = new Promise((resolve, reject) => {
      const fetchData = async () => {
        const {paymentMethod} = await fetch(
          UrlBase.concat('create-payment-method'),
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(ctx)
          }
        ).then((r) => r.json());

        resolve(paymentMethod);
      };

      fetchData();
    });

    return promise;
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
      <div
        className="container float-left"
        style={{
          width: useDynamicWidthContainer()
        }}
      >
        <div className="row">
          <div className="col-12">
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
                border: '1px solid #333',
                fontSize: useDynamicFontSize(),
                color: '#424770',
                letterSpacing: '0.025em',
                fontFamily: 'Source Code Pro, monospace',
                '::placeholder': {
                  color: '#aab7c4'
                },
                width: useDynamicWidthCN()
              }}
              onChange={handleChange}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-12">
            <label htmlFor="cardNumber">Número de Tarjeta:</label>
            <div
              style={{
                height: '30px',
                padding: '5px',
                border: '1px solid #333',
                width: useDynamicWidthCN()
              }}
            >
              <CardNumberElement
                id="cardNumber"
                onBlur={logEvent('blur')}
                onChange={handleChange}
                onFocus={logEvent('focus')}
                onReady={logEvent('ready')}
                options={ELEMENT_OPTIONS}
              />
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-6">
            <label htmlFor="expiry">Vencimiento:</label>
            <div
              style={{
                height: '30px',
                padding: '5px',
                border: '1px solid #333',
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
          </div>
          <div className="col-6">
            <label htmlFor="cvc">CVC:</label>
            <div
              style={{
                height: '30px',
                padding: '5px',
                border: '1px solid #333',
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
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-12">
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
                border: '1px solid #333',
                fontSize: useDynamicFontSize(),
                color: '#424770',
                letterSpacing: '0.025em',
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
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-12">
            <small>
              Al suministrar tus datos de tarjeta, le permites a DOCCUMI
              efectuar futuros cargos en tu tarjeta conforme a las condiciones
              estipuladas.
            </small>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-12">
            {errorMessage && <ErrorResult>{errorMessage}</ErrorResult>}
            {/* {paymentMethod && (
              <Result>Método de pago obtenido: {paymentMethod.id}</Result>
            )} */}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                ref={refMakeDefault}
                // onChange={handleChange}
                name="makeDefault"
                id="makeDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Usar como método de pago predeterminado
              </label>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-12">
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
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-12">
            <p>
              Try the successful test card: <span>4242424242424242</span>.
            </p>
            <p>
              Try the test card that requires SCA: <span>4000002500003155</span>
              .
            </p>
            <p>
              Use any <i>future</i> expiry date, CVC,5 digit postal code
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

const ErrorResult = ({children}) => <div className="error">{children}</div>;

const Result = ({children}) => <div className="result">{children}</div>;

const useDynamicFontSize = () => {
  const [fontSize, setFontSize] = useState(
    window.innerWidth < 450 ? '14px' : '18px'
  );

  useEffect(() => {
    const onResize = () => {
      setFontSize(window.innerWidth < 450 ? '14px' : '17px');
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return fontSize;
};

const useDynamicWidthContainer = () => {
  const [widthCN, setFontSize] = useState(
    window.innerWidth < 450 ? '75%' : '405px'
  );

  useEffect(() => {
    const onResize = () => {
      setFontSize(window.innerWidth < 450 ? '75%' : '405px');
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return widthCN;
};

const useDynamicWidthCN = () => {
  const [widthCN, setFontSize] = useState(
    window.innerWidth < 450 ? '50%' : '405px'
  );

  useEffect(() => {
    const onResize = () => {
      setFontSize(window.innerWidth < 450 ? '50%' : '405px');
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
    window.innerWidth < 450 ? '100%' : '199px'
  );

  useEffect(() => {
    const onResize = () => {
      setFontSize(window.innerWidth < 450 ? '100%' : '199px');
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return widthDC;
};

export default SubscribeForm;
