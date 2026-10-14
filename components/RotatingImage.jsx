'use client';
import {useEffect,useState} from 'react';
export default function RotatingImage({images=[],alt='',className='',interval=30000,delay,offset=0,priority=false,style}){
  const list=[...new Set(images.filter(Boolean))];
  const [i,setI]=useState(list.length?((offset%list.length)+list.length)%list.length:0);
  useEffect(()=>{
    if(list.length<2)return;
    let id;
    const tick=()=>{setI(v=>(v+1)%list.length);id=setTimeout(tick,interval)};
    id=setTimeout(tick,delay??interval);
    return ()=>clearTimeout(id);
  },[list.length,interval,delay]);
  const src=list[i];
  if(!src)return null;
  return <img className={'rotating-image '+(className||'')} src={src} alt={alt} key={src} loading={priority?'eager':'lazy'} style={style}/>;
}
