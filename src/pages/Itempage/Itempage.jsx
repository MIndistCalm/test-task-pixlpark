import { React, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Itempage.css";
import { username, password } from "../../settigns";

const Itempage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState([]);

  const goBack = () => navigate(-1);

  const [requestToken, setRequestToken] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  //   const [orderList, setOrderList] = useState([]);

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

  // GET Order by Id
  useEffect(() => {
    if (id && accessToken) {
      fetch(`http://localhost:5000/orders/${id}?accessToken=${accessToken}`)
        .then((res) => res.json())
        .then((data) => setPost(data.Result));
    }
  }, [id, accessToken]);
  return (
    <div className="itempage">
      <Button className="itempage-back-button" onClick={goBack}>
        Назад
      </Button>
      {post.map((item) => (
        <div className="itempage-item" key={item.Id}>
          <div className="itempage-item-preview">
            <h5>{item.Title}</h5>
            <img
              className="itempage-item-preview-image"
              src={item.PreviewImageUrl}
              alt="Image not found"
            />
          </div>
          <div className="itempage-item-info">
            <h5>Информация о заказе:</h5>
            <div>
              URL-адрес отслеживания:
              <a href={item.TrackingUrl}>{item.TrackingUrl}</a>
            </div>
            <div>Трек-номер: {item.TrackingNumber}</div>
            <div>Статус заказа: {item.Status}</div>
            <div>
              <div>ID заказчика: {item.UserId}</div>
              <div>ID компании заказчика: {item.UserCompanyAccountId}</div>
              <div>
                Дата создания заказа:{" "}
                {item.DateCreated != null
                  ? Date(parseInt(item.DateCreated.replace(/[^0-9]/g, "")))
                  : item.DateCreated}
              </div>
              <div>
                Дата редактирования заказа:{" "}
                {item.DateModified != null
                  ? Date(parseInt(item.DateModified.replace(/[^0-9]/g, "")))
                  : item.DateModified}
              </div>
              <div>
                Дата оплаты:{" "}
                {item.DatePaid != null
                  ? Date(parseInt(item.DatePaid.replace(/[^0-9]/g, "")))
                  : item.DatePaid}
              </div>
              Ссылка на скачивание:
              <a href={item.DownloadLink}>{" " + item.DownloadLink}</a>
            </div>
            <h5>Информация о доставке:</h5>
            <div>Почтовый индекс: {item.DeliveryAddress.ZipCode}</div>
            <div>Адрес: {item.DeliveryAddress.AddressLine1}</div>
            <div>Дополнительный адрес: {item.DeliveryAddress.AddressLine2}</div>
            <div>Описание: {item.DeliveryAddress.Description}</div>
            <div>Город: {item.DeliveryAddress.City}</div>
            <div>Старана: {item.DeliveryAddress.Country}</div>
            <div>Заказчик: {item.DeliveryAddress.FullName}</div>
            <div>Телефон:{item.DeliveryAddress.Phone} </div>
            <h5>Оплата:</h5>
            <div>Статус заказа: {item.PaymentStatus}</div>
            <div>Цена товара: {item.Price}</div>
            <div>Скидка: {item.DiscountTitle}</div>
            <div>Сумма скидки: {item.DiscountPrice}</div>
            <div>Цена доставки: {item.DeliveryPrice}</div>
            <div>Сумма заказа: {item.TotalPrice}</div>
            <div>Оплачено: {item.PaidPrice}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { Itempage };
