/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';
import axios from 'axios';
import {mlCL, omoment} from '@app/utils/helpers';
import {loginUser} from '@store/reducers/auth';
import {Button, Checkbox} from '@components';
import {
  faEnvelope,
  faLock,
  faBuilding,
  faBriefcase,
  faUser,
  faPhone,
  faMobilePhone
} from '@fortawesome/free-solid-svg-icons';
import {setWindowClass} from '@app/utils/helpers';
import {Form, InputGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import * as Config from '@app/utils/config';
import * as AuthService from '@app/services/auth';

const Register = () => {
  const [isAuthLoading, setAuthLoading] = useState(false);
  const [UrlBase] = useState(Config.gatDomainName().concat('/subscripciones/'));
  const [DataProfesiones, SetDataProfesiones] = useState([]);

  // const [isGoogleAuthLoading, setGoogleAuthLoading] = useState(false);
  // const [isFacebookAuthLoading, setFacebookAuthLoading] = useState(false);
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const register = async (
    nombre: string,
    telefono: string,
    whatsapp: string,
    nombre_empresa: string,
    tipo_empresa: string,
    email: string,
    password: string,
    usuario_stripe: string
  ) => {
    try {
      setAuthLoading(true);
      const token = await AuthService.registerByAuth({
        nombre,
        telefono,
        whatsapp,
        nombre_empresa,
        tipo_empresa,
        email,
        password,
        usuario_stripe
      });
      setAuthLoading(false);
      dispatch(loginUser(token));
      toast.success('Registration is success');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Failed');
      setAuthLoading(false);
    }
  };

  const stripeCreateCustomer = (ctx: any) => {
    const promise = new Promise(function (resolve, reject) {
      axios
        .post(UrlBase.concat('create-customer'), {
          email: ctx.email,
          name: ctx.name,
          phone: ctx.phone
        })
        .then((response: any) => {
          console.log('handleSubmit() => data:', response.data);
          const {customer} = response.data;
          resolve(customer);
        })
        .catch((err: any) => {
          console.log('handleSubmit() => err:', err);
          reject(err);
        });
    });

    return promise;
  };

  const GetProfesiones = () => {
    const url = Config.gatDomainName().concat('/profesiones/listpop/');

    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') {
          mlCL('message:', message);
        } else {
          mlCL('data:', data);
          SetDataProfesiones(data);
        }
      })
      .catch((err) => {
        mlCL('err:', err);
      });
  };

  useEffect(() => {
    GetProfesiones();
  }, []);

  // const registerByGoogle = async () => {
  //   try {
  //     setGoogleAuthLoading(true);
  //     const token = await AuthService.registerByGoogle();
  //     setGoogleAuthLoading(false);
  //     dispatch(loginUser(token));
  //     toast.success('Authentication is succeed!');
  //     navigate('/');
  //   } catch (error: any) {
  //     toast.error(error.message || 'Failed');
  //     setGoogleAuthLoading(false);
  //   }
  // };

  // const registerByFacebook = async () => {
  //   try {
  //     setFacebookAuthLoading(true);

  //     const token = await AuthService.registerByFacebook();
  //     setFacebookAuthLoading(false);
  //     dispatch(loginUser(token));
  //     toast.success('Register is succeeded!');
  //     navigate('/');
  //   } catch (error: any) {
  //     setFacebookAuthLoading(false);
  //     toast.error(error.message || 'Failed');
  //   }
  // };

  const {handleChange, values, handleSubmit, touched, errors} = useFormik({
    initialValues: {
      nombre: '',
      telefono: '',
      whatsapp: '',
      nombre_empresa: '',
      tipo_empresa: '',
      email: '',
      password: '',
      passwordRetype: '',
      terminosycondiciones: false
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Correo electrónico inválido')
        .required('Campo Requerido'),
      nombre: Yup.string().required('Campo requerido'),
      tipo_empresa: Yup.string().required('Campo requerido'),
      terminosycondiciones: Yup.bool().oneOf([true], 'Campo requerido'),
      password: Yup.string()
        .min(5, 'Debe tener 5 caracteres o más')
        .max(30, 'Debe tener 30 caracteres o menos')
        .required('Campo requerido'),
      passwordRetype: Yup.string()
        .min(5, 'Debe tener 5 caracteres o más')
        .max(30, 'Debe tener 30 caracteres o menos')
        .required('Campo requerido')
        .when('password', {
          is: (val: string) => !!(val && val.length > 0),
          then: Yup.string().oneOf(
            [Yup.ref('password')],
            'Ambas contraseñas deben ser iguales'
          )
        })
    }),
    onSubmit: (values) => {
      stripeCreateCustomer({
        email: values.email,
        name: values.nombre,
        phone: values.telefono
      })
        .then((stripeCustomer: any) => {
          console.log('resiter:', {stripeCustomer});
          register(
            values.nombre,
            values.telefono,
            values.whatsapp,
            values.nombre_empresa,
            values.tipo_empresa,
            values.email,
            values.password,
            stripeCustomer?.id
          );
        })
        .catch((errSCC: any) => {
          console.log('resiter:', {errSCC});
        });
    }
  });

  setWindowClass('hold-transition register-page');

  return (
    <div className="register-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <Link to="/" className="h1">
            <img
              // className="animation__shake"
              src="/img/logo-black-transp.png"
              alt="DOCCUMI"
              style={{marginTop: 5, marginBottom: 5}}
              width="250"
            />
          </Link>
        </div>
        <div className="card-body">
          <p className="login-box-msg">{t('register.registerNew')}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="nombre_empresa"
                  name="nombre_empresa"
                  type="nombre_empresa"
                  placeholder="Tu Empresa (Opcional)"
                  onChange={handleChange}
                  value={values.nombre_empresa}
                  isValid={touched.nombre_empresa && !errors.nombre_empresa}
                  isInvalid={touched.nombre_empresa && !!errors.nombre_empresa}
                />
                {touched.nombre_empresa && errors.nombre_empresa ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.nombre_empresa}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faBuilding} />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  as="select"
                  id="tipo_empresa"
                  name="tipo_empresa"
                  onChange={handleChange}
                  value={values.tipo_empresa}
                  isValid={touched.tipo_empresa && !errors.tipo_empresa}
                  isInvalid={touched.tipo_empresa && !!errors.tipo_empresa}
                >
                  <option value="">Selecciona el tipo de empresa</option>
                  {DataProfesiones &&
                    DataProfesiones.map((profesion) => (
                      <option
                        key={'profesion' + profesion?._id}
                        value={profesion?.proCodigo}
                      >
                        {profesion?.proNombre}
                      </option>
                    ))}
                </Form.Control>
                {touched.tipo_empresa && errors.tipo_empresa ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.tipo_empresa}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faBriefcase} />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="nombre"
                  name="nombre"
                  type="nombre"
                  placeholder="Nombre Completo"
                  onChange={handleChange}
                  value={values.nombre}
                  isValid={touched.nombre && !errors.nombre}
                  isInvalid={touched.nombre && !!errors.nombre}
                />
                {touched.nombre && errors.nombre ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.nombre}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faUser} />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="telefono"
                  name="telefono"
                  type="telefono"
                  placeholder="Teléfono (Opcional)"
                  onChange={handleChange}
                  value={values.telefono}
                  isValid={touched.telefono && !errors.telefono}
                  isInvalid={touched.telefono && !!errors.telefono}
                />
                {touched.telefono && errors.telefono ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.telefono}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faPhone} />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="whatsapp"
                  name="whatsapp"
                  type="whatsapp"
                  placeholder="WhatsApp (Opcional)"
                  onChange={handleChange}
                  value={values.whatsapp}
                  isValid={touched.whatsapp && !errors.whatsapp}
                  isInvalid={touched.whatsapp && !!errors.whatsapp}
                />
                {touched.whatsapp && errors.whatsapp ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.whatsapp}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faMobilePhone} />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={values.email}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email}
                />
                {touched.email && errors.email ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                />
                {touched.password && errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faLock} />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="passwordRetype"
                  name="passwordRetype"
                  type="password"
                  placeholder="Retype password"
                  onChange={handleChange}
                  value={values.passwordRetype}
                  isValid={touched.passwordRetype && !errors.passwordRetype}
                  isInvalid={touched.passwordRetype && !!errors.passwordRetype}
                />
                {touched.passwordRetype && errors.passwordRetype ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.passwordRetype}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faLock} />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>
            <div className="row">
              <div className="col-12">
                <Form.Check
                  type="checkbox"
                  id="terminosycondiciones"
                  name="terminosycondiciones"
                >
                  <Form.Check.Input
                    type="checkbox"
                    onChange={handleChange}
                    isValid={
                      touched.terminosycondiciones &&
                      !errors.terminosycondiciones
                    }
                    isInvalid={
                      touched.terminosycondiciones &&
                      !!errors.terminosycondiciones
                    }
                    style={{
                      width: '2vw',
                      height: '2vh'
                    }}
                  />
                  <Form.Check.Label style={{paddingLeft: '10px'}}>
                    <span>Estoy de acuerdo con los </span>
                    <a
                      target="blank"
                      href="https://doccumi.com/terminos-y-condiciones"
                    >
                      términos y condiciones.
                    </a>
                  </Form.Check.Label>
                  {touched.terminosycondiciones &&
                  errors.terminosycondiciones ? (
                    <Form.Control.Feedback
                      type="invalid"
                      style={{paddingLeft: '10px'}}
                    >
                      {errors.terminosycondiciones}
                    </Form.Control.Feedback>
                  ) : (
                    <></>
                  )}
                </Form.Check>
                {/* <Checkbox
                  // id="terminosycondiciones"
                  name="terminosycondiciones2"
                  type="icheck"
                  checked={false}
                >
                  <span>Estoy de acuerdo con los </span>
                  <a
                    target="blank"
                    href="https://doccumi.com/terminos-y-condiciones"
                  >
                    términos y condiciones
                  </a>
                </Checkbox> */}
              </div>
              <div className="col-12">
                <br />
                <Button
                  type="submit"
                  block
                  isLoading={isAuthLoading}
                  // disabled={isFacebookAuthLoading || isGoogleAuthLoading}
                >
                  {/* @ts-ignore */}
                  {t('register.label')}
                </Button>
              </div>
            </div>
          </form>
          {/* <hr /> */}
          {/* <small>
            {'touched:' + JSON.stringify(touched)} <hr />
            {'errors:' + JSON.stringify(errors)}
            <hr />
          </small> */}
          {/* <div className="social-auth-links text-center">
            <Button
              block
              icon="facebook"
              onClick={registerByFacebook}
              isLoading={isFacebookAuthLoading}
              disabled={isAuthLoading || isGoogleAuthLoading}
            >
              {/* @ts-ignore /}
              {t('login.button.signUp.social', {
                what: 'Facebook'
              })}
            </Button>
            <Button
              block
              icon="google"
              theme="danger"
              onClick={registerByGoogle}
              isLoading={isGoogleAuthLoading}
              disabled={isAuthLoading || isFacebookAuthLoading}
            >
              {/* @ts-ignore /}
              {t('login.button.signUp.social', {what: 'Google'})}
            </Button>
          </div> */}
          <br />
          <Link to="/login" className="text-center">
            {t('register.alreadyHave')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
