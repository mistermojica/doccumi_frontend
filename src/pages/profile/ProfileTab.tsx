/* eslint no-underscore-dangle: 0 */
/* eslint no-console: 0 */
/* eslint-disable no-unused-vars */

import React, {useState, useEffect} from 'react';
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

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const ProfileTab = (props: any) => {
  const {user, foto, logo, isActive} = props;
  const [clientSecret, setClientSecret] = useState('');

  const [resMessage, SetResMessage] = useState('');

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

  // const [PaymentShow, SetPaymentShow] = useState(false);
  // const showPaymentDialog = () => {
  //   SetPaymentShow(true);
  // };
  // const hidePaymentDialog = () => {
  //   SetPaymentShow(false);
  // };

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

  // const stripeCreatePaymentIntent = () => {
  //   const customConfig = {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   };
  //   const url = 'http://localhost:8004/create-xpaymentx-intent';
  //   const body = {items: [{id: 'xl-tshirt'}]};
  //   console.log({body});
  //   axios
  //     .post(url, body, customConfig)
  //     .then((response) => {
  //       const result = response.data;
  //       mlCL('result:', result);
  //       setClientSecret(result.clientSecret);
  //     })
  //     .catch((err) => {
  //       mlCL('err:', err);
  //     });
  // };

  useEffect(() => {
    const rb = {...reqBody};
    rb.foto = foto;
    rb.logo = logo;
    setBody(rb);
  }, [foto, logo]);

  // useEffect(() => {
  // Create PaymentIntent as soon as the page loads
  // stripeCreatePaymentIntent();

  // fetch('http://localhost:8003/create-xpaymentx-intent', {
  //   method: 'POST',
  //   headers: {'Content-Type': 'application/json'},
  //   body: JSON.stringify({items: [{id: 'xl-tshirt'}]})
  // })
  //   .then((res) => res.json())
  //   .then((data) => setClientSecret(data.clientSecret));
  // }, []);

  // const appearance = {
  //   theme: 'stripe'
  // };

  // const options = {
  //   clientSecret,
  //   theme: 'stripe'
  // };

  // const style = {
  //   position: 'absolute' as 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: 570,
  //   bgcolor: 'background.paper',
  //   border: '2px solid #007bff',
  //   boxShadow: 24,
  //   p: 4
  // };

  return (
    <div className={`tab-pane ${isActive ? 'active' : ''}`}>
      {/* <form className="form-horizontal"> */}
      <div className="form-group row">
        <label htmlFor="nombre" className="col-sm-2 col-form-label">
          Nombre
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control profile-form-control"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            defaultValue={user.profile.nombre}
            onChange={onChangeCB}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="usuario" className="col-sm-2 col-form-label">
          Usuario
        </label>
        <div className="col-sm-10">
          <input
            type="input"
            className="form-control profile-form-control"
            id="usuario"
            name="usuario"
            placeholder="Usuario"
            defaultValue={user.profile.usuario}
            onChange={onChangeCB}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="contrasena" className="col-sm-2 col-form-label">
          Contraseña
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control profile-form-control"
            id="contrasena"
            name="contrasena"
            placeholder="Contraseña"
            defaultValue={user.profile.contrasena}
            // onChange={(e) => setContrasena(e.target.value)}
            onChange={onChangeCB}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="email" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-sm-10">
          <input
            type="email"
            className="form-control profile-form-control"
            id="email"
            name="email"
            placeholder="Correo Electrónico"
            defaultValue={user.profile.email}
            onChange={onChangeCB}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="nombre_empresa" className="col-sm-2 col-form-label">
          Nombre Empresa
        </label>
        <div className="col-sm-10">
          {/* <textarea
              className="form-control profile-form-control"
              id="inputExperience"
              placeholder="Experience"
              defaultValue={user.profile.nombre_empresa}
            /> */}
          <input
            type="text"
            className="form-control profile-form-control"
            id="nombre_empresa"
            name="nombre_empresa"
            placeholder="Nombre Empresa"
            defaultValue={user.profile.nombre_empresa}
            onChange={onChangeCB}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="telefono" className="col-sm-2 col-form-label">
          Teléfono
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control profile-form-control"
            id="telefono"
            name="telefono"
            placeholder="Teléfono"
            defaultValue={user.profile.telefono}
            onChange={onChangeCB}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="whatsapp" className="col-sm-2 col-form-label">
          WhatsApp
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control profile-form-control"
            id="whatsapp"
            name="whatsapp"
            placeholder="WhatsApp"
            defaultValue={user.profile.whatsapp}
            onChange={onChangeCB}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="apikey" className="col-sm-2 col-form-label">
          API Key:
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control profile-form-control"
            id="apikey"
            name="apikey"
            disabled
            placeholder="API Key"
            defaultValue={user.profile.usuario_stripe}
            onChange={onChangeCB}
          />
        </div>
      </div>
      <div className="form-group row">
        {/* <label htmlFor="logo" className="col-sm-2 col-form-label">
            Logo
          </label> */}
        <div className="col-sm-10">
          <input
            type="hidden"
            className="form-control profile-form-control"
            id="logo"
            name="logo"
            placeholder="Logo"
            defaultValue={logo || user.profile.logo}
            onChange={onChangeCB}
          />
        </div>
      </div>
      <div className="form-group row">
        {/* <label htmlFor="foto" className="col-sm-2 col-form-label">
            Foto
          </label> */}
        <div className="col-sm-10">
          <input
            type="hidden"
            className="form-control profile-form-control"
            id="foto"
            name="foto"
            placeholder="Foto"
            defaultValue={foto || user.profile.foto}
            onChange={onChangeCB}
          />
        </div>
      </div>
      {/* <div className="form-group row">
          <div className="offset-sm-2 col-sm-10">
            <div className="icheck-primary">
              <input
                type="checkbox"
                id="agreeTerms"
                name="terms"
                defaultValue="agree"
              />
              <label htmlFor="agreeTerms">
                <span>I agree to the </span>
                <Link to="/">terms and condition</Link>
              </label>
            </div>
          </div>
        </div> */}
      <div className="form-group row">
        <div className="offset-sm-2 col-sm-2">
          <Button type="button" theme="primary" onClick={submitData}>
            Guardar
          </Button>
        </div>
        {/* <div className="col-sm-8">
          <Button type="button" theme="success" onClick={showPaymentDialog}>
            Realizar Subscripción
          </Button>
        </div> */}
      </div>
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
      {/* <div className="model-box-view"> */}
      {/* <MUIModal
          open={PaymentShow}
          onClose={hidePaymentDialog}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="strBody"
        >
          <Box sx={style}>
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )}
          </Box>
        </MUIModal> */}
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
      {/* </div> */}
      {/* </form> */}
    </div>
  );
};

export default ProfileTab;
