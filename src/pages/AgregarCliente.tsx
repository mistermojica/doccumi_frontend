/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import React, {useState, useContext, useEffect} from 'react';
// import _ from 'underscore';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import {ContentHeader} from '@components';
import {useNavigate} from 'react-router-dom';
import ClientesFormBody from '@app/components/forms/ClientesFormBody';
import {mlCL} from '@app/utils/helpers';
// import Button from 'react-bootstrap/Button';
// import Offcanvas from 'react-bootstrap/Offcanvas';
import AppContext from '@app/contexts/AppContext';
import AlertDialog from '@app/components/dialogs/AlertDialog';
import * as AuthService from '@app/services/auth';
import * as Config from '@app/utils/config';

const AgregarCliente = () => {
  const AppCtx = useContext(AppContext);

  const navegar = useNavigate();

  const [cliIdentificacion, setIdentificacion] = useState('');
  const [cliNombreCompleto, setNombreCompleto] = useState('');
  const [cliTelefono, setTelefono] = useState('');
  const [cliCorreoElectronico, setCorreoElectronico] = useState('');
  const [cliDireccion, setDireccion] = useState('');
  const [cliCiudad, setCiudad] = useState('');
  const [cliSector, setSector] = useState('');
  const [cliPais, setPais] = useState('');
  const [cliNacionalidad, setNacionalidad] = useState('');
  const [cliFotoCedula, setFotoCedula] = useState([]);
  const [cliDueno, setDueno] = useState(AuthService.getProfileId());
  const [cliEstado, setEstado] = useState('');

  const [isDisabled, setIsDisabled] = useState(true);

  const [MsgTitulo, setMsgTitulo] = useState('');
  const [MsgContenido, setMsgContenido] = useState('');
  const [MsgEstado, setMsgEstado] = useState(false);

  const labelCliente = AuthService.getProfileInfo('nombre_cliente');

  const ShowAlert = (props: any) => {
    const {msgtitle, msgcontent, msgstatus} = props;

    setMsgTitulo(msgtitle);
    setMsgContenido(msgcontent);
    setMsgEstado(msgstatus);
  };

  const handleClose = () => {
    setMsgEstado(false);
  };

  const onChangeCB = (cbData: any) => {
    console.log('onChangeCB() || cbData:', cbData);

    const {name, value} = cbData;

    setFieldsValues(name, value);

    validateFormData();
  };

  const setFieldsValues = (name: string, value: any) => {
    switch (name) {
      case 'cliIdentificacion':
        setIdentificacion(value);
        break;
      case 'cliNombreCompleto':
        setNombreCompleto(value);
        break;
      case 'cliTelefono':
        setTelefono(value);
        break;
      case 'cliCorreoElectronico':
        setCorreoElectronico(value);
        break;
      case 'cliDireccion':
        setDireccion(value);
        break;
      case 'cliCiudad':
        setCiudad(value);
        break;
      case 'cliSector':
        setSector(value);
        break;
      case 'cliPais':
        setPais(value);
        break;
      case 'cliNacionalidad':
        setNacionalidad(value);
        break;
      case 'cliFotoCedula':
        setFotoCedula(value);
        break;
      case 'cliEstado':
        setEstado(value);
        break;
      default:
        break;
    }
  };

  const validateFormData = () => {
    const campos = document.querySelectorAll('input, select');

    let emptyFieldFound = false;
    Array.from(campos).forEach((campo: any) => {
      // const id = campo.getAttribute('id');
      const {id, value} = campo;

      if (!['cliFotoCedula'].includes(id)) {
        setFieldsValues(id, value);
      }

      // if (id === 'email') {
      //   invalidEmailFound = !ValidateEmail(value);
      // }
      // if (['phone_home', 'phone_mobile', 'phone_office'].includes(id)) {
      //   invalidPhoneFound = !ValidatePhone(value);
      // }
      if (value === '') {
        emptyFieldFound = true;
      }
    });

    // setIsDisabled(emptyFieldFound || invalidEmailFound || invalidPhoneFound);
    setIsDisabled(emptyFieldFound);
  };

  const handleAddNew = () => {
    const url = Config.gatDomainName().concat('/clientes/create');
    const body = {
      cliIdentificacion,
      cliNombreCompleto,
      cliTelefono,
      cliCorreoElectronico,
      cliDireccion,
      cliCiudad,
      cliSector,
      cliPais,
      cliNacionalidad,
      cliFotoCedula,
      cliDueno,
      cliEstado
    };

    // console.log('AgregarVehiculo() || body:', body);

    axios
      .post(url, body)
      .then((response) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') {
          mlCL('handleAddNew() => status:', status);
          mlCL('handleAddNew() => message:', message);
          ShowAlert({
            msgtitle: 'Mensaje',
            msgcontent: message,
            msgstatus: true
          });
        } else {
          mlCL(message, data);
          // AppCtx.setFileUploadData([]);
          // AppCtx.setSubmitedUploadFilesData(false);
          navegar('/mostrar-clientes');
        }
      })
      .catch((err) => {
        mlCL('handleAddNew() => err:', err);
      });
  };

  // useEffect(() => {
  //   console.log('AppCtx.FileUploadData:', AppCtx.FileUploadData);
  //   if (AppCtx.FileUploadData.length > 0) {
  //     setFotoCedula(AppCtx.FileUploadData);
  //   }
  // }, [AppCtx]);

  return (
    <div>
      <ContentHeader title={'Agregar ' + labelCliente} />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            {/* <div className="card-header">
              <h3 className="card-title">Title</h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="collapse"
                  data-toggle="tooltip"
                  title="Collapse"
                >
                  <i className="fa fa-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="remove"
                  data-toggle="tooltip"
                  title="Remove"
                >
                  <i className="fa fa-times" />
                </button>
              </div>
            </div> */}
            <div className="card-body">
              <ClientesFormBody
                onChangeCB={onChangeCB}
                RowData={{}}
                cxcReadOnly="false"
                cxcAction="adding"
                ConfiguracionesData={AppCtx.ConfiguracionesData}
              >
                &nbsp;
              </ClientesFormBody>
              {/* <input
                type="hidden"
                className="form-control"
                id="cliFotoCedula"
                name="cliFotoCedula"
                defaultValue={AppCtx.FileUploadData}
              /> */}
              <Button
                type="submit"
                className="btn tn-success mt-4"
                disabled={isDisabled}
                onClick={handleAddNew}
              >
                Guardar
              </Button>
            </div>
            <AlertDialog
              msgtitle={MsgTitulo}
              msgcontent={MsgContenido}
              msgstatus={MsgEstado}
              handleClose={handleClose}
            />
            {/* <div className="card-footer">&nbsp;</div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgregarCliente;
