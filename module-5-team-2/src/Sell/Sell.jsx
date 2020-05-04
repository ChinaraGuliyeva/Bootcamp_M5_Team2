import React from "react";
import { Link } from "react-router-dom";

import {
    MainBuy,
    TestBlock,
    PriceText,
    BuyFor,
    InputLenght,
} from "../buy/styleBuy";

import {
    HeaderSell,
    CentralBlockSell,
    InputBlockSell,
} from "./styleSell";

import "react-datepicker/dist/react-datepicker.css";
import arrow from "../img/arrow.svg";
import {
    changeBalance,
    getUserBalance,
    getOneStockData
} from "../fetcher/Fetcher";

class Sell extends React.Component {
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
        const { id } = this.props;
        getOneStockData(id).then(
            (res) => {
                console.log(res);
                const { companyName, price } = res.profile;
                this.setState({ name: companyName, price: price, symbol: id })
            }
        )
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
                // addNewStock(objectOfData); здесь нужно добавить функцию продажи акции 
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

    render() {
        return (
            <TestBlock>
                <MainBuy>
                    <HeaderSell>
                        <Link to={"/Stock"}>
                            <img src={arrow} alt="arrow" />
              Back
            </Link>
                        <h2>Sell {this.state.name}</h2>
                    </HeaderSell>
                    <CentralBlockSell>
                        <PriceText>
                            {Math.trunc(this.state.price)}
                            <span>{this.numberAfterDot(this.state.price)} $</span>
                        </PriceText>
                        <InputBlockSell>
                            <button onClick={this.handlerMinus}>-</button>
                            <InputLenght
                                type="number"
                                min="0"
                                onChange={this.changeValue}
                                value={this.state.pieces}
                                placeholder="0"
                            />
                            <button onClick={this.handlerPlus}>+</button>
                        </InputBlockSell>
                        <BuyFor>
                            Sell for {Math.trunc(this.state.pieces * this.state.price)}
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
                            <button onClick={this.sendToUserStock}>Sell</button>
                        </Link>

                    </CentralBlockSell>
                </MainBuy>
            </TestBlock>
        );
    }
}
export default Sell;
