/* eslint-disable no-unused-vars */

import React, {useState, useEffect, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button} from '@components';
import 'moment/locale/es-do';
import AppContext from '@app/contexts/AppContext';
import * as AuthService from '@app/services/auth';
import * as Config from '@app/utils/config';
import './Subscription.css';

// Moment.globalLocale = 'es-do';

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

  function compareStatus(a, b) {
    console.log(a.status);
    if (a.status < b.status) {
      return -1;
    }
    if (a.status > b.status) {
      return 1;
    }
    return 0;
  }

  const getSubscriptions = () => {
    const fetchData = async () => {
      const {subscriptions} = await fetch(
        UrlBase.concat('subscriptions-by-status'),
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            customerId: AuthService.getProfileStripeId(),
            statusCode: 'active'
          })
        }
      ).then((r) => r.json());

      setSubscriptions(subscriptions.data.sort(compareStatus));
    };

    fetchData();
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  if (!subscriptions) {
    return null;
  }

  return (
    <>
      <div className="pt-1">
        {subscriptions.length === 0 ||
        subscriptions.filter((doc) => {
          return doc.status === 'active';
        })[0] === undefined ? (
          <Button
            type="link"
            theme="primary"
            onClick={handleAddNew}
            style={{width: '150px', height: '30px', paddingTop: 1}}
          >
            Planes de Servicio
          </Button>
        ) : (
          <div className="pt-2">
            Plan Actual:{' '}
            <Link
              to=""
              variant="contained"
              color="primary"
              onClick={handleAddNew}
            >
              <strong>
                {subscriptions[0]?.plan?.product?.name?.toUpperCase()}
              </strong>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Account;
