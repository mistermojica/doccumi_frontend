/* eslint no-unused-vars: off */
/* eslint no-console: off */
/* eslint no-underscore-dangle: off */

import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {ContentHeader} from '@components';
// import {Button, Modal, FormCheck} from 'react-bootstrap';
import {Button, Modal} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import {mlCL, removeDiacritics} from '@app/utils/helpers';
import * as AuthService from '@app/services/auth';
import * as Config from '@app/utils/config';
import FilterComponent from '@app/components/data-table/FilterComponent';
import AsyncSelect from 'react-select/async';

const AsignarPlantillas = () => {
  const navegar = useNavigate();

  const [vehiculo, setVehiculo] = useState('');
  const [cliente, setCliente] = useState('');
  const [plantilla, setPlantilla] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [tipoId, setTipoId] = useState('');
  const [forma, setForma] = useState({
    plantilla: '',
    tipoId: '',
    tipoDocumento: ''
  });
  // const [documentoId, setDocumentoId] = useState('');
  const [tipoPlantilla, setTipoPlantillaId] = useState('');

  const [ClientesData, SetClientesData] = useState([]);
  const [VehiculosData, SetVehiculosData] = useState([]);
  const [TiposData, SetTiposData] = useState([]);
  const [PlantillasData, SetPlantillasData] = useState([]);
  const [DocumentosData, SetDocumentosData] = useState([]);

  const [profileId, SetProfileId] = useState(AuthService.getProfileId());

  const [DocumentosPlantillasIdsData, SetDocumentosPlantillasIdsData] =
    useState(new Map());

  const columns = [
    {
      name: 'Nombre',
      selector: (row) => row.plaNombre
    },
    {
      name: 'Id',
      selector: (row) => row.id
    }
  ];

  const rowSelectCritera = (row) => {
    const keyTCV = tipoPlantilla
      .concat('_')
      .concat(cliente)
      .concat('_')
      .concat(vehiculo);

    const selected = DocumentosPlantillasIdsData.get(keyTCV);
    // mlCL('rowSelectCritera() || keyTCV:', keyTCV);
    // mlCL('rowSelectCritera() || selected:', selected);
    // mlCL('rowSelectCritera() || row:', row);
    let result = false;
    if (selected !== undefined) {
      // mlCL('rowSelectCritera() || tipoPlantilla:', tipoPlantilla);
      // mlCL(
      //   'rowSelectCritera() || DocumentosPlantillasIdsData:',
      //   DocumentosPlantillasIdsData
      // );
      if (row.id === selected) {
        result = true;
      }
    }
    return result;
  };

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = PlantillasData.filter(
    (item) =>
      item.plaNombre &&
      item.plaNombre.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const [selectedValueVehiculo, setSelectedValueVehiculo] = useState(null);
  const [selectedValueCliente, setSelectedValueCliente] = useState(null);

  // handle selection
  const handleChange = (e, modelo) => {
    onChangeLocal({name: modelo, value: e._id});
    switch (modelo) {
      case 'cliente':
        setSelectedValueCliente(e);
        break;
      case 'vehiculo':
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

  const [MessageShow, SetMessageShow] = useState(false);

  const handleMessageShow = () => {
    SetMessageShow(true);
  };
  const handleMessageClose = () => {
    SetMessageShow(false);
  };

  const [TemplateShow, SetTemplateShow] = useState(false);

  const handleTemplateShow = () => {
    SetTemplateShow(true);
  };
  const handleTemplateClose = () => {
    SetTemplateShow(false);
  };

  const handleTipoDocumento = (e) => {
    e.preventDefault();
    // mlCL('vehiculo:', vehiculo);
    // mlCL('cliente:', cliente);
    if (vehiculo === 0 || vehiculo === '' || cliente === 0 || cliente === '') {
      SetResMessage('Por favor elija un cliente y un vehículo para continuar.');
      handleMessageShow();
    } else {
      handleMessageClose();
      handleTemplateShow(true);
      GetPlantillasData(e.target.id);
      setTipoPlantillaId(e.target.id);
      console.log('e.target.id:', e.target.id);
    }
  };

  const handleTemplateChange = useCallback(
    (e) => {
      const plantillaId = e?.selectedRows[0]?.id;
      const plaTipoDocumento = e?.selectedRows[0]?.plaTipoDocumento;
      const plaTipoId = e?.selectedRows[0]?.plaTipoId;
      // mlCL('plaTipoDocumento:', plaTipoDocumento);

      forma.plantilla = plantillaId;
      forma.tipoDocumento = plaTipoDocumento;
      forma.tipoId = plaTipoId;
      setForma(forma);

      mlCL('forma:', forma);
      // setPlantilla(plantillaId);
      // setTipoDocumento(plaTipoDocumento);
    },
    [
      setPlantilla,
      setTipoDocumento,
      setTipoId,
      plantilla,
      tipoDocumento,
      tipoId
    ]
  );

  const [resMessage, SetResMessage] = useState('');

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

  const GetPlantillasData = (tipoId) => {
    const url = Config.gatDomainName()
      .concat('/plantillas/findbytipodueno/')
      .concat(tipoId)
      .concat('/')
      .concat(profileId);

    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') {
          handleMessageShow(SetResMessage(message));
        } else {
          SetPlantillasData(data);
        }
      })
      .catch((err) => {
        mlCL('err:', err);
      });
  };

  const GetDocumentosData = () => {
    const url = Config.gatDomainName().concat(
      '/documentos/buscaporvehiculocliente'
    );

    const body = {
      cliente,
      vehiculo
    };

    axios
      .post(url, body)
      .then((response) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') {
          handleMessageShow(SetResMessage(message));
        } else {
          SetDocumentosData(data);
          data.forEach((item) => {
            const keyTCV = item.docTipoId
              .concat('_')
              .concat(cliente)
              .concat('_')
              .concat(vehiculo);

            mlCL('GetDocumentosData() || item:', item);

            SetDocumentosPlantillasIdsData(new Map());

            SetDocumentosPlantillasIdsData(
              DocumentosPlantillasIdsData.set(keyTCV, item.docPlantilla)
            );
          });
        }
      })
      .catch((err) => {
        mlCL('err:', err);
      });
  };

  const handleProcessDocument = () => {
    const accion = 'create';

    const url = Config.gatDomainName().concat('/documentos/').concat(accion);

    const body = {
      docCliente: cliente,
      docVehiculo: vehiculo,
      docPlantilla: forma.plantilla,
      docNombre: '',
      docTipoDocumento: forma.tipoDocumento,
      docTipoId: forma.tipoId,
      docContenido: '',
      docEstado: 'activo'
    };

    axios
      .post(url, body)
      .then((response) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') {
          mlCL('message:', message);
        } else {
          // setDocumentoId(data.id);
          handleTemplateClose();
          GetDocumentosData();
          // navegar('/expediente-venta');
        }
      })
      .catch((err) => {
        mlCL('err:', err);
        navegar('/expediente-venta'); // BORRAR
      });
  };

  const onChangeLocal = (target) => {
    const {name, value} = target;

    switch (name) {
      case 'vehiculo':
        setVehiculo(value);
        break;
      case 'cliente':
        setCliente(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (
      vehiculo !== undefined &&
      vehiculo !== 0 &&
      vehiculo !== '0' &&
      vehiculo !== '' &&
      cliente !== undefined &&
      cliente !== 0 &&
      cliente !== '0' &&
      cliente !== ''
    ) {
      // mlCL('useEffect() vehiculo: ', vehiculo);
      // mlCL('useEffect() cliente: ', cliente);
      // mlCL('useEffect() tipoPlantilla: ', tipoPlantilla);
      // mlCL(
      //   'useEffect() DocumentosPlantillasIdsData: ',
      //   DocumentosPlantillasIdsData
      // );
      // mlCL('useEffect() DocumentosData: ', DocumentosData);

      GetDocumentosData();
    }
  }, [vehiculo, cliente, tipoPlantilla]);

  useEffect(() => {
    SetProfileId(AuthService.getProfileId());
    GetClientesData();
    GetVehiculosData();
    GetTiposData();
  }, []);

  useEffect(() => {
    console.log('useEffect:', {selectedValueVehiculo, selectedValueCliente});
    console.log('useEffect:', {cliente, vehiculo});
  }, [selectedValueVehiculo, selectedValueCliente]);

  return (
    <div>
      <ContentHeader title="Asignar Plantillas" />
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
                <div className="header clearfix">
                  <p className="mt-3 mb-3">
                    Por favor seleccione un vehículo y un cliente para asignar
                    las plantillas.
                  </p>
                </div>
                <div className="row formulario">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="vehiculo">
                          <strong>Inventario</strong>
                        </label>
                        <AsyncSelect
                          id="vehiculo"
                          name="vehiculo"
                          required
                          cacheOptions
                          defaultOptions
                          value={selectedValueVehiculo}
                          getOptionLabel={(e) => {
                            console.log({e});
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
                          onChange={(e) => handleChange(e, 'vehiculo')}
                        />
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="cliente">
                          <strong>Cliente</strong>
                        </label>
                        <AsyncSelect
                          id="cliente"
                          name="cliente"
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
                          onChange={(e) => handleChange(e, 'cliente')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row separador">
                  <div className="col-lg-12">&nbsp;</div>
                </div>
                <div className="row documentos">
                  <div className="col-lg-12">
                    <p>
                      <strong>Documentos</strong>
                    </p>
                    <hr />
                  </div>
                </div>
                <div className="row mb-3 mt-2">
                  {TiposData.map((item) => (
                    <div
                      className="col-sm-3 mt-3 text-center"
                      id={'divITipCodigo_'.concat(item.tipCodigo)}
                      key={'divKTipCodigo_'.concat(item.tipCodigo)}
                    >
                      <span
                        className="d-flex small justify-content-center mb-2"
                        id={'spanITipCodigo_'.concat(item.tipCodigo)}
                        key={'spanKTipCodigo_'.concat(item.tipCodigo)}
                      >
                        {item.tipNombre}
                      </span>
                      <Link
                        to=""
                        onClick={handleTipoDocumento}
                        className="d-block"
                        id={'linkITipCodigo_'.concat(item.tipCodigo)}
                        key={'linkKTipCodigo_'.concat(item.tipCodigo)}
                      >
                        <img
                          className="mx-auto d-block"
                          key={'imgKTipCodigo_'.concat(item.tipCodigo)}
                          id={item._id}
                          name={item.tipCodigo}
                          alt={item.tipNombre}
                          src="https://media-public.canva.com/MADpji6iti0/1/thumbnail.png"
                          width={50}
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <div className="model-box-view">
                <Modal
                  show={TemplateShow}
                  onHide={handleTemplateClose}
                  backdrop="static"
                  keyboard={false}
                  size="lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Selector de plantilla</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div>
                      <span className="d-flex justify-content-left mb-2">
                        Por favor elija la plantilla correspondiente para este
                        tipo de documento.
                      </span>
                      <DataTable
                        // title="Contact List"
                        columns={columns}
                        data={filteredItems}
                        pagination
                        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        onSelectedRowsChange={handleTemplateChange}
                        selectableRows
                        selectableRowSelected={rowSelectCritera}
                        selectableRowsRadio
                        selectableRowsHighlight
                        selectableRowsSingle
                        persistTableHead
                      />
                      {/* <div className="">{resMessage}</div> */}
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <div className="container">
                      <div className="row">
                        <div className="col-5">
                          <Button
                            type="submit"
                            className="btn tn-success"
                            onClick={handleProcessDocument}
                          >
                            Guardar
                          </Button>
                        </div>
                        <div className="col-5">&nbsp;</div>
                        <div className="col-2">
                          <Button
                            variant="secondary"
                            onClick={handleTemplateClose}
                          >
                            Cerrar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Modal.Footer>
                </Modal>
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
                    <Button variant="secondary" onClick={handleMessageClose}>
                      Cerrar
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              {/* FINAL BODY */}
            </div>
            {/* <div className="card-footer">&nbsp;</div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AsignarPlantillas;
