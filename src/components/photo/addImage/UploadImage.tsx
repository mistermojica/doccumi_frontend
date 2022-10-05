/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */

import React, {ChangeEvent, useState} from 'react';
import axios from 'axios';
import {Box, FormControlLabel, FormGroup, Toolbar} from '@mui/material';
// @ts-ignore
import camera from './camera.png';
// @ts-ignore
import profile from './profile.png';

const UploadImage = (props: any) => {
  const {id, imagen, onChange} = props;

  const [image, setImage] = useState({id: '', url: ''});

  const changeInputHandler = async (target: any) => {
    // ChangeEvent<HTMLInputElement>
    // const image = files[0];

    uploadMultipleFiles(target.files);

    // const reader = new FileReader();
    // reader.onload = () => {
    //   const imgObj = {
    //     addImage: image,
    //     url: String(reader.result)
    //   };
    //   setImage(imgObj);
    //   onChange(imgObj);
    // };
    // reader.readAsDataURL(image);

    // setImage(await uploadImage(e.target.files![0]));
  };

  const uploadMultipleFiles = (files: any) => {
    const arrUrlTemps = [];
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const tempUrl = URL.createObjectURL(file);
      arrUrlTemps.push(tempUrl);
    }
    uploadFiles(Array.from(files), arrUrlTemps);
  };

  const uploadFiles = (ctxFiles: any, ctxUrls: any) => {
    ctxFiles.forEach((file: any) => {
      uploadImage(file)
        .then((respCloud) => {
          if (ctxFiles.length === ctxUrls.length) {
            const imgObj = {
              id,
              url: respCloud
            };
            setImage(imgObj);
            onChange(imgObj);
          }
          return true;
        })
        .catch((errCloud) => {
          console.log('errCloud:', errCloud);
          return false;
        });
    });
  };

  const uploadImage = async (file: any) => {
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
    // arrUrlsMap.set(file.name, cloudUrl);
    // setArrUrlsMap(arrUrlsMap);
    return cloudUrl;
  };

  // const img = Object.values(image)[0];
  return (
    <Box
      sx={{
        width: '100%',
        height: '150px',
        background: '#fff',
        borderRadius: '11px'
      }}
    >
      <Toolbar
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '10%'
        }}
      >
        <img
          className="profile-user-img img-fluid img-circle"
          alt="Perfil de usuario"
          style={{
            marginTop: '20px',
            height: '90px',
            width: '90px',
            borderRadius: 360
          }}
          src={image.url || imagen || profile}
        />
      </Toolbar>
      <FormGroup
        sx={{
          width: '100%'
        }}
      >
        <FormControlLabel
          control={
            <input
              type="file"
              onChange={(e) => changeInputHandler(e.target)}
              id={id.concat('_file')}
              style={{
                width: '100%',
                display: 'none'
              }}
            />
          }
          label="Subir Archivo"
          sx={{
            color: '#336CFB',
            background: 'white',
            borderRadius: '6px'
          }}
          labelPlacement="bottom"
        />
      </FormGroup>
    </Box>
  );
};

export default UploadImage;
