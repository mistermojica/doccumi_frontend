/* eslint no-underscore-dangle: 0 */
/* eslint no-console: 0 */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */

import React, {useState, useEffect, useContext} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
// import {Link} from 'react-router-dom';
import _ from 'underscore';
import {Button} from '@components';
import {Button as ButtonN, Modal} from 'react-bootstrap';
import {Modal as MUIModal} from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import {mlCL} from '@app/utils/helpers';
// @ts-ignore
import * as Config from '@app/utils/config';
// @ts-ignore
import CheckoutForm from '@app/pages/profile/subscription/CheckoutForm';
import './subscription/Stripe.css';
// @ts-ignore
import Register from './subscription/Register';
// @ts-ignore
import Prices from './subscription/Prices';
// @ts-ignore
import Subscribe from './subscription/Subscribe';
// @ts-ignore
import Account from './subscription/Account';
// @ts-ignore
import Cancel from './subscription/Cancel';
// @ts-ignore
import AppContext from '@app/contexts/AppContext';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const SubscriptionTab = (props: any) => {
  const AppCtx: any = useContext(AppContext);

  const {user, foto, logo, isActive} = props;

  const [userClone, setUserClone] = useState({...user});

  const [clientSecret, setClientSecret] = useState('');

  const [resMessage, SetResMessage] = useState('');
  const [SubscriptionPage, SetSubscriptionPage] = useState(<></>);

  const tempBody: any = {};
  _.each(user.profile, (value, key) => {
    tempBody[key] = value;
  });

  const [reqBody, setBody] = useState<any>(tempBody);

  const [MessageShow, SetMessageShow] = useState(false);
  const handleMessageShow = () => {
    SetMessageShow(true);
  };
  const handleMessageClose = () => {
    SetMessageShow(false);
  };

  const onChangeCB = (cbData: any) => {
    const campos = Array.from(
      document.querySelectorAll('.profile-form-control')
    );
    campos.forEach((campo: any) => {
      if (campo.nodeName === 'SELECT') {
        const opcion = campo.childNodes[campo.selectedIndex];
        const value = opcion.getAttribute('value');
        const name = campo.getAttribute('name');
        reqBody[name] = value;
        setBody(reqBody);
      } else {
        const {name, value} = cbData.target;
        reqBody[name] = value;
        setBody(reqBody);
      }
    });
  };

  const [PaymentShow, SetPaymentShow] = useState(false);
  const showPaymentDialog = () => {
    SetPaymentShow(true);
  };
  const hidePaymentDialog = () => {
    SetPaymentShow(false);
  };

  const submitData = () => {
    const url = Config.gatDomainName().concat('/usuarios/update');
    axios
      .post(url, reqBody)
      .then((response) => {
        const result = response.data;
        const {success, message, data} = result;
        // mlCL('result:', result);
        if (!success) {
          SetResMessage(message);
          handleMessageShow();
          mlCL('message:', message);
        } else {
          // mlCL('data:', data);
          // SetResMessage(message);
          // handleMessageShow();
          window.location.reload();
        }
      })
      .catch((err) => {
        mlCL('err:', err);
      });
  };

  const stripeCreatePaymentIntent = () => {
    const customConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const url = 'http://localhost:8004/create-payment-intent';
    const body = {items: [{id: 'xl-tshirt'}]};
    console.log({body});
    axios
      .post(url, body, customConfig)
      .then((response) => {
        const result = response.data;
        mlCL('result:', result);
        setClientSecret(result.clientSecret);
      })
      .catch((err) => {
        mlCL('err:', err);
      });
  };

  useEffect(() => {
    const rb = {...reqBody};
    rb.foto = foto;
    rb.logo = logo;
    setBody(rb);
  }, [foto, logo]);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    stripeCreatePaymentIntent();

    // fetch('http://localhost:8003/create-payment-intent', {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify({items: [{id: 'xl-tshirt'}]})
    // })
    //   .then((res) => res.json())
    //   .then((data) => setClientSecret(data.clientSecret));
  }, []);

  useEffect(() => {
    console.log('Navigate:', AppCtx.Navigate);
    SetSubscriptionPage(showSubscriptionPage(AppCtx.Navigate.to));
  }, [AppCtx]);

  const appearance = {
    theme: 'stripe'
  };

  const options = {
    clientSecret,
    theme: 'stripe'
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 570,
    bgcolor: 'background.paper',
    border: '2px solid #007bff',
    boxShadow: 24,
    p: 4
  };

  const showSubscriptionPage = (page: string) => {
    switch (page) {
      case 'prices':
        return <Prices />;
        break;
      case 'subscribe':
        return <Subscribe user={userClone} />;
        break;
      case 'account':
        return <Account />;
        break;
      case 'cancel':
        return <Cancel />;
        break;
      default:
        return <Register user={userClone} />;
        break;
    }
  };

  return (
    <div className={`tab-pane ${isActive ? 'active' : ''}`}>
      <div>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            {SubscriptionPage}
          </Elements>
        )}
      </div>
      {/* <div className="form-group row">
        <div className="offset-sm-2 col-sm-2">
          <Button type="button" theme="primary" onClick={submitData}>
            Guardar
          </Button>
        </div>
        <div className="col-sm-8">
          <Button type="button" theme="success" onClick={showPaymentDialog}>
            Realizar Subscripción
          </Button>
        </div>
      </div> */}
      <div className="model-box-view">
        <Modal
          show={MessageShow}
          onHide={handleMessageClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Respuesta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="">{resMessage}</div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <ButtonN variant="secondary" onClick={handleMessageClose}>
              Cerrar
            </ButtonN>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="model-box-view">
        <MUIModal
          open={PaymentShow}
          onClose={hidePaymentDialog}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )}
          </Box>
        </MUIModal>
        {/* <Modal
          show={PaymentShow}
          onHide={hidePaymentDialog}
          backdrop="static"
          keyboard={false}
          // style={{width: '600px !important;'}}
        > */}
        {/* <Modal.Header closeButton>
            <Modal.Title>Respuesta</Modal.Title>
          </Modal.Header> */}
        {/* <Modal.Body>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </Modal.Body> */}
        {/* <Modal.Footer>
            <ButtonN variant="secondary" onClick={hidePaymentDialog}>
              Cerrar
            </ButtonN>
          </Modal.Footer> */}
        {/* </Modal> */}
      </div>
      {/* </form> */}
    </div>
  );
};

export default SubscriptionTab;
