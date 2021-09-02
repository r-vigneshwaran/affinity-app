/**
 * This module contains a loader component.
 * <Preloader
      show, => (boolean to decide show Overlay on screen with loader)
    </Preloader>
 */
import React from 'react';

const Preloader = function (props) {
  const { show } = props;
  return (
    <React.Fragment>
      <div className={` ${show ? 'loader' : ''}`} />
      <div className={show ? 'bg-loader' : ''} />
    </React.Fragment>
  );
};
export default Preloader;
