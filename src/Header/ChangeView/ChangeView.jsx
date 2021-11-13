import styled from "styled-components";
import {useState} from "react";
import {connect} from "react-redux";
import {changeViewAC} from "./../../STORE/CardsReducer";

let StyledChangeViewForm = styled.form`

`
let StyledInput = styled.input`
margin-right: 20px;
`
let StyledSpan = styled.span`
font-size: 20px;
margin-right: 5px;
`

function ChangeView(props){

  let [value, setValue] = useState("block");

  function onChangeHandler(val){
    setValue(val);
    props.changeView(val);
  }

  return(
    <StyledChangeViewForm>
        <StyledSpan>BLOCK VIEW</StyledSpan><StyledInput value="block" type="radio" checked={value==="block"?true:false} onChange={()=>{onChangeHandler("block")}} />
        <StyledSpan>TREE VIEW</StyledSpan><StyledInput value="treeView" type="radio" checked={value==="treeView"?true:false}  onChange={()=>{onChangeHandler("treeView")}} />
    </StyledChangeViewForm>
  )
}

function stateToProps(state){
  return {

  }
}

function dispatchToProps(dispatch){
  return {
     changeView: function(view){
       dispatch(changeViewAC(view))
     }
  }
}

export default connect(stateToProps, dispatchToProps)(ChangeView);
