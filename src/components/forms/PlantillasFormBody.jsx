/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint no-underscore-dangle: 0 */
/* eslint-disable no-console */

import React, {useEffect, useState} from 'react';
import _ from 'underscore';
// import CKEditorOM from '@app/components/editors/CKEditorClassic';
// import CKEditorOM from '@app/components/editors/CKEditorDecoupled';
import CKEditorOM from '@app/components/editors/CKEditorDecoupled';

const PlantillasFormBody = (props) => {
  const {RowData, TiposData, onChangeCB, cxcReadOnly, PlaceHolderFields} =
    props;

  const [plaTipoDocumento, setTipoDocumento] = useState('');

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
              <div className="col-sm-4">
                <label htmlFor="plaNombre">
                  <strong>Nombre Plantilla</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="plaNombre"
                  name="plaNombre"
                  title="Nombre Plantilla"
                  defaultValue={RowData.plaNombre}
                  onChange={(e) => onChangeLocal(e.target)}
                />
              </div>
              <div className="col-sm-4">
                <label htmlFor="plaTipoId">
                  <strong>Tipo Documento</strong>
                </label>
                <select
                  className="selectpicker form-control"
                  id="plaTipoId"
                  name="plaTipoId"
                  title="Seleccione un Tipo Documento"
                  required
                  defaultValue={RowData.plaTipoId}
                  onChange={(e) => {
                    onChangeLocal(e.target);
                    const {platipodocumento} =
                      e.target.selectedOptions[0].dataset;
                    onChangeLocal({
                      name: 'plaTipoDocumento',
                      value: platipodocumento
                    });
                    setTipoDocumento(platipodocumento);
                  }}
                >
                  <option value={0} defaultChecked>
                    Seleccione
                  </option>
                  {(TiposData || []).map((item) => (
                    <option
                      value={item._id}
                      data-platipodocumento={item.tipCodigo}
                    >
                      {item.tipNombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-sm-4">
                <label htmlFor="plaEstado">
                  <strong>Estado</strong>
                </label>
                <select
                  className="selectpicker form-control"
                  id="plaEstado"
                  name="plaEstado"
                  title="Seleccione un estado"
                  required
                  defaultValue={RowData.plaEstado}
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
        <input
          type="text"
          className="form-control"
          id="plaTipoDocumento"
          name="plaTipoDocumento"
          defaultValue={plaTipoDocumento || RowData.plaTipoDocumento}
        />
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-sm-12">
                <label htmlFor="plaContenido">
                  <strong>Contenido</strong>
                </label>
                {/* CKEDITOR START */}
                <CKEditorOM
                  onChangeCB={onChangeCB}
                  PlaceHolderFields={PlaceHolderFields}
                  EditorConfig={{
                    id: 'plaContenido',
                    name: 'plaContenido',
                    data:
                      RowData.plaContenido !== undefined
                        ? RowData.plaContenido
                        : '',
                    readOnly: cxcReadOnly,
                    PlaceHolderFields
                  }}
                >
                  &nbsp;
                </CKEditorOM>
                {/* CKEDITOR END */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlantillasFormBody;
