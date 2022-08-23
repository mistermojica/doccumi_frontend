import React from 'react';
import {Pre} from 'evergreen-ui';

import Form from './Form';
import useStore from './useStore';
import Amortization from './Amortization';

function LoanCalculator() {
  const [store, dispatch] = useStore();

  return (
    <div>
      <Form store={store} dispatch={dispatch} />
      {false && <Pre>{JSON.stringify(store, null, 2)}</Pre>}
      <Amortization store={store} />
    </div>
  );
}

export default LoanCalculator;
