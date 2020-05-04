import styled from "styled-components";
import {
    HeaderBuy,
    CentralBlock,
    InputBlock
} from "../buy/styleBuy";

export const HeaderSell = styled(HeaderBuy)`
  h2 {
    color: red;
  }`;

export const CentralBlockSell = styled(CentralBlock)`
  #sell {
    width: 170px;
    padding: 15px 20px;
    border-radius: 49px;
    background-color: transparent;
    margin: 0 auto;
    font-size: 24px;
    border: 3px solid red;
    color: red;
    cursor: pointer;
    outline: none;
  }
   #sell:hover {
    background-color: red;
    border: 3px solid #ffffff;
    color: #ffffff;
  }
`;

export const InputBlockSell = styled(InputBlock)`
  input {
    color: #333333;
  }

  button {
    color: #333333;
  }
`;




