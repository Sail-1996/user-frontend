import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { getOrders, cancelOrder } from '../slices/orderSlice'; // Import cancelOrder action
import { useNavigate, useParams } from 'react-router-dom';
import { updateOrderStatus } from '../api/ordersApi';
import axios from 'axios';
const OrderList = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const navigate = useNavigate();
const [cancelOrder, setCancelOrder] = useState("");
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch, params, cancelOrder]);

  const handleCancelOrder = (orderId, status) => {
   // dispatch(updateOrderStatus(orderId, status));
   const   res = updateOrderStatus(orderId, status);
    if (res.status === 200) {
      dispatch(cancelOrder(orderId));
    } else {
      console.error('Failed to cancel order:', res);
    }

    setCancelOrder(status);
    alert('Order cancelled successfully');
    console.log('Order cancelled:', orderId);

  };

  const handleMakePayment = (orderId) => {
    navigate(`/checkout/${orderId}`);
  };

  const handleViewOrder = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <Container>
      <h2 className="text-center my-4">Order History</h2>
      {orders.length === 0 ? (
        <p className="text-center">No orders placed yet.</p>
      ) : (
        <Row>
          {orders?.map((order, index) => (
            <Col key={index} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Order #{index + 1}</Card.Title>
                  <Card.Text>Date: {new Date(order.date).toLocaleString()}</Card.Text>
                  <Card.Text>Date: {order.status}</Card.Text>
                  <ul>
                    {order.products.map((item) => (
                      <li key={item.id}>
                        {item.title} - {item.quantity} x ${item.price}
                      </li>
                    ))}
                  </ul>
                  <div className="d-flex justify-content-between">
                    <Button variant="danger" onClick={() => handleCancelOrder(order._id,"Cancel" )}>
                      Cancel
                    </Button>
                    {/* <Button variant="primary" onClick={() => handleMakePayment(order.id)}>
                      Pay
                    </Button> */}
                    <Button variant="info" onClick={() => handleViewOrder(order._id)}>
                      View
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )).reverse()} 
        </Row>
      )}
    </Container>
  );
};

export default OrderList;
