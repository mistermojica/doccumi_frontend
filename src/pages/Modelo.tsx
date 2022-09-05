import React from 'react';
import {ContentHeader} from '@components';

const Modelo = () => {
  return (
    <div>
      <ContentHeader title="Modelo" />
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
              {/* FINAL BODY */}
            </div>
            {/* <div className="card-footer">&nbsp;</div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Modelo;
