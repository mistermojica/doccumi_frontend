import React from 'react';
import Spinner from 'react-spinner-material';

const Loading = () => {
  return (
    <div>
      <Spinner size={120} color="#333" width={2} visible />
    </div>
  );
};

export default Loading;
