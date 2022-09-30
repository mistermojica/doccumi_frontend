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

  const [price, nFrom, nTo] = useState(AppCtx.Navigate.data);

  const [isLoading, setIsLoading] = useState(false);

  const NombreEntidad = 'Subscripciones';
  const NombreEntidadMin = NombreEntidad.toLowerCase();
  const [UrlBase] = useState(
    Config.gatDomainName().concat('/'.concat(NombreEntidadMin).concat('/'))
  );

  const [name, setName] = useState('');
  const [postal, setPostal] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentMethodError, setPaymentMethodError] = useState(null);

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
    const {paymentMethod, error: pmError} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumber,
      billing_details: {
        name: refName.current.value
        // postal: refPostal.current.value
      }
    });

    if (pmError) {
      setPaymentMethodError(pmError);
      console.log({pmError});
    } else {
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
    }

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

  // const logEvent = (name) => (event) => {
  //   console.log(`[${name}]`, event);
  // };

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

  useEffect(() => {
    // console.log(JSON.stringify({nFrom, nTo}));

    if (
      paymentMethodError &&
      online_payment_error_codes[paymentMethodError?.code] !== undefined
    ) {
      setErrorMessage(online_payment_error_codes[paymentMethodError?.code]);
    } else {
      if (paymentMethodError) {
        setErrorMessage(
          'Ha ocurrido un error inesperado al registrar este método de pago. Por favor revise los datos y vuelva a intentarlo.'
        );
      }
    }
  }, [paymentMethodError]);

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
              // onChange={handleChange}
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
                // onBlur={logEvent('blur')}
                // onChange={handleChange}
                // onFocus={logEvent('focus')}
                // onReady={logEvent('ready')}
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
                // onChange={logEvent('change')}
                // onBlur={logEvent('blur')}
                // onFocus={logEvent('focus')}
                // onReady={logEvent('ready')}
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
                // onBlur={logEvent('blur')}
                // onChange={logEvent('change')}
                // onFocus={logEvent('focus')}
                // onReady={logEvent('ready')}
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
              // onChange={(event) => {
              //   handleChange({postal: event.target.value});
              // }}
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
            {/* {<ErrorResult>{errorMessage}</ErrorResult>} */}
            {errorMessage && <ErrorResult>{errorMessage}</ErrorResult>}
            {/* {paymentMethod && (
              <Result>Método de pago obtenido: {paymentMethod.id}</Result>
            )} */}
          </div>
        </div>
        {/* <div className="row">
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
        </div> */}
      </div>
    </form>
  );
};

const ErrorResult = ({children}) => (
  <div className="text-danger">{children}</div>
);

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

const online_payment_error_codes = {
  account_already_exists:
    'La dirección de correo electrónico proporcionada para la creación de una cuenta diferida ya tiene una cuenta asociada. Utilice el flujo de OAuth para conectar la cuenta existente a su plataforma.',
  account_country_invalid_address:
    'El país de la dirección comercial proporcionada no coincide con el país de la cuenta. Las empresas deben estar ubicadas en el mismo país que la cuenta',
  account_invalid:
    'La ID de cuenta provista como un valor para el encabezado Stripe-Account no es válida. Verifique que sus solicitudes especifiquen una ID de cuenta válida.',
  account_number_invalid:
    'El número de cuenta bancaria proporcionado no es válido (p. ej, faltan dígitos). La información de la cuenta bancaria varía de un país a otro. Recomendamos crear validaciones en sus formularios de entrada según los formatos de cuenta bancaria que proporcionamos',
  alipay_upgrade_required:
    'Este método para crear pagos de Alipay ya no es compatible. Actualice su integración para usar Fuentes en su lugar',
  cantidad_demasiado_grande:
    'La cantidad especificada es mayor que la cantidad máxima permitida. Usa una cantidad menor y vuelve a intentarlo.',
  cantidad_demasiado_pequeña:
    'La cantidad especificada es menor que la cantidad mínima permitida. Usa una cantidad mayor e inténtalo de nuevo.',
  api_key_expired:
    'La clave de API proporcionada ha caducado. Obtenga sus claves de API actuales del panel y actualice su integración para usarlas.',
  balance_insuficiente:
    'No se pudo completar la transferencia o el pago porque la cuenta asociada no tiene suficiente saldo disponible. Cree una nueva transferencia o pago usando un monto menor o igual al saldo disponible de la cuenta.',
  bank_account_exists:
    'La cuenta bancaria provista ya existe en el objeto Cliente especificado. Si la cuenta bancaria también debe adjuntarse a un cliente diferente, incluya la ID de cliente correcta cuando vuelva a realizar la solicitud.',
  bank_account_unusable:
    'La cuenta bancaria proporcionada no se puede usar para pagos. Se debe usar una cuenta bancaria diferente.',
  bank_account_unverified:
    'Su plataforma Connect está intentando compartir una cuenta bancaria no verificada con una cuenta conectada.',
  bitcoin_upgrade_required:
    'Este método para crear pagos de Bitcoin ya no es compatible. Actualice su integración para usar Fuentes en su lugar',
  card_declined:
    'La tarjeta ha sido rechazada. Cuando se rechaza una tarjeta, el error devuelto también incluye el atributo declin_code con el motivo por el cual se rechazó la tarjeta. Consulte nuestra documentación de códigos de rechazo para obtener más información',
  charge_already_captured:
    'El cargo que intenta capturar ya ha sido capturado. Actualice la solicitud con una ID de cargo no capturada.',
  charge_already_refunded:
    'El cargo que intentas reembolsar ya ha sido reembolsado. Actualiza la solicitud para usar la identificación de un cargo que no ha sido reembolsado.',
  charge_disputed:
    'El cargo que está intentando reembolsar ha sido devuelto. Consulte la documentación de disputas para saber cómo responder a la disputa.',
  charge_exceeds_source_limit:
    'Este cargo haría que excediera su límite de procesamiento de ventana móvil para este tipo de fuente. Vuelva a intentar el cargo más tarde o comuníquese con nosotros para solicitar un límite de procesamiento más alto',
  charge_expired_for_capture:
    'El cargo no se puede capturar porque la autorización ha expirado. Los cargos de autenticación y captura deben capturarse dentro de los siete días.',
  country_unsupported:
    'Su plataforma intentó crear una cuenta personalizada en un país que aún no es compatible. Asegúrese de que los usuarios solo puedan registrarse en países admitidos por cuentas personalizadas',
  coupon_expired:
    'El cupón proporcionado para una suscripción o pedido ha caducado. Cree un nuevo cupón o use uno existente que sea válido.',
  customer_max_subscriptions:
    'Se alcanzó el número máximo de suscripciones para un cliente. Contáctenos si recibe este error.',
  email_invalid:
    'La dirección de correo electrónico no es válida (p. ej, no tiene el formato correcto). Verifique que la dirección de correo electrónico tenga el formato correcto y solo incluya caracteres permitidos.',
  expired_card:
    'La tarjeta ha caducado. Verifique la fecha de vencimiento o use una tarjeta diferente.',
  idempotency_key_in_use:
    'La clave de idempotencia proporcionada se está utilizando actualmente en otra solicitud. Esto ocurre si su integración está realizando solicitudes duplicadas simultáneamente.',
  correct_address:
    'La dirección de la tarjeta es incorrecta. Verifique la dirección de la tarjeta o use una tarjeta diferente.',
  incorrecta_cvc:
    'El código de seguridad de la tarjeta es incorrecto. Verifique el código de seguridad de la tarjeta o use una tarjeta diferente.',
  correct_number:
    'El número de tarjeta es incorrecto. Verifique el número de tarjeta o use una tarjeta diferente.',
  correct_zip:
    'El código postal de la tarjeta es incorrecto. Verifique el código postal de la tarjeta o use una tarjeta diferente.',
  instant_payouts_unsupported:
    'La tarjeta de débito proporcionada como cuenta externa no admite pagos instantáneos. Proporcione otra tarjeta de débito o use una cuenta bancaria en su lugar.',
  invalid_card_type:
    'La tarjeta provista como cuenta externa no es una tarjeta de débito. Proporcione una tarjeta de débito o use una cuenta bancaria en su lugar.',
  invalid_charge_amount:
    'El monto especificado no es válido. El monto del cargo debe ser un número entero positivo en la unidad monetaria más pequeña y no exceder el monto mínimo o máximo',
  invalid_cvc:
    'El código de seguridad de la tarjeta no es válido. Verifique el código de seguridad de la tarjeta o use una tarjeta diferente.',
  invalid_expiry_month:
    'El mes de vencimiento de la tarjeta es incorrecto. Verifique la fecha de vencimiento o use una tarjeta diferente.',
  invalid_expiry_year_past:
    'El año de vencimiento de la tarjeta es incorrecto. Verifique la fecha de vencimiento o use una tarjeta diferente.',
  invalid_number:
    'El número de tarjeta no es válido. Verifique los detalles de la tarjeta o use una tarjeta diferente.',
  incorrect_number:
    'El número de tarjeta no es válido. Verifique los detalles de la tarjeta o use una tarjeta diferente.',
  invalid_source_usage:
    'La fuente no se puede usar porque no está en el estado correcto (por ejemplo, una solicitud de cargo está tratando de usar una fuente con una fuente pendiente, fallida o consumida). Verifique el estado de la fuente que está intentando usar .',
  bill_no_customer_line_items:
    'No se puede generar una factura para el cliente especificado ya que no hay elementos de factura pendientes. Verifique que se haya especificado el cliente correcto o cree primero los elementos de factura necesarios.',
  bill_no_subscription_line_items:
    'No se puede generar una factura para la suscripción especificada ya que no hay elementos de factura pendientes. Verifique que se haya especificado la suscripción correcta o cree primero los elementos de factura necesarios.',
  factura_not_editable:
    'La factura especificada ya no se puede editar. En su lugar, considere crear elementos de factura adicionales que se aplicarán a la próxima factura. Puede generar manualmente la próxima factura o esperar a que se genere automáticamente al final de la facturación ciclo.',
  bill_upcoming_none:
    'No hay una próxima factura en el cliente especificado para obtener una vista previa. Solo los clientes con suscripciones activas o elementos de facturas pendientes tienen facturas que se pueden obtener una vista previa',
  livemode_mismatch:
    'Las claves API, las solicitudes y los objetos en modo de prueba y en vivo solo están disponibles dentro del modo en el que se encuentran.',
  faltante:
    'Se proporcionó un ID de cliente y fuente, pero la fuente no se guardó para el cliente. Para crear un cargo para un cliente con una fuente específica, primero debe guardar los detalles de la tarjeta',
  not_allowed_on_standard_account:
    'No se permiten transferencias ni pagos en nombre de una cuenta estándar conectada.',
  order_creation_failed:
    'No se pudo crear el pedido. Verifique los detalles del pedido y vuelva a intentarlo.',
  order_required_settings:
    'No se pudo procesar el pedido porque falta la información requerida. Verifique la información provista e intente nuevamente.',
  order_status_invalid:
    'El pedido no se puede actualizar porque el estado proporcionado no es válido o no sigue el ciclo de vida del pedido (por ejemplo, un pedido no puede pasar de creado a cumplido sin pasar primero a pagado).',
  order_upstream_timeout:
    'Se agotó el tiempo de espera de la solicitud. Vuelve a intentarlo más tarde.',
  out_of_inventory:
    'El SKU está agotado. Si hay más existencias disponibles, actualice la cantidad de inventario del SKU y vuelva a intentarlo',
  parámetro_invalid_empty:
    'No se proporcionaron uno o más valores requeridos. Asegúrese de que las solicitudes incluyan todos los parámetros requeridos.',
  parámetro_invalid_integer:
    'Uno o más de los parámetros requieren un número entero, pero los valores proporcionados eran de un tipo diferente. Asegúrese de que solo se proporcionen valores admitidos para cada atributo. Consulte la documentación de nuestra API para buscar el tipo de datos que admite cada atributo. ',
  parámetro_invalid_string_blank:
    'Uno o más valores provistos solo incluyeron espacios en blanco. Verifique los valores en su solicitud y actualice cualquiera que contenga solo espacios en blanco.',
  parámetro_invalid_string_empty:
    'Uno o más valores de cadena obligatorios están vacíos. Asegúrese de que los valores de cadena contengan al menos un carácter.',
  parámetro_missing:
    'Faltan uno o más valores obligatorios. Consulte nuestra documentación de API para ver qué valores se requieren para crear o modificar el recurso especificado.',
  parámetro_unknown:
    'La solicitud contiene uno o más parámetros inesperados. Elimínelos y vuelva a intentarlo.',
  parámetros_exclusivo:
    'Se proporcionaron dos o más parámetros que se excluyen mutuamente. Consulte la documentación de nuestra API o el mensaje de error devuelto para ver qué valores se permiten al crear o modificar el recurso especificado.',
  payment_intent_authentication_failure:
    'La fuente proporcionada falló en la autenticación. Proporcione source_data o una nueva fuente para intentar cumplir con este PaymentIntent nuevamente',
  payment_intent_incompatible_payment_method:
    'El PaymentIntent esperaba un método de pago con propiedades diferentes a las proporcionadas.',
  payment_intent_invalid_parameter:
    'Uno o más de los parámetros proporcionados no se permitieron para la operación dada en PaymentIntent. Verifique nuestra referencia de API o el mensaje de error devuelto para ver qué valores no eran correctos para ese PaymentIntent',
  payment_intent_payment_attempt_failed:
    'El último intento de pago para PaymentIntent ha fallado. Verifique la propiedad last_payment_error en PaymentIntent para obtener más detalles y proporcione source_data o una nueva fuente para intentar completar este PaymentIntent nuevamente',
  payment_intent_unexpected_state:
    'El estado de PaymentIntent era incompatible con la operación que intentabas realizar.',
  payment_method_unactivated:
    'No se puede crear el cargo porque el método de pago utilizado no se ha activado. Activa el método de pago en el Tablero, luego inténtalo de nuevo.',
  payment_method_unexpected_state:
    'El estado del método de pago proporcionado no era compatible con la operación que intentabas realizar. Confirma que el método de pago está en un estado permitido para la operación dada antes de intentar realizarla.',
  payouts_not_allowed:
    'Los pagos se han deshabilitado en la cuenta conectada. Verifique el estado de la cuenta conectada para ver si se necesita proporcionar información adicional o si los pagos se han deshabilitado por algún otro motivo.',
  platform_api_key_expired:
    'La clave de API proporcionada por su plataforma Connect ha caducado. Esto ocurre si su plataforma ha generado una nueva clave o si la cuenta conectada se ha desconectado de la plataforma. Obtenga sus claves de API actuales del panel y actualice su integración, o comunicarse con el usuario y volver a conectar la cuenta.',
  postal_code_invalid: 'El código postal proporcionado es incorrecto.',
  processing_error:
    'Ocurrió un error al procesar la tarjeta. Verifique que los detalles de la tarjeta sean correctos o use una tarjeta diferente.',
  product_inactive:
    'El producto al que pertenece este SKU ya no está disponible para su compra.',
  rate_limit:
    'Demasiadas solicitudes llegan a la API demasiado rápido. Recomendamos una reducción exponencial de sus solicitudes.',
  resource_already_exists:
    'Ya existe un recurso con una ID especificada por el usuario (p. ej, plan o cupón). Use un valor diferente y único para la ID e intente nuevamente.',
  resource_missing:
    'La ID proporcionada no es válida. El recurso no existe o se proporcionó una ID para un recurso diferente.',
  routing_number_invalid:
    'El número de ruta bancaria proporcionado no es válido.',
  secret_key_required:
    'La clave de API provista es una clave publicable, pero se requiere una clave secreta. Obtenga sus claves de API actuales del Tablero y actualice su integración para usarlas.',
  sepa_unsupported_account: 'Su cuenta no admite pagos SEPA.',
  shipping_calculation_failed:
    'El cálculo del envío falló porque la información proporcionada era incorrecta o no se pudo verificar.',
  sku_inactive:
    'El SKU está inactivo y ya no está disponible para la compra. Use un SKU diferente o vuelva a activar el SKU actual.',
  state_unsupported:
    'Ocurre cuando se proporciona la información de la entidad legal para una cuenta personalizada de EE. UU, si el estado proporcionado no es compatible. (Esto es principalmente estados y territorios asociados)',
  tax_id_invalid:
    'El número de identificación fiscal proporcionado no es válido (p. ej, faltan dígitos). La información de identificación fiscal varía de un país a otro, pero debe tener al menos nueve dígitos.',
  tax_calculation_failed: 'Error en el cálculo de impuestos para el pedido.',
  testmode_charges_only:
    'Su cuenta no ha sido activada y solo puede realizar cargos de prueba. Active su cuenta en el Tablero para comenzar a procesar cargos en vivo.',
  tls_version_unsupported:
    'Su integración utiliza una versión anterior de TLS que no es compatible. Debe utilizar TLS 1.2 o superior.',
  token_already_used:
    'El token provisto ya se usó. Debe crear un nuevo token antes de poder volver a intentar esta solicitud',
  token_in_use:
    'El token provisto se está utilizando actualmente en otra solicitud. Esto ocurre si su integración está realizando solicitudes duplicadas simultáneamente',
  transfers_not_allowed:
    'No se puede crear la transferencia solicitada. Contáctenos si recibe este error.',
  upstream_order_creation_failed:
    'No se pudo crear el pedido. Verifique los detalles del pedido y vuelva a intentarlo.',
  url_invalid: 'La URL proporcionada no es válida'
};

export default SubscribeForm;
