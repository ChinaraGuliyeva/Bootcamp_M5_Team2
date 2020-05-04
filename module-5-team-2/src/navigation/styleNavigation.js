import styled from "styled-components";

//Стили Компонента Footer начало
export const FooterBlock = styled.div`
  width: 100%;
  background-color: #833ae0;
  position: fixed;
  bottom: 0;
  padding: 15px 0 15px 30px;
  font-family: "Roboto", sans-serif;
  box-shadow: 0px -4px 6px rgba(0, 0, 0, 0.15);
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 22px;
    font-weight: bold;
    letter-spacing: 0.03em;
    color: #ffdc40;
  }
`;
export const CurrentBalance = styled.p`
  font-size: 36px;
  font-weight: normal;
  width: 100%;
  text-align: center;
  margin-right: 100px;
  span {
    font-size: 22px;
  }
`;
//Стили Компонента Footer Конец


export const HeaderBlock = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  padding: 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ul {
    display: flex;
    justify-content: space-around;
    list-style: none;
    width: 30%;
    font-size: 20px;
  }
  a {
    text-decoration: none;
    color: #000000;
    font-family: "Roboto", sans-serif;
    padding: 8px;
  }
  a:hover {
    color: #FFDC40;
    border-bottom: 1px solid #000000;
    margin-bottom: -1px;
  }
`;
