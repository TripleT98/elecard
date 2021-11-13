import styled,{css} from "styled-components";
import {setPageThunk} from "../../STORE/CardsReducer";
import {connect} from "react-redux";

let StyledButtonBar = styled.div`
position: absolute;
bottom: 100px;
left: 0px;
z-index:0;
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
${props=>props.edged&&css`
margin-left: 13px;
margin-right: 13px;
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
    <div><StyledButton edged={props.edged} disabled={props.isCurrent} isCurrent={props.isCurrent} onClick={()=>{props.setPage(props.num)}} fetch={props.fetch}>{props.num}</StyledButton></div>
  )
}



function ButtonBar(props){
  let edge = props.amountOfPages;
  let buttons = [];
  let i = props.currentPage <= 5?1:props.currentPage - 5;
  let j = props.currentPage <= 5?10:(props.currentPage + 5>edge?edge:props.currentPage + 5);
  if(edge < 10){j = edge};
  for(i; i <= j;i++){
    buttons.push(<Button num={i} key={i} isCurrent={i===props.currentPage} setPage={props.setPage} fetch={props.fetch} />)
  }
  if(props.currentPage >=7 ){
    buttons.unshift(<Button edged={true} num={1} key={0} isCurrent={1===props.currentPage} setPage={props.setPage} fetch={props.fetch} />)
  };
  if(props.currentPage <= edge - 6){
    buttons.push(<Button edged={true} num={edge} key={edge+1} isCurrent={edge===props.currentPage} setPage={props.setPage} fetch={props.fetch} />)
  }
  return(
    <StyledButtonBar fetch={props.fetch} view={props.view}>{buttons}</StyledButtonBar>
  )
}

function stateToProps(state){
  return{
     amountOfPages: state.forCards.amountOfPages
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
