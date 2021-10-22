import styled,{css} from "styled-components";
import {setPageAC, setPageThunk} from "../../STORE/CardsReducer";
import {connect} from "react-redux";

let StyledButtonBar = styled.div`
position:relative;
z-index:2;
display:flex;
flex-wrap:flex;
justify-content: center;
height: 30px;
width: 100%;
margin: 0px;
background-color: white;
display: ${props=>props.fetch?"none":"static"};
`
let StyledButton = styled.button`
margin: 3px;
width: 25px;
height: 25px;
display: flex;
align-items: center;
justify-content: center;
background-color: white;
border: .5px solid rgb(233, 59, 93);
border-radius: 50%;
transition-duration: .3s;
${props=>props.isCurrent && css`
  font-weight: 700;
  background-color: rgb(4, 202, 246);
  color: black;
  `}
display: flex;
justify-content: center;
padding-top:3px;
opacity: ${props=>props.fetch?0:1};
cursor: ${props=>!props.isCurrent && "pointer"};
&:hover{
  transition-duration: .3s;
  background-color: rgb(15, 242, 215);
}
`

function Button(props){
  return(
    <div><StyledButton disabled={props.isCurrent} isCurrent={props.isCurrent} onClick={()=>{props.setPage(props.num)}} fetch={props.fetch}>{props.num}</StyledButton></div>
  )
}



function ButtonBar(props){
  let edge = Math.ceil(props.cardsNum/props.cardsAmountOnOnePage);
  let buttons = [];
  let i = props.currentPage <= 5?1:props.currentPage - 5;
  let j = props.currentPage <= 5?10:(props.currentPage + 5>edge?edge:props.currentPage + 5);
  if(edge < 10){j = edge};
  for(i; i <= j;i++){
    buttons.push(<Button num={i} key={i} isCurrent={i==props.currentPage} setPage={props.setPage} fetch={props.fetch}/>)
  }
  return(
    <StyledButtonBar fetch={props.fetch} view={props.view}>{buttons}</StyledButtonBar>
  )
}

function stateToProps(state){
  return{

  }
}

function dispatchToProps(dispatch){
  return {
    setPage: function(page){
      dispatch(setPageThunk(page))
    }
  }
}

export default connect(stateToProps, dispatchToProps)(ButtonBar);
