import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateOrderStatus } from '../api/ordersApi';
import { cancelOrder } from '../slices/orderSlice';

const ViewOrder = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.orders);
    const orderId = params.id;
    const order = orders.find(order => order._id === orderId);

    console.log(orderId)
     const handleCancelOrder = (orderId, status) => {
      // dispatch(updateOrderStatus(orderId, status));
      const   res = updateOrderStatus(orderId, status);
       if (res.status === 200) {
         dispatch(cancelOrder(orderId));
       } else {
         console.error('Failed to cancel order:', res);
       }
   
   
      alert('Order cancelled successfully');
       ///console.log('Order cancelled:', orderId);
   
     };


  return (
    <div>
      <h2>Order Details</h2>
      {order ? (
        <div>
          <p>Order ID: {order.id}</p>
          <p>Date: {new Date(order.date).toLocaleString()}</p>
          <p>Status: {order.status}</p>
          <ul>
            {order.products.map((item, i) => (
                <>
                <li key={item.id}>
               <h3> #{i+1}</h3>
              </li>
              <li key={item.id}>
                {item.title} - {item.quantity} x ${item.price}
              </li>
              <li>
                <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px' }} />
              </li>
                <li>
                    <p>{item.description}</p>   
                </li>
                <li>
                    <p>Category: {item.category}</p>
                </li>
                <li>
                    <p>Rating: {item.rating.rate}</p>
                </li>
                <li>
                    <p>Count: {item.rating.count}</p>
                </li>
              </>
            ))}
          </ul>
          <button onClick={() => handleCancelOrder(orderId, "Cancelled")}>Cancel Order</button>
        </div>
      ) : (
        <p>Order not found.</p>
      )}
    </div>
  )
}

export default ViewOrder