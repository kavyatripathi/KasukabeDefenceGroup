import React from 'react';
import Backdrop from '../../../assets/shinchan.jpg';

const backdrop = (props) => {
    return <img src={Backdrop} alt="Backdrop" style={{height: props.height}}/>;
}

export default backdrop;