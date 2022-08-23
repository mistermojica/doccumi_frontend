/* eslint-disable no-void */

// 'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
exports.BaseError = void 0;
class BaseError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'BaseError';
    this.code = code;
  }
}

exports.BaseError = BaseError;
