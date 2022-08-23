/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-bind */

import React from 'react';
import NumericalInputField from './NumericalInputField';
import {format} from './utils';

function Form(props) {
  const loanAmount = format(props.store.loanAmount);
  const remainingTerm = format(props.store.remainingTerm);
  const interestRate = format(props.store.interestRate);

  function handleLoanAmountChange(value) {
    props.dispatch({
      type: 'LOAN_AMOUNT',
      value
    });
  }

  function handleRemainingTermChange(value) {
    props.dispatch({
      type: 'REMAINING_TERM',
      value
    });
  }

  function handleInterestRateChange(value) {
    props.dispatch({
      type: 'INTEREST_RATE',
      value
    });
  }

  return (
    <form>
      <div className="container">
        <div className="row">
          <div className="col">
            <NumericalInputField
              label="Monto Préstamo"
              value={loanAmount}
              onChange={handleLoanAmountChange}
            />
          </div>
          <div className="col">
            <NumericalInputField
              label="Años"
              value={remainingTerm}
              onChange={handleRemainingTermChange}
            />
          </div>
          <div className="col">
            <NumericalInputField
              label="Tasa de Interés"
              value={interestRate}
              onChange={handleInterestRateChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default Form;
