/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React, {useState} from 'react';
import {ContentHeader} from '@components';

const dataSources = [
  {
    id: 1,
    dataURL: 'https://picsum.photos/seed/1/600'
  },
  {
    id: 2,
    dataURL: 'https://picsum.photos/seed/2/600'
  },
  {
    id: 3,
    dataURL: 'https://picsum.photos/seed/3/600'
  },
  {
    id: 4,
    dataURL: 'https://picsum.photos/seed/4/600'
  },
  {
    id: 5,
    dataURL: 'https://picsum.photos/seed/5/600'
  },
  {
    id: 6,
    dataURL: 'https://picsum.photos/seed/6/600'
  },
  {
    id: 7,
    dataURL: 'https://picsum.photos/seed/7/600'
  },
  {
    id: 8,
    dataURL: 'https://picsum.photos/seed/8/600'
  },
  {
    id: 9,
    dataURL: 'https://picsum.photos/seed/9/600'
  },
  {
    id: 10,
    dataURL: 'https://picsum.photos/seed/10/600'
  }
];

const Blank = () => {
  const [visible, setVisible] = useState(false);
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
      <ContentHeader title="Blank Page" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
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
            </div>
            <div className="card-body">
              <p>Hola Omar!</p>
              <hr />
            </div>
            <div className="card-footer">Footer</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blank;
