import styled,{css} from "styled-components";
import Arrow from "./../../Arrow/ArrowIcon";
import {useState} from "react";
import Cross from "./../../Main/Cross/Cross";
import {bluring} from "./../../Main/Card/Card";


let StyledTreeChild = styled.div`
 width: 250px;
 font-size: 30px;
 padding: 10px;
 max-height: 100%;
 display: flex;
 flex-direction: column;
 background-color: white;
 border-radius: 30px;
 border: rgb(4, 202, 246) 1px solid;
`

let Container = styled.div`
width: 100%;
display: flex;
flex-wrap: wrap;
animation: ${bluring} .5s linear forwards;
`
let StyledThumbImg = styled.img`
 height: 30px;
 cursor: pointer;
 width: auto;
`


let StyledImgCont = styled.div`
padding:3px;
widht: max-content;
height: auto;
${({big})=>big && css`
position: relative;
padding: 20px;
background-color: white;
`}
`

let ImagesWrap=styled(Container)`
display: ${props=>props.isOpen && props.isCategory?"flex":"none"};
`

let BigImg=styled.img`
display:${props=>!props.status && "none"};
cursor: auto;
`

let BigImgContainer = styled.div`
position: absolute;
top: 0px;
left: 0px;
height: 100vh;
width: 100vw;
background-color: rgba(0, 0, 0, 0.8);
justify-content: center;
align-items: center;
display:${props=>!props.status?"none": "flex"};
z-index: 1000;
`

function TreeChild(props){
  let [isOpen, open] = useState(false);
  let [bigImgState, isShown] = useState({status: false, src:""})

  return(
    <StyledTreeChild
    onClick={(e)=>{if(e.target.src){isShown({status: true, src:e.target.src})}}}>
       <Container>
          <Arrow onClick={()=>{props.openChild?.();if(props.isCategory){open(!isOpen)}}}/>
          {props.children||"Categories"}
       </Container>
      <ImagesWrap isOpen={isOpen} isCategory={props.isCategory}>
          {props?.cards?.map((e,i)=>{return <StyledImgCont><StyledThumbImg src={`${props.baseURL}${e.image}`} /></StyledImgCont>})}
      </ImagesWrap>
      <BigImgContainer status={bigImgState.status}>
        <StyledImgCont big>
         <Cross closeTheCard={()=>{isShown({status: false, src:""})}}/>
         <BigImg src={bigImgState.src}  status={bigImgState.status} />
        </StyledImgCont>
      </BigImgContainer>
    </StyledTreeChild>
  )
}

export default TreeChild;
