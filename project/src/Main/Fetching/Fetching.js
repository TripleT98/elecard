import styled,{css, keyframes} from "styled-components";

let rotateAnimation = keyframes`
0%{
  transform: rotateZ(0deg)
}
100%{
  transform: rotateZ(360deg)
}
`

let StyledFetch = styled.div`
width: ${props=>props.size}px;
height: ${props=>props.size}px;
border-radius: 50%;
animation: ${rotateAnimation} linear 1s infinite;
${({isCore})=>!isCore?css`
background: linear-gradient(45deg, red, blue);
padding: 8px;`:
css`background-color: white;`}
`

function Fetch(props){
  let size = 80;
  return (
    <div><StyledFetch size={size}><StyledFetch isCore={true} size={size}/></StyledFetch></div>
  )
}


export default Fetch;
