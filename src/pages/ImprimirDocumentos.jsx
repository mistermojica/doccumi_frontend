/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React, {useEffect, useState} from 'react';
import {ContentHeader} from '@components';
import {Button, Modal} from 'react-bootstrap';
import Checkbox from '@mui/material/Checkbox';
// import {Button, Modal} from 'react-bootstrap';
import axios from 'axios';
import {mlCL, removeDiacritics} from '@app/utils/helpers';
// import {useNavigate} from 'react-router-dom';
import Loading from '@app/components/loadings/Loading';
import * as AuthService from '@app/services/auth';
import * as Config from '@app/utils/config';
import AsyncSelect from 'react-select/async';

const ImprimirDocumentos = () => {
  // const navegar = useNavigate();

  const [impVehiculo, setVehiculo] = useState('');
  const [impCliente, setCliente] = useState('');
  const [impTiposDocumentos, setTiposDocumentos] = useState([]);
  const [impTipos, setTipos] = useState(new Map());

  const [ClientesData, SetClientesData] = useState([]);
  const [VehiculosData, SetVehiculosData] = useState([]);
  const [TiposData, SetTiposData] = useState([]);
  const [DocumentosData, SetDocumentosData] = useState([]);

  const [profileId, SetProfileId] = useState(AuthService.getProfileId());

  const [TiposDocumentosData, SetTiposDocumentosData] = useState(new Map());
  const [TiposDocumentosOutputData, SetTiposDocumentosOutputData] = useState(
    new Map()
  );

  const [MessageShow, SetMessageShow] = useState(false);
  const [resMessage, SetResMessage] = useState('');
  const [PrintMessageShow, SetPrintMessageShow] = useState(false);
  const [resPrintMessage, SetResPrintMessage] = useState([]);
  const [disableSubmit, SetDisableSubmit] = useState(true);
  const [btnSubmitClassName, SetBtnSubmitClassName] =
    useState('btn btn-secondary');
  const [LoadingShow, SetLoadingShow] = useState(false);

  const label = {inputProps: {'aria-label': 'Checkbox demo'}};

  const handleMessageShow = () => {
    SetMessageShow(true);
  };
  const handleMessageClose = () => {
    SetMessageShow(false);
  };

  const handlePrintMessageShow = () => {
    SetPrintMessageShow(true);
  };
  const handlePrintMessageClose = () => {
    SetPrintMessageShow(false);
  };

  const handleLoadingShow = () => {
    SetLoadingShow(true);
  };
  const handleLoadingClose = () => {
    SetLoadingShow(false);
  };

  const [chkTipoPDFChecked, setChkTipoPDFChecked] = useState(false);
  const [chkTipoDOCXChecked, setChkTipoDOCXChecked] = useState(false);

  const handleTipoPDFChecked = () => {
    if (!chkTipoPDFChecked) {
      impTipos.set('pdf', true);
    } else {
      impTipos.delete('pdf');
    }
    onChangeLocal({name: 'impTipos', value: new Map(impTipos)});

    setChkTipoPDFChecked(!chkTipoPDFChecked);
  };

  const handleTipoDOCXChecked = () => {
    if (!chkTipoDOCXChecked) {
      impTipos.set('docx', true);
    } else {
      impTipos.delete('docx');
    }
    onChangeLocal({name: 'impTipos', value: new Map(impTipos)});

    setChkTipoDOCXChecked(!chkTipoDOCXChecked);
  };

  const handlePrintDocuments = (e) => {
    e.preventDefault();

    if (
      impVehiculo === 0 ||
      impVehiculo === '' ||
      impCliente === 0 ||
      impCliente === '' ||
      impTiposDocumentos.length === 0 ||
      impTipos.size === 0
    ) {
      SetResMessage('Por favor elija un cliente y un vehículo para continuar.');
      handleMessageShow();
    } else {
      handleMessageClose();
      sendPrintDocuments();
    }
  };

  const [selectedValueVehiculo, setSelectedValueVehiculo] = useState(null);
  const [selectedValueCliente, setSelectedValueCliente] = useState(null);

  // handle selection
  const handleChange = (e, modelo) => {
    onChangeLocal({name: modelo, value: e._id});
    switch (modelo) {
      case 'impCliente':
        setSelectedValueCliente(e);
        break;
      case 'impVehiculo':
        setSelectedValueVehiculo(e);
        break;
      default:
        break;
    }
  };

  const filterOptions = (inputValue, modelo) => {
    let result = [];
    switch (modelo) {
      case 'cliente':
        result = ClientesData.filter((i) =>
          removeDiacritics(i.cliNombreCompleto)
            .toLowerCase()
            .includes(removeDiacritics(inputValue).toLowerCase())
        );
        break;
      case 'vehiculo':
        result = VehiculosData.filter((i) =>
          removeDiacritics(
            ''
              .concat(i.vehMarca)
              .concat(' ')
              .concat(i.vehModelo)
              .concat(' ')
              .concat(i.vehAnoFabricacion)
              .concat(' ')
              .concat(i.vehColor)
              .concat(' - Placa: ')
              .concat(i.vehNoRegistroPlaca)
          )
            .toLowerCase()
            .includes(removeDiacritics(inputValue).toLowerCase())
        );
        break;
      default:
        result = [];
        break;
    }
    return result;
  };

  const loadOptionsClientes = (inputValue, callback) => {
    // console.log('loadOptionsClientes', {inputValue});
    callback(filterOptions(inputValue, 'cliente'));
  };

  const loadOptionsVehiculos = (inputValue, callback) => {
    callback(filterOptions(inputValue, 'vehiculo'));
  };

  const sendPrintDocuments = () => {
    handleLoadingShow();
    const url = Config.gatDomainName().concat('/impresiones/create');

    const body = {
      impVehiculo,
      impCliente,
      impTiposDocumentos,
      impDueno: profileId,
      impTipos: Array.from(impTipos.keys())
    };

    axios
      .post(url, body)
      .then((response) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') {
          mlCL('message:', message);
          handleLoadingClose();
          handleMessageShow(SetResMessage(message));
        } else {
          mlCL('data:', data);
          handleLoadingClose();
          handlePrintMessageShow(SetResPrintMessage(data));
          // navegar('/mostrar-clientes');
        }
      })
      .catch((err) => {
        mlCL('err:', err);
      });
  };

  const GetClientesData = () => {
    const url = Config.gatDomainName()
      .concat('/clientes/listapordueno/')
      .concat(profileId);
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') {
          mlCL('message:', message);
        } else {
          SetClientesData(data);
        }
      })
      .catch((err) => {
        mlCL('err:', err);
      });
  };

  const GetVehiculosData = () => {
    const url = Config.gatDomainName()
      .concat('/vehiculos/listapordueno/')
      .concat(profileId);
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') {
          mlCL('message:', message);
        } else {
          SetVehiculosData(data);
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

  const GetTiposDocumentosData = () => {
    const url = Config.gatDomainName().concat(
      '/documentos/buscaporvehiculocliente'
    );

    const body = {
      cliente: impCliente,
      vehiculo: impVehiculo
    };

    axios
      .post(url, body)
      .then((response) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') {
          // handleMessageShow(SetResMessage(message));
          mlCL('message:', message);
        } else {
          // mlCL('GetTiposDocumentosData() || data:', data);
          SetDocumentosData(data);

          TiposDocumentosData.clear();

          if (data.length > 0) {
            data.forEach((item) => {
              SetTiposDocumentosData(new Map());

              SetTiposDocumentosData(
                TiposDocumentosData.set(item._tipo_?.tipNombre, item)
              );
            });

            SetTiposDocumentosOutputData(TiposDocumentosData);
          } else {
            TiposDocumentosData.clear();
            SetTiposDocumentosData(new Map());
            // SetTiposDocumentosOutputData(TiposDocumentosData);
          }
        }
      })
      .catch((err) => {
        mlCL('err:', err);
      });
  };

  const onChangeLocal = (target) => {
    const {name, value, checked} = target;

    // mlCL('onChangeLocal(target):', {name, value, checked});

    switch (name) {
      case 'impVehiculo':
        setVehiculo(value);
        break;
      case 'impCliente':
        setCliente(value);
        break;
      case 'impTiposDocumentos':
        if (checked) {
          const arrayDocs = [...impTiposDocumentos, value];
          setTiposDocumentos(arrayDocs);
        } else {
          const arrayDocs = impTiposDocumentos.filter((val) => val !== value);
          setTiposDocumentos(arrayDocs);
        }
        break;
      case 'impTipos':
        setTipos(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (
      impVehiculo !== undefined &&
      impVehiculo !== 0 &&
      impVehiculo !== '0' &&
      impVehiculo !== '' &&
      impCliente !== undefined &&
      impCliente !== 0 &&
      impCliente !== '0' &&
      impCliente !== ''
    ) {
      // mlCL('impVehiculo: ', impVehiculo);
      // mlCL('impCliente: ', impCliente);
      // mlCL('TiposDocumentosOutputData: ', TiposDocumentosOutputData);

      GetTiposDocumentosData();
    } else {
      TiposDocumentosData.clear();
      SetTiposDocumentosData(new Map());
    }

    setTiposDocumentos([]);
  }, [impVehiculo, impCliente, TiposDocumentosOutputData]);

  useEffect(() => {
    console.log('impVehiculo:', impVehiculo);
    console.log('impCliente:', impCliente);
    console.log('impTiposDocumentos:', impTiposDocumentos);
    console.log('impTipos:', Array.from(impTipos.keys()));
    console.log('TiposDocumentosOutputData: ', TiposDocumentosOutputData);

    if (
      impVehiculo !== undefined &&
      impVehiculo !== 0 &&
      impVehiculo !== '0' &&
      impVehiculo !== '' &&
      impCliente !== undefined &&
      impCliente !== 0 &&
      impCliente !== '0' &&
      impCliente !== '' &&
      impTiposDocumentos.length > 0 &&
      impTipos.size > 0
    ) {
      SetDisableSubmit(false);
      SetBtnSubmitClassName('btn btn-primary');
    } else {
      SetDisableSubmit(true);
      SetBtnSubmitClassName('btn btn-secondary');
    }
  }, [impVehiculo, impCliente, impTiposDocumentos, impTipos]);

  useEffect(() => {
    GetClientesData();
    GetVehiculosData();
    GetTiposData();
  }, []);

  return (
    <div>
      <ContentHeader title="Imprimir Documentos" />
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
              {/* INICIO BODY */}
              <div>
                <div className="row formulario">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-sm-2 d-flex align-items-center">
                        <label htmlFor="impVehiculo">
                          <strong>Inventario:</strong>
                        </label>
                      </div>
                      <div className="col-sm-10">
                        <AsyncSelect
                          id="impVehiculo"
                          name="impVehiculo"
                          key="impVehiculoOptionK_0"
                          required
                          cacheOptions
                          defaultOptions
                          value={selectedValueVehiculo}
                          getOptionLabel={(e) => {
                            return e.vehMarca
                              .concat(' ')
                              .concat(e.vehModelo)
                              .concat(' ')
                              .concat(e.vehAnoFabricacion)
                              .concat(' ')
                              .concat(e.vehColor)
                              .concat(' - Placa: ')
                              .concat(e.vehNoRegistroPlaca);
                          }}
                          getOptionValue={(e) => e._id}
                          loadOptions={loadOptionsVehiculos}
                          // onInputChange={(e) => handleInputChange(e, 'clientes')}
                          onChange={(e) => handleChange(e, 'impVehiculo')}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-sm-2 d-flex align-items-center">
                        <label htmlFor="impCliente">
                          <strong>Cliente:</strong>
                        </label>
                      </div>
                      <div className="col-sm-10">
                        <AsyncSelect
                          id="impCliente"
                          name="impCliente"
                          key="impClienteOptionK_0"
                          required
                          cacheOptions
                          defaultOptions
                          value={selectedValueCliente}
                          getOptionLabel={(e) => {
                            return e.cliNombreCompleto
                              .concat(' - Cédula: ')
                              .concat(e.cliIdentificacion);
                          }}
                          getOptionValue={(e) => e._id}
                          loadOptions={loadOptionsClientes}
                          // onInputChange={(e) => handleInputChange(e, 'clientes')}
                          onChange={(e) => handleChange(e, 'impCliente')}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-sm-2 d-flex align-items-center">
                        <label htmlFor="impCliente">
                          <strong>Formato:</strong>
                        </label>
                      </div>
                      <div className="col-sm-10">
                        <div className="row">
                          <div
                            className="col-0 align-left"
                            // style={{border: '1px solid #000'}}
                          >
                            <Checkbox
                              id="chkTipoPDF"
                              name="chkTipoPDF"
                              checked={chkTipoPDFChecked}
                              onClick={handleTipoPDFChecked}
                              // {...label}
                              // defaultChecked
                              sx={{'& .MuiSvgIcon-root': {fontSize: 25}}}
                            />
                          </div>
                          <div
                            className="col-0 align-left"
                            // style={{border: '1px solid #000'}}
                          >
                            <button
                              type="button"
                              onClick={handleTipoPDFChecked}
                              style={{border: '0px', backgroundColor: 'white'}}
                            >
                              <img
                                className="mx-auto d-block"
                                id="imgTipoPDF"
                                name="imgTipoPDF"
                                key="imgTipoPDF"
                                alt="PDF"
                                src="./img/pdf-download.png"
                                width={25}
                              />
                            </button>
                          </div>
                          <div
                            className="col-0 align-left"
                            // style={{border: '1px solid #000'}}
                          >
                            <Checkbox
                              id="chkTipoDOCX"
                              name="chkTipoDOCX"
                              checked={chkTipoDOCXChecked}
                              onClick={handleTipoDOCXChecked}
                              // {...label}
                              // defaultChecked
                              sx={{'& .MuiSvgIcon-root': {fontSize: 25}}}
                            />
                          </div>
                          <div
                            className="col-0 align-left"
                            // style={{border: '1px solid #000'}}
                          >
                            <button
                              type="button"
                              onClick={handleTipoDOCXChecked}
                              style={{border: '0px', backgroundColor: 'white'}}
                            >
                              <img
                                className="mx-auto d-block"
                                id="imgTipoDOCX"
                                key="imgTipoDOCX"
                                name="imgTipoDOCX"
                                alt="DOCX"
                                src="./img/docx-download.png"
                                width={25}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="row documentos">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-sm-2 d-flex align-items-top">
                        <label htmlFor="impTiposDocumentos">
                          <strong>Documentos:</strong>
                        </label>
                      </div>
                      <div className="col-0 p-0 col-sm-10">
                        {Array.from(TiposDocumentosOutputData.values()).map(
                          (item) => (
                            <div
                              className="form-check form-check-inline"
                              key={'impTipoDocumentoKD_'.concat(item._id)}
                            >
                              <Checkbox
                                className="form-check-input"
                                key={'cbImpTipoDocumentoKI_'.concat(item._id)}
                                id={'impTipoDocumento_'.concat(item._id)}
                                name="impTiposDocumentos"
                                value={item._id}
                                onChange={(e) => onChangeLocal(e.target)}
                                label={item._tipo_.tipNombre}
                                sx={{'& .MuiSvgIcon-root': {fontSize: 25}}}
                              />
                              {/* <input
                                className="form-check-input"
                                type="checkbox"
                                id={'impTipoDocumento_'.concat(item._id)}
                                key={'impTipoDocumentoKI_'.concat(item._id)}
                                name="impTiposDocumentos"
                                defaultValue={item._id}
                                onChange={(e) => onChangeLocal(e.target)}
                              /> */}
                              <label
                                key={'impTipoDocumentoKL_'.concat(item._id)}
                                className="form-check-label"
                                htmlFor={'impTipoDocumento_'.concat(item._id)}
                              >
                                {item._tipo_.tipNombre}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 d-flex align-items-top">
                        <label htmlFor="btnImprimir">&nbsp;</label>
                      </div>
                      <div className="col-sm-6">
                        <div className="row">
                          <div className="col-sm-6">
                            <Button
                              id="btnImprimir"
                              type="submit"
                              disabled={disableSubmit}
                              className={btnSubmitClassName}
                              onClick={handlePrintDocuments}
                            >
                              Generar Documentos
                            </Button>
                          </div>
                          <div className="col-sm-6">
                            <Loading show={LoadingShow} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                    <Modal.Title>Mensaje</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div>
                      <div className="">{resMessage}</div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleMessageClose}>
                      Cerrar
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              {/* {resPrintMessage.length >
                0( */}
              <div className="model-box-view">
                <Modal
                  show={PrintMessageShow}
                  onHide={handlePrintMessageClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Documentos Generados</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="row separador">
                      <div className="col-lg-12">&nbsp;</div>
                    </div>
                    <div className="row documentos">
                      {/* <div className="col-lg-12">
                        <p>
                          <strong>Documentos</strong>
                        </p>
                        <hr />
                      </div> */}
                    </div>
                    <div className="row mb-2">
                      {resPrintMessage.length > 0 &&
                        resPrintMessage.map((item) => (
                          <div
                            className="col-sm-3 m-2 p-2 text-center border border-secondary rounded"
                            id={'divITipCodigo_'.concat(item.tipo)}
                            key={'divKTipCodigo_'.concat(item.tipo)}
                          >
                            <span
                              className="d-flex small justify-content-center"
                              id={'spanITipCodigo_'.concat(item.tipo)}
                              key={'spanKTipCodigo_'.concat(item.tipo)}
                            >
                              <strong>{item.tipo}</strong>
                            </span>
                            <div className="row mt-2">
                              {item?.documentos.length > 0 &&
                                item?.documentos.map((bDoc) => (
                                  <div
                                    className={'col-sm-'
                                      .concat(12 / item?.documentos.length)
                                      .concat(' text-center')}
                                    id={'divITipCodigo_'.concat(item.tipo)}
                                    key={'divKTipCodigo_'.concat(item.tipo)}
                                  >
                                    <a
                                      href={bDoc.documento}
                                      target="_blank"
                                      rel="noreferrer"
                                      key={'aKTipCodigoBD_'.concat(bDoc.doc)}
                                    >
                                      <img
                                        className="mx-auto d-block"
                                        id={'imgITipCodigoBD_'.concat(bDoc.doc)}
                                        key={'imgKTipCodigoBD_'.concat(
                                          bDoc.doc
                                        )}
                                        name={bDoc.doc}
                                        alt={bDoc.doc}
                                        src={
                                          bDoc.doc === 'docx'
                                            ? './img/docx-download.png'
                                            : './img/pdf-download.png'
                                        }
                                        width={20}
                                      />
                                    </a>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={handlePrintMessageClose}
                    >
                      Cerrar
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              {/* )} */}
              {/* FINAL BODY */}
            </div>
            {/* <div className="model-box-view"> */}
            {/* <Modal
                show={LoadingShow}
                onHide={handleLoadingClose}
                backdrop="static"
                keyboard={false}
              > */}
            {/* <Modal.Header closeButton>
                  <Modal.Title>Mensaje</Modal.Title>
                </Modal.Header> */}
            {/* <Modal.Body> */}
            {/* <div>
                
              </div> */}
            {/* </Modal.Body> */}
            {/* <Modal.Footer>
                  <Button variant="secondary" onClick={handleLoadingClose}>
                    Cerrar
                  </Button>
                </Modal.Footer> */}
            {/* </Modal> */}
            {/* </div> */}
            {/* <div className="card-footer">&nbsp;</div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImprimirDocumentos;
