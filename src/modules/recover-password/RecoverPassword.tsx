/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React, {useEffect} from 'react';
import {toast} from 'react-toastify';
import {Link, useSearchParams, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Button} from '@components';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import {setWindowClass} from '@app/utils/helpers';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {Form, InputGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// @ts-ignore
import * as Config from '@app/utils/config';

const RecoverPassword = () => {
  const navigate = useNavigate();

  const [t] = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const {handleChange, values, handleSubmit, touched, errors} = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
      confirmPassword: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required')
        .when('password', {
          is: (val: string) => !!(val && val.length > 0),
          then: Yup.string().oneOf(
            [Yup.ref('password')],
            'Both password need to be the same'
          )
        })
    }),
    onSubmit: (values) => {
      // toast.warn('Not yet functional');
      // console.log({...values, id: searchParams.get('id')});
      resetPassword({...values, id: searchParams.get('id')});
    }
  });

  const resetPassword = (ctx: any) => {
    const url = Config.gatDomainName().concat('/usuarios/resetpassword');

    axios
      .post(url, ctx)
      .then((response) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') {
          toast.warn(message);
        } else {
          toast.success(message);
          // console.log(data);
          navigate('/login');
        }
      })
      .catch((err) => {
        console.log('resetPassword() => err:', err);
      });
  };

  useEffect(() => {
    console.log('ID:', searchParams.get('id'));
  }, []);

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
          <p className="login-box-msg">{t('recover.oneStepAway')}</p>
          <form onSubmit={handleSubmit}>
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
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  onChange={handleChange}
                  value={values.confirmPassword}
                  isValid={touched.confirmPassword && !errors.confirmPassword}
                  isInvalid={
                    touched.confirmPassword && !!errors.confirmPassword
                  }
                />
                {touched.confirmPassword && errors.confirmPassword ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
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
                <Button type="submit" block>
                  {/* @ts-ignore */}
                  {t('recover.changePassword')}
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

export default RecoverPassword;
