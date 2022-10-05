/* eslint-disable no-unused-vars */

import React, {useState, useEffect, useContext} from 'react';
import {Button} from '@components';
import * as moment from 'moment';
import 'moment-timezone';
import AppContext from '@app/contexts/AppContext';
import * as Config from '@app/utils/config';
import './Subscription.css';

const Cancel = () => {
  const AppCtx = useContext(AppContext);

  const [cancelled, setCancelled] = useState(false);
  const [interval, setInterval] = useState('');
  const [subscription, setSubscription] = useState(
    AppCtx.Navigate.data.subscription
  );

  const NombreEntidad = 'Subscripciones';
  const NombreEntidadMin = NombreEntidad.toLowerCase();
  const [UrlBase] = useState(
    Config.gatDomainName().concat('/'.concat(NombreEntidadMin).concat('/'))
  );

  const handleBack = async () => {
    AppCtx.setNavigate({to: 'account', data: {}});
  };

  const handleCancel = async (e) => {
    e.preventDefault();

    await fetch(UrlBase.concat('cancel-subscription'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subscriptionId: AppCtx.Navigate.data.subscription.id
      })
    });

    setCancelled(true);
    AppCtx.setNavigate({to: 'account', data: {}});
  };

  useEffect(() => {
    let inter = '';

    if (subscription?.items?.data[0]?.plan?.interval === 'month') {
      if (subscription?.items?.data[0]?.plan?.interval_count === 1) {
        inter = 'mes';
      } else {
        inter = 'meses';
      }
    } else if (subscription?.items?.data[0]?.plan?.interval === 'year') {
      if (subscription?.items?.data[0]?.plan?.interval_count === 1) {
        inter = 'año';
      } else {
        inter = 'años';
      }
    }

    setInterval(inter);
  }, []);

  if (cancelled) {
    return null;
  }

  return (
    <>
      <div>
        <div>
          <h4>Cancela tu Plan</h4>
          <hr />
          <h5>PLAN ACTUAL</h5>
          <hr />
          <div className="form-group row">
            <div className="col-md-12">
              <h5>
                <strong>{subscription?.plan?.product?.name}</strong>
              </h5>
              <br />
              <strong>
                {subscription?.items?.data[0]?.plan?.currency.toUpperCase()}$
                {subscription?.items?.data[0]?.plan?.amount / 100}
              </strong>{' '}
              por{' '}
              <strong>
                {subscription?.items?.data[0]?.plan?.interval_count}{' '}
              </strong>
              {interval}
              .
              <br />
              <br />
              Se cancelará tu plan, pero seguirá disponible hasta el cierre del
              período de facturación en:{' '}
              <strong>
                {moment(
                  new Date(subscription?.current_period_end * 1000).toString()
                )
                  .add(1, 'd')
                  .format('LL')}
              </strong>
              .
              <br />
              <br />
              Si cambias de idea, puedes renovar la suscripción.
              <br />
              <br />
              Estado subscripción:{' '}
              <strong>
                {subscription && subscription?.status === 'active'
                  ? 'Activo'
                  : 'Inactivo'}
              </strong>
              .
              <br />
              <br />
              <Button
                type="button"
                theme="danger"
                onClick={handleCancel}
                style={{width: '200px', height: '50px'}}
                // onClick={() => createSubscription(price.id)}
              >
                Cancelar plan
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cancel;
