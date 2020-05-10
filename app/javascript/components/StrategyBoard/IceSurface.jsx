import React, { useRef } from 'react';
import Rock from './Rock';

const IceSurface = ({shot}) => {


  const iceRef = useRef()


  return (
    <svg 
    id='ice'
    ref={iceRef}
    width='500px'
    height='900px'
    viewbox='0 0 300 900'
    style={{backgroundColor:'blue'}}>
      <Rock x='25' y='50' color='red' parentRef={iceRef} shot={shot}></Rock>
      <Rock x='100' y='50' color='red' parentRef={iceRef} shot={shot}></Rock>
      <Rock x='150' y='50' color='yellow' parentRef={iceRef} shot={shot}></Rock>
      <Rock x='200' y='50' color='yellow' parentRef={iceRef} shot={shot}></Rock>


    </svg>
  )

};

export default IceSurface;