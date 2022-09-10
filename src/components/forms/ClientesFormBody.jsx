/* eslint no-underscore-dangle: 0 */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React, {useEffect} from 'react';
import _ from 'underscore';
import namor from 'namor';
import MultipleImageUploadFunction from '@components/files/MultipleImageUploadFunction';

const ClientesFormBody = (props) => {
  const {RowData, onChangeCB, cxcReadOnly, cxcAction} = props;

  const onChangeLocal = (target) => {
    const {name, value} = target;
    onChangeCB({name, value});
  };

  const setReadOnly = (fields) => {
    _.each(fields, (value) => {
      if (cxcReadOnly === 'true') {
        const elem = document.querySelectorAll('#'.concat(value.id))[0];
        elem.disabled = true;
      }
    });
  };

  useEffect(() => {
    const fields = [...document.querySelectorAll('.form-control')];
    setReadOnly(fields);
  }, []);

  return (
    <>
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
                  defaultValue={RowData.cliIdentificacion}
                  onChange={(e) => onChangeLocal(e.target)}
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
                  defaultValue={RowData.cliNombreCompleto}
                  onChange={(e) => onChangeLocal(e.target)}
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
                <label htmlFor="cliTelefono">
                  <strong>Teléfono</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cliTelefono"
                  name="cliTelefono"
                  defaultValue={RowData.cliTelefono}
                  onChange={(e) => onChangeLocal(e.target)}
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="cliCorreoElectronico">
                  <strong>Correo Electrónico</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cliCorreoElectronico"
                  name="cliCorreoElectronico"
                  defaultValue={RowData.cliCorreoElectronico}
                  onChange={(e) => onChangeLocal(e.target)}
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
                  defaultValue={RowData.cliDireccion}
                  onChange={(e) => onChangeLocal(e.target)}
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
                  defaultValue={RowData.cliCiudad}
                  onChange={(e) => onChangeLocal(e.target)}
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
                  defaultValue={RowData.cliSector}
                  onChange={(e) => onChangeLocal(e.target)}
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
                  title="Seleccione un país"
                  placeholder="República Dominicana..."
                  required
                  defaultValue={RowData.cliPais}
                  onChange={(e) => onChangeLocal(e.target)}
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
                  title="Seleccione una nacionalidad"
                  placeholder="Dominicana..."
                  required
                  defaultValue={RowData.cliNacionalidad}
                  onChange={(e) => onChangeLocal(e.target)}
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
          <div className="col-lg-6">
            <div className="row">
              <div className="col-sm-12">
                <label htmlFor="cliEstado">
                  <strong>Estado</strong>
                </label>
                <select
                  className="selectpicker form-control"
                  id="cliEstado"
                  name="cliEstado"
                  title="Seleccione un estado"
                  placeholder="Activo..."
                  required
                  defaultValue={RowData.cliEstado}
                  onChange={(e) => onChangeLocal(e.target)}
                >
                  <option value={0} defaultChecked>
                    Seleccione
                  </option>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
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
                <MultipleImageUploadFunction
                  images={RowData?.cliFotoCedula || []}
                  onChangeCB={onChangeCB}
                  formFieldName="cliFotoCedula"
                  cxcAction={cxcAction}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientesFormBody;
