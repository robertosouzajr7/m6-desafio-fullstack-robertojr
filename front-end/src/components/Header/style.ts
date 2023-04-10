import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  padding: 10px;
  padding-left: 15px;
  padding-right: 25px;
  justify-content: space-around;
  font-size: 20px;
  color: white;
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

  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;

  div {
    display: flex;
  }

  nav {
    display: flex;
    align-items: center;

    ul {
      display: flex;
      justify-content: space-around;
      gap: 15px;
      text-decoration: none;

      li {
        list-style-type: none;
        align-items: center;

        a {
          text-decoration: none;
          font-weight: bold;
          color: white;
          font-size: 30px;
          gap: 15px;
        }
      }
    }
  }
`;
