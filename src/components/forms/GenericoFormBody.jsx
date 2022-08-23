/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint no-underscore-dangle: 0 */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
/* eslint-disable dot-notation */

import React, {useEffect} from 'react';
import _ from 'underscore';
import namor from 'namor';
import {v4 as uuidv4} from 'uuid';

const GenericoFormBody = (props) => {
  const {RowData, BodyLabels, onChangeCB, cxcReadOnly, cxcAction} = props;

  // let lastFocusTarget = null;

  // const onFocusLocal = (target) => {
  //   const {name, value} = target;
  //   lastFocusTarget = target;
  //   console.log('onFocusLocal', lastFocusTarget);
  // };

  const onChangeLocal = (target) => {
    const {name, value} = target;
    const campos = getFormFieldsValues();
    RowData[name] = value;
    onChangeCB({name, value, campos});
  };

  const getFormFieldsValues = () => {
    const campos = [...document.querySelectorAll('.form-control')];
    return campos;
  };

  const setReadOnly = (campos) => {
    _.each(campos, (campo) => {
      if (cxcReadOnly === 'true') {
        const elem = document.querySelectorAll('#'.concat(campo.id))[0];
        elem.disabled = true;
      }
    });
  };

  useEffect(() => {
    const campos = [...document.querySelectorAll('.form-control')];
    setReadOnly(campos);
  }, []);

  return (
    <div>
      <div className="row">
        {RowData &&
          _.map(Array.from(BodyLabels.entries()), (RowValue, RowKey) =>
            RowValue[1]?.type === 'select' ? (
              <div
                key={'div_sel_k'.concat(RowKey)}
                className="col-sm-6"
                style={{
                  display: RowValue[1]?.type === 'hidden' ? 'none' : 'block'
                }}
              >
                <label key={'label_sel_k'.concat(RowKey)} htmlFor={RowValue[0]}>
                  <strong key={'strong_sel_k'.concat(RowKey)}>
                    {RowValue[1]?.label}:
                  </strong>
                </label>
                <select
                  className="selectpicker form-control"
                  key={'select_sel_k'.concat(RowKey)}
                  id={RowValue[0]}
                  name={RowValue[0]}
                  title={'Seleccione un '.concat(RowValue[1]?.label)}
                  placeholder={RowData[RowValue[0]]}
                  required
                  defaultValue={RowData[RowValue[0]] || RowValue[1]?.value}
                  onChange={(e) => onChangeLocal(e.target)}
                >
                  <option
                    key={'option_sel_k'.concat(RowKey)}
                    value={0}
                    defaultChecked={false}
                  >
                    Seleccione
                  </option>
                  {_.map(RowValue[1]?.options, (opVal, opKey) => (
                    <option
                      key={'option_sel_k'.concat(RowKey).concat(opKey)}
                      value={opVal.value}
                    >
                      {opVal.name}
                    </option>
                  ))}
                </select>
                <br key={'br_sel_k'.concat(RowKey)} />
              </div>
            ) : (
              <div
                key={'div_input_k'.concat(RowKey)}
                className="col-sm-6"
                style={{
                  display:
                    RowValue[1]?.type === 'hidden' ||
                    !BodyLabels.has(RowValue[0])
                      ? 'none'
                      : 'block'
                }}
              >
                <label
                  key={'label_input_k'.concat(RowKey)}
                  htmlFor={RowValue[0]}
                >
                  <strong key={'strong_input_k'.concat(RowKey)}>
                    {RowValue[1]?.label}:
                  </strong>
                </label>
                <input
                  key={'input_input_k'.concat(RowKey)}
                  type={RowValue[1]?.type}
                  className="form-control"
                  id={RowValue[0]}
                  name={RowValue[0]}
                  defaultValue={RowData[RowValue[0]]}
                  onChange={(e) => onChangeLocal(e.target)}
                  // onFocus={(e) => onFocusLocal(e.target)}
                />
                <br key={'br_input_k'.concat(RowKey)} />
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default GenericoFormBody;
