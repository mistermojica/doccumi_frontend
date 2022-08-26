import React from 'react';
import Spinner from 'react-spinner-material';

const Loading = (props) => {
  const {show} = props;

  return (
    <div>
      <Spinner size={120} color="#333" width={2} visible={show} />
    </div>
  );
};

export default Loading;
