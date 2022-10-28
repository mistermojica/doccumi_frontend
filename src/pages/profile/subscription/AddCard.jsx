/* eslint-disable no-unused-vars */

import React, {useState, useContext, useEffect} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import AppContext from '@app/contexts/AppContext';
import AddCardForm from './AddCardForm';
import * as Config from '@app/utils/config';

const VITE_STRIPE_PUBLIC_KEY =
  window.location.hostname === 'localhost'
    ? import.meta.env.VITE_STRIPE_PUBLIC_KEY_DEV
    : import.meta.env.VITE_STRIPE_PUBLIC_KEY;

const stripePromise = loadStripe(VITE_STRIPE_PUBLIC_KEY);

const AddCard = (props) => {
  const AppCtx = useContext(AppContext);
  const {user} = props;

  // Get the lookup key for the price from the previous page redirect.
  // const [clientSecret, setClientSecret] = useState('');
  // const [price] = useState(AppCtx.Navigate.data.price);

  const NombreEntidad = 'Subscripciones';
  const NombreEntidadMin = NombreEntidad.toLowerCase();
  const [UrlBase] = useState(
    Config.gatDomainName().concat('/'.concat(NombreEntidadMin).concat('/'))
  );

  useEffect(() => {}, []);

  // if (!clientSecret || !subscriptionId) {
  //   return;
  // }

  return (
    <>
      <h5>
        <strong>Agrega un método de pago</strong>
      </h5>
      <hr />
      {
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({stripe, elements}) => (
              <AddCardForm stripe={stripe} elements={elements} user={user} />
            )}
          </ElementsConsumer>
        </Elements>
      }
    </>
  );
};

export default AddCard;
