/* eslint no-underscore-dangle: 0 */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React, {useEffect, useState} from 'react';
import _ from 'underscore';
import MultipleImageUploadFunction from '@app/components/files/MultipleImageUploadFunction';

const EntidadesFormBody = (props) => {
  const {
    RowData,
    onChangeCB,
    cxcReadOnly,
    cxcAction,
    ExtraFieldsConfig,
    ConfiguracionesData
  } = props;

  const anosStart = ConfiguracionesData.Anos[0];
  const anosEnd = ConfiguracionesData.Anos[1];

  const AnosLoop = [];
  for (let ano = anosStart; ano <= anosEnd; ano++) {
    AnosLoop.push(ano);
  }

  const [BrandId, setBrandId] = useState('');
  const [ModeloId, setModeloId] = useState('');
  const [Anos, setAnos] = useState(AnosLoop.sort((a, b) => a - b));

  // console.log(
  //   'EntidadesFormBody() || ExtraFieldsConfig:',
  //   JSON.stringify(Array.from(ExtraFieldsConfig.entries()))
  // );

  const onChangeLocal = (target) => {
    const {name, value} = target;
    if (name === 'vehMarca') {
      setBrandId(target.selectedOptions[0].getAttribute('data-marca-id'));
      onChangeCB({name: 'vehModelo', value: RowData.vehModelo || '0'});
    }
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

    const marca = document.querySelector('#vehMarca');
    const marcaId = marca.selectedOptions[0].getAttribute('data-marca-id');
    setBrandId(marcaId);
  }, []);

  useEffect(() => {
    const modelos = document.querySelector('#vehModelo');
    if (modelos) {
      setModeloId(RowData.vehModelo);
      const opciones = [...modelos.options];
      if (opciones.some((modelo) => RowData.vehModelo === modelo.value)) {
        modelos.value = RowData.vehModelo;
      }
    }
  }, [BrandId]);

  function verificaExistencia(array, value) {
    return array.some((element) => value === element);
  }

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
                  <option value={0} selected defaultChecked>
                    Seleccione
                  </option>
                  {ConfiguracionesData.Categorias &&
                    ConfiguracionesData.Categorias.map((categoria) => (
                      <option
                        key={'categoria' + categoria.id}
                        value={categoria.valor}
                      >
                        {categoria.nombre}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-sm-6">
                <label htmlFor="vehAnoFabricacion">
                  <strong>Año de Fabricación</strong>
                </label>
                {RowData.vehAnoFabricacion}
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
                  <option
                    value={0}
                    selected={
                      RowData.vehAnoFabricacion === undefined ||
                      RowData?.vehAnoFabricacion === ''
                    }
                    defaultChecked={
                      RowData.vehAnoFabricacion === undefined ||
                      RowData?.vehAnoFabricacion === ''
                    }
                  >
                    Seleccione
                  </option>
                  {Anos &&
                    Anos.map((ano) => (
                      <option key={'ano' + ano} value={ano}>
                        {ano}
                      </option>
                    ))}
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
                  <option
                    value={0}
                    selected={
                      RowData.vehMarca === undefined || RowData?.vehMarca === ''
                    }
                    defaultChecked={
                      RowData.vehMarca === undefined || RowData?.vehMarca === ''
                    }
                  >
                    Seleccione
                  </option>
                  {ConfiguracionesData.Marcas &&
                    ConfiguracionesData.Marcas.map((marca) => (
                      <option
                        key={'marca' + marca.id}
                        data-marca-id={marca.id}
                        value={marca.valor}
                      >
                        {marca.nombre}
                      </option>
                    ))}
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
                  defaultValue={ModeloId}
                  onChange={(e) => onChangeLocal(e.target)}
                >
                  <option
                    value={0}
                    selected={ModeloId === undefined || ModeloId === ''}
                    defaultChecked={ModeloId === undefined || ModeloId === ''}
                  >
                    Seleccione
                  </option>
                  {ConfiguracionesData.Modelos[BrandId] &&
                    ConfiguracionesData.Modelos[BrandId]?.map((modelo) => (
                      <option key={'modelo' + modelo.id} value={modelo.valor}>
                        {modelo.nombre}
                      </option>
                    ))}
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
                  {ConfiguracionesData.Colores &&
                    ConfiguracionesData.Colores.map((color) => (
                      <option key={'color' + color.id} value={color.valor}>
                        {color.nombre}
                      </option>
                    ))}
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

export default EntidadesFormBody;