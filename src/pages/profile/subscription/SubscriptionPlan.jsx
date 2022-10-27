/* eslint-disable no-unused-vars */

import React, {useState, useEffect, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button} from '@components';
import AppContext from '@app/contexts/AppContext';
import * as Config from '@app/utils/config';
import './Subscription.css';

const Account = (props) => {
  const AppCtx = useContext(AppContext);

  const navigate = useNavigate();

  const [subscriptions, setSubscriptions] = useState([]);

  const NombreEntidad = 'Subscripciones';
  const NombreEntidadMin = NombreEntidad.toLowerCase();
  const [UrlBase] = useState(
    Config.gatDomainName().concat('/'.concat(NombreEntidadMin).concat('/'))
  );

  const handleAddNew = (e) => {
    e.preventDefault();
    navigate('/profile?activetab=SUBSCRIPTION');
  };

  useEffect(() => {}, [subscriptions]);

  useEffect(() => {
    // console.log('useEffect() || AppCtx.StripeData:', AppCtx.StripeData);
  }, [AppCtx]);

  if (!AppCtx.StripeData.subscriptionsi) {
    return null;
  }

  return (
    <>
      <div className="pt-1">
        {AppCtx.StripeData.subscriptionsi.length === 0 ||
        AppCtx.StripeData.subscriptionsi.filter((doc) => {
          return doc.status === 'active';
        })[0] === undefined ? (
          <Button
            type="link"
            theme="primary"
            onClick={handleAddNew}
            style={{width: '150px', height: '35px', paddingTop: 4}}
          >
            Planes de Servicio
          </Button>
        ) : (
          <div className="pt-1">
            Plan Actual:{' '}
            <Link
              to=""
              variant="contained"
              color="primary"
              onClick={handleAddNew}
            >
              <strong>
                {AppCtx.StripeData.subscriptionsi[0]?.plan?.product?.name?.toUpperCase()}
              </strong>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Account;
