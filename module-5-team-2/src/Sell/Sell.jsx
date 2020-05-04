import React from "react";
import { Link } from "react-router-dom";

import {
    MainBuy,
    TestBlock,
    PriceText,
    PriceBox,
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
    getUserStocks,
    getOneStockData,
    getOneUserStockData,
    dltElementById,
    updateElementById,
    updateBalance
} from "../fetcher/Fetcher";

class Sell extends React.Component {
    state = {
        id: null,
        name: null,
        price: null,
        symbol: null,
        balance: null,
        pieces: 0,
        maxPieces: null,
        chartInfo: null,
        isAvailable: false,
        oldPrice: 0
    };
    componentDidMount() {
        window.scrollTo(0, 0);
        const { lnk } = this.props;
        let arr = lnk.split('=')

        this.setState({ id: arr[0] })
        // получаем актуальные данные о цене акции
        getOneStockData(arr[1]).then(
            (res) => {
                // console.log(res)
                const { companyName, price } = res.profile;
                this.setState({ name: companyName, price: price, symbol: arr[1] })
            }
        )
        // получаем с API balance и записываем в state 
        getUserBalance().then((result) => {
            this.setState({ balance: result.currentBalance });
        });

        // получаем данные, сколько у пользователя пакетов этой акции
        getOneUserStockData(arr[0]).then(
            (res) => {
                let count = res.amount;
                // console.log("Count: " + count);
                this.setState({
                    maxPieces: count,
                    oldPrice: res.totalPrice / count
                })
            })
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
        if (this.state.pieces < this.state.maxPieces) {
            this.setState({ pieces: +this.state.pieces + 1 })
        }
    };

    // Функция уменьшения значения в input
    handlerMinus = () => {
        if (this.state.pieces > 0) {
            this.setState({ pieces: +this.state.pieces - 1 })
        }
    };

    //Функция отправки полученных данных на API команды начало ****

    sellShares = () => {
        let count = +this.state.pieces;

        if (count === +this.state.maxPieces) {
            dltElementById(this.state.id)
            .finally(() => this.props.getBalanceCallback());
        } else {
            let stayCoun = this.state.maxPieces - this.state.pieces;
            let newTotalPrice = this.state.oldPrice * stayCoun;
            let obj = {
                amount: stayCoun,
                totalPrice: newTotalPrice
            }
            updateElementById(this.state.id, obj)
            .finally(() => this.props.getBalanceCallback());
        }

        let newBalance = +this.state.balance + count * this.state.price
        updateBalance(newBalance)
            .finally(() => this.props.getBalanceCallback())

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
                        <Link to={"/Account"}>
                            <img src={arrow} alt="arrow" />
                               Back
                        </Link>
                        <h2>Sell {this.state.name}</h2>
                    </HeaderSell>
                    <CentralBlockSell>
                        <PriceBox>
                            <PriceText>
                                {Math.trunc(this.state.price)}
                                <span>{this.numberAfterDot(this.state.price)} $</span>
                            </PriceText>
                        </PriceBox>
                        <InputBlockSell>
                            <button onClick={this.handlerMinus}>-</button>
                            <InputLenght
                                type="number"
                                min="0"
                                onChange={this.changeValue}
                                value={this.state.pieces}
                            />
                            <button onClick={this.handlerPlus}>+</button>
                        </InputBlockSell>
                        <BuyFor>
                            Sell for
                            <PriceText> {Math.trunc(this.state.pieces * this.state.price)}
                                <span> {this.numberAfterDot(this.state.pieces * this.state.price)} $ </span>
                            </PriceText>
                        </BuyFor>
                        <Link
                            to={{
                                pathname:
                                    this.state.pieces <= 0 ||
                                        this.state.pieces === "" ||
                                        this.state.pieces * this.state.price > this.state.balance
                                        ? `/sell/${this.props.lnk}`
                                        : "/sell",
                                state: {
                                    symbol: this.state.symbol,
                                    name: this.state.name,
                                    price: this.state.price,
                                },
                            }}
                        >
                            <button onClick={this.sellShares}>Sell</button>
                        </Link>

                    </CentralBlockSell>
                </MainBuy>
            </TestBlock>
        );
    }
}
export default Sell;
