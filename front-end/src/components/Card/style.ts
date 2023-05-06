import styled from "styled-components";

export const StyledCardContact = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  width: 250px;
  color: black;
  gap: 10px;
  border-radius: 10px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
  margin-top: 20px;
  padding: 25px;

  .buttonEdit {
    margin: 5px;
    flex-direction: row;
    button {
      background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%);
      border: none;
      border-radius: 10px;
      font-size: 16px;
      text-align: left;
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

export const StyledUl = styled.ul`
  width: 100%;
  margin: 0 auto;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
