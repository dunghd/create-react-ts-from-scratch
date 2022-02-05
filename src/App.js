import React from "react";
import Hoc from "./HOC";
import StockList from "./StockList";
import UserList from "./UserList";

const stockData = [
  {
    id: 1,
    name: "TCS",
  },
  {
    id: 2,
    name: "Infosys",
  },
  {
    id: 3,
    name: "Reliance",
  },
];

const usersData = [
  {
    id: 1,
    name: "Krunal",
  },
  {
    id: 2,
    name: "Ankit",
  },
  {
    id: 3,
    name: "Rushabh",
  },
];

const Stock = Hoc(StockList, stockData);

const User = Hoc(UserList, usersData);

class App extends React.Component {
  render() {
    return (
      <>
        <span>Stock List</span>
        <br />
        <Stock />
        <br />
        <span>User List</span>
        <br />
        <User />
      </>
    );
  }
}

App = Hoc(App);

export default App;
