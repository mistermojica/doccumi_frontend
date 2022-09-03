/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */

import React, {ChangeEvent, useEffect, useContext, useState} from 'react';
import {Box, FormControlLabel, FormGroup, Toolbar} from '@mui/material';
// @ts-ignore
import AppContext from '@app/contexts/AppContext';
// @ts-ignore
import camera from './camera.png';

const AddImage = (props: any) => {
  const AppCtx = useContext(AppContext);
  const {image, setImage, onChange, participant, participante} = props;
  const [FotoActiva, setFotoActiva] = useState({url: ''});

  const changeInputHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files![0];
    const reader = new FileReader();
    reader.onload = () => {
      const imgObj = {
        [e.target.id]: img,
        url: reader.result,
        participant
      };
      setImage(imgObj);
      onChange({e, imgObj});
    };
    reader.readAsDataURL(img);
  };

  useEffect(() => {
    const participantId = parseInt(participant, 10);
    // if (AppCtx.ParticipantesData.has(participantId)) {
    // const participantObj = AppCtx.ParticipantesData.get(participantId);
    // image.url = participantObj.image;
    image.url = '';
    // }

    setFotoActiva(image);
  }, []);

  return (
    <Box
      sx={{
        width: '139px',
        height: '177px',
        background: '#F6F8FB',
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
          alt=""
          style={{
            marginTop: '20px',
            height: '63px',
            width: '63px',
            borderRadius: 360
          }}
          src={FotoActiva.url || camera}
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
              data-participant={participant}
              onChange={changeInputHandler}
              id="addImage"
              name="addImage"
              style={{
                width: '100%',
                display: 'none'
              }}
            />
          }
          label="Subir Foto"
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

export default AddImage;
