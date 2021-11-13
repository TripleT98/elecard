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

function SortMenu({bySubject, byParams, sortThunkCreator, resetSort, isSorted}){

  let [sortParam, setSortParam] = useState("");


  function onChangeHandler(e){
     setSortParam(e.target.value);
  }



  return (
    <StyledSortMenuContainer>
     <StyledP>By subject</StyledP>
       <StyledSortMenu>
        {bySubject.map((e,i)=><p key={e+"_subj"}><StyledInput type="radio" key={e} value={e} checked={sortParam===e?true:false} onChange={onChangeHandler}/>{e[0].toUpperCase() + e.slice(1, e.length)}</p>).concat(byParams.map((e,i)=><p key={e + "_params"}><StyledInput type="radio" key={e} value={e} checked={sortParam===e?true:false} onChange={onChangeHandler}/>{e==="timestamp"?"Date":e[0].toUpperCase() + e.slice(1, e.length)}</p>))}
       </StyledSortMenu>
       <Button clickFunc={()=>{sortThunkCreator(sortParam)}} isDisabled={!sortParam}>Sort</Button>
       <Button clickFunc={()=>{if(!isSorted){setSortParam("");return false};resetSort();setSortParam("")}}>Reset Sort</Button>
    </StyledSortMenuContainer>
  )
}

function stateToProps(state){
  return {
    bySubject: state.forCards.sortVariants.bySubject,
    byParams: state.forCards.sortVariants.byParams,
    isSorted: state.forCards.isSorted,
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



/*

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
*/
