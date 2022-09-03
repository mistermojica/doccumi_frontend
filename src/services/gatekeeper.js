/* eslint-disable camelcase */
/* eslint-disable no-void */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-return-assign */
/* eslint func-names: ["error", "never"] */

import {mlCL} from '@app/utils/helpers';
import * as Config from '@app/utils/config';

// Object.defineProperty(exports, '__esModule', {value: true});
// const tslib_1 = require('tslib');
// import tslib_1 from 'tslib';
import * as tslib_1 from "tslib";
// const js_base64_1 = require('js-base64');
import * as js_base64_1 from 'js-base64';
// const fingerprintjs_1 = require('@fingerprintjs/fingerprintjs');
// const axios = require('axios');
// const tab_1 = require('./core/tab');

class Gatekeeper {
  constructor() {
    this.LOCALSTORAGE_IDENTIFIER = 'gatekeeper_token';
    this.LOCALSTORAGE_ID = 'gatekeeper_id';
    this.URL = Config.gatDomainName().concat('');
    this.payload = {
      accountID: null,
      clientURL: null,
      browserID: null
    };
    // mlCL('tab_1:', tab_1);
    // this.tab = new tab_1.Tab();
    // fingerprintjs_1.default
    //   .load()
    //   .then((fp) => fp.get())
    //   .then(({visitorId}) => (this.payload.browserID = visitorId));
  }

  getBase64Payload(additional) {
    const data = {...this.payload, ...additional};
    return (0, js_base64_1.encode)(JSON.stringify(data));
  }

  static getInstance() {
    if (!Gatekeeper.instance) {
      Gatekeeper.instance = new Gatekeeper();
    }
    return Gatekeeper.instance;
  }

  initialize(accountID) {
    this.payload.accountID = accountID;
    this.payload.clientURL = `${location.protocol}//${location.host}`;
  }

  loginByAuth(email, password) {
    // debugger;
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
      let result = null;

      try {
        // const response = yield fetch(`${this.URL}/v1/auth/login`, {
        const response = yield fetch(`${this.URL}/usuarios/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            AccountID: this.payload.accountID
          },
          body: JSON.stringify({email, password})
        });
        // const response = yield axios({
        //     method: 'post',
        //     url: `${this.URL}/usuarios/login`,
        //     headers: {
        //         'Content-Type': 'application/json',
        //         AccountID: this.payload.accountID,
        //         romg: "omarmojica",
        //     },
        //     data: JSON.stringify({ email, password }),
        // });
        const data = yield response.json();
        if (data && data.success === false) {
          throw new Error(data.message);
        } else {
          localStorage.setItem(this.LOCALSTORAGE_IDENTIFIER, data.result.token);
          localStorage.setItem(this.LOCALSTORAGE_ID, data.result._id);
          result = data.result.token;
        }
        return result;
      } catch (error) {
        mlCL('error:', error);
        throw error;
      }
    });
  }

  registerByAuth(ctx) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
      try {
        // const response = yield fetch(`${this.URL}/v1/auth/register`, {
        const response = yield fetch(`${this.URL}/usuarios/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            AccountID: this.payload.accountID
          },
          body: JSON.stringify(ctx)
        });
        const data = yield response.json();
        if (data && data.status && data.message) {
          throw new Error(data.message);
        }
        localStorage.setItem(this.LOCALSTORAGE_IDENTIFIER, data.token);
        return data.token;
      } catch (error) {
        mlCL('error:', error);
        throw error;
      }
    });
  }

  loginByGoogle() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
      try {
        const {token} = yield this.tab.open(
          `${this.URL}/v1/auth/google?payload=${this.getBase64Payload({
            type: 'LOGIN'
          })}`
        );
        localStorage.setItem(this.LOCALSTORAGE_IDENTIFIER, token);
        return token;
      } catch (error) {
        mlCL('error:', error);
        throw error;
      }
    });
  }

  registerByGoogle() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
      try {
        const {token} = yield this.tab.open(
          `${this.URL}/v1/auth/google?payload=${this.getBase64Payload({
            type: 'REGISTER'
          })}`
        );
        localStorage.setItem(this.LOCALSTORAGE_IDENTIFIER, token);
        return token;
      } catch (error) {
        mlCL('error:', error);
        throw error;
      }
    });
  }

  loginByFacebook() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
      try {
        const {token} = yield this.tab.open(
          `${this.URL}/v1/auth/facebook?payload=${this.getBase64Payload({
            type: 'LOGIN'
          })}`
        );
        localStorage.setItem(this.LOCALSTORAGE_IDENTIFIER, token);
        return token;
      } catch (error) {
        mlCL('error:', error);
        throw error;
      }
    });
  }

  registerByFacebook() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
      try {
        const {token} = yield this.tab.open(
          `${this.URL}/v1/auth/facebook?payload=${this.getBase64Payload({
            type: 'REGISTER'
          })}`
        );
        localStorage.setItem(this.LOCALSTORAGE_IDENTIFIER, token);
        return token;
      } catch (error) {
        mlCL('error:', error);
        throw error;
      }
    });
  }

  getProfile() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
      const token = localStorage.getItem(this.LOCALSTORAGE_IDENTIFIER);
      const _id = localStorage.getItem(this.LOCALSTORAGE_ID);
      // const response = yield fetch(`${this.URL}/v1/users/profile`, {
      const response = yield fetch(`${this.URL}/usuarios/profile/${_id}`, {
        headers: {
          'Content-Type': 'application/json',
          AccountID: this.payload.accountID,
          Authorization: `Bearer ${token}`
        }
      });
      const data = yield response.json();
      if (data && data.status && data.message) {
        throw new Error(data.message);
      }
      return data.result;
    });
  }

  getProfileId() {
    const _id = localStorage.getItem(this.LOCALSTORAGE_ID);
    return _id;
  }
}

export default Gatekeeper;
