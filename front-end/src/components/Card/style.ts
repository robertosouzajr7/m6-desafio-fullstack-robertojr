import styled from "styled-components";

export const StyledCardContact = styled.div`
  display: flex;
  background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  color: black;
  gap: 5 px;
  margin-top: 15px;

  figure {
    display: flex;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background: white;
    }
  }

  caption {
    display: flex;
    flex-direction: column;
    color: black;
    text-align: left;

    h2 {
      color: black;
    }
  }

  .buttonEdit {
    display: flex;
    margin: 15px;
    button {
      background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%);
      border: none;
      border-radius: 10px;
      font-size: 16px;
      text-align: center;
      color: white;
      padding: 10px;
      margin: 15px;
      box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px,
        rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px,
        rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
      :hover {
        background: black;
      }
    }
  }
`;
