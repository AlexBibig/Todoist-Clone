import React from 'react';

import './Spinner.scss';

const Spinner = () => {
  return (
    <div className='Spinner'>
      <div className='wrap go'>
        <div className='loader orbit'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
