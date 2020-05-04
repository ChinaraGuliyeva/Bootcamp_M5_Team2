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
  a button {
    border: 3px solid red;
    color: red;
  }
  a button:hover {
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




