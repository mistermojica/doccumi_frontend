/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React, {useState} from 'react';
import {ContentHeader} from '@components';
import AlertDialog from '@app/components/dialogs/AlertDialog';
import {Button} from 'react-bootstrap';
// @ts-ignore
import LoanCalculator from '@app/components/loan-calculator/LoanCalculator';

const CalculadoraPrestamo = () => {
  const [visible, setVisible] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

  const [MsgTitulo, setMsgTitulo] = useState('');
  const [MsgContenido, setMsgContenido] = useState('');
  const [MsgEstado, setMsgEstado] = useState(false);

  const ShowAlert = (props: any) => {
    const {msgtitle, msgcontent, msgstatus} = props;

    setMsgTitulo(msgtitle);
    setMsgContenido(msgcontent);
    setMsgEstado(msgstatus);
  };

  const handleClose = () => {
    setMsgEstado(false);
  };

  const handleAddNew = () => {};

  const handleSetVisible = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  const onUpload = (data: any) => {
    console.log('Upload files', data);
  };
  const onSelect = (data: any) => {
    console.log('Select files', data);
  };
  const onRemove = (id: string) => {
    console.log('Remove image id', id);
  };

  return (
    <div>
      <ContentHeader title="Calculadora Préstamo" />
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
              <LoanCalculator />
              <Button
                type="submit"
                className="btn tn-success mt-4"
                disabled={isDisabled}
                onClick={handleAddNew}
              >
                Guardar
              </Button>
            </div>
            <AlertDialog
              msgtitle={MsgTitulo}
              msgcontent={MsgContenido}
              msgstatus={MsgEstado}
              handleClose={handleClose}
            />
            {/* <div className="card-footer">&nbsp;</div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CalculadoraPrestamo;
