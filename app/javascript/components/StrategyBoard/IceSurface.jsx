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
      <rect x='0' y='1475' width='100%' height='25' fill='blue'/>
      <circle cx='375' cy='1200' r='300' fill='red' stroke='black' strokeWidth='5'/>
      <circle cx='375' cy='1200' r='200' fill='aliceblue' stroke='black' strokeWidth='5'/>
      <circle cx='375' cy='1200' r='100' fill='blue'stroke='black' strokeWidth='5'/>
      <circle cx='375' cy='1200' r='37.5' fill='aliceblue' stroke='black' strokeWidth='5'/>
      <line x1='375' y1='0' x2='375' y2='1650' stroke='black' strokeWidth='5'/>
      <line x1='0' y1='1200' x2='750' y2='1200' stroke='black' strokeWidth='5'/>
      <Rock x='25' y='50' color='red' parentRef={iceRef} shot={shot}></Rock>
      <Rock x='100' y='50' color='red' parentRef={iceRef} shot={shot}></Rock>
      <Rock x='150' y='50' color='yellow' parentRef={iceRef} shot={shot}></Rock>
      <Rock x='200' y='50' color='yellow' parentRef={iceRef} shot={shot}></Rock>
      <Rock x='300' y='50' color='yellow' parentRef={iceRef} shot={shot}></Rock>


    </svg>
  )

};

export default IceSurface;