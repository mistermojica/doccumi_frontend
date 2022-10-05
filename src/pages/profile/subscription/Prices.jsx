/* eslint-disable no-unused-vars */

import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '@components';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
// @ts-ignore
import AppContext from '@app/contexts/AppContext';
import * as Config from '@app/utils/config';
// import {Redirect} from 'react-router-dom';

const Prices = (props) => {
  const AppCtx = useContext(AppContext);
  const {user} = props;

  const [prices, setPrices] = useState([]);
  const [currentPrice, setCurrentPrice] = useState({});
  const [subscription] = useState(AppCtx?.Navigate?.data?.subscription);
  const [defaultPaymentMethod] = useState(
    AppCtx?.Navigate?.data?.defaultPaymentMethod
  );

  const NombreEntidad = 'Subscripciones';
  const NombreEntidadMin = NombreEntidad.toLowerCase();
  const [UrlBase] = useState(
    Config.gatDomainName().concat('/'.concat(NombreEntidadMin).concat('/'))
  );

  // const navigate = useNavigate();

  const getPrices = () => {
    axios
      .post(UrlBase.concat('prices'), {
        customerId: user.profile.usuario_stripe
      })
      .then((response) => {
        const {prices, currentPrice} = response.data;
        prices.sort((a, b) => a.unit_amount - b.unit_amount);
        setPrices(prices);
        setCurrentPrice(currentPrice);
      })
      .catch((err) => {
        console.log('err:', err);
      });
  };

  useEffect(() => {
    getPrices();
    // const fetchPrices = async () => {
    //   const {prices} = await fetch('http://delete/config').then((r) =>
    //     r.json()
    //   );
    //   setPrices(prices);
    // };
    // fetchPrices();
  }, []);

  // const createSubscription = async (price) => {
  //   const {subscriptionId, clientSecret, items} = await fetch(
  //     'http://delete/create-xsubscription',
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

  const setNavigateTo = (goTo, price) => {
    let dataNav = {};

    if (goTo === 'confirm') {
      dataNav = {price, subscription, defaultPaymentMethod};
    } else {
      dataNav = {price, nFrom: 'prices', nTo: 'confirm'};
    }

    AppCtx.setNavigate({
      to: goTo,
      data: dataNav
    });
  };

  const handleBack = async () => {
    AppCtx.setNavigate({to: 'account', data: {}});
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
        <strong>Selecciona un plan:</strong>
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
                  {price.id !== currentPrice?.id ? (
                    <Button
                      type="button"
                      theme="primary"
                      // disabled={price.id === currentPrice?.id}
                      onClick={() =>
                        setNavigateTo(
                          currentPrice?.id ? 'confirm' : 'addcard',
                          price
                        )
                      }
                    >
                      Seleccionar
                    </Button>
                  ) : currentPrice?.active === true ? (
                    <Button
                      type="button"
                      theme={
                        price.id === currentPrice?.id ? 'secondary' : 'primary'
                      }
                      disabled={price.id === currentPrice?.id}
                      onClick={() =>
                        setNavigateTo(
                          currentPrice?.id ? 'confirm' : 'addcard',
                          price
                        )
                      }
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
      <br />
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <Button
              type="button"
              theme="secondary"
              className="auto"
              onClick={handleBack}
              style={{width: '200px', height: '50px'}}
            >
              Volver
            </Button>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Prices;
