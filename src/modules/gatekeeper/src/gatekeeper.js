/* eslint-disable camelcase */
/* eslint-disable no-void */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-return-assign */

// 'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
const tslib_1 = require('tslib');
const js_base64_1 = require('js-base64');
const fingerprintjs_1 = require('@fingerprintjs/fingerprintjs');
const tab_1 = require('./core/tab');

class Gatekeeper {
  constructor() {
    this.LOCALSTORAGE_IDENTIFIER = 'gatekeeper_token';
    this.URL = 'https://gatekeeper-dev.profabric.tech';
    this.tab = new tab_1.Tab();
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.LOCALSTORAGE_IDENTIFIER);
  }

  getToken() {
    return localStorage.getItem(this.LOCALSTORAGE_IDENTIFIER);
  }

  getAccountID() {
    return this.payload.accountID;
  }

  getDeviceID() {
    return this.payload.deviceID;
  }

  getBase64Payload(additional) {
    const data = {...this.payload, ...additional};
    console.log('payload', data);
    return (0, js_base64_1.encode)(JSON.stringify(data));
  }

  static getInstance() {
    if (!Gatekeeper.instance) {
      Gatekeeper.instance = new Gatekeeper();
    }
    return Gatekeeper.instance;
  }

  initialize(accountID) {
    this.payload = {
      isBrowser: true,
      accountID,
      clientURL: `${location.protocol}//${location.host}`,
      deviceID: null
    };
    fingerprintjs_1.default
      .load()
      .then((fp) => fp.get())
      .then(({visitorId}) => (this.payload.deviceID = visitorId));
  }

  loginByAuth(email, password) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
      try {
        const response = yield fetch(`${this.URL}/v1/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            AccountID: this.payload.accountID,
            DeviceID: this.payload.deviceID
          },
          body: JSON.stringify({email, password})
        });
        const data = yield response.json();
        if (data && data.status && data.message) {
          throw new Error(data.message);
        }
        localStorage.setItem(this.LOCALSTORAGE_IDENTIFIER, data.token);
        return data.token;
      } catch (error) {
        console.log(error);
        throw error;
      }
    });
  }

  registerByAuth(email, password) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
      try {
        const response = yield fetch(`${this.URL}/v1/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            AccountID: this.payload.accountID,
            DeviceID: this.payload.deviceID
          },
          body: JSON.stringify({email, password})
        });
        const data = yield response.json();
        if (data && data.status && data.message) {
          throw new Error(data.message);
        }
        localStorage.setItem(this.LOCALSTORAGE_IDENTIFIER, data.token);
        return data.token;
      } catch (error) {
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
        throw error;
      }
    });
  }

  logout() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
      if (!this.isLoggedIn) {
        throw new Error('Uer not logged in');
      }
      const token = localStorage.getItem(this.LOCALSTORAGE_IDENTIFIER);
      const response = yield fetch(`${this.URL}/v1/profile/logout`, {
        headers: {
          'Content-Type': 'application/json',
          AccountID: this.payload.accountID,
          DeviceID: this.payload.deviceID,
          Authorization: `Bearer ${token}`
        }
      });
      const data = yield response.json();
      if (data && data.status && data.message) {
        throw new Error(data.message);
      }
      localStorage.removeItem(this.LOCALSTORAGE_IDENTIFIER);
      return data;
    });
  }

  getProfile() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
      if (!this.isLoggedIn) {
        throw new Error('Uer not logged in');
      }
      const token = localStorage.getItem(this.LOCALSTORAGE_IDENTIFIER);
      const response = yield fetch(`${this.URL}/v1/profile`, {
        headers: {
          'Content-Type': 'application/json',
          AccountID: this.payload.accountID,
          DeviceID: this.payload.deviceID,
          Authorization: `Bearer ${token}`
        }
      });
      const data = yield response.json();
      if (data && data.status && data.message) {
        throw new Error(data.message);
      }
      return data;
    });
  }

  getProfileDevices() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
      if (!this.isLoggedIn) {
        throw new Error('Uer not logged in');
      }
      const token = localStorage.getItem(this.LOCALSTORAGE_IDENTIFIER);
      const response = yield fetch(`${this.URL}/v1/profile/devices`, {
        headers: {
          'Content-Type': 'application/json',
          AccountID: this.payload.accountID,
          DeviceID: this.payload.deviceID,
          Authorization: `Bearer ${token}`
        }
      });
      const data = yield response.json();
      if (data && data.status && data.message) {
        throw new Error(data.message);
      }
      return data;
    });
  }

  getProfileSessions() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
      if (!this.isLoggedIn) {
        throw new Error('Uer not logged in');
      }
      const token = localStorage.getItem(this.LOCALSTORAGE_IDENTIFIER);
      const response = yield fetch(`${this.URL}/v1/profile/sessions`, {
        headers: {
          'Content-Type': 'application/json',
          AccountID: this.payload.accountID,
          DeviceID: this.payload.deviceID,
          Authorization: `Bearer ${token}`
        }
      });
      const data = yield response.json();
      if (data && data.status && data.message) {
        throw new Error(data.message);
      }
      return data;
    });
  }
}
exports.default = Gatekeeper.getInstance();
