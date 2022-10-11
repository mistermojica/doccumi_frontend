/* eslint-disable no-unused-vars */

import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '@components';
import CheckIcon from '@mui/icons-material/Check';
import Collapse from 'react-bootstrap/Collapse';
// @ts-ignore
import AppContext from '@app/contexts/AppContext';
import * as Config from '@app/utils/config';

const ConfirmPrice = (props) => {
  const AppCtx = useContext(AppContext);
  const {user} = props;

  const [price] = useState(AppCtx.Navigate.data.price);
  const [subscription] = useState(AppCtx.Navigate.data.subscription);
  const [defaultPaymentMethod] = useState(
    AppCtx.Navigate.data.defaultPaymentMethod
  );
  const [currentPriceId, setCurrentPriceId] = useState('');
  const [invoicePreview, setInvoicePreview] = useState({});
  const [interval, setInterval] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [clientSecret, setClientSecret] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');

  const NombreEntidad = 'Subscripciones';
  const NombreEntidadMin = NombreEntidad.toLowerCase();
  const [UrlBase] = useState(
    Config.gatDomainName().concat('/'.concat(NombreEntidadMin).concat('/'))
  );

  // const navigate = useNavigate();

  useEffect(() => {
    if (price) {
      console.log({clientSecret, price});
      createSubscription();
    }

    let inter = '';

    if (price?.recurring?.interval === 'month') {
      if (price?.recurring?.interval_count === 1) {
        inter = 'mes';
      } else {
        inter = 'meses';
      }
    } else if (price?.recurring?.interval === 'year') {
      if (price?.recurring?.interval_count === 1) {
        inter = 'año';
      } else {
        inter = 'años';
      }
    }

    setInterval(inter);
    if (subscription && price) {
      getInvoicePreview();
    }
  }, []);

  useEffect(() => {
    console.log({invoicePreview});
    console.log({defaultPaymentMethod});
  }, [invoicePreview]);

  const getInvoicePreview = async () => {
    const {invoice} = await fetch(UrlBase.concat('invoice-preview'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subscriptionId: subscription.id,
        priceId: price.id,
        customerId: user.profile.usuario_stripe
      })
    }).then((r) => r.json());

    setInvoicePreview(invoice);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({subscriptionId});

    updateSubscription({
      priceId: price.id,
      subscriptionId: subscriptionId,
      customerId: user.profile.usuario_stripe
    });
  };

  const handleBack = async () => {
    AppCtx.setNavigate({to: 'account', data: {}});
  };

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
  };

  const updateSubscription = (ctx) => {
    setIsLoading(true);

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

      setIsLoading(false);

      AppCtx.loadStripeInit().then((resLSI) => {
        console.log({resLSI});
        AppCtx.setNavigate({
          to: 'account',
          data: {price}
        });
      });
    };

    fetchData();
  };

  // const setNavigateTo = (price) => {
  //   AppCtx.setNavigate({
  //     to: 'subscribe',
  //     data: {price}
  //   });
  // };

  const handleShowHideDetails = (e) => {
    e.preventDefault();
    setShowDetails(!showDetails);
  };

  // if (subscriptionData) {
  //   // navigate('/subscribe', subscriptionData);
  //   AppCtx.setNavigate({to: 'subscribe', data: subscriptionData});
  //   // return <Redirect to={{
  //   //   pathname: '/subscribe',
  //   //   state: subscriptionData
  //   // }} />
  // }

  function createMarkup(texto, busqueda, reemplazo) {
    return {__html: texto?.replaceAll(busqueda, reemplazo)};
  }

  return (
    <div>
      <h4>
        <strong>Confirma tu nuevo plan</strong>
      </h4>
      <br />
      NUEVO PLAN:
      <hr />
      <div>
        {price && interval && invoicePreview && (
          <div key={price.id}>
            <h5 className="text-left">
              <strong>{price.product.name}</strong>
            </h5>
            <div
              dangerouslySetInnerHTML={createMarkup(
                price.product.description,
                '- ',
                '<br/>⦿ '
              )}
            />
            <br />
            <div className="row">
              <div className="col-md-10">
                <p>
                  Lo que pagarás por{' '}
                  <strong>{price?.recurring?.interval_count} </strong>
                  {interval} a partir del{' '}
                  {invoicePreview?.lines !== undefined
                    ? new Date(
                        parseFloat(
                          invoicePreview?.lines?.data[0]?.period?.end
                            ?.toString()
                            ?.concat('000')
                        )
                      ).toLocaleDateString('es-DO')
                    : new Date().toLocaleDateString('es-DO')}
                </p>
              </div>
              <div className="col-md-2 text-right">
                <strong>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(price.unit_amount / 100)}
                </strong>
              </div>
            </div>
            <hr />
            {invoicePreview?.lines !== undefined ? (
              <>
                <Collapse in={showDetails}>
                  <div
                    id="collapse-details"
                    className="pl-2 pr-2 mb-3 pt-3 pb-1 border rounded bg-light align-middle"
                  >
                    <div className="row">
                      <div className="col-md-10">
                        <p>Crédito prorrateado del plan anterior:</p>
                      </div>
                      <div className="col-md-2 text-right">
                        <strong>
                          <strong>
                            {invoicePreview?.lines !== undefined
                              ? new Intl.NumberFormat('en-US', {
                                  style: 'currency',
                                  currency: 'USD'
                                }).format(
                                  invoicePreview?.lines?.data[0]?.amount / 100
                                )
                              : '$0.00'}
                          </strong>
                        </strong>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-10">
                        <p>Cargo prorrateado del plan {price.product.name}:</p>
                      </div>
                      <div className="col-md-2 text-right">
                        <strong>
                          {invoicePreview?.lines !== undefined
                            ? new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                              }).format(
                                invoicePreview?.lines?.data[1]?.plan?.amount /
                                  100
                              )
                            : '$0.00'}
                        </strong>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-10">
                        <p>
                          <strong>Total</strong>
                        </p>
                      </div>
                      <div className="col-md-2 text-right">
                        <strong>
                          {invoicePreview?.lines !== undefined
                            ? new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                              }).format(invoicePreview.amount_remaining / 100)
                            : '$0.00'}
                        </strong>
                      </div>
                    </div>
                  </div>
                </Collapse>

                <div className="row">
                  {/* Pagar con tarjeta: */}
                  <div className="col-md-10">
                    <p>Importe adeudado: hoy</p>
                  </div>
                  <div className="col-md-2 text-right">
                    <strong>
                      {invoicePreview?.lines !== undefined
                        ? new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                          }).format(invoicePreview.amount_remaining / 100)
                        : new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                          }).format(price.unit_amount / 100)}
                    </strong>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-10">
                    <a
                      // type="button"
                      href="#"
                      aria-controls="collapse-details"
                      aria-expanded={showDetails}
                      onClick={handleShowHideDetails}
                    >
                      Ver detalles
                    </a>
                  </div>
                  <div className="col-md-2 text-right">
                    {defaultPaymentMethod?.card?.brand.toUpperCase()} ....{' '}
                    {defaultPaymentMethod?.card?.last4}
                  </div>
                </div>
                <hr />
              </>
            ) : null}
            <div className="form-group row">
              <div className="col-md-12 text-center">
                {subscriptionId && price.id !== currentPriceId ? (
                  <>
                    <Button
                      id="submit"
                      onClick={handleSubmit}
                      theme="primary"
                      disabled={isLoading}
                      style={{width: '200px', height: '50px'}}
                    >
                      <span id="button-text">
                        {isLoading ? (
                          <div className="spinner" id="spinner"></div>
                        ) : (
                          'Confirmar'
                        )}
                      </span>
                    </Button>
                    <br />
                    <br />
                    <Button
                      type="button"
                      theme="secondary"
                      onClick={handleBack}
                      style={{width: '200px', height: '50px'}}
                    >
                      Volver
                    </Button>
                  </>
                ) : (
                  <></>
                  // <Button
                  //   type="button"
                  //   theme={
                  //     price.id === currentPriceId ? 'secondary' : 'primary'
                  //   }
                  //   disabled={price.id === currentPriceId}
                  //   onClick={() => setNavigateTo(price)}
                  // >
                  //   Confirmar
                  // </Button>
                  // <>
                  //   <CheckIcon />
                  //   &nbsp;
                  //   <span>Plan actual</span>
                  // </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmPrice;
