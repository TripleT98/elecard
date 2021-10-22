import styled,{css} from "styled-components";
import settingsButton from "./../immages/settings.svg";
import UnbanButton from "./UnbanTheCards/UnbanButton";
import {NavLink} from "react-router-dom";
import SettingsBar from "./SettingsBar/SettingsBar";
import {useState, useRef} from "react";
import {unbanCardsThunk} from "./../STORE/CardsReducer";
import {connect} from "react-redux";
import ChangeView from "./ChangeView/ChangeView";

let StyledHeader = styled.div`
background-color: rgb(4, 202, 246);
color: white;
width: 98%;
height:80px;
display: flex;
align-items: center;
padding: 0px 20px 0px 20px;
justify-content: space-between;
`

let StyledSettingsButtonContainer = styled.div`
width: 45px;
height: 45px;
padding: 8px;
background-color: ${({isDisabled})=>isDisabled?"rgb(109, 176, 179)":"rgb(4, 202, 246)"};
transition-duration: 0.2s;
border-radius: 50%;
box-sizing: border-box;
border: 2px solid white;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
cursor: pointer;
`

let StyledSettingsButton = styled.div`
  width: 20px;
  height: 5px;
  margin: 0px;
  background-color: white;
  top: 0px;
  left: 0px;
`

function Header(props){
  let [isOpen, changePosition] = useState("");
  let [isDisabled, changeDisableStatus] = useState(false);
  let [duration, changeDuration] = useState(0.6);
  let ref = useRef();

  function onClickHandler(e){
    if(isDisabled){return false};
    changePosition(isOpen == "close"?"open":"close");
    changeDisableStatus(true);
    setTimeout(()=>{changeDisableStatus(false)},duration*1000)
  }

  return (
     <StyledHeader  ref={ref}>
      <div style={{display: "flex"}}>
        <UnbanButton clickFunc={props.unBanAllTheCards}>Unban All Cards</UnbanButton>
      </div>
      <div>
         <ChangeView />
      </div>
        <div>
           <StyledSettingsButtonContainer onClick={onClickHandler} isDisabled={isDisabled}><StyledSettingsButton/><StyledSettingsButton/><StyledSettingsButton/></StyledSettingsButtonContainer>
        </div>
        <SettingsBar isOpen={isOpen} duration={duration}/>
     </StyledHeader>
  )
}

function stateToProps(state){
  return{
     isBlockView: state.forCards.view
  }
}

function dispatchToProps(dispatch){
  return{
     unBanAllTheCards: function(){
       unbanCardsThunk(dispatch);
     }
  }
}

export default connect(stateToProps, dispatchToProps)(Header);
