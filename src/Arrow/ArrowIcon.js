import styled,{keyframes,css} from "styled-components";
import {useState, useRef} from "react";

let rotateAnimation_top = keyframes`
0%{
  transform: rotateZ(0deg);
}
100%{
  transform: rotateZ(-90deg);
}
`
let rotateAnimation_bot = keyframes`
0%{
  transform: rotateZ(-90deg);
}
100%{
  transform: rotateZ(0deg);
}
`

let StyledArrow = styled.div`
  width: 35px;
  height: 35px;
  background-color: rgb(4, 202, 246);
  clip-path: polygon(5%  40%, 27% 40%, 50% 57%, 73% 40%, 95% 40%, 50% 75%);
  ${({direction})=>{
    switch (direction){
      case "top":{
           return css`
           animation: ${rotateAnimation_top} .2s ease-in forwards;
           `
      };
      case "bot":{
        return css`
        animation: ${rotateAnimation_bot} .2s ease-out forwards;
        `
      };
      default: return "";
    }
   }
 }
`

let Container=styled.div`
width: max-content;
height: max-content;
background-color: white;
margin-right: 5px;
cursor: pointer;
`

function Arrow(props){
  let [direction, changeDir] = useState("");
  let ref = useRef();
  return(
    <Container  onClick={(e)=>{props?.onClick?.();direction=="top"?changeDir("bot"):changeDir("top");}}><StyledArrow ref={ref} direction={direction}></StyledArrow></Container>
  )
}

export default Arrow;
