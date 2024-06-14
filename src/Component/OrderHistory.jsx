import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';


const OrderHistory = () => {
  
  const [orderHistory, setOrderHistory] = useState([]);
  let token = localStorage.getItem("token") ?? "";
  token = token.replace(/"/g, "");

  const capitalizeText = (text) => {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleFetchOrderHistory = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/get-order-history`, {
        headers: {
          Accept: `application/json`,
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Order History:", response.data);
      setOrderHistory(response.data);
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  useEffect(() => {
    handleFetchOrderHistory();
  }, []);

  return (
    <section className="py-16 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
        <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
          Order History
        </h2>
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {orderHistory?.map((order, index) => {
          return (
            <div key={index} className="h-36 p-2 bg-gray-100 border flex rounded-lg gap-3">
              <div className="w-28 h-full rounded-lg overflow-hidden bg-white">
                <img src={order.product_img} alt="" className="w-full h-full object-contain  " />
              </div>
              <div className="flex flex-col justify-between">
                <h1 className="text-lg font-semibold">{order.product_name}</h1>
                <p className="text-sm">
                  Quantity: <span className="font-semibold">{order.quantity}</span>
                </p>
                <p className="text-sm">
                  Total: <span className="font-semibold">${order.total_price}</span>
                </p>
                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={
                      `font-semibold ` + `${order.status == "pending" ? "text-yellow-600" : order.status == "approved" ? "text-green-600" : ""}`
                    }
                  >
                    {capitalizeText(order.status)}
                  </span>
                </p>
                <p className="text-sm">
                  Date: <span className="font-semibold">{format(new Date(order.created_at), "Pp")}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  )
}

export default OrderHistory;