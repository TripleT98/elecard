import styled from "styled-components";
import {useRef, useState} from "react";
import {banTheCardAC} from "./../../STORE/CardsReducer";
import {connect} from "react-redux";

let StyledCross = styled.div`
background-color: ${props=>props.isHovered?"red":"black"};
width: 15px;
height: 15px;
clip-path: polygon(100% 0%, 60%  50%, 100% 100%, 50% 60%, 0% 100%, 40% 50%, 0% 0%, 50% 40%);
transition-duration: .5s;
`
let StyledButtonContainer = styled.div`
cursor: pointer;
position: absolute;
height:15px;
width:15px;
background-color: transparent;
left: 5px;
top: 5px;
transition-duration: .5s;
`
//clip-path: polygon(100% 0%, 100% 25%, 75% 50%, 100% 75%, 100% 100%, 75% 100%, 50% 75%, 25% 100%, 0% 100%, 0% 75%, 25% 50%, 0% 25%, 0% 0%, 25% 0%, 50% 25%, 75% 0%);


function Cross(props){
  let [isHovered, hover] = useState(false);
  return (
    <StyledButtonContainer onClick={()=>{props?.banTheCard?.(props.id);props.closeTheCard?.();if(!props.id){return false};props.blockToBan.current.classList += " banned"}} onMouseEnter={()=>{hover(true)}} onMouseLeave={()=>{hover(false)}} isHovered={isHovered}><StyledCross isHovered={isHovered}/></StyledButtonContainer>
  )
}

function stateToProps(state){
  return {

  }
}

function dispatchToProps(dispatch){
  return {
     banTheCard: function(key){
       dispatch(banTheCardAC(key))
     }
  }
}

export default connect(stateToProps, dispatchToProps)(Cross);
