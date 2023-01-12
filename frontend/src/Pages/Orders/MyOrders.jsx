import React from "react";
import { useSearchParams } from "react-router-dom";
import AllOrders from "./AllOrders";
import OrderDetails from "./OrderDetails";

const MyOrders = () => {
  const [SearchParams, setUseSearchParams] = useSearchParams();
  const orderId = SearchParams.get("orderId");
  const orderStatus = SearchParams.get("orderStatus");

  return <>{orderId ? <OrderDetails orderId={orderId} /> : <AllOrders />}</>;
};

export default MyOrders;
