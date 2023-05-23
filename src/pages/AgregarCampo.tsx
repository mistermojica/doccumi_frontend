/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import React, {useState} from 'react';
import _ from 'underscore';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import {ContentHeader} from '@components';
import {useNavigate} from 'react-router-dom';
// @ts-ignore
import GenericoFormBody from '@app/components/forms/GenericoFormBody';
import {mlCL} from '@app/utils/helpers';
// @ts-ignore
import AlertDialog from '@app/components/dialogs/AlertDialog';
import * as AuthService from '@app/services/auth';
// @ts-ignore
import * as Config from '@app/utils/config';

const AgregarCampo = () => {
  const navegar = useNavigate();

  const NombreEntidad = 'Campos';
  const NombreEntidadMin = NombreEntidad.toLowerCase();

  const [reqBody, setBody] = useState<any>({
    camCodigo: '',
    camNombre: '',
    camModelo: '',
    camCampo: '',
    camOrden: 10,
    camTipo: 'privado',
    camDueno: AuthService.getProfileId(),
    camEstado: 'activo'
  });

  const [BodyLabels, setBodyLabels] = useState<any>(new Map());
  BodyLabels.set('camCodigo', {label: 'Código', type: 'hidden'});
  BodyLabels.set('camNombre', {label: 'Nombre', type: 'text'});
  BodyLabels.set('camModelo', {
    label: 'Modelo',
    type: 'select',
    value: '',
    options: [
      {value: 'Clientes', name: 'Clientes'},
      {value: 'Vehiculos', name: 'Inventario'},
      {value: 'Entidades', name: 'Entidades'}
    ]
  });
  BodyLabels.set('camCampo', {label: 'Campo en BD', type: 'hidden'});
  BodyLabels.set('camOrden', {label: 'Orden', type: 'number'});
  BodyLabels.set('camDueno', {label: 'Dueño', type: 'hidden'});
  BodyLabels.set('camTipo', {label: 'Tipo', type: 'hidden'});
  BodyLabels.set('camEstado', {
    label: 'Estado',
    type: 'select',
    value: 'activo',
    options: [
      {value: 'activo', name: 'Activo'},
      {value: 'borrado', name: 'Borrado'}
    ]
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const [MsgTitulo, setMsgTitulo] = useState('');
  const [MsgContenido, setMsgContenido] = useState('');
  const [MsgEstado, setMsgEstado] = useState(false);

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
    const {campos} = cbData;

    if (campos !== undefined) {
      campos.forEach((campo: any) => {
        if (campo.nodeName === 'SELECT') {
          const opcion = campo.childNodes[campo.selectedIndex];
          const value = opcion.getAttribute('value');
          const name = campo.getAttribute('name');
          reqBody[name] = value;
        } else {
          const {name, value} = cbData;
          reqBody[name] = value;
          if (name === 'camNombre') {
            reqBody.camCodigo = value
              .toLowerCase()
              .replace(/ /g, '_')
              .replace(/\./g, '');
            reqBody.camCampo = value
              .toLowerCase()
              .replace(/ /g, '_')
              .replace(/\./g, '');
          }
        }
      });
      setBody(reqBody);
    }
    validateFormData(reqBody);
  };

  const validateFormData = (campos: any) => {
    let emptyFieldFound = false;

    _.each(campos, (value) => {
      if (value === '' || value === '0' || value === 0 || value < 0) {
        emptyFieldFound = true;
      }
    });

    setIsDisabled(emptyFieldFound);
  };

  const handleAddNew = () => {
    const url = Config.gatDomainName().concat(
      '/'.concat(NombreEntidadMin).concat('/create')
    );

    axios
      .post(url, reqBody)
      .then((response) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') {
          mlCL('handleAddNew() => result:', result);
          ShowAlert({
            msgtitle: 'Mensaje',
            msgcontent: message,
            msgstatus: true
          });
        } else {
          mlCL(message, data);
          navegar('/gestionar-'.concat(NombreEntidadMin));
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
      <ContentHeader title={'Agregar '.concat(NombreEntidad)} />
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
              <GenericoFormBody
                onChangeCB={onChangeCB}
                RowData={reqBody}
                BodyLabels={BodyLabels}
                cxcReadOnly="false"
                cxcAction="adding"
              >
                &nbsp;
              </GenericoFormBody>
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

export default AgregarCampo;
