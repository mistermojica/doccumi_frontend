import {removeWindowClass} from '@app/utils/helpers';
// import {Gatekeeper} from 'gatekeeper-client-sdk';
// import {Gatekeeper} from '@app/modules/gatekeeper-client';
// @ts-ignore
import Gatekeeper from '@app/services/gatekeeper';
// const Gatekeeper = require('./gatekeeper').default;
// import * as Gatekeeper from './indexx';

const gatekeeper = new Gatekeeper();

// Gatekeeper.getInstance();
gatekeeper.initialize('08401b7e-da7e-4bf3-a9bf-6f594ae5fb02');

export const getProfile = async () => {
  const profile = await gatekeeper.getProfile();
  // localStorage.setItem('token', token);
  // removeWindowClass('login-page');
  // removeWindowClass('hold-transition');
  return profile;
};

export const getProfileId = () => {
  const profile = gatekeeper.getProfileId();
  return profile;
};

export const loginByAuth = async (email: string, password: string) => {
  const token = await gatekeeper.loginByAuth(email, password);
  localStorage.setItem('token', token);
  removeWindowClass('login-page');
  removeWindowClass('hold-transition');
  return token;
};

export const registerByAuth = async (ctx: any) => {
  const token = await gatekeeper.registerByAuth(ctx);
  localStorage.setItem('token', token);
  removeWindowClass('register-page');
  removeWindowClass('hold-transition');
  return token;
};

export const loginByGoogle = async () => {
  const token = await gatekeeper.loginByGoogle();
  localStorage.setItem('token', token);
  removeWindowClass('login-page');
  removeWindowClass('hold-transition');
  return token;
};

export const registerByGoogle = async () => {
  const token = await gatekeeper.registerByGoogle();
  localStorage.setItem('token', token);
  removeWindowClass('register-page');
  removeWindowClass('hold-transition');
  return token;
};

export const loginByFacebook = async () => {
  const token = await gatekeeper.loginByFacebook();
  localStorage.setItem('token', token);
  removeWindowClass('login-page');
  removeWindowClass('hold-transition');
  return token;
};

export const registerByFacebook = async () => {
  const token = await gatekeeper.registerByFacebook();
  localStorage.setItem('token', token);
  removeWindowClass('register-page');
  removeWindowClass('hold-transition');
  return token;
};
