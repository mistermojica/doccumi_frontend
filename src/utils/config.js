/* eslint-disable no-console */

export const gatDomainName = () => {
  let result = '';
  if (window.location.hostname.includes('localhost')) {
    result = 'http://localhost:8002';
  } else {
    result = 'https://api.doccumi.com';
  }
  return result;
};
