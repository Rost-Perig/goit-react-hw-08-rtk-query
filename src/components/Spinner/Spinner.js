import React from 'react';
import Loader from "react-loader-spinner";
import s from './Spinner.module.css';

const Spinner = ({size}) => {
  return (
    <div className={s.loaderBox}>
      <Loader
        type="Oval"  //Audio Bars BallTriangle Circles Grid Oval Puff Rings TailSpin ThreeDots Hearts
        color="#dadada"
        height={size}
        width={size}
        timeout={5000} // ms
      />
    </div>
  );
};

export default Spinner;