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
  Info as InfoIcon
} from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import FilterComponent from '@app/components/data-table/FilterComponent';
import ClientesFormBody from '@app/components/forms/ClientesFormBody';
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

const MostrarClientes = () => {
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
  };
  const handleEditClose = () => {
    SetEditShow(false);
  };

  const handleAddNewShow = () => {
    navegar('/agregar-cliente');
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

  const [Data, SetData] = useState([]);
  const [RowData, SetRowData] = useState([]);

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

  const [Delete, SetDelete] = useState('');
  const [_id, SetId] = useState('');
  const [resMessage, SetResMessage] = useState('');

  const [profileId, SetProfileId] = useState(AuthService.getProfileId());

  // const [PlantillasData, SetPlantillasData] = useState([]);

  const columns = [
    {
      name: 'Identificación',
      selector: (row) => row.cliIdentificacion
    },
    {
      name: 'Nombre',
      selector: (row) => row.cliNombreCompleto
    },
    // {
    //   name: 'Estado',
    //   selector: (row) => row.cliEstado
    // },
    {
      name: 'Teléfono',
      selector: (row) => row.cliTelefono
    },
    {
      name: 'Correo Electrónico',
      selector: (row) => row.cliCorreoElectronico
    },
    {
      name: 'Dirección',
      selector: (row) => row.cliDireccion
    },
    {
      name: 'Ciudad',
      selector: (row) => row.cliCiudad
    },
    {
      name: 'Sector',
      selector: (row) => row.cliSector
    },
    // {
    //   name: 'País',
    //   selector: (row) => row.cliPais
    // },
    // {
    //   name: 'Nacionalidad',
    //   selector: (row) => row.cliNacionalidad
    // },
    {
      name: 'Fecha Creación',
      selector: (row) => (
        <div
          // className="col-2 d-flex align-items-center"
          style={{
            minWidth: 200
          }}
          nowrap="true"
        >
          {omoment(row.cliFechaCreacion)}
        </div>
      )
    },
    // {
    //   name: 'Fecha Fabricación',
    //   selector: (row) => row.cliFechaModificacion
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
      (item.cliIdentificacion &&
        item.cliIdentificacion
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (item.cliNombreCompleto &&
        item.cliNombreCompleto
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (item.cliTelefono &&
        item.cliTelefono.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.cliCiudad &&
        item.cliCiudad.toLowerCase().includes(filterText.toLowerCase()))
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
    const {name, value} = cbData;

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

  const SetRowDataState = (rData) => {
    _.each(rData, (value, key) => {
      onChangeCB({name: key, value});
    });
  };

  const GetAllData = (ctxProId) => {
    const url = Config.gatDomainName()
      .concat('/clientes/listapordueno/')
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
    submitData();
  };

  const submitData = () => {
    const url = Config.gatDomainName().concat('/clientes/update');
    const body = {
      _id,
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
    const url = Config.gatDomainName().concat(`/clientes/delete/${_id}`);
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

  useEffect(() => {
    SetProfileId(AuthService.getProfileId());
  }, []);

  useEffect(() => {
    GetAllData(profileId);
    AppCtx.loadInitData();
  }, [profileId]);

  return (
    <div>
      <ContentHeader title="Mostrar Clientes" />
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
                    Agregar Nuevo Cliente
                  </Button>
                ) : (
                  <div>
                    <HtmlTooltip
                      placement="top"
                      title={
                        <React.Fragment>
                          <Typography color="inherit">
                            Para agregar más clientes debes activar un plan de
                            servicio.
                          </Typography>
                        </React.Fragment>
                      }
                    >
                      <div className="container-fluid">
                        <div className="row">
                          <div className="sm-6">
                            <Button variant="secondary" disabled>
                              <i className="fa fa-plu">&nbsp;</i>
                              Agregar Nuevo Cliente
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
                  <Modal.Title>Ver Datos Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ClientesFormBody
                    onChangeCB={onChangeCB}
                    RowData={RowData}
                    cxcReadOnly="true"
                    cxcAction="viewing"
                  >
                    &nbsp;
                  </ClientesFormBody>
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
                            Borrar Cliente
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
            {/* Modal for Edit employee record */}
            <div className="model-box-view">
              <Modal
                show={EditShow}
                onHide={handleEditClose}
                backdrop="static"
                keyboard={false}
                size="lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Editar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ClientesFormBody
                    onChangeCB={onChangeCB}
                    RowData={RowData}
                    cxcReadOnly="false"
                    cxcAction="editing"
                  >
                    &nbsp;
                  </ClientesFormBody>
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default MostrarClientes;
