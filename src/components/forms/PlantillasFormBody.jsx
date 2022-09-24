/* eslint no-underscore-dangle: 0 */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import React, {useEffect, useState, useRef} from 'react';
import _ from 'underscore';
import {Button} from 'react-bootstrap';
import {FormControlLabel, FormGroup} from '@mui/material';
// import CKEditorOM from '@app/components/editors/CKEditorClassic';
// import CKEditorOM from '@app/components/editors/CKEditorDecoupled';
import CKEditorOM from '@app/components/editors/CKEditorDecoupled';
import * as mammoth from 'mammoth';

const PlantillasFormBody = (props) => {
  const {RowData, TiposData, onChangeCB, cxcReadOnly, PlaceHolderFields} =
    props;

  const [plaTipoDocumento, setTipoDocumento] = useState('');
  const [EditorContent, setEditorContent] = useState('');

  const myRefname = useRef(null);

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

  const handleImportDocument = () => {
    console.log('handleImportDocument');
    myRefname.current.click();
  };

  const changeInputHandler = async (target) => {
    console.log('changeInputHandler:', {target});
    // uploadMultipleFiles(target.files);
    parseWordDocxFile(target);
  };

  // const uploadMultipleFiles = (files) => {
  //   console.log('uploadMultipleFiles:', {files});

  //   const doc = files[0];

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     console.log('reader.result:', reader.result);

  //     mammoth
  //       .convertToHtml({arrayBuffer: reader.result})
  //       .then(function (result) {
  //         var html = result.value; // The generated HTML
  //         var messages = result.messages; // Any messages, such as warnings during conversion
  //         console.log({messages});
  //         console.log({html});
  //       })
  //       .done();

  //     // const imgObj = {
  //     // [e.target.id]: doc,
  //     // url: reader.result
  //     // };
  //     // setImage(imgObj);
  //     // onChange({e, imgObj});
  //   };
  //   reader.readAsArrayBuffer(doc);

  //   // const arrUrlTemps = [];
  //   // for (let i = 0; i < files.length; i += 1) {
  //   //   const file = files[i];
  //   //   const tempUrl = URL.createObjectURL(file);
  //   //   arrUrlTemps.push(tempUrl);
  //   // }
  //   // uploadFiles(Array.from(files), arrUrlTemps);
  // };

  function parseWordDocxFile(target) {
    var files = target.files || [];
    if (!files.length) return;
    var file = files[0];

    console.time();
    var reader = new FileReader();
    reader.onloadend = function () {
      var arrayBuffer = reader.result;
      // debugger

      mammoth
        .convertToHtml({arrayBuffer: arrayBuffer})
        .then(function (resultObject) {
          // result1.innerHTML = resultObject.value;
          console.log('HTML:', resultObject.value);
          setEditorContent(resultObject.value);
        });
      console.timeEnd();

      // mammoth
      //   .extractRawText({arrayBuffer: arrayBuffer})
      //   .then(function (resultObject) {
      //     // result2.innerHTML = resultObject.value;
      //     console.log('TEXT:', resultObject.value);
      //   });

      // mammoth
      //   .convertToMarkdown({arrayBuffer: arrayBuffer})
      //   .then(function (resultObject) {
      //     // result3.innerHTML = resultObject.value;
      //     console.log('MARKDOWN:', resultObject.value);
      //   });
    };
    reader.readAsArrayBuffer(file);
  }

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
              <div className="col-lg-4">
                <FormGroup
                  sx={{
                    width: '100%'
                  }}
                >
                  <FormControlLabel
                    control={
                      <>
                        <input
                          type="file"
                          accept=".doc,.docx"
                          ref={myRefname}
                          onChange={(e) => changeInputHandler(e.target)}
                          id="importardocumento"
                          style={{
                            width: '100%',
                            display: 'none'
                          }}
                        />
                      </>
                    }
                    // label="Importar Documento Word"
                    classes="btn btn-primary"
                    // sx={{
                    //   color: 'white',
                    //   background: 'white',
                    //   borderRadius: '6px',
                    //   border: '1px solid #007bff',
                    //   backgroundColor: '#007bff',
                    // }}
                    labelPlacement="bottom"
                  />
                  <Button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleImportDocument}
                  >
                    Importar Documento Word
                  </Button>
                </FormGroup>
                {/* <Form.Group controlId="formFile">
                  <Form.Control
                    type="file"
                    className="form-control mb-2"
                    onChange={(e) => changeInputHandler(e.target)}
                  />
                </Form.Group> */}
                {/* <input
                  type="file"
                  className="form-control"
                  onChange={(e) => changeInputHandler(e.target)}
                /> */}
              </div>
              <div className="col-lg-8"></div>
            </div>
            <br />
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
                      key={item._id}
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
          type="hidden"
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
                        : EditorContent || '',
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
