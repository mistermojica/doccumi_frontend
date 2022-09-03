/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */

import React, {useState, useContext, useEffect} from 'react';
// import _ from 'underscore';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import {ContentHeader} from '@components';
import {useNavigate} from 'react-router-dom';
// @ts-ignore
import VehiculosFormBody from '@app/components/forms/VehiculosFormBody';
import {mlCL} from '@app/utils/helpers';
// @ts-ignore
import AppContext from '@app/contexts/AppContext';
import AlertDialog from '@app/components/dialogs/AlertDialog';
// @ts-ignore
import * as AuthService from '@app/services/auth';
// @ts-ignore
import * as Config from '@app/utils/config';

const AgregarVehiculo = () => {
  const AppCtx = useContext(AppContext);

  const navegar = useNavigate();

  const [ExtraFields, setExtraFields] = useState<any>(new Map());

  const [ExtraFieldsConfig, setExtraFieldsConfig] = useState<any>(new Map());

  const [vehNoRegistroPlaca, setNoRegistroPlaca] = useState('');
  const [vehChasis, setChasis] = useState('');
  const [vehStatusVehiculo, setStatusVehiculo] = useState('');
  const [vehTipoEmision, setTipoEmision] = useState('');
  const [vehTipoVehiculo, setTipoVehiculo] = useState('');
  const [vehAnoFabricacion, setAnoFabricacion] = useState('');
  const [vehMarca, setMarca] = useState('');
  const [vehModelo, setModelo] = useState('');
  const [vehColor, setColor] = useState('');
  const [vehPrecio, setPrecio] = useState('');
  const [vehCosto, setCosto] = useState('');
  const [vehFotoMatricula, setFotoMatricula] = useState([]);
  const [vehFotos, setFotos] = useState([]);
  const [vehDueno, setDueno] = useState(AuthService.getProfileId());
  const [vehCamposAdicionales, setCamposAdicionales] = useState([]);
  const [vehEstado, setEstado] = useState('');

  const [profileId, SetProfileId] = useState(
    AuthService.getProfileId() || 'null'
  );

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
    console.log('onChangeCB() || cbData:', cbData);

    const {name, value} = cbData;

    setFieldsValues(name, value);

    validateFormData();
  };

  const setFieldsValues = (name: string, value: any) => {
    console.log('setFieldsValues:', name, value);

    if (Array.from(ExtraFieldsConfig.keys()).includes(name)) {
      ExtraFields.set(name, {name, value});
      setExtraFields(ExtraFields);
      name = 'vehCamposAdicionales';
      value = Array.from(ExtraFields.values());
      console.log('ExtraFields:', Array.from(ExtraFields.values()));
    }

    switch (name) {
      case 'vehNoRegistroPlaca':
        setNoRegistroPlaca(value);
        break;
      case 'vehChasis':
        setChasis(value);
        break;
      case 'vehStatusVehiculo':
        setStatusVehiculo(value);
        break;
      case 'vehTipoEmision':
        setTipoEmision(value);
        break;
      case 'vehTipoVehiculo':
        setTipoVehiculo(value);
        break;
      case 'vehAnoFabricacion':
        setAnoFabricacion(value);
        break;
      case 'vehMarca':
        setMarca(value);
        break;
      case 'vehModelo':
        setModelo(value);
        break;
      case 'vehColor':
        setColor(value);
        break;
      case 'vehPrecio':
        setPrecio(value);
        break;
      case 'vehCosto':
        setCosto(value);
        break;
      case 'vehFotoMatricula':
        setFotoMatricula(value);
        break;
      case 'vehFotos':
        setFotos(value);
        break;
      case 'vehCamposAdicionales':
        setCamposAdicionales(value);
        break;
      case 'vehEstado':
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

      if (!['vehFotoMatricula', 'vehFotos'].includes(id)) {
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

  const GetExtraFieldsData = (ctxProId: string) => {
    const url = Config.gatDomainName()
      .concat('/campos/listaporduenoprivado/')
      .concat(ctxProId);

    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') {
          mlCL('GetExtraFieldsData() => message:', message);
        } else {
          const mapPHF = new Map();
          data?.forEach((value: any) => {
            const {camCodigo, camNombre} = value;
            const camCodigoKey = 'doccumi_cf_'.concat(
              camCodigo.replace(',', '')
            );
            mapPHF.set(camCodigoKey, {
              name: camCodigoKey,
              label: camNombre.replace(',', ''),
              type: 'text'
            });
          });

          console.log('GetExtraFieldsData() || mapPHF:', mapPHF);

          setExtraFieldsConfig(mapPHF);
        }
      })
      .catch((err) => {
        mlCL('err:', err);
      });
  };

  const handleAddNew = () => {
    const url = Config.gatDomainName().concat('/vehiculos/create');
    const body = {
      vehNoRegistroPlaca,
      vehChasis,
      vehStatusVehiculo,
      vehTipoEmision,
      vehTipoVehiculo,
      vehAnoFabricacion,
      vehDueno,
      vehMarca,
      vehModelo,
      vehColor,
      vehPrecio,
      vehCosto,
      vehFotoMatricula,
      vehFotos,
      vehCamposAdicionales,
      vehEstado
    };

    console.log('AgregarVehiculo() || body:', body);

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
          navegar('/mostrar-vehiculos');
        }
      })
      .catch((err) => {
        mlCL('handleAddNew() => err:', err);
      });
  };

  useEffect(() => {
    SetProfileId(AuthService.getProfileId() || 'null');
    GetExtraFieldsData(profileId);
  }, []);

  return (
    <div>
      <ContentHeader title="Agregar Vehículo" />
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
              {/* {ExtraFieldsConfig && ExtraFieldsConfig.size > 0 && ( */}
              <VehiculosFormBody
                onChangeCB={onChangeCB}
                RowData={{}}
                cxcReadOnly="false"
                cxcAction="adding"
                ExtraFieldsConfig={ExtraFieldsConfig}
              >
                &nbsp;
              </VehiculosFormBody>
              {/* )} */}
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

export default AgregarVehiculo;
