/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */

import React, {useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import {ContentHeader} from '@components';
import {useNavigate} from 'react-router-dom';
// @ts-ignore
import PlantillasFormBody from '@app/components/forms/PlantillasFormBody';
import {mlCL} from '@app/utils/helpers';
import * as AuthService from '@app/services/auth';
// @ts-ignore
import * as Config from '@app/utils/config';

const AgregarPlantilla = () => {
  const navegar = useNavigate();

  const [plaNombre, setNombre] = useState('');
  const [plaTipoDocumento, setTipoDocumento] = useState('');
  const [plaTipoId, setTipoId] = useState('');
  const [plaContenido, setContenido] = useState('');
  const [plaDueno, setDueno] = useState(AuthService.getProfileId() || 'null');
  const [plaEstado, setEstado] = useState('');
  const [PlaceHolderFields, SetPlaceHolderFields] = useState([]);
  const [TiposData, SetTiposData] = useState([]);
  const [profileId, SetProfileId] = useState(
    AuthService.getProfileId() || 'null'
  );

  const GetPlaceHoldersData = (ctxProId: string) => {
    const url = Config.gatDomainName()
      .concat('/campos/listapordueno/')
      .concat(ctxProId);

    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') {
          mlCL('handleAddNew() => message:', message);
        } else {
          const arrPHF: any = [];
          data?.forEach((value: any) => {
            arrPHF.push(value?.camNombre.replace(',', ''));
          });
          SetPlaceHolderFields(arrPHF);
        }
      })
      .catch((err) => {
        mlCL('err:', err);
      });
  };

  const onChangeCB = (cbData: any) => {
    const {name, value} = cbData;

    switch (name) {
      case 'plaNombre':
        setNombre(value);
        break;
      case 'plaTipoDocumento':
        setTipoDocumento(value);
        break;
      case 'plaTipoId':
        setTipoId(value);
        break;
      case 'plaContenido':
        setContenido(value);
        break;
      case 'plaDueno':
        setDueno(value);
        break;
      case 'plaEstado':
        setEstado(value);
        break;
      default:
        break;
    }
  };

  const handleAddNew = () => {
    const url = Config.gatDomainName().concat('/plantillas/create');
    const body = {
      plaNombre,
      plaTipoDocumento,
      plaTipoId,
      plaContenido,
      plaDueno,
      plaEstado
    };

    axios
      .post(url, body)
      .then((response) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') {
          mlCL('handleAddNew() => message:', message);
        } else {
          mlCL('handleAddNew() => message:', message);
          mlCL('handleAddNew() => data:', data);
          navegar('/mostrar-plantillas');
        }
      })
      .catch((err) => {
        mlCL('err:', err);
      });
  };

  const GetTiposData = () => {
    const url = Config.gatDomainName()
      .concat('/tipos/bymodelodueno/documentos/')
      .concat(profileId);
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') {
          mlCL('message:', message);
        } else {
          SetTiposData(data);
        }
      })
      .catch((err) => {
        mlCL('err:', err);
      });
  };

  useEffect(() => {
    SetProfileId(AuthService.getProfileId() || 'null');
    GetTiposData();
  }, []);

  useEffect(() => {
    mlCL('useEffect() -> PlaceHolderFields:', PlaceHolderFields);
    // GetPlaceHoldersData(profileId);
  }, [PlaceHolderFields]);

  useEffect(() => {
    GetPlaceHoldersData(profileId);
  }, [profileId]);

  return (
    <div>
      <ContentHeader title="Agregar Plantilla" />
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
              <PlantillasFormBody
                onChangeCB={onChangeCB}
                RowData={{}}
                TiposData={TiposData}
                cxcReadOnly="false"
                PlaceHolderFields={PlaceHolderFields}
              >
                &nbsp;
              </PlantillasFormBody>
              <Button
                type="submit"
                className="btn tn-success mt-4"
                onClick={handleAddNew}
              >
                Guardar
              </Button>
            </div>
            {/* <div className="card-footer">&nbsp;</div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgregarPlantilla;
