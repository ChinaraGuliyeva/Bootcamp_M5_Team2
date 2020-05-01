import React, { Component } from "react";
import styled from "styled-components";

import AccountRowElement from "./AccountRowElement";
import Paginator from "../commonUI/Paginator";
import * as fetcher from "../fetcher/Fetcher";

const AccountPage = styled.div`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  /* box-shadow: 0 6px 6px -6px gray; */
`;

const TotalSum = styled.h1`
  text-align: center;
`;

const Profit = styled.p`
  text-align: center;
  color: ${(props) => (props.isNegative ? "red" : "green")};
`;

const Body = styled.div`
  padding: 20px 20%;
  -webkit-box-shadow: inset 0px 6px 6px -6px gray;
  -moz-box-shadow: inset 0px 6px 6px -6px gray;
  box-shadow: inset 0px 6px 6px -6px gray;
`;

const DecPartSpan = styled.span`
  font-size: 0.7em;
`;
const Loading = styled.h2`
  position: absolute;
  left: 46%;
  top: 240px;
  
`;
class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountInfo: [],
      stocksInfo: [],
      totalSpent: 0,
      currentTotal: 0,
      profit: 0,
      isProfitNegative: false,
    };
  }

  componentDidMount() {

    fetcher.getUserStocks().then((res) => {
      this.setState({loading: true})
      // if(!res) {resolve()};
      let accountInfo = res;
      let codes = res.map((el) => {
        return el.code;
      });
      fetcher.getStockPricesFor(codes).then((stocks) => {
        let stocksInfo = stocks;
        let totalSpent = this.getPurchaseDayTotalSum(accountInfo);
        let currentTotal = this.getCurrentTotalSum(stocksInfo, accountInfo);
        let profit = currentTotal - totalSpent;
        let negative = profit >= 0 ? false : true;

        this.setState({
          accountInfo: accountInfo,
          stocksInfo: stocksInfo,
          totalSpent: totalSpent,
          currentTotal: currentTotal,
          profit: profit,
          isProfitNegative: negative,
        });
      });

    });

  }

  getPurchaseDayTotalSum = (accountInfo) => {
    return accountInfo
      .reduce((acc, currentStock) => {
        return acc + currentStock.totalPrice;
      }, 0)
      .toFixed(3);
  };

  getCurrentTotalSum = (stocksInfo, accountInfo) => {
    return stocksInfo
      .map((stock) => {
        const necStock = accountInfo.filter((el) => {
          return el.code === stock.symbol;
        });
        let amount = necStock.reduce((acc, currentStock) => {
          return acc + Number(currentStock.amount);
        }, 0);
        return stock.price * amount;
      })
      .reduce((prev, currStock) => {
        return prev + currStock;
      }, 0)
      .toFixed(3);
  };

  splitDecimals = (number) => {
    if (number == 0) return <>No profit</>;
    const [wholePart, decPart] = number.toString().split(".");
    return (
      <>
        {wholePart}.<DecPartSpan>{decPart} $</DecPartSpan>
      </>
    );
  };

  calculateProfitPercentage = (buyPrice, currPrice) => {
    let profit = currPrice - buyPrice;
    let percent = (profit / buyPrice) * 100;
    if (profit == 0) {
      return <>No profit</>;
    } else {
      return (
        <>
          {this.splitDecimals(profit.toFixed(2))} ({percent.toFixed(2)}%)
        </>
      );
    }
  };

  findCurrentPrice(stocksInfo, info) {
    return stocksInfo.find((el) => el.symbol === info.code).price * info.amount;
  }

  render() {
    const { accountInfo, stocksInfo, totalSpent, currentTotal } = this.state;
    const rowelems = accountInfo.map((info) => {
      const curStockPrice = this.findCurrentPrice(stocksInfo, info);
      const curprofit = this.calculateProfitPercentage(
        info.totalPrice,
        curStockPrice
      );
      return (
        <AccountRowElement
          {...info}
          profit={curprofit}
          isNegative={info.totalPrice - this.findCurrentPrice(stocksInfo, info)>0? true: false}
        />
      );
    });
    return (
      <AccountPage>
        <Header>
          <TotalSum>{this.splitDecimals(currentTotal)}</TotalSum>
          <Profit isNegative={this.state.isProfitNegative}>
            {this.calculateProfitPercentage(totalSpent, currentTotal)}
          </Profit>
        </Header>

       {this.state.loading?
        <Body>
          <Paginator rowElems={rowelems} />
        </Body> : <Loading>Loading ...</Loading>}
      </AccountPage>
    );
  }
}

export default Account;
