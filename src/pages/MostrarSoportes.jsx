/* eslint no-underscore-dangle: 0 */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/no-unknown-property */

import React, {useEffect, useState, useContext, useMemo} from 'react';
import _ from 'underscore';
import {ContentHeader} from '@components';
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import DataTable, {createTheme} from 'react-data-table-component';
import {mlCL, omoment} from '@app/utils/helpers';
import IconButton from '@mui/material/IconButton';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import FilterComponent from '@app/components/data-table/FilterComponent';
import GenericoFormBody from '@app/components/forms/GenericoFormBody';
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

const MostrarSoportes = () => {
  const AppCtx = useContext(AppContext);

  const NombreEntidad = 'Soportes';
  const NombreEntidadSingular = 'Soporte';
  const NombreEntidadMin = NombreEntidad.toLowerCase();

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
    setBody(row);
    SetId(row._id);
    SetRowDataState(row);
    SetEditShow(true);
  };
  const handleEditClose = () => {
    SetEditShow(false);
  };

  const handleAddNewShow = () => {
    navegar('/agregar-'.concat(NombreEntidadMin));
  };

  const [MessageShow, SetMessageShow] = useState(false);
  const handleMessageShow = () => {
    SetMessageShow(true);
  };
  const handleMessageClose = () => {
    SetMessageShow(false);
  };

  const [isDisabled, setIsDisabled] = useState(false);
  const FormFieldValues = [];

  const [Data, SetData] = useState([]);
  const [RowData, SetRowData] = useState([]);

  const [reqBody, setBody] = useState({
    sopDueno: AuthService.getProfileId(),
    sopCorreo: AuthService.getProfileEmail(),
    sopAsunto: '',
    sopDescripcion: '',
    sopTipo: '',
    sopEstado: 'activo'
  });

  const [BodyLabels, setBodyLabels] = useState(new Map());
  BodyLabels.set('sopAsunto', {label: 'Asunto', type: 'text', size: '6'});
  BodyLabels.set('sopTipo', {
    label: 'Tipo',
    type: 'select',
    value: '',
    size: '6',
    options: [
      {value: 'Facturación', name: 'Facturación'},
      {value: 'Creación de Cliente', name: 'Creación de Cliente'},
      {value: 'Creación de Documento', name: 'Creación de Documento'},
      {value: 'Otra', name: 'Otra'}
    ]
  });
  BodyLabels.set('sopDescripcion', {
    label: 'Descripción',
    type: 'textarea',
    size: '12'
  });
  BodyLabels.set('sopDueno', {label: 'Dueño', type: 'hidden', size: '6'});
  BodyLabels.set('sopEstado', {label: 'Estado', type: 'hidden', size: '6'});

  const [Delete, SetDelete] = useState('');
  const [_id, SetId] = useState('');
  const [resMessage, SetResMessage] = useState('');

  const [profileId, SetProfileId] = useState(AuthService.getProfileId());

  const columns = [
    // {
    //   name: 'Código',
    //   selector: (row) => row.sopCodigo
    // },
    {
      name: 'Asunto',
      selector: (row) => row.sopAsunto
    },
    {
      name: 'Tipo',
      selector: (row) => row.sopTipo
    },
    {
      name: 'Estado',
      selector: (row) =>
        row.sopEstado.charAt(0).toUpperCase().concat(row.sopEstado.slice(1))
    },
    {
      name: 'Fecha Creación',
      selector: (row) => (
        <div
          // className="col-2 d-flex align-items-center"
          style={{
            minWidth: 400
          }}
          nowrap="true"
        >
          {omoment(row.sopFechaCreacion)}
        </div>
      )
    },
    // {
    //   name: 'Fecha Actualización',
    //   selector: (row) => row.sopFechaModificacion
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
      (item.sopAsunto &&
        item.sopAsunto.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.sopTipo &&
        item.sopTipo.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.sopEstado &&
        item.sopEstado.toLowerCase().includes(filterText.toLowerCase()))
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
    const {name, value, campos} = cbData;
    reqBody[name] = value;
    if (name === 'sopNombre') {
      reqBody.sopCodigo = value
        .toLowerCase()
        .replace(/ /g, '_')
        .replace(/\./g, '');
    }
    setBody(reqBody);
    validateFormData(campos);
  };

  const validateFormData = (campos) => {
    let emptyFieldFound = false;

    if (Array.isArray(campos)) {
      Array.from(campos).forEach((campo) => {
        const {value} = campo;
        if (value === '' || value === '0' || value === 0) {
          emptyFieldFound = true;
        }
      });

      setIsDisabled(emptyFieldFound);
    }
  };

  const SetRowDataState = (rData) => {
    _.each(rData, (value, key) => {
      onChangeCB({name: key, value});
    });
  };

  const GetAllData = (ctxProId) => {
    const url = Config.gatDomainName()
      .concat('/')
      .concat(NombreEntidadMin)
      .concat('/buscapordueno/')
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

  const submitData = () => {
    const url = Config.gatDomainName()
      .concat('/')
      .concat(NombreEntidadMin)
      .concat('/update');
    const body = {_id, ...reqBody};

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

  const handleDelete = () => {
    const url = Config.gatDomainName()
      .concat(`/`)
      .concat(NombreEntidadMin)
      .concat(`/delete/${_id}`);
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

  useEffect(() => {
    SetProfileId(AuthService.getProfileId());
  }, []);

  useEffect(() => {
    GetAllData(profileId);
  }, [profileId]);

  return (
    <div>
      <ContentHeader title={'Gestionar '.concat(NombreEntidad)} />
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
                  Agregar Nuevo {NombreEntidadSingular}
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
                  <Modal.Title>Ver Datos {NombreEntidadSingular}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <GenericoFormBody
                    onChangeCB={onChangeCB}
                    RowData={RowData}
                    BodyLabels={BodyLabels}
                    cxcReadOnly="true"
                    cxcAction="viewing"
                  >
                    &nbsp;
                  </GenericoFormBody>
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
                            Borrar {NombreEntidadSingular}
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
                  <Modal.Title>Editar {NombreEntidadSingular}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <GenericoFormBody
                    onChangeCB={onChangeCB}
                    RowData={RowData}
                    BodyLabels={BodyLabels}
                    cxcReadOnly="false"
                    cxcAction="editing"
                  >
                    &nbsp;
                  </GenericoFormBody>
                </Modal.Body>
                <Modal.Footer>
                  <div className="container">
                    <div className="row">
                      <div className="col text-left">
                        <Button
                          type="submit"
                          className="btn tn-success"
                          disabled={isDisabled}
                          onClick={submitData}
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

export default MostrarSoportes;
