import styled from "styled-components";

export const MainBuy = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
`;

export const CentralBlock = styled.div`
  a {
    text-decoration: none;
  }
  a button {
    width: 170px;
    padding: 15px 20px;
    border: 3px solid #833ae0;
    border-radius: 49px;
    color: #833ae0;
    background-color: transparent;
    margin: 0 auto;
    font-size: 24px;
  }
  a button:hover {
    background-color: blueviolet;
    border: 3px solid #ffffff;
    color: #ffffff;
  }
`;
export const TestBlock = styled.div`
  width: 100%;
`;
export const HeaderBuy = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 30px 30px 56px 30px;

  -webkit-box-shadow: 0px 6px 6px -6px gray;
  -moz-box-shadow: 0px 6px 6px -6px gray;
  box-shadow: 0px 6px 6px -6px gray;
  a {
    text-decoration: none;
    color: blueviolet;
    font-size: 24px;
    margin: 0px 20px;
    width: 100px;
  }
  a:hover {
    text-decoration: underline;
  }
  h2 {
    font-weight: normal;
    text-align: center;
    word-break: break-word;
    font-size: 48px;
    flex-basis: 92%;
    color: #2fc20a;
    margin-right: 100px;
  }
  img {
    width: 16px;
  }
`;
export const PriceText = styled.p`
  display: inline;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  span {
      font-size: 20px;
  }
`;

export const PriceBox = styled.div `
  height: 125px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  `

export const BuyFor = styled.div`
  font-family: Roboto, sans-serif;
  font-size: 20px;
  line-height: 14px;
  padding-top: 66px;
  padding-bottom: 47px;
`;
export const InputBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;

  input {
    color: blueviolet;
    font-size: 64px;
  }

  button {
    color: blueviolet;
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
export const InputLenght = styled.input`
  width: 100px;
  font-size: 50px;
  color: blueviolet;
  text-align: center;
  border: none;
  outline: none;
`;