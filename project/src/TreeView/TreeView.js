import styled,{scc} from "styled-components";
import TreeChild from "./Block/Block";
import {bluring} from "./../Main/Card/Card";
import {useState, useRef} from "react";
import {connect} from "react-redux";

let StyledTreeViewContainer = styled.div`
width: 100%;
height: 100%;
animation: ${bluring} .5s linear forwards;
background-color: white;
overflow: scroll;
&::-webkit-scrollbar {
  width: 12px;               /* ширина scrollbar */
}
&::-webkit-scrollbar-track {
  background: white;        /* цвет дорожки */
}
&::-webkit-scrollbar-thumb {
  background-color: blue;    /* цвет плашки */
  border-radius: 20px;       /* закругления плашки */
  border: 3px solid rgb(4, 202, 246);  /* padding вокруг плашки */
}
`
let Container = styled.div`
margin-top: 10px;
display: flex;
justify-content: center;
max-width:max-content;
align-items: flex-start;
margin-left: auto;
margin-right: auto;
animation: ${bluring} .5s linear forwards;
`

let FirstChildContainer = styled(Container)`
min-height: 91%;
align-items: flex-start;
`

function TreeViewContainer(props){
  let [firstChildState, changeFirstChildState] = useState(false);
    function openFirstChild(){
      changeFirstChildState(!firstChildState)
    }

    return(
      <StyledTreeViewContainer>
         <Container>
            <TreeChild openChild={openFirstChild}/>
         </Container>
         {firstChildState &&  <FirstChildContainer>{props.categories.map((e,i)=>{return <TreeChild isCategory={true} baseURL={props.baseURL} cards={props.treeViewCards.get(e)}>{e[0].toUpperCase() + e.slice(1, e.length)}</TreeChild>})}</FirstChildContainer>}
      </StyledTreeViewContainer>
    )
}

function stateToProps(state){
  return{
    treeViewCards: state.forCards.treeViewCards
  }
}

function dispatchToProps(dispatch){
  return{

  }
}

export default connect(stateToProps, dispatchToProps)(TreeViewContainer);
