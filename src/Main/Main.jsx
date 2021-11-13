import styled,{css} from "styled-components";
import Cards from "./Card/Card";
import {useEffect} from "react";
import {setCardsThunk} from "../STORE/CardsReducer";
import {connect} from "react-redux";
import ButtonBar from "./ButtonBar/ButtonBar";
import Fetch from "./Fetching/Fetching";
import {Route} from "react-router-dom";
import TreeViewContainer from "./../TreeView/TreeView";

let StyledMain = styled.div`
background:linear-gradient(to top, rgb(4, 202, 246) 0%, white 10%, white 90%, rgb(4, 202, 246));
display: flex;
flex-wrap: wrap;
height: 85%;
overflow: auto;
gap: 0px;
${props=>props.isFetching && css`
   justify-content: center;
   align-items: center;
  `}
`

function Main(props){
  useEffect(()=>{
     props.getCards();
  },[props.cardsAmountOnOnePage]);
  return (
        <StyledMain isFetching={props.isFetching}>
           {!props.isFetching?<Route path="/" exact render={()=>props.view==="block"?<Cards stackOfCards={props.currentStack} baseURL={props.baseURL}/>:<TreeViewContainer baseURL={props.baseURL} categories={props.categories} baseURL={props.baseURL}></TreeViewContainer>}/>:<Fetch/>}
           {props.view === "block" && <ButtonBar cardsNum={props.totalCardsAmount} currentPage={props.currentPage} cardsAmountOnOnePage={props.cardsAmountOnOnePage} fetch={props.isFetching}/>}
        </StyledMain>
  )
}

function stateToProps(state){
  return {
    cardsAmountOnOnePage: state.forCards.cardsAmountOnOnePage,
    currentPage: state.forCards.currentPage,
    currentStack: state.forCards.currentStack,
    isFetching: state.forCards.isFetching,
    totalCardsAmount: state.forCards.amountOfCards,
    baseURL: state.forCards.baseURL,
    sortedCards: state.sortedCards,
    view: state.forCards.view,
    cards: state.forCards.cards,
    categories: state.forCards.sortVariants.bySubject,
  }
}

function dispatchToProps(dispatch){
  return{
     getCards: function(){
       dispatch(setCardsThunk());
     }
  }
}
export default connect(stateToProps, dispatchToProps)(Main);
