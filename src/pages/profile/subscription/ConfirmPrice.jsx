/* eslint-disable no-unused-vars */

import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '@components';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
// @ts-ignore
import AppContext from '@app/contexts/AppContext';
// import {Redirect} from 'react-router-dom';

const ConfirmPrice = (props) => {
  const AppCtx = useContext(AppContext);
  const {user} = props;

  const [prices, setPrices] = useState([]);
  const [currentPriceId, setCurrentPriceId] = useState('');
  const [subscriptionData, setSubscriptionData] = useState(null);

  // const navigate = useNavigate();

  const getPrices = () => {
    const url = 'http://localhost:8004/prices';
    axios
      .get(url)
      .then((response) => {
        const {prices, currentPriceId} = response.data;
        console.log('prices:', prices);
        prices.sort((a, b) => a.unit_amount - b.unit_amount);
        setPrices(prices);
        setCurrentPriceId(currentPriceId);
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

  // const createSubscription = async (price) => {
  //   const {subscriptionId, clientSecret, items} = await fetch(
  //     'http://localhost:8004/create-xsubscription',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         priceId: price.id,
  //         customerId: user.profile.usuario_stripe
  //       })
  //     }
  //   ).then((r) => r.json());

  //   AppCtx.setNavigate({
  //     to: 'subscribe',
  //     data: {subscriptionId, clientSecret, price, items}
  //   });

  //   // setSubscriptionData({subscriptionId, clientSecret});
  // };

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
      <h5>
        <strong>Confirmar nuevo plan:</strong>
      </h5>
      <br />
      <div className="price-list">
        {prices.map((price) => {
          return (
            <div key={price.id}>
              <h4 className="col-md-12 text-center">
                <strong>{price.product.name}</strong>
              </h4>
              <div
                dangerouslySetInnerHTML={createMarkup(
                  price.product.description,
                  '- ',
                  '<br/>⦿ '
                )}
              />
              <br />
              <div>
                <center>
                  <strong>
                    ${price.unit_amount / 100} / {price.product.name}
                  </strong>
                </center>
              </div>
              <br />
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
                      Seleccionar
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
          );
        })}
      </div>
    </div>
  );
};

export default ConfirmPrice;
