import styled from "styled-components";

export const MainStyled = styled.main`
  background: #667db6; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #667db6,
    #0082c8,
    #0082c8,
    #667db6
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #667db6,
    #0082c8,
    #0082c8,
    #667db6
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  color: #e2e1e5;
  height: 100vh;
  width: 100%;

  section {
    align-items: center;
    justify-content: flex-end;
  }

  figure {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-around;
    color: #e2e1e5;
  }
`;
