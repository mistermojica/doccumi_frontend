/* eslint-disable no-unused-vars */

import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '@components';
import axios from 'axios';
// @ts-ignore
import AppContext from '@app/contexts/AppContext';
// import {Redirect} from 'react-router-dom';

const Prices = () => {
  const AppCtx = useContext(AppContext);

  const [prices, setPrices] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState(null);

  // const navigate = useNavigate();

  const getPrices = () => {
    const url = 'http://localhost:8000/configuraciones/config';
    axios
      .get(url)
      .then((response) => {
        const {prices} = response.data;
        console.log('prices:', prices);
        setPrices(prices);
      })
      .catch((err) => {
        console.log('err:', err);
      });
  };

  useEffect(() => {
    getPrices();
    // const fetchPrices = async () => {
    //   const {prices} = await fetch('http://localhost:8004/config').then((r) =>
    //     r.json()
    //   );
    //   setPrices(prices);
    // };
    // fetchPrices();
  }, []);

  const createSubscription = async (priceId) => {
    const {subscriptionId, clientSecret} = await fetch(
      'http://localhost:8004/create-subscription',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          priceId
        })
      }
    ).then((r) => r.json());

    AppCtx.setNavigate({to: 'subscribe', data: {subscriptionId, clientSecret}});

    // setSubscriptionData({subscriptionId, clientSecret});
  };

  if (subscriptionData) {
    // navigate('/subscribe', subscriptionData);
    AppCtx.setNavigate({to: 'subscribe', data: subscriptionData});
    // return <Redirect to={{
    //   pathname: '/subscribe',
    //   state: subscriptionData
    // }} />
  }

  return (
    <div>
      <h1>Select a plan</h1>

      <div className="price-list">
        {prices.map((price) => {
          return (
            <div key={price.id}>
              <h3>{price.product.name}</h3>

              <p>${price.unit_amount / 100} / month</p>

              {/* <button onClick={() => createSubscription(price.id)}>
                Select
              </button> */}
              <div className="form-group row">
                <div className="">
                  <Button
                    type="button"
                    theme="primary"
                    onClick={() => createSubscription(price.id)}
                  >
                    Seleccionar
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Prices;
