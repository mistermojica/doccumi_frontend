/* eslint-disable no-unused-vars */

import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '@components';
import CheckIcon from '@mui/icons-material/Check';
// @ts-ignore
import AppContext from '@app/contexts/AppContext';

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

  // const navigate = useNavigate();

  useEffect(() => {
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
    getInvoicePreview();
  }, []);

  useEffect(() => {
    console.log({invoicePreview});
    console.log({defaultPaymentMethod});
  }, [invoicePreview]);

  const getInvoicePreview = async () => {
    const {invoice} = await fetch('http://localhost:8004/invoice-preview', {
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

    console.log({invoice});

    setInvoicePreview(invoice);
  };

  const setNavigateTo = (price) => {
    AppCtx.setNavigate({
      to: 'subscribe',
      data: {price}
    });
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
        <strong>Confirma tu nuevo plan:</strong>
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
            <div className="form-group row">
              <div className="col-md-10">
                <p>
                  Lo que pagarás por{' '}
                  <strong>{price?.recurring?.interval_count} </strong>
                  {interval} a partir del{' '}
                  {new Date(
                    parseFloat(
                      invoicePreview?.lines?.data[0]?.period?.end
                        ?.toString()
                        ?.concat('000')
                    )
                  ).toLocaleDateString('es-DO')}
                  <br />
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
            <div className="form-group row">
              <div className="col-md-10">
                <p>Importe adeudado: hoy</p>
              </div>
              <div className="col-md-2 text-right">
                <strong>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(invoicePreview.amount_remaining / 100)}
                </strong>
              </div>
            </div>
            <hr />
            <div className="form-group row">
              <div className="col-md-10">Pagar con tarjeta:</div>
              <div className="col-md-2">
                {defaultPaymentMethod?.card?.brand.toUpperCase()} ....{' '}
                {defaultPaymentMethod?.card?.last4}
              </div>
              <hr />
            </div>
            <div className="form-group row">
              <div className="col-md-12 text-center">
                {price.id !== currentPriceId ? (
                  <Button
                    type="button"
                    theme={
                      price.id === currentPriceId ? 'secondary' : 'primary'
                    }
                    disabled={price.id === currentPriceId}
                    onClick={() => setNavigateTo(price)}
                  >
                    Confirmar
                  </Button>
                ) : (
                  <>
                    <CheckIcon />
                    &nbsp;
                    <span>Plan actual</span>
                  </>
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
