import React, { Component } from "react";
import {
  DecPartSpan,
  RowContainer,
  Row,
  RowElemTickerDiv,
  RowElemNameDiv,
  RowElemAmountDiv,
  RowElemSumDiv,
  RowElemProfitDiv,
} from "./styleRowElement";
import {NavLink} from "react-router-dom";

class RowElement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  splitDecimals = (number) => {
    const [wholePart, decPart] = number.toString().split(".");
    return (
      <>
        {wholePart}.<DecPartSpan>{decPart} $</DecPartSpan>
      </>
    );
  };

  render() {
    const { code, name, amount, purchasePrice, profit, sign } = this.props;
    return (
      <RowContainer>
        <NavLink style={{textDecoration: 'none'}} to={"/sell/" + code}>
          <Row>
            {" "}
            <RowElemTickerDiv>{code}</RowElemTickerDiv>
            <RowElemNameDiv>
              {name === "undefined" || !name ? <i>{code}</i> : name}
            </RowElemNameDiv>
            <RowElemAmountDiv>{amount} pcs</RowElemAmountDiv>
            <RowElemSumDiv>
              {this.splitDecimals((amount * purchasePrice).toFixed(3))}
            </RowElemSumDiv>
            <RowElemProfitDiv isNegative={sign < 0 ? true : false}>
              {profit}
            </RowElemProfitDiv>
          </Row>
        </NavLink>
      </RowContainer>
    );
  }
}

export default RowElement;
