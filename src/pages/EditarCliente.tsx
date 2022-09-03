/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import {ContentHeader} from '@components';
import {useNavigate} from 'react-router-dom';
import {mlCL} from '@app/utils/helpers';
// @ts-ignore
import * as Config from '../utils/config';

const EditarCliente = () => {
  const navegar = useNavigate();

  const [cliIdentificacion, setIdentificacion] = useState('');
  const [cliNombreCompleto, setNombreCompleto] = useState('');
  const [cliDireccion, setDireccion] = useState('');
  const [cliCiudad, setCiudad] = useState('');
  const [cliSector, setSector] = useState('');
  const [cliPais, setPais] = useState('');
  const [cliNacionalidad, setNacionalidad] = useState('');
  const [cliFotoCedula, setFotoCedula] = useState('');

  const handleAddNew = () => {
    const url = Config.gatDomainName().concat('/clientes/create');
    const body = {
      cliIdentificacion,
      cliNombreCompleto,
      cliDireccion,
      cliCiudad,
      cliSector,
      cliPais,
      cliNacionalidad,
      cliFotoCedula
    };

    axios
      .post(url, body)
      .then((response) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') mlCL('handleAddNew() => message:', message);
        else {
          mlCL('handleAddNew() => message:', message);
          mlCL('handleAddNew() => data:', data);
          // window.location.href = '/mostrar-clientes';
          navegar('/mostrar-clientes');
          // SetData(data);
        }
      })
      .catch((err) => {
        mlCL('handleAddNew() => err:', err);
      });
  };

  return (
    <div>
      <ContentHeader title="Editar Cliente" />
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
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="cliIdentificacion">
                          <strong>Cédula o Pasaporte</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cliIdentificacion"
                          name="cliIdentificacion"
                          defaultValue=""
                          onChange={(e) => setIdentificacion(e.target.value)}
                        />
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="cliNombreCompleto">
                          <strong>Nombre Completo</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cliNombreCompleto"
                          name="cliNombreCompleto"
                          defaultValue=""
                          onChange={(e) => setNombreCompleto(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-sm-12">
                        <label htmlFor="cliDireccion">
                          <strong>Dirección</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cliDireccion"
                          name="cliDireccion"
                          defaultValue=""
                          onChange={(e) => setDireccion(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="cliCiudad">
                          <strong>Ciudad</strong>
                        </label>
                        <select
                          className="selectpicker form-control"
                          id="cliCiudad"
                          name="cliCiudad"
                          data-container="body"
                          data-live-search="true"
                          title="Seleccione una ciudad"
                          data-hide-disabled="true"
                          placeholder="Distrito Nacional..."
                          required
                          onChange={(e) => setCiudad(e.target.value)}
                        >
                          <option value={0} defaultChecked>
                            Seleccione
                          </option>
                          <option value="Santo Domingo">Santo Domingo</option>
                        </select>
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="cliSector">
                          <strong>Sector</strong>
                        </label>
                        <select
                          className="selectpicker form-control"
                          id="cliSector"
                          name="cliSector"
                          data-container="body"
                          data-live-search="true"
                          title="Seleccione un sector"
                          data-hide-disabled="true"
                          placeholder="Ens. Naco..."
                          required
                          onChange={(e) => setSector(e.target.value)}
                        >
                          <option value={0} defaultChecked>
                            Seleccione
                          </option>
                          <option value="Ens. Naco">Ens. Naco</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="cliPais">
                          <strong>País</strong>
                        </label>
                        <select
                          className="selectpicker form-control"
                          id="cliPais"
                          name="cliPais"
                          data-container="body"
                          data-live-search="true"
                          title="Seleccione un país"
                          data-hide-disabled="true"
                          placeholder="República Dominicana..."
                          required
                          onChange={(e) => setPais(e.target.value)}
                        >
                          <option value={0} defaultChecked>
                            Seleccione
                          </option>
                          <option value="República Dominicana">
                            República Dominicana
                          </option>
                        </select>
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="cliNacionalidad">
                          <strong>Nacionalidad</strong>
                        </label>
                        <select
                          className="selectpicker form-control"
                          id="cliNacionalidad"
                          name="cliNacionalidad"
                          data-container="body"
                          data-live-search="true"
                          title="Seleccione una nacionalidad"
                          data-hide-disabled="true"
                          placeholder="Dominicana..."
                          required
                          onChange={(e) => setNacionalidad(e.target.value)}
                        >
                          <option value={0} defaultChecked>
                            Seleccione
                          </option>
                          <option value="dominicana">Dominicana</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-sm-12">
                        <label htmlFor="cliFotoCedula">
                          <strong>Foto Cédula</strong>
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="cliFotoCedula"
                          name="cliFotoCedula"
                          defaultValue=""
                          onChange={(e) => setFotoCedula(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <br />
                    <Button
                      type="submit"
                      className="btn tn-success mt-4"
                      onClick={handleAddNew}
                    >
                      Guardar
                    </Button>
                  </div>
                </div>
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

export default EditarCliente;
