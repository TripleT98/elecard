import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import store from "./STORE/STORE";
import {Provider} from "react-redux";
import styled, {createGlobalStyle} from "styled-components";

let Global = createGlobalStyle`
*{
  margin: 0px;
  overflow: hidden;
  font-family: "Arial";
  font-weight: bold;
}
`

let StyledApp = styled.div`
height: 100vh;
`

function App() {
  return (
  <Provider store={store}>
    <Global />
      <StyledApp>
             <Header />
             <Main />
             <Footer />
      </StyledApp>
  </Provider>
  );
}

export default App;
