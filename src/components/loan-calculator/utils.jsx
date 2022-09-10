const intlNumberFormat = new Intl.NumberFormat('en-AU');

export function parse(str) {
  return str !== '' ? str : null;
}

export function parseNumber(str, fixed = 0) {
  const regex = fixed === 0 ? /[^\d]/gi : /[^\d.]/gi;

  str = str.replace(regex, '');

  if (str === '' || str === '.') {
    return null;
  }
  if (str.charAt(str.length - 1) === '.') {
    return parseInt(str.split('.')[0], 10);
  }

  return parseFloat(parseFloat(str).toFixed(fixed));
}

export function format(value) {
  return value !== null ? value : '';
}

export function formatNumber(value, fixed = 0) {
  if (value === null) {
    return '';
  }

  const str = String(value);
  let [int, dec] = str.split('.');

  if (!int) {
    return '';
  }

  int = intlNumberFormat.format(int);

  if (dec === '') {
    return `${int}.`;
  }

  if (fixed !== 0 && dec && dec.length > fixed) {
    dec = dec.substr(0, fixed);
  }

  return `${int}${dec ? `.${dec}` : ''}`;
}
