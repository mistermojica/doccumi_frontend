/* eslint no-underscore-dangle: 0 */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/no-unknown-property */

import React, {useEffect, useState, useContext, useMemo} from 'react';
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

const MostrarTipos = () => {
  const AppCtx = useContext(AppContext);

  const NombreEntidad = 'Tipos';
  const NombreEntidadSingular = 'Tipo';
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
    tipCodigo: '',
    tipNombre: '',
    tipModelo: '',
    tipOrden: 10,
    tipDueno: AuthService.getProfileId(),
    tipEstado: 'activo'
  });

  const [BodyLabels, setBodyLabels] = useState(new Map());
  BodyLabels.set('tipCodigo', {label: 'Código', type: 'hidden'});
  BodyLabels.set('tipNombre', {label: 'Nombre', type: 'text'});
  BodyLabels.set('tipModelo', {
    label: 'Modelo',
    type: 'select',
    value: '',
    options: [{value: 'documentos', name: 'Documentos'}]
  });
  BodyLabels.set('tipOrden', {label: 'Orden', type: 'number'});
  BodyLabels.set('tipDueno', {label: 'Dueño', type: 'hidden'});
  BodyLabels.set('tipEstado', {
    label: 'Estado',
    type: 'select',
    value: '',
    options: [
      {value: 'activo', name: 'Activo'},
      {value: 'borrado', name: 'Borrado'}
    ]
  });

  const [Delete, SetDelete] = useState('');
  const [_id, SetId] = useState('');
  const [resMessage, SetResMessage] = useState('');

  const [profileId, SetProfileId] = useState(AuthService.getProfileId());

  const moment = moment_;

  const columns = [
    // {
    //   name: 'Código',
    //   selector: (row) => row.tipCodigo
    // },
    {
      name: 'Nombre',
      selector: (row) => row.tipNombre
    },
    {
      name: 'Estado',
      selector: (row) => row.tipEstado
    },
    {
      name: 'Modelo',
      selector: (row) => row.tipModelo
    },
    {
      name: 'Orden',
      selector: (row) => row.tipOrden
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
          {moment(row.tipFechaCreacion).format('DD-MM-YYYY hh:mm A')}
        </div>
      )
    },
    // {
    //   name: 'Fecha Actualización',
    //   selector: (row) => row.tipFechaModificacion
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
      (item.tipCodigo &&
        item.tipCodigo.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.tipNombre &&
        item.tipNombre.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.tipModelo &&
        item.tipModelo.toLowerCase().includes(filterText.toLowerCase()))
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
    // const {name, value} = cbData;
    const {name, value, campos} = cbData;
    // const {campos} = cbData;

    // if (campos !== undefined) {
    //   campos.forEach((campo) => {
    //     if (campo.nodeName === 'SELECT') {
    //       const opcion = campo.childNodes[campo.selectedIndex];
    //       const value = opcion.getAttribute('value');
    //       const name = campo.getAttribute('name');
    //       reqBody[name] = value;
    // } else {
    // const name = campo.getAttribute('name');
    // const value = campo.getAttribute('value');
    reqBody[name] = value;
    if (name === 'tipNombre') {
      reqBody.tipCodigo = value
        .toLowerCase()
        .replace(/ /g, '_')
        .replace(/\./g, '');
    }
    // }
    // });
    setBody(reqBody);
    // }

    validateFormData(campos);
  };

  const validateFormData = (campos) => {
    let emptyFieldFound = false;

    if (Array.isArray(campos)) {
      Array.from(campos).forEach((campo) => {
        // const id = campo.getAttribute('id');
        // const {id, name, value} = campo;
        const {value} = campo;

        // console.log({id, value});

        // if (!['cliFotoCedula'].includes(id)) {
        //   setFieldsValues(id, value);
        // }

        // if (id === 'email') {
        //   invalidEmailFound = !ValidateEmail(value);
        // }
        // if (['phone_home', 'phone_mobile', 'phone_office'].includes(id)) {
        //   invalidPhoneFound = !ValidatePhone(value);
        // }
        if (value === '' || value === '0' || value === 0) {
          emptyFieldFound = true;
        }
      });

      // setIsDisabled(emptyFieldFound || invalidEmailFound || invalidPhoneFound);
      setIsDisabled(emptyFieldFound);
    }
  };

  const SetRowDataState = (rData) => {
    // console.log('SetRowDataState:', rData);
    _.each(rData, (value, key) => {
      onChangeCB({name: key, value});
    });
  };

  const GetAllData = (ctxProId) => {
    const url = Config.gatDomainName()
      .concat('/')
      .concat(NombreEntidadMin)
      .concat('/listapordueno/')
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

export default MostrarTipos;
