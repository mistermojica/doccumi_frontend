import {useReducer} from 'react';

const initialState = {
  loanAmount: 0,
  remainingTerm: 0,
  interestRate: 0,
  repaymentType: 'PRINCIPAL_AND_INTEREST',
  repaymentAmount: null,
  repaymentFrquency: 'MONTHLY'
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOAN_AMOUNT':
      return {...state, loanAmount: action.value};
    case 'REMAINING_TERM':
      return {...state, remainingTerm: action.value};
    case 'INTEREST_RATE':
      return {...state, interestRate: action.value};
    default:
      return state;
  }
}

function useStore() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch];
}

export default useStore;
