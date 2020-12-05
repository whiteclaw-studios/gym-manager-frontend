import { injectGlobal } from 'emotion';
import { BG_COLOR } from './src/constants';
import { MontserratRegular } from './src/utils/fonts';
injectGlobal`
html {
  font-size: 62.5%;
  height: 100%;

}
*{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;

  }
  
  body {
    font-size: 10px;
    font-family: ${MontserratRegular},'Helvetica Neue', Helvetica, Arial, sans-serif;
    overflow-x:hidden ;
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);
    margin-top: 0px !important;
    height: 100%;

  }
  img {
    border: 0;
  }
  #root {
    background: ${BG_COLOR};
    min-height: 100%;
    min-width: 100%;
  }
  a{
    text-decoration:none;
  }
  li{
    list-style-type:none;
  }
  input:focus,
  textarea:focus,
  button:focus,
  a:focus,
  article:focus {
    outline: none !important;
    border:none;
  }
  .stop-scroll {
    overflow:hidden;
  }

  input[type="checkbox"] {
    outline: 0;
    visibility: hidden;
    width: 1.25rem;
    margin: 0;
    display: block;
    float: left;
    font-size: inherit;
  }
}

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
}



`;
