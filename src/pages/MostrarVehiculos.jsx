/* eslint no-underscore-dangle: 0 */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/no-unknown-property */

import React, {useEffect, useState, useContext, useMemo} from 'react';
import _ from 'underscore';
import {ContentHeader} from '@components';
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import {styled} from '@mui/material/styles';
import DataTable, {createTheme} from 'react-data-table-component';
import {mlCL, omoment} from '@app/utils/helpers';
import IconButton from '@mui/material/IconButton';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import FilterComponent from '@app/components/data-table/FilterComponent';
import Loading from '@app/components/loadings/Loading';
import VehiculosFormBody from '@app/components/forms/VehiculosFormBody';
import AppContext from '@app/contexts/AppContext';
import * as AuthService from '@app/services/auth';
import * as Config from '@app/utils/config';

createTheme('solarized', {
  text: {
    primary: 'black'
  },
  background: {
    default: 'white'
  },
  striped: {
    default: '#FAFAFA',
    text: 'rgba(0, 0, 0, 0.87)'
  },
  highlightOnHover: {
    default: 'rgba(0, 0, 0, .7)',
    text: '#FFFFFF'
  }
});

const HtmlTooltip = styled(({className, ...props}) => (
  <Tooltip {...props} classes={{popper: className}} />
))(({theme}) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#dce9f7',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}));

const MostrarVehículos = () => {
  const AppCtx = useContext(AppContext);

  const navegar = useNavigate();

  const [ViewShow, SetViewShow] = useState(false);
  const handleViewShow = (row, boolDelete) => {
    if (boolDelete) {
      SetId(row._id);
    } else {
      SetRowDataState(row);
    }
    SetRowData(row);
    SetDelete(boolDelete);
    SetViewShow(true);
  };
  const handleViewClose = () => {
    SetViewShow(false);
  };

  const [EditShow, SetEditShow] = useState(false);
  const handleEditShow = (row) => {
    SetRowData(row);
    SetId(row._id);
    SetRowDataState(row);
    SetEditShow(true);
    const mapEFV = new Map(
      row?.vehCamposAdicionales.map((campo) => {
        console.log({campo});
        return [campo.name, campo.value];
      })
    );

    const mapEFC = new Map();

    const arrEFC = Array.from(ExtraFieldsConfig.keys());
    arrEFC.forEach((efc) => {
      const efcObj = ExtraFieldsConfig.get(efc);
      efcObj.value = mapEFV.get(efc);
      mapEFC.set(efc, efcObj);
      console.log(mapEFC.get(efc));
    });
    setExtraFieldsConfig(mapEFC);
  };
  const handleEditClose = () => {
    SetEditShow(false);
  };

  const [DisclaimerShow, SetDisclaimerShow] = useState(false);
  const handleDisclaimerShow = () => {
    SetDisclaimerShow(true);
  };
  const handleDisclaimerClose = () => {
    SetDisclaimerShow(false);
  };

  const handlePublishInventory = (row, rrss) => {
    if (['marketplace', 'supercarros'].includes(rrss)) {
      handleMessageShow(SetResMessage('Próximamente disponible... 🙌'));
    } else {
      SetCurrentRowData(row);
      SetCurrentRRSSData(rrss);
      handleDisclaimerShow();
    }
  };

  const handlePublishInventorySave = () => {
    if (CurrentRowData && CurrentRRSSData) {
      publishInventory({inventario: CurrentRowData, to: CurrentRRSSData});
    }
  };

  const handleAddNewShow = () => {
    navegar('/agregar-vehiculo');
  };

  const handleAddNew = (e) => {
    e.preventDefault();
    navegar('/profile?activetab=SUBSCRIPTION');
  };

  const [MessageShow, SetMessageShow] = useState(false);
  const handleMessageShow = () => {
    SetMessageShow(true);
  };
  const handleMessageClose = () => {
    SetMessageShow(false);
  };

  const [ExtraFields, setExtraFields] = useState(new Map());

  const [ExtraFieldsConfig, setExtraFieldsConfig] = useState(new Map());
  const [ExtraFieldsValues, setExtraFieldsValues] = useState(new Map());

  const [Data, SetData] = useState([]);
  const [RowData, SetRowData] = useState([]);
  const [CurrentRowData, SetCurrentRowData] = useState({});
  const [CurrentRRSSData, SetCurrentRRSSData] = useState('');
  const [IsPublishing, SetIsPublishing] = useState(false);
  const [IsPublishingIG, SetIsPublishingIG] = useState(false);
  const [IsPublishingFB, SetIsPublishingFB] = useState(false);

  // Define here local state that store the form data //ROMG
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

  const [Delete, SetDelete] = useState('');
  const [_id, SetId] = useState('');
  const [resMessage, SetResMessage] = useState('');

  const [profileId, SetProfileId] = useState(AuthService.getProfileId());

  // const [PlantillasData, SetPlantillasData] = useState([]);

  const columns = [
    {
      name: 'Placa',
      selector: (row) => row.vehNoRegistroPlaca,
      width: '90px'
    },
    {
      name: 'Chasis',
      selector: (row) => row.vehChasis,
      width: '150px'
    },
    {
      name: 'Marca',
      selector: (row) => row.vehMarca,
      width: '100px'
    },
    {
      name: 'Modelo',
      selector: (row) => row.vehModelo,
      width: '100px'
    },
    // {
    //   name: 'Estado',
    //   selector: (row) => row.vehStatusVehiculo
    // },
    {
      name: 'Tipo Emisión',
      selector: (row) => row.vehTipoEmision,
      width: '100px'
    },
    {
      name: 'Tipo',
      selector: (row) => row.vehTipoVehiculo,
      width: '90px'
    },
    {
      name: 'Año Fab.',
      selector: (row) => row.vehAnoFabricacion,
      width: '80px'
    },
    {
      name: 'Color',
      selector: (row) => row.vehColor,
      width: '70px'
    },
    {
      name: 'Precio',
      selector: (row) =>
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0
        }).format(row.vehPrecio),
      width: '100px'
    },
    {
      name: 'Costo',
      selector: (row) =>
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0
        }).format(row.vehCosto),
      width: '100px'
    },
    {
      name: 'Estado',
      selector: (row) => row.vehEstado,
      width: '90px'
    },
    // {
    //   name: 'Matrícula',
    //   selector: (row) => row.vehFotoMatricula
    // },
    {
      name: 'Fecha Creación',
      selector: (row) => (
        <div
          // className="col-2 d-flex align-items-center"
          // style={{
          //   minWidth: 300
          // }}
          nowrap="true"
        >
          {omoment(row.vehFechaCreacion)}
        </div>
      ),
      width: '170px'
    },
    // {
    //   name: 'Fecha Fabricación',
    //   selector: (row) => row.vehFechaModificacion
    // },
    {
      name: 'Acciones',
      cell: (row) => (
        // <div className="container">
        <div
          className="col-2 d-flex align-items-center"
          style={{
            minWidth: 150
          }}
          nowrap="true"
        >
          <IconButton
            aria-label="view"
            size="sm"
            color="primary"
            onClick={() => {
              handleViewShow(row, false);
            }}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            size="sm"
            color="warning"
            onClick={() => {
              handleEditShow(row);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="publishig"
            size="sm"
            color="primary"
            onClick={() => {
              handlePublishInventory(row, 'instagram');
            }}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            aria-label="publishfb"
            size="sm"
            color="primary"
            onClick={() => {
              handlePublishInventory(row, 'marketplace');
            }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            aria-label="publishig"
            size="sm"
            color="primary"
            onClick={() => {
              handlePublishInventory(row, 'supercarros');
            }}
          >
            <img
              className=""
              src="/img/supercarros.png"
              alt=""
              height="22"
              width="22"
            />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="error"
            size="sm"
            onClick={() => {
              handleViewShow(row, true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
        // </div>
      ),
      ignoreRowClick: true,
      allowOverflow: false,
      button: true
    }
  ];

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = Data.filter(
    (item) =>
      (item.vehNoRegistroPlaca &&
        item.vehNoRegistroPlaca
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (item.vehChasis &&
        item.vehChasis.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.vehTipoEmision &&
        item.vehTipoEmision.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.vehTipoVehiculo &&
        item.vehTipoVehiculo
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (item.vehEstado &&
        item.vehEstado.toLowerCase().includes(filterText.toLowerCase()))
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

  const onChangeCB = (cbData) => {
    console.log('onChangeCB() || cbData:', cbData);

    const {name, value} = cbData;

    setFieldsValues(name, value);

    // validateFormData();
  };

  const setFieldsValues = (name, value) => {
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

  const SetRowDataState = (rData) => {
    _.each(rData, (value, key) => {
      onChangeCB({name: key, value});
    });
  };

  const GetExtraFieldsData = (ctxProId) => {
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
          data?.forEach((value) => {
            const {camCodigo, camNombre} = value;
            const camCodigoKey = 'doccumi_cf_'.concat(
              camCodigo.replace(',', '')
            );
            mapPHF.set(camCodigoKey, {
              name: camCodigoKey,
              label: camNombre.replace(',', ''),
              value: '',
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

  const GetAllData = (ctxProId) => {
    const url = Config.gatDomainName()
      .concat('/vehiculos/listapordueno/')
      .concat(ctxProId);
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') {
          mlCL('message:', message);
        } else {
          SetData(data);
        }
      })
      .catch((err) => {
        mlCL('err:', err);
      });
  };

  const handleEdit = () => {
    // AppCtx.setSubmitedUploadFilesData(true);
    submitData();
  };

  const submitData = () => {
    const url = Config.gatDomainName().concat('/vehiculos/update');
    const body = {
      _id,
      vehNoRegistroPlaca,
      vehChasis,
      vehStatusVehiculo,
      vehTipoEmision,
      vehTipoVehiculo,
      vehAnoFabricacion,
      vehMarca,
      vehModelo,
      vehColor,
      vehPrecio,
      vehCosto,
      vehFotoMatricula,
      vehFotos,
      vehDueno,
      vehCamposAdicionales,
      vehEstado
    };

    axios
      .post(url, body)
      .then((response) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') {
          mlCL('message:', message);
        } else {
          mlCL('data:', data);
          handleEditClose();
          GetAllData(profileId);
          AppCtx.loadInitData();
          handleMessageShow(SetResMessage(message));
        }
      })
      .catch((err) => {
        mlCL('err:', err);
      });
  };

  const handleDelete = () => {
    const url = Config.gatDomainName().concat(`/vehiculos/delete/${_id}`);
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') {
          mlCL('message:', message);
        } else {
          mlCL('data:', data);
          handleViewClose();
          GetAllData(profileId);
          AppCtx.loadInitData();
          handleMessageShow(SetResMessage(message));
        }
      })
      .catch((err) => {
        mlCL('err:', err);
      });
  };

  const publishInventory = (ctx) => {
    SetIsPublishing(true);
    const url = Config.gatDomainName().concat('/publicaciones/publish');
    const body = {
      inventario: ctx.inventario,
      to: ctx.to
    };

    axios
      .post(url, body)
      .then((response) => {
        const {success, message, result} = response.data;
        if (!success) {
          mlCL('message:', message);
          SetResMessage(message);
          handleMessageShow();
        } else {
          mlCL('publishInventory(result):', result);
          // handleEditClose();
          // GetAllData(profileId);
          handleDisclaimerClose();
          SetIsPublishing(false);
          SetResMessage(message);
          handleMessageShow();
        }
      })
      .catch((err) => {
        mlCL('err:', err);
      });
  };

  useEffect(() => {
    SetProfileId(profileId);
  }, []);

  useEffect(() => {
    GetAllData(profileId);
    GetExtraFieldsData(profileId);
    AppCtx.loadInitData();
  }, [profileId]);

  return (
    <div>
      <ContentHeader title="Mostrar Inventario" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="row">
              <div className="mt-3 mb-3 ml-4">
                {AppCtx.StripeData.has_active_subscription ||
                Data.length === 0 ? (
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleAddNewShow();
                    }}
                  >
                    <i className="fa fa-plu">&nbsp;</i>
                    Agregar Nuevo Inventario
                  </Button>
                ) : (
                  <div>
                    <HtmlTooltip
                      placement="top"
                      title={
                        <React.Fragment>
                          <Typography color="inherit">
                            Para agregar más inventarios debes activar un plan
                            de servicio.
                          </Typography>
                        </React.Fragment>
                      }
                    >
                      <div className="container-fluid">
                        <div className="row">
                          <div className="sm-6">
                            <Button variant="secondary" disabled>
                              <i className="fa fa-plu">&nbsp;</i>
                              Agregar Nuevo Inventario
                            </Button>
                          </div>
                          <InfoIcon
                            color="primary"
                            className="mt-2"
                            style={{marginLeft: 10}}
                          />
                          <div className="sm-6 ml-2 mt-2">
                            <Link
                              to=""
                              variant="contained"
                              color="primary"
                              onClick={handleAddNew}
                            >
                              <strong>Activar un plan de servicio</strong>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </HtmlTooltip>
                  </div>
                )}
              </div>
            </div>
            <div className="row col-12">
              <div className="table-responsive ml-3 mr-1">
                <DataTable
                  // title="Contact List"
                  style={{maxWidth: '100% !important'}}
                  columns={columns}
                  data={filteredItems}
                  // responsive
                  striped
                  pagination
                  paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                  subHeader
                  subHeaderComponent={subHeaderComponentMemo}
                  // onSelectedRowsChange={handleTemplateChange}
                  // selectableRows
                  // selectableRowSelected={rowSelectCritera}
                  selectableRowsRadio
                  selectableRowsHighlight
                  selectableRowsSingle
                  persistTableHead
                />
              </div>
            </div>
            <div className="model-box-view">
              <Modal
                show={ViewShow}
                onHide={handleViewClose}
                backdrop="static"
                keyboard={false}
                size="lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Ver Datos Inventario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {ExtraFieldsConfig && ( // && ExtraFieldsConfig.size > 0
                    <VehiculosFormBody
                      onChangeCB={onChangeCB}
                      RowData={RowData}
                      cxcReadOnly="true"
                      cxcAction="viewing"
                      ExtraFieldsConfig={ExtraFieldsConfig}
                      ConfiguracionesData={AppCtx.ConfiguracionesData}
                    >
                      &nbsp;
                    </VehiculosFormBody>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <div className="container">
                    <div className="row">
                      <div className="col text-left">
                        {Delete && (
                          <Button
                            type="submit"
                            className="btn btn-danger"
                            onClick={handleDelete}
                          >
                            Borrar Inventario
                          </Button>
                        )}
                      </div>
                      <div className="col">&nbsp;</div>
                      <div className="col text-right">
                        <Button variant="secondary" onClick={handleViewClose}>
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
                show={EditShow}
                onHide={handleEditClose}
                backdrop="static"
                keyboard={false}
                size="lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Editar Inventario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {ExtraFieldsConfig && ( // && ExtraFieldsConfig.size > 0
                    <VehiculosFormBody
                      onChangeCB={onChangeCB}
                      RowData={RowData}
                      cxcReadOnly="false"
                      cxcAction="editing"
                      ExtraFieldsConfig={ExtraFieldsConfig}
                      ConfiguracionesData={AppCtx.ConfiguracionesData}
                    >
                      &nbsp;
                    </VehiculosFormBody>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <div className="container">
                    <div className="row">
                      <div className="col text-left">
                        <Button
                          type="submit"
                          className="btn tn-success"
                          onClick={handleEdit}
                        >
                          Guardar
                        </Button>
                      </div>
                      <div className="col">&nbsp;</div>
                      <div className="col text-right">
                        <Button variant="secondary" onClick={handleEditClose}>
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
            <div className="model-box-view">
              <Modal
                show={DisclaimerShow}
                onHide={handleDisclaimerClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Advertencia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {IsPublishing ? (
                    <div className="col-sm-12">
                      <Loading show={IsPublishing} />
                    </div>
                  ) : (
                    <div>
                      <div className="">
                        Reconozco y acepto que esta función se encuentra en modo
                        BETA y que el uso excesivo de la misma podría resultar
                        en la suspención de mi cuenta de Instagram y/o Facebook
                        por parte de Meta.
                      </div>
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleDisclaimerClose}>
                    Cerrar
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handlePublishInventorySave}
                  >
                    Publicar
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MostrarVehículos;
