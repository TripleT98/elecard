import styled,{keyframes, css} from "styled-components";
import {useRef, useEffect, memo} from "react";
import SortMenu from "./../SortMenu/SortMenu";

let moveRight = keyframes`
0%{
  right: 0px;
  opacity: 1;
}
100%{
  right: -180px;
  opacity: 0;
  display: none;
}
`

let moveLeft = keyframes`
0%{
  display: block;
  right: -180px;
  opacity: 0;
}100%{
  right: 0px;
  opacity: 1;
}
`

let StyledSettingsBar = styled.div`
width: 200px;
height: 850px;
position: absolute;
opacity: 0;
right: -200px;
top: 80px;
background-color: rgb(4, 202, 246);
z-index: 1;
${({duration, isOpen})=>{
  duration = duration + "s";
   switch (isOpen){
     case "open":{
       return css`
       animation: ${moveRight} ${duration} ease-out forwards;`
     }
     case "close":{
       return css`
       animation: ${moveLeft} ${duration} ease-out forwards;`
     }
     default: return "";
   }
 }}
/*&.close{
    animation:${moveRight} 1s linear forwards;
}
&.open{
    animation:${moveLeft} 1s linear forwards;
  };*/
`
function SettingsBar(props){
 /*let ref = useRef();
 useEffect(()=>{
   if(props.isOpen){
      ref.current.className = ref.current.className.split(" ").concat("close").join(" ");
   }else if(!props.isOpen){
     ref.current.className = ref.current.className.split(" ").concat("open").join(" ");
   }
 },[props.isOpen]);
 console.log(1);*/
  return(
    <StyledSettingsBar isOpen={props.isOpen} duration={props.duration}><SortMenu/></StyledSettingsBar>
  )
}

export default SettingsBar;
