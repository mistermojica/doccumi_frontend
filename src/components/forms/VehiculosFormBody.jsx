/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint no-underscore-dangle: 0 */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React, {useEffect, useState} from 'react';
import _ from 'underscore';
import MultipleImageUploadFunction from '@app/components/files/MultipleImageUploadFunction';

const VehiculosFormBody = (props) => {
  const {RowData, onChangeCB, cxcReadOnly, cxcAction, ExtraFieldsConfig} =
    props;

  console.log(
    'VehiculosFormBody() || ExtraFieldsConfig:',
    JSON.stringify(Array.from(ExtraFieldsConfig.entries()))
  );

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
                <label htmlFor="vehNoRegistroPlaca">
                  <strong>No. de Registro y Placa</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="vehNoRegistroPlaca"
                  name="vehNoRegistroPlaca"
                  defaultValue={RowData.vehNoRegistroPlaca}
                  // defaultValue={namor.generate({words: 1, numbers: 0})}
                  onChange={(e) => onChangeLocal(e.target)}
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="vehChasis">
                  <strong>Chasis</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="vehChasis"
                  name="vehChasis"
                  defaultValue={RowData.vehChasis}
                  // defaultValue={namor.generate({words: 1, numbers: 0})}
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
                <label htmlFor="vehStatusVehiculo">
                  <strong>Status del Vehículo</strong>
                </label>
                <select
                  className="selectpicker form-control"
                  id="vehStatusVehiculo"
                  name="vehStatusVehiculo"
                  title="Seleccione un Status"
                  data-hide-disabled="true"
                  placeholder="Activo..."
                  required
                  defaultValue={RowData.vehStatusVehiculo}
                  onChange={(e) => onChangeLocal(e.target)}
                >
                  <option value={0}>Seleccione</option>
                  <option selected value="Activo">
                    Activo
                  </option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label htmlFor="vehTipoEmision">
                  <strong>Tipo de Emisión</strong>
                </label>
                <select
                  className="selectpicker form-control"
                  id="vehTipoEmision"
                  name="vehTipoEmision"
                  title="Seleccione un Tipo"
                  placeholder="Gasolina..."
                  required
                  defaultValue={RowData.vehTipoEmision}
                  onChange={(e) => onChangeLocal(e.target)}
                >
                  <option value={0} defaultChecked>
                    Seleccione
                  </option>
                  <option selected value="Gasolina">
                    Gasolina
                  </option>
                  <option value="Gasoil">Gasoil</option>
                  <option value="GLP">GLP</option>
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
                <label htmlFor="vehTipoVehiculo">
                  <strong>Tipo de Vehículo</strong>
                </label>
                <select
                  className="selectpicker form-control"
                  id="vehTipoVehiculo"
                  name="vehTipoVehiculo"
                  title="Seleccione un tipo"
                  placeholder="Sedán..."
                  required
                  defaultValue={RowData.vehTipoVehiculo}
                  onChange={(e) => onChangeLocal(e.target)}
                >
                  <option value={0} defaultChecked>
                    Seleccione
                  </option>
                  <option selected value="Coupe">
                    Coupe
                  </option>
                  <option value="Sedán">Sedán</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label htmlFor="vehAnoFabricacion">
                  <strong>Año de Fabricación</strong>
                </label>
                <select
                  className="selectpicker form-control"
                  id="vehAnoFabricacion"
                  name="vehAnoFabricacion"
                  title="Seleccione un año"
                  placeholder="2022..."
                  required
                  defaultValue={RowData.vehAnoFabricacion}
                  onChange={(e) => onChangeLocal(e.target)}
                >
                  <option value={0} defaultChecked>
                    Seleccione
                  </option>
                  <option value={2019}>2019</option>
                  <option value={2020}>2020</option>
                  <option selected value={2021}>
                    2021
                  </option>
                  <option value={2022}>2022</option>
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
                <label htmlFor="vehMarca">
                  <strong>Marca</strong>
                </label>
                <select
                  className="selectpicker form-control"
                  id="vehMarca"
                  name="vehMarca"
                  title="Seleccione una marca"
                  placeholder="Toyota..."
                  required
                  defaultValue={RowData.vehMarca}
                  onChange={(e) => onChangeLocal(e.target)}
                >
                  <option value={0} defaultChecked>
                    Seleccione
                  </option>
                  <option value="Honda">Honda</option>
                  <option selected value="Hyundai">
                    Hyundai
                  </option>
                  <option value="Toyota">Toyota</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label htmlFor="vehModelo">
                  <strong>Modelo</strong>
                </label>
                <select
                  className="selectpicker form-control"
                  id="vehModelo"
                  name="vehModelo"
                  title="Seleccione un modelo"
                  placeholder="Corolla..."
                  required
                  defaultValue={RowData.vehModelo}
                  onChange={(e) => onChangeLocal(e.target)}
                >
                  <option value={0} defaultChecked>
                    Seleccione
                  </option>
                  <option value="Accord">Accord</option>
                  <option value="Corolla">Corolla</option>
                  <option selected value="Grandeur">
                    Grandeur
                  </option>
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
                <label htmlFor="vehColor">
                  <strong>Color</strong>
                </label>
                <select
                  className="selectpicker form-control"
                  id="vehColor"
                  name="vehColor"
                  title="Seleccione una color"
                  placeholder="Negro..."
                  required
                  defaultValue={RowData.vehColor}
                  onChange={(e) => onChangeLocal(e.target)}
                >
                  <option value={0} defaultChecked>
                    Seleccione
                  </option>
                  <option value="Blanco">Blanco</option>
                  <option selected value="Negro">
                    Negro
                  </option>
                  <option value="Rojo ">Rojo</option>
                </select>
              </div>
              <div className="col-sm-3">
                <label htmlFor="vehPrecio">
                  <strong>Precio</strong>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="vehPrecio"
                  name="vehPrecio"
                  defaultValue={RowData.vehPrecio}
                  onChange={(e) => onChangeLocal(e.target)}
                />
              </div>
              <div className="col-sm-3">
                <label htmlFor="vehCosto">
                  <strong>Costo</strong>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="vehCosto"
                  name="vehCosto"
                  defaultValue={RowData.vehCosto}
                  onChange={(e) => onChangeLocal(e.target)}
                />
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-sm-12">
                <label htmlFor="vehEstado">
                  <strong>Estado</strong>
                </label>
                <select
                  className="selectpicker form-control"
                  id="vehEstado"
                  name="vehEstado"
                  title="Seleccione un estado"
                  placeholder="Activo..."
                  required
                  defaultValue={RowData.vehEstado}
                  onChange={(e) => onChangeLocal(e.target)}
                >
                  <option value={0} defaultChecked>
                    Seleccione
                  </option>
                  <option value="venta">En Venta</option>
                  <option selected value="pendiente">
                    Pendientes
                  </option>
                  <option value="vendido">Vendidos</option>
                  <option value="taller">En Taller</option>
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
                <label htmlFor="vehFotoMatricula">
                  <strong>Fotos Matrícula</strong>
                </label>
                <MultipleImageUploadFunction
                  images={RowData?.vehFotoMatricula || []}
                  onChangeCB={onChangeCB}
                  formFieldName="vehFotoMatricula"
                  cxcAction={cxcAction}
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
                <label htmlFor="vehFotos">
                  <strong>Fotos</strong>
                </label>
                <MultipleImageUploadFunction
                  images={RowData?.vehFotos || []}
                  onChangeCB={onChangeCB}
                  formFieldName="vehFotos"
                  cxcAction={cxcAction}
                />
              </div>
            </div>
          </div>
        </div>
        <br />
        {ExtraFieldsConfig && ExtraFieldsConfig.size > 0 && (
          <>
            <div className="row">
              {[...ExtraFieldsConfig.values()].map((RowValue) => (
                <>
                  <div
                    className="col-sm-6"
                    style={{
                      display:
                        RowValue?.type === 'hidden' ||
                        !ExtraFieldsConfig.has(RowValue?.name)
                          ? 'none'
                          : 'block'
                    }}
                  >
                    <label htmlFor={RowValue?.name}>
                      <strong>{RowValue?.label}:</strong>
                    </label>
                    <input
                      type={RowValue?.type}
                      className="form-control"
                      key={'key'.concat(RowValue?.name)}
                      id={RowValue?.name}
                      name={RowValue?.name}
                      defaultValue={RowValue?.value}
                      onChange={(e) => onChangeLocal(e.target)}
                    />
                    <br />
                  </div>
                </>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default VehiculosFormBody;
