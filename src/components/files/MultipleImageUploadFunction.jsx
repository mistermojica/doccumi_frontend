/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/no-unknown-property */

import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import Link from '@mui/material/Link';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import AppContext from '@app/contexts/AppContext';

const MultipleImageUploadFunction = (props) => {
  // const AppCtx = useContext(AppContext);
  const {images, onChangeCB, formFieldName, cxcAction} = props;

  const mapImages = new Map();
  for (let idx = 0; idx < images.length; idx += 1) {
    mapImages.set(images[idx], images[idx]);
  }

  const [mapThumbnails, setMapThumbnails] = useState(mapImages);
  const [arrUrlsMap, setArrUrlsMap] = useState(new Map());

  const onChangeLocal = (value) => {
    onChangeCB({id: formFieldName, name: formFieldName, value});
  };

  const uploadMultipleFiles = (files) => {
    const arrUrlTemps = [];
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const tempUrl = URL.createObjectURL(file);
      arrUrlTemps.push(tempUrl);
      mapThumbnails.set(tempUrl, 'temporal');
    }
    setMapThumbnails(mapThumbnails);
    uploadFiles(Array.from(files), arrUrlTemps);
  };

  const uploadFiles = (ctxFiles, ctxUrls) => {
    ctxFiles.forEach((file) => {
      uploadImage(file)
        .then((respCloud) => {
          if (ctxFiles.length === ctxUrls.length) {
            // if (ctxFiles.length !== ctxUrls.length) {
            // arrUrlsMap.set(file.name, respCloud);
            // } else {
            // setArrUrlsMap(arrUrlsMap);
            const arrTempUrl = [];
            mapThumbnails.forEach((value, key, map) => {
              if (value === 'temporal') {
                arrTempUrl.push(key);
              }
            });
            arrTempUrl.forEach((url) => {
              mapThumbnails.delete(url);
            });
            arrUrlsMap.forEach((value, key, map) => {
              mapThumbnails.set(value, value);
            });
            arrUrlsMap.clear();
            onChangeLocal(Array.from(mapThumbnails.keys()));
          }
          return true;
        })
        .catch((errCloud) => {
          console.log('errCloud:', errCloud);
          return false;
        });
    });
  };

  const uploadImage = async (file) => {
    const url = 'https://api.cloudinary.com/v1_1/omarmojica/upload';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'documi');
    formData.append('api_key', '581677354416132');
    formData.append('upload_preset', 'qwgxkqhq');
    const response = await axios({
      method: 'post',
      url,
      data: formData
    });
    const cloudUrl = response.data.secure_url;
    arrUrlsMap.set(file.name, cloudUrl);
    setArrUrlsMap(arrUrlsMap);
    return cloudUrl;
  };

  const handleDeleteImage = (idx, url) => {
    mapThumbnails.delete(url);
    setMapThumbnails(mapThumbnails);
    onChangeLocal(Array.from(mapThumbnails.keys()));
  };

  // useEffect(() => {
  //   console.log('useEffect() || images:', images);
  //   for (let idx = 0; idx < images.length; idx += 1) {
  //     mapThumbnails.set(images[idx], images[idx]);
  //   }
  //   setMapThumbnails(mapThumbnails);
  // }, []);

  return (
    <form>
      <div className="form-group multi-preview">
        {(Array.from(mapThumbnails.keys()) || []).map((url, idx) =>
          cxcAction === 'adding' || cxcAction === 'editing' ? (
            <Link
              key={'linkTK'.concat(idx)}
              component="div"
              alt=""
              className="block-icon"
              onClick={() => {
                handleDeleteImage(idx, url);
              }}
            >
              <img
                key={'imgTK'.concat(idx)}
                alt="thumbnail"
                className="m-2 shadow-sm"
                src={url}
                width="100px"
                style={{margin: '5px', border: '1px solid #000000'}}
                rounded="true"
              />
              <FontAwesomeIcon
                key={'faiTK'.concat(idx)}
                color="grey"
                className="fa-stack the-wrapper icon-tag"
                icon={faTimes}
              />
            </Link>
          ) : (
            <img
              key={'imgTK'.concat(idx)}
              alt="thumbnail"
              className="m-2 shadow-sm"
              src={url}
              width="100px"
              style={{margin: '5px', border: '1px solid #000000'}}
              rounded="true"
            />
          )
        )}
      </div>
      {cxcAction === 'adding' || cxcAction === 'editing' ? (
        <div className="input-group mb-3">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id={'uploader_'.concat(formFieldName)}
              name={'uploader_'.concat(formFieldName)}
              onChange={(e) => uploadMultipleFiles(Array.from(e.target.files))}
              multiple
            />
            <label
              className="custom-file-label"
              htmlFor={'uploader_'.concat(formFieldName)}
            >
              Seleccionar archivos
            </label>
          </div>
          <input
            type="hidden"
            className="form-control"
            id={formFieldName}
            name={formFieldName}
            // defaultValue={JSON.stringify(Array.from(mapThumbnails.keys()))}
            defaultValue={Array.from(mapThumbnails.keys())}
          />
        </div>
      ) : (
        <></>
      )}
    </form>
  );
};

export default MultipleImageUploadFunction;
