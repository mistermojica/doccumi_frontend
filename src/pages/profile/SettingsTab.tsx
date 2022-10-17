/* eslint no-underscore-dangle: 0 */
/* eslint no-console: 0 */
/* eslint-disable no-unused-vars */

import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
// import {Link} from 'react-router-dom';
import _ from 'underscore';
import {Button} from '@components';
import {Button as ButtonN, Modal} from 'react-bootstrap';
import Loading from '@app/components/loadings/Loading';
import axios from 'axios';
import {mlCL} from '@app/utils/helpers';
// @ts-ignore
import * as Config from '@app/utils/config';

const SettingsTab = (props: any) => {
  const {isActive} = props;
  const user = useSelector((state: any) => state.auth.currentUser);

  console.log({user});

  const [resMessage, SetResMessage] = useState('');

  const tempBody: any = {};
  _.each(user.settings, (value, key) => {
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

  const [LoadingShow, SetLoadingShow] = useState(false);
  const handleLoadingShow = () => {
    SetLoadingShow(true);
  };
  const handleLoadingHide = () => {
    SetLoadingShow(false);
  };

  const onChangeCB = (cbData: any) => {
    // const campos = Array.from(
    //   document.querySelectorAll('.settings-form-control')
    // );
    const rb: any = {...reqBody};
    // campos.forEach((campo: any) => {
    //   if (campo.nodeName === 'SELECT') {
    //     const opcion = campo.childNodes[campo.selectedIndex];
    //     const value = opcion.getAttribute('value');
    //     const name = campo.getAttribute('name');
    //     rb[name] = value;
    //   } else {
    //     const name = campo.getAttribute('name');
    //     const value = campo.getAttribute('value');
    //     console.log({name, value});
    //     rb[name] = value;
    //   }
    // });
    const {name, value} = cbData.target;
    rb[name] = value;
    setBody(rb);
  };

  const submitData = () => {
    const url = Config.gatDomainName().concat('/configuraciones/update');
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

  const handleTestCredentials = (to: string) => {
    handleLoadingShow();

    const url = Config.gatDomainName().concat('/publicaciones/loginrrss');

    let credentials: any = {};

    if (to === 'instagram') {
      credentials.conIGUsuario = reqBody.conIGUsuario;
      credentials.conIGContrasena = reqBody.conIGContrasena;
    }

    if (to === 'marketplace') {
      credentials.conFBUsuario = reqBody.conFBUsuario;
      credentials.conFBContrasena = reqBody.conFBContrasena;
    }

    const reqbody = {
      ...credentials,
      dueno: user.settings.conDueno,
      to,
      show: true
    };

    console.log({reqbody});

    axios
      .post(url, reqbody)
      .then((response) => {
        const {success, message, result} = response.data;
        mlCL('response.data:', response.data);
        SetResMessage(message);
        handleMessageShow();
        handleLoadingHide();
      })
      .catch((err) => {
        mlCL('err:', err);
      });
  };

  useEffect(() => {
    console.log('reqBody:', reqBody);
  }, [reqBody]);

  return (
    <div className={`tab-pane ${isActive ? 'active' : ''}`}>
      <form className="form-horizontal">
        <h5>
          <strong>Instagram:</strong>
        </h5>
        <div className="form-group row">
          <label htmlFor="nombre" className="col-sm-2 col-form-label">
            Usuario
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control settings-form-control"
              id="conIGUsuario"
              name="conIGUsuario"
              placeholder="Usuario"
              defaultValue={user?.settings?.conIGUsuario}
              onChange={onChangeCB}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="usuario" className="col-sm-2 col-form-label">
            Copntraseña
          </label>
          <div className="col-sm-10">
            <input
              type="input"
              className="form-control settings-form-control"
              id="conIGContrasena"
              name="conIGContrasena"
              placeholder="Contraseña"
              defaultValue={user?.settings?.conIGContrasena}
              onChange={onChangeCB}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="nombre" className="col-sm-2 col-form-label">
            &nbsp;
          </label>
          <div className="col-sm-10">
            <div className="row">
              <div className="col-sm-2">
                <ButtonN
                  variant="secondary"
                  onClick={() => {
                    handleTestCredentials('instagram');
                  }}
                >
                  Verificar
                </ButtonN>
              </div>
              <div className="col-sm-2">
                <Loading show={LoadingShow} />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <h5>
          <strong>Facebook:</strong>
        </h5>
        <div className="form-group row">
          <label htmlFor="contrasena" className="col-sm-2 col-form-label">
            Usuario
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control settings-form-control"
              id="conFBUsuario"
              name="conFBUsuario"
              placeholder="Usuario"
              defaultValue={user?.settings?.conFBUsuario}
              // onChange={(e) => setContrasena(e.target.value)}
              onChange={onChangeCB}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="conFBContrasena" className="col-sm-2 col-form-label">
            Contraseña
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control settings-form-control"
              id="conFBContrasena"
              name="conFBContrasena"
              placeholder="Contraseña"
              defaultValue={user?.settings?.conFBContrasena}
              onChange={onChangeCB}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="nombre" className="col-sm-2 col-form-label">
            &nbsp;
          </label>
          <div className="col-sm-10">
            <div className="row">
              <div className="col-sm-2">
                <ButtonN
                  variant="secondary"
                  onClick={() => {
                    handleTestCredentials('marketplace');
                  }}
                >
                  Verificar
                </ButtonN>
              </div>
              <div className="col-sm-2">
                <Loading show={LoadingShow} />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <h5>
          <strong>Super Carros:</strong>
        </h5>
        <div className="form-group row">
          <label htmlFor="conSCUsuario" className="col-sm-2 col-form-label">
            Usuario
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control settings-form-control"
              id="conSCUsuario"
              name="conSCUsuario"
              placeholder="Usuario"
              defaultValue={user?.settings?.conSCUsuario}
              onChange={onChangeCB}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="conSCContrasena" className="col-sm-2 col-form-label">
            Contraseña
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control settings-form-control"
              id="conSCContrasena"
              name="conSCContrasena"
              placeholder="Contraseña"
              defaultValue={user?.settings?.conSCContrasena}
              onChange={onChangeCB}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="offset-sm-2 col-sm-10">
            <Button type="button" theme="danger" onClick={submitData}>
              Guardar
            </Button>
          </div>
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
      </form>
    </div>
  );
};

export default SettingsTab;
