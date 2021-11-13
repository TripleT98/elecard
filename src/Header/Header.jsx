import styled,{css} from "styled-components";
import UnbanButton from "./UnbanTheCards/UnbanButton";
import SettingsBar from "./SettingsBar/SettingsBar";
import {useState, useRef, useEffect} from "react";
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
background-color: rgb(4, 202, 246);
${props=>props.isDisabled&&css`
background-color:rgb(109, 176, 179);
cursor: auto;
  `}
transition-duration: 0.2s;
border-radius: 50%;
box-sizing: border-box;
border: 2px solid white;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
cursor: pointer;
${props=>props.isBlockView === "treeView"&&css`
opacity: 0;
cursor: auto;
`}
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
  useEffect(()=>{
    if(props.isBlockView === "treeView"){
      changePosition("open");
    }
  },[props.isBlockView])

  let [isOpen, changePosition] = useState("");
  let [isDisabled, changeDisableStatus] = useState(false);
  let [duration] = useState(0.6);
  let ref = useRef();

  function onClickHandler(e){
    if(isDisabled || props.isBlockView === "treeView"){return false};
    changePosition(isOpen === "close"?"open":"close");
    changeDisableStatus(true);
    setTimeout(()=>{changeDisableStatus(false)},duration*1000)
  }

  return (
     <StyledHeader  ref={ref}>
      <div style={{display: "flex"}}>
        <UnbanButton clickFunc={props.unBanAllTheCards} isBlockView={props.isBlockView}>Unban All Cards</UnbanButton>
      </div>
      <div>
         <ChangeView />
      </div>
        <div>
           <StyledSettingsButtonContainer onClick={onClickHandler} isBlockView={props.isBlockView} isDisabled={isDisabled || props.isBlockView === "treeView"}><StyledSettingsButton/><StyledSettingsButton/><StyledSettingsButton/></StyledSettingsButtonContainer>
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
