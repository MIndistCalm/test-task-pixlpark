import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { username, password } from "../../settigns";
import "./Orderspage.css";
const Orderspage = () => {
  const [requestToken, setRequestToken] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [count, setCount] = useState([{ count: 50 }]);
  const [take, setTake] = useState(10);
  const [status, setStatus] = useState([]);

  // GET requestToken
  useEffect(() => {
    fetch("http://localhost:5000/requesttoken")
      .then((res) => res.json())
      .then((data) => setRequestToken(data.RequestToken));
  }, []);

  // GET accessToken
  useEffect(() => {
    if (!accessToken) {
      fetch(
        `http://localhost:5000/accesstoken?username=${username}&password=${password}&requestToken=${requestToken}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setAccessToken(data.AccessToken);
        });
    }
  }, [requestToken]);

  // GET Orders
  useEffect(() => {
    if (accessToken) {
      fetch(
        `http://localhost:5000/orders?accessToken=${accessToken}&take=${take}&status=${status}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setOrderList(data.Result);
        });
    }
  }, [status, take, accessToken]);

  // GET Orders count
  useEffect(() => {
    if (accessToken) {
      fetch(
        `http://localhost:5000/orders/count?accessToken=${accessToken}&status=${status}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setCount(data.Result);
        });
    }
  }, [status, accessToken]);

  const showMore = () => {
    take < 60 ? setTake(take + 10) : setTake(take);
  };
  return (
    <div className="orderspage">
      <div className="orderspage-header">
        <h5 className="orderspage-header-orders">Orders</h5>
        <h5 className="orderspage-header-price">Price</h5>
      </div>
      {orderList.map((order, index) => (
        <div key={order.Id} className="orderspage-list">
          <Link
            className="orderspage-list-link"
            to={`/${order.Id}?accessToken=${accessToken}`}
          >
            <p className="orderspage-list-link-index">{index + 1}</p>
            <p className="orderspage-list-link-Title">{order.Title}</p>
          </Link>
          <p className="orderspage-price">{order.Price} р</p>
        </div>
      ))}
      <Button onClick={showMore}>Показать больше</Button>
    </div>
  );
};

export { Orderspage };
