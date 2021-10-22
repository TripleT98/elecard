import styled,{keyframes, css} from "styled-components";
import {useRef} from "react";
import Cross from "./../Cross/Cross";

export let bluring = keyframes`
0%{
  opacity: 0;
}
100%{
  opacity: 1;
}
`

let banned = keyframes`
0%{
  opacity:1;
}
100%{
  opacity:0;
  display: none;
}
`

let StyledCards = styled.div`
display: flex;
flex-wrap:wrap;
height:95%;
justify-content: center;
overflow: auto;
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

let StyledCard = styled.div`
position: relative;
top: 0px;
left: 0px;
width: max-content;
background: linear-gradient(45deg, white 70%, grey);
box-shadow: -1px 1px 10px grey;
margin: 30px;
padding: 30px;
box-sizing: border-box;
animation: ${bluring} .5s linear;
display: flex;
justify-content: center;
flex-direction: column;
&.banned{
  animation: ${banned} .5s linear forwards;
}
`

let StyledImage = styled.img`
max-height: 200px;
widht: auto;
}
`

let StyledInfoBar = styled.div`

`

function Card(props){
  let ref = useRef();
  return (
       <StyledCard ref={ref}>
         <div>
           <Cross id={props.timestamp} blockToBan={ref}/>
           <StyledImage onLoad={()=>{}} src={props.baseURL + props.image} onClick={()=>{}}/>
           <StyledInfoBar>Category: {props.category}<br/>Date: {props.fullDate}<br/>Filesize: {props.filesize}</StyledInfoBar>
          </div>
       </StyledCard>
  )
}

function Cards(props){
  let cards = props.stackOfCards.map((e,i)=>{return <Card {...e} key={i} baseURL={props.baseURL}/>})
  return (
    <StyledCards>
       {cards}
    </StyledCards>
  )
}

export default Cards;
