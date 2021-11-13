import styled from "styled-components";

let StyledUnbanButton = styled.button`
   width: 80px;
   height: max-content;
   padding: 7px;
   border: none;
   background-color: rgb(4, 202, 246);
   color: white;
   margin: 10px;
   cursor: pointer;
   border-radius: 15px;
   transition-duration: .4s;
   &:hover{
     background-color: rgb(23, 143, 181);
     transition-duration: .4s;
   }
   &:disabled{
     background-color: rgb(109, 176, 179);
     box-shadow: none;
     cursor: auto;
     opacity: 0;
   }
`


function UnbanButton(props){
  return (
    <StyledUnbanButton isBlockView={props.isBlockView} onClick={()=>{props?.clickFunc?.()}} disabled={props.isDisabled || props.isBlockView==="treeView"}>{props.children}</StyledUnbanButton>
  )
}


export default UnbanButton;
