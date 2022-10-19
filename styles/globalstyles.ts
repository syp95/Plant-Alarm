import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  

html,
body {
    max-width: 520px;
    width: 100%;
    height: 98%;
    margin: auto;
    padding: 20px;
    overflow: scroll;
}

html {
    background-color: #292b37;
    overflow: hidden;
}

body {
    margin: 20px 0;
    background-color: #fdfdfd;
    border-radius: 15px;
    overflow-x: hidden;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
        Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
        'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji',
        'Segoe UI Symbol', sans-serif;
}

a {
    color: inherit;
    text-decoration: none;
}

* {
    box-sizing: border-box;
}

input {
    width: 100%;
    height: 40px;
    border: none;
    border-bottom: solid 1px #555555;
    font-family: Pretendard;
}

input:focus {
    outline: none;
}

`;

export default GlobalStyle;
