import styled from "styled-components";
import {connect} from "react-redux";
import Button from "./../UnbanTheCards/UnbanButton";
import {useState} from "react";
import {sortThunkCreator, resetSortThunk} from "./../../STORE/CardsReducer";



let StyledSortMenuContainer = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
justify-content: center;
`

let StyledSortMenu = styled.form`
 margin-bottom: 30px;
`

let StyledInput = styled.input`
 margin: 8px;
`

let StyledP = styled.p`
margin-bottom: 10px;
`

function SortMenu({bySubject, byParams, sortThunkCreator, resetSort}){

  let [subjectValue, setSubValue] = useState("")
  let [paramsValue, setParValue] = useState("");

  function onClickHandler(e){
    let val = e.target.value;
    if(byParams.indexOf(val) != -1){
      if(paramsValue == val){setParValue("");return false}
      setParValue(val);
      return true;
    };
    if(subjectValue == val){setSubValue("");return false}
    setSubValue(val);
  }



  return (
    <StyledSortMenuContainer>
     <StyledP>By subject</StyledP>
       <StyledSortMenu>
        {bySubject.map((e,i)=><p><StyledInput type="radio" key={i} value={e} checked={subjectValue==e?true:false} onClick={onClickHandler}/>{e[0].toUpperCase() + e.slice(1, e.length)}</p>)}
       </StyledSortMenu>
     <StyledP>By params</StyledP>
       <StyledSortMenu>
        {byParams.map((e,i)=><p><StyledInput type="radio" key={i} value={e} checked={paramsValue==e?true:false} onClick={onClickHandler}/>{e=="timestamp"?"Date":e[0].toUpperCase() + e.slice(1, e.length)}</p>)}
       </StyledSortMenu>
       <Button clickFunc={()=>{sortThunkCreator({param:paramsValue, subject:subjectValue})}} isDisabled={!subjectValue&&!paramsValue}>Sort</Button>
       <Button clickFunc={()=>{resetSort()}}>Reset Sort</Button>
    </StyledSortMenuContainer>
  )
}

function stateToProps(state){
  return {
    bySubject: state.forCards.sortVariants.bySubject,
    byParams: state.forCards.sortVariants.byParams
  }
}

function dispatchToProps(dispatch){
  return {
     sortThunkCreator: function(obj){
       dispatch(sortThunkCreator(obj))
     },
     resetSort: function(){
       dispatch(resetSortThunk);
     }
  }
}
export default connect(stateToProps, dispatchToProps)(SortMenu);
