import React, { Component } from "react";
import "./index.css";
import Header from "./navigation/Header";
import Footer from "./navigation/Footer";
import Account from "./account/Account";
import Stocks from "./stocks/Stocks";
import Buy from "./buy/Buy";
import Sell from "./Sell/Sell";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as fetcher from "./fetcher/Fetcher";

const AppBlock = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  /* height: 60vh; */
  width: 100%;
  /* border: 1px solid blueviolet; */
  padding: 15px 0 100px 0;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { balance: 0, loadingBalance: false };
  }

  // Balance update logic

  componentDidMount() {
    this.getUserBalance();
  }

  getUserBalance = () => {
    this.setState({ loadingBalance: true });
    fetcher.getUserBalance().then((balance) => {
      this.setState({ balance: balance.currentBalance, loadingBalance: false });
    });
  };

  render() {
    return (
      <AppBlock>
        <Router>
          <Header />
          <Switch>
            <Route path="/Account" exact component={Account} />
            <Route path="/Stock" component={Stocks} />
            <Route
              path="/Buy"
              render={(props) => (
                <Buy {...props} getBalanceCallback={this.getUserBalance} />
              )}
            />
            <Route // рендеринг страницы продажи акции. в компонент передаётся символ акции
                path="/sell/:lnk"
                render={props => <Sell {...props.match.params} getBalanceCallback={this.getUserBalance} onClick={this.sellHandler}/>
                }
            />
            <Route path="/" component={Account} />
          </Switch>
        </Router>
        <Footer
          balanceVal={this.state.balance}
          loadingBalance={this.state.loadingBalance}
        />

      </AppBlock>
    );
  }
}

export default App;
