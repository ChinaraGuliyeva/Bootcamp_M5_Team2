import React from "react";
import { Link } from "react-router-dom";

import {
  MainBuy,
  CentralBlock,
  TestBlock,
  HeaderBuy,
  PriceText,
  BuyFor,
  InputBlock,
  InputLenght,
} from "./styleBuy";
import styled from "styled-components";
import PickDate from "./PickDateComponent";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import "react-datepicker/dist/react-datepicker.css";
import arrow from "../img/arrow.svg";
import {
  addNewStock,
  changeBalance,
  getUserBalance,
  getHistoricalPrices,
} from "../fetcher/Fetcher";

// Стили Компонента Chart начало ****
const ChartContainer = styled.div`
  margin: 20px;
  padding: 20px;
  border-radius: 3px;
  border: 0.5px solid blueviolet;
`;
// Стили Компонента Chart Конец ****

class Buy extends React.Component {
  state = {
    name: null,
    price: null,
    symbol: null,
    balance: null,
    pieces: "",
    startDate: 0,
    endDate: 0,
    chartInfo: null,
    isAvailable: false,
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    const { name, price, symbol } = this.props.location.state; //Беру state из тега Link в компоненте Stock
    if (!this.state.name) {
      this.setState({ name: name, price: price, symbol: symbol }, () => {
        const todayDate = new Date().getDate();
        const weekAgo = new Date(new Date().setDate(todayDate - 7));

        this.handleStartDate(weekAgo.toISOString().substring(0, 10));
        this.handleEndDate(new Date().toISOString().substring(0, 10));
        this.showChart();
      }); // Записываю их в state текущего компонента
    }
    getUserBalance().then((result) => {
      this.setState({ balance: result.currentBalance });
    }); // Записываю в state balance баланс с API
  }
  // Функция выделяющая числа после точки для ее уменьшения в стилях в дальнейшем
  numberAfterDot = (value) => {
    if (value) {
      value.toFixed(2);
      value = value + "";
      const digits = value.substring(value.indexOf(".") + 1);
      return "." + digits.substring(0, 2);
    } else return null;
  };
  // Функция увеличения значения в input
  handlerPlus = () => {
    this.setState({ pieces: +this.state.pieces + 1 });
  };
  // Функция уменьшения значения в input
  handlerMinus = () => {
    if (this.state.pieces <= 0) this.setState({ pieces: 0 });
    else this.setState({ pieces: +this.state.pieces - 1 });
  };
  //Функция отправки полученных данных на API команды начало ****
  sendToUserStock = () => {
    const objectOfData = {
      name: `${this.state.name}`,
      price: `${this.state.price}`,
      symbol: `${this.state.symbol}`,
      pieces: `${this.state.pieces}`,
    };
    const elements = this.state.pieces * this.state.price;
    if (elements <= 0 || this.state.pieces === "")
      return alert("Должно быть больше нуля");
    else {
      if (elements > this.state.balance) alert("Недостаточно средств");
      else {
        const currentBalance = this.state.balance - elements;
        changeBalance(currentBalance).then((res) =>
        // обновить баланс в футере через коллбэк в App
          this.props.getBalanceCallback()
        );
        addNewStock(objectOfData);
        console.log(this.props.getBalanceCallback);
      }
    }
  };

  //Функция отправки полученных данных на API команды конец ****

  // Функция записывающая текущее значение value input в state pieces
  changeValue = (e) => {
    this.setState({ pieces: e.target.value });
    if (e.target.value.length === 0) e.target.style.width = `100px`;
    else {
      e.target.style.width = (e.target.value.length + 20) * 8 + "px"; // Динамическое расширение и уменьшения поля input в зависимости от введенного значения
    }
    parseInt(e.target.value);
  };

  handleStartDate = (date) => {
    this.setState(
      {
        startDate: date.substring(0, 10),
      },
      this.showChart
    );
  };
  handleEndDate = (date) => {
    this.setState(
      {
        endDate: date.substring(0, 10),
      },
      this.showChart
    );
  };

  showChart = () => {
    const { startDate, endDate } = this.state;
    getHistoricalPrices(
      this.props.location.state.symbol,
      startDate,
      endDate
    ).then((res) => {
      this.setState({
        chartInfo: res.historical,
        isAvailable: true,
      });
    });
  };

  render() {
    return (
      <TestBlock>
        <MainBuy>
          <HeaderBuy>
            <Link to={"/Stock"}>
              <img src={arrow} alt="arrow" />
              Back
            </Link>
            <h2>Buy {this.state.name}</h2>
          </HeaderBuy>
          <CentralBlock>
            <PriceText>
              {Math.trunc(this.state.price)}
              <span>{this.numberAfterDot(this.state.price)} $</span>
            </PriceText>
            <InputBlock>
              <button onClick={this.handlerMinus}>-</button>
              <InputLenght
                type="number"
                min="0"
                onChange={this.changeValue}
                value={this.state.pieces}
                placeholder="0"
              />
              <button onClick={this.handlerPlus}>+</button>
            </InputBlock>
            <BuyFor>
              Buy for {Math.trunc(this.state.pieces * this.state.price)}
              <span>
                {this.numberAfterDot(this.state.pieces * this.state.price)} $
              </span>
            </BuyFor>
            <Link
              to={{
                pathname:
                  this.state.pieces <= 0 ||
                  this.state.pieces === "" ||
                  this.state.pieces * this.state.price > this.state.balance
                    ? "/Buy"
                    : "/Stock",
                state: {
                  symbol: this.state.symbol,
                  name: this.state.name,
                  price: this.state.price,
                },
              }}
            >
              <p onClick={this.sendToUserStock}>Buy</p>
            </Link>

            <ChartContainer>
              <PickDate
                handleStartDate={this.handleStartDate}
                handleEndDate={this.handleEndDate}
              />

              {this.state.isAvailable && (
                <LineChart
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  width={600}
                  height={300}
                  data={this.state.chartInfo}
                >
                  <Line type="monotone" dataKey="open" stroke="blueviolet" />
                  <Tooltip />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="label" />
                  <YAxis
                    label={{
                      value: "Opening price",
                      angle: -90,
                      position: "insideLeft",
                      fontSize: 16,
                      offset: 0,
                    }}
                    type="number"
                    domain={["auto", "auto"]}
                  />
                </LineChart>
              )}
            </ChartContainer>
          </CentralBlock>
        </MainBuy>
      </TestBlock>
    );
  }
}
export default Buy;
