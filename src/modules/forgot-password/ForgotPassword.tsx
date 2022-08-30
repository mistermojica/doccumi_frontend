/* eslint-disable no-console */

import React from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useTranslation} from 'react-i18next';
import {Button} from '@components';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {setWindowClass} from '@app/utils/helpers';
import * as Yup from 'yup';
import axios from 'axios';
import {useFormik} from 'formik';
import {Form, InputGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as Config from '@app/utils/config';

const ForgotPassword = () => {
  const [t] = useTranslation();

  const {handleChange, values, handleSubmit, touched, errors} = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required')
    }),
    onSubmit: (values: any) => {
      recoverPassword(values);
    }
  });

  const recoverPassword = (ctx: any) => {
    const url = Config.gatDomainName().concat('/usuarios/recoverpassword');

    axios
      .post(url, ctx)
      .then((response) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') {
          toast.warn(message);
        } else {
          toast.success(message);
          console.log(data);
        }
      })
      .catch((err) => {
        console.log('recoverPassword() => err:', err);
      });
  };

  setWindowClass('hold-transition login-page');

  return (
    <div className="login-box">
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
          <p className="login-box-msg">{t('recover.forgotYourPassword')}</p>
          {/* Ingresa la dirección de correo electrónico asociada a tu cuenta y te enviaremos un enlace para restablecer tu contraseña. */}
          <form onSubmit={handleSubmit}>
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
            <div className="row">
              <div className="col-12">
                <Button type="submit" block>
                  {/* @ts-ignore */}
                  {t('recover.requestNewPassword')}
                </Button>
              </div>
            </div>
          </form>
          <p className="mt-3 mb-1">
            <Link to="/login">{t('login.button.signIn.label')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
