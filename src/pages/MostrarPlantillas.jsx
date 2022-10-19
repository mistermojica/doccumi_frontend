/* eslint no-underscore-dangle: 0 */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/no-unknown-property */

import React, {useEffect, useState, useMemo} from 'react';
import _ from 'underscore';
import * as moment_ from 'moment';
import {ContentHeader} from '@components';
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import DataTable, {createTheme} from 'react-data-table-component';
import {mlCL} from '@app/utils/helpers';
import IconButton from '@mui/material/IconButton';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  ContentCopy as ContentCopyIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import FilterComponent from '@app/components/data-table/FilterComponent';
import PlantillasFormBody from '@app/components/forms/PlantillasFormBody';
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

const MostrarPlantillas = () => {
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
    navegar('/agregar-plantilla');
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

  const [plaNombre, setNombre] = useState('');
  const [plaTipoDocumento, setTipoDocumento] = useState('');
  const [plaTipoId, setTipoId] = useState('');
  const [plaContenido, setContenido] = useState('');
  const [plaDueno, setDueno] = useState(AuthService.getProfileId());
  const [plaEstado, setEstado] = useState('');

  const [Delete, SetDelete] = useState('');
  const [_id, SetId] = useState('');
  const [resMessage, SetResMessage] = useState('');
  const [PlaceHolderFields, SetPlaceHolderFields] = useState([]);
  const [TiposData, SetTiposData] = useState([]);
  const [profileId, SetProfileId] = useState(AuthService.getProfileId());

  const moment = moment_;

  const columns = [
    {
      name: 'Nombre',
      selector: (row) => row.plaNombre
    },
    {
      name: 'Tipo Documento',
      selector: (row) => row.plaTipoDocumento
    },
    {
      name: 'Estado',
      selector: (row) => row.plaEstado
    },
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
          {moment(row.plaFechaCreacion).format('DD-MM-YYYY hh:mm A')}
        </div>
      )
    },
    {
      name: 'Acciones',
      cell: (row) => (
        // <div className="container">
        <div
          className="col-3 d-flex align-items-center"
          style={{
            minWidth: 225
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
            aria-label="edit"
            size="sm"
            color="info"
            onClick={() => {
              handleDuplicate(row._id, false);
            }}
          >
            <ContentCopyIcon />
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
      (item.plaNombre &&
        item.plaNombre.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.plaTipoDocumento &&
        item.plaTipoDocumento
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (item.plaEstado &&
        item.plaEstado.toLowerCase().includes(filterText.toLowerCase()))
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

    console.log({cbData});

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

  const SetRowDataState = (rData) => {
    _.each(rData, (value, key) => {
      onChangeCB({name: key, value});
    });
  };

  const GetAllData = (ctxProId) => {
    const url = Config.gatDomainName()
      .concat('/plantillas/listapordueno/')
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
    const url = Config.gatDomainName().concat('/plantillas/update');
    const body = {
      _id,
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
          mlCL('message:', message);
        } else {
          mlCL('data:', data);
          handleEditClose();
          GetAllData(profileId);
          handleMessageShow(SetResMessage(message));
        }
      })
      .catch((err) => {
        mlCL('err:', err);
      });
  };

  const handleDuplicate = (_id) => {
    SetId(_id);
    SetDelete(false);

    const url = Config.gatDomainName().concat(`/plantillas/duplicate/${_id}`);
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') {
          mlCL('message:', message);
        } else {
          mlCL('data:', data);
          // handleViewClose();
          GetAllData(profileId);
          handleMessageShow(SetResMessage(message));
        }
      })
      .catch((err) => {
        mlCL('err:', err);
      });
  };

  const handleDelete = () => {
    const url = Config.gatDomainName().concat(`/plantillas/delete/${_id}`);
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
          handleMessageShow(SetResMessage(message));
        }
      })
      .catch((err) => {
        mlCL('err:', err);
      });
  };

  const GetPlaceHoldersData = (ctxProId) => {
    const url = Config.gatDomainName()
      .concat('/campos/listapordueno/')
      .concat(ctxProId);

    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') {
          mlCL('message:', message);
        } else {
          const arrPHF = [];
          data?.forEach((value) => {
            arrPHF.push(value?.camNombre.replace(/,/g, ''));
          });
          SetPlaceHolderFields(arrPHF);
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
    SetProfileId(AuthService.getProfileId());
    GetTiposData();
  }, []);

  useEffect(() => {}, [PlaceHolderFields]);

  useEffect(() => {
    GetAllData(profileId);
    GetPlaceHoldersData(profileId);
  }, [profileId]);

  return (
    <div>
      <ContentHeader title="Mostrar Plantillas" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="row">
              <div className="mt-3 mb-3 ml-4">
                <Button
                  variant="primary"
                  onClick={() => {
                    handleAddNewShow();
                  }}
                >
                  <i className="fa fa-plu">&nbsp;</i>
                  Agregar Nueva Plantilla
                </Button>
              </div>
            </div>
            <div className="row col-12">
              <div className="table-responsive ml-3 mr-1">
                <DataTable
                  // title="Contact List"
                  style={{maxWidth: '100% !important'}}
                  columns={columns}
                  data={filteredItems}
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
                  <Modal.Title>Ver Datos Plantilla</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <PlantillasFormBody
                    onChangeCB={onChangeCB}
                    RowData={RowData}
                    TiposData={TiposData}
                    cxcReadOnly="true"
                    PlaceHolderFields={PlaceHolderFields}
                  >
                    &nbsp;
                  </PlantillasFormBody>
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
                            Borrar Plantilla
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
                  <Modal.Title>Editar Plantilla</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <PlantillasFormBody
                    onChangeCB={onChangeCB}
                    RowData={RowData}
                    TiposData={TiposData}
                    PlaceHolderFields={PlaceHolderFields}
                    cxcReadOnly="false"
                  >
                    &nbsp;
                  </PlantillasFormBody>
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

export default MostrarPlantillas;
