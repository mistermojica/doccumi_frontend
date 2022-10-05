/* eslint-disable no-unused-vars */

import React, {useContext} from 'react';
import {ContentHeader} from '@components';
import {useTheme} from '@mui/material/styles';
import {Link} from 'react-router-dom';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {
  Grid,
  Button,
  Typography,
  Paper,
  MobileStepper,
  SvgIcon,
  Box
} from '@mui/material';
// import {fa1, fa2, fa3, fa4, fa5} from '@fortawesome/free-solid-svg-icons';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  LooksOneRounded as LooksOneRoundedIcon,
  LooksTwoRounded as LooksTwoRoundedIcon,
  Looks3Rounded as Looks3RoundedIcon,
  Looks4Rounded as Looks4RoundedIcon,
  Looks5Rounded as Looks5RoundedIcon
} from '@mui/icons-material';
// @ts-ignore
import AppContext from '@app/contexts/AppContext';

const steps = [
  {
    label: 'REGISTRA UN INVENTARIO',
    description: `El primer paso que debes realizar es la creación de un inventario. 
      Para esto debes seleccionar la opción "Agregar Inventario +" del menú 
      "Gestión de Inventario" que se encuentra a la izquierda.`,
    image: './img/paso1.png',
    number: LooksOneRoundedIcon,
    link: '/agregar-vehiculo'
  },
  {
    label: 'REGISTRA UN CLIENTE',
    description: `El segundo paso que debes realizar es la creación de un cliente. 
      Para esto debes seleccionar la opción "Agregar Cliente +" del menú 
      "Gestión de Clientes" que se encuentra a la izquierda.`,
    image: './img/paso2.png',
    number: LooksTwoRoundedIcon,
    link: '/agregar-cliente'
  },
  {
    label: 'REGISTRA UNA PLANTILLA',
    description: `El tercer paso que debes realizar es la creación de un documento
      tipo plantilla. Para esto debes seleccionar la opción "Agregar Plantilla +" del menú 
      "Gestión de Documentos" que se encuentra a la izquierda.`,
    image: './img/paso3.png',
    number: Looks3RoundedIcon,
    link: '/agregar-plantilla'
  },
  {
    label: 'ASIGNA UNA PLANTILLA A UN VEHÍCULO Y UN CLIENTE',
    description: `El cuarto paso que debes realizar es la asignación de una plantilla
      a un vehículo y un cliente. Para esto debes seleccionar la opción "Asignación de Plantilllas"
      del menú "Gestión de Documentos" que se encuentra a la izquierda.`,
    image: './img/paso4.png',
    number: Looks4RoundedIcon,
    link: '/asignar-plantillas'
  },
  {
    label: 'GENERA E IMPRIME EL DOCUMENTO',
    description: `El quinto paso que debes realizar es la impresión del documento
      correspondiente al vehículo y al cliente previamente creados. Para esto debes seleccionar
      la opción "Imprimir Documentos" del menú "Gestión de Documentos" que se encuentra a la izquierda.`,
    image: './img/paso5.png',
    number: Looks5RoundedIcon,
    link: '/imprimir-documentos'
  }
];

// searchParams.get("__firebase_request_key")

const Introduccion = () => {
  const AppCtx = useContext(AppContext);

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <ContentHeader title="Bienvenido a DOCCUMI" />
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
              <div className="row">
                <div className="col-12">
                  <h5>
                    A continuación te mostramos los pasos para configurar tu
                    sistema de gestión de documentos. Luego que hayas
                    configurado el sistema correctamte podrás acceder al panel
                    de control.
                  </h5>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-12 d-flex justify-content-center">
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Box sx={{minWidth: 400, width: '100%', flexGrow: 1}}>
                        <Paper
                          square
                          elevation={0}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: 50,
                            pl: 2,
                            bgcolor: 'background.default'
                          }}
                        >
                          {/* <InputGroup.Text> */}

                          {/* </InputGroup.Text> */}
                          <Typography>
                            <h2>
                              {/* <HomeIcon fontSize="large" /> */}
                              <SvgIcon
                                component={steps[activeStep].number}
                                fontSize="large"
                              />
                            </h2>
                          </Typography>
                          <Typography>
                            <h5>{steps[activeStep].label}</h5>
                          </Typography>
                          <Link to={steps[activeStep].link}>
                            <h6>&nbsp;&nbsp;&nbsp;[IR A LA PÁGINA]</h6>
                          </Link>
                        </Paper>
                        <Box
                          sx={{
                            minWidth: 400,
                            width: '90%',
                            p: 2,
                            alignItems: 'center'
                          }}
                        >
                          <Typography>
                            {steps[activeStep].description}
                          </Typography>
                          <br />
                          <Paper variant="outlined">
                            <img
                              src={steps[activeStep].image}
                              width="100%"
                              alt="Paso"
                            />
                          </Paper>
                        </Box>
                        <MobileStepper
                          variant="text"
                          steps={maxSteps}
                          position="static"
                          activeStep={activeStep}
                          nextButton={
                            <Button
                              size="small"
                              onClick={handleNext}
                              disabled={activeStep === maxSteps - 1}
                            >
                              Next
                              {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                              ) : (
                                <KeyboardArrowRight />
                              )}
                            </Button>
                          }
                          backButton={
                            <Button
                              size="small"
                              onClick={handleBack}
                              disabled={activeStep === 0}
                            >
                              {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                              ) : (
                                <KeyboardArrowLeft />
                              )}
                              Back
                            </Button>
                          }
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
            {/* <div className="card-footer">Footer</div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Introduccion;
