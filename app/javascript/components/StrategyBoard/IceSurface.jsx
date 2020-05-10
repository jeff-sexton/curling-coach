import React, { useRef } from 'react';
import Rock from './Rock';

const IceSurface = ({shot}) => {


  const iceRef = useRef()


  return (
    <svg 
    id='ice'
    ref={iceRef}
    height='100%'
    viewBox='0 0 750 1650'
    >
      <rect x="0" y="0" width="100%" height="100%" fill='aliceblue'/>
      <rect x='0' y='150' width='100%' height='25' fill='red'/>
      <rect x='0' y='1500' width='100%' height='25' fill='red'/>
      <Rock x='25' y='50' color='red' parentRef={iceRef} shot={shot}></Rock>
      <Rock x='100' y='50' color='red' parentRef={iceRef} shot={shot}></Rock>
      <Rock x='150' y='50' color='yellow' parentRef={iceRef} shot={shot}></Rock>
      <Rock x='200' y='50' color='yellow' parentRef={iceRef} shot={shot}></Rock>
      <Rock x='300' y='50' color='yellow' parentRef={iceRef} shot={shot}></Rock>


    </svg>
  )

};

export default IceSurface;