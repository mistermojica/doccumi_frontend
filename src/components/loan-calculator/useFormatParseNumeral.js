import {useState} from 'react';
import numeral from 'numeral';

const MAX_FIXED = 2;

function fixDecimals(str, options) {
  if (options.whole || str === undefined) {
    return '';
  }
  if (str === '') {
    return '.';
  }

  str = parseInt(str, 10);

  const maxFixed = options.maxFixed || MAX_FIXED;
  let decimals = `.${str}`;

  if (decimals.length > maxFixed + 1) {
    decimals = decimals.slice(0, maxFixed + 1);
  }

  return decimals;
}

function formatNumber(nbr, options) {
  if (nbr === null || nbr === '') {
    return '';
  }

  const [left, right] = String(nbr).split('.');
  const formatted = numeral(left).format('0,0');
  const decimals = fixDecimals(right, options);

  return formatted + decimals;
}

function parseString(str, options) {
  if (str === '') {
    return null;
  }

  const [left, right] = str.split('.');
  const unformatted = numeral(left).value();
  const decimals = fixDecimals(right, options);
  const result = parseFloat(unformatted + decimals);

  return result;
}

export function useFormatParseNumeral(defaultValue = null, options = {}) {
  const [formattedValue, setFormattedValue] = useState(
    formatNumber(defaultValue, options)
  );

  function setValue(value) {
    setFormattedValue(formatNumber(value, options));

    return parseString(value, options);
  }

  return [formattedValue, setValue];
}
