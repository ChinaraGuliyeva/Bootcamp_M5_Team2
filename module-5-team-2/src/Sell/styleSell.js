import styled from "styled-components";

export const HeaderSell = styled.div`
  display: flex;
  width: 100%;
  /* padding-bottom: 56px;
  padding-top: 30px; */
  padding: 30px 30px 56px 30px;
  -webkit-box-shadow: 0px 6px 6px -6px gray;
  -moz-box-shadow: 0px 6px 6px -6px gray;
  box-shadow: 0px 6px 6px -6px gray;
  a {
    text-decoration: none;
    color: blueviolet;
    font-size: 18px;
  }
  a:hover {
    text-decoration: underline;
  }
  h2 {
    font-family: Roboto;
    font-style: normal;
    text-align: center;
    word-break: break-word;
    font-size: 48px;
    flex-basis: 92%;
    color: red;
  }
  img {
    width: 12px;
  }
`;

export const CentralBlockSell = styled.div`
  a {
    text-decoration: none;
  }
  a button {
    width: 170px;
    padding: 15px 20px;
    border: 3px solid red;
    border-radius: 49px;
    color: red;
    margin: 0 auto;
    background-color: transparent;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 24px;
  }
  a button:hover {
    background-color: red;
    border: 3px solid #ffffff;
    color: #ffffff;
  }
  span {
    font-size: 24px;
  }
`;

export const InputBlockSell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
 
  input {
    color: #333333;
    font-size: 64px;
  }

  button {
    color: #333333;
    background-color: transparent;
    cursor: pointer;
    font-size: 36px;
    padding: 10px;
    border: none;
    outline: none;
  }
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;




