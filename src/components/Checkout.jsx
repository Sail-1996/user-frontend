import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, getOrders } from '../slices/orderSlice';
import { clearCart } from '../slices/cartSlice';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    if (cartItems.length === 0) return;
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    dispatch(createOrder({ ...data ,payment:{method: data.paymentMethod, amount: totalAmount}, status: "Pending" , products: cartItems, date: new Date().toISOString() , user: { name: data.name, address: data.address }}));
    dispatch(clearCart());
    dispatch(getOrders())
    navigate('/orders');
  };

  return (
    <Container>
      <h2 className="text-center my-4">Checkout</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </Form.Group>

        {/* Address Field */}
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your address"
            {...register('address', { required: 'Address is required' })}
          />
          {errors.address && <p className="text-danger">{errors.address.message}</p>}
        </Form.Group>

        {/* Payment Method Field */}
        <Form.Group className="mb-3">
          <Form.Label>Payment Method</Form.Label>
          <Form.Select {...register('paymentMethod', { required: 'Select a payment method' })}>
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </Form.Select>
          {errors.paymentMethod && <p className="text-danger">{errors.paymentMethod.message}</p>}
        </Form.Group>

        <Button type="submit" variant="success" className="w-100">
          Place Order
        </Button>
      </Form>
    </Container>
  );
};

export default Checkout;
