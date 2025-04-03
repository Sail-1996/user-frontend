import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart, updateQuantity } from '../slices/cartSlice';
import { Button, Container, Row, Col, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 0) {
      dispatch(updateQuantity({ id, quantity: parseInt(quantity) }));
    }
  };

  return (
    <Container>
      <h2 className="text-center my-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <Row>
          {cartItems.map((item) => (
            <Col key={item.id} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={item.image} style={{ height: '200px', objectFit: 'contain' }} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>Price: ${item.price}</Card.Text>
                  
                  {/* Quantity Input */}
                  <Form.Control
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  />

                  <Card.Text>Total: ${item.price * item.quantity}</Card.Text>
                  <Button onClick={() => dispatch(removeFromCart(item.id))} variant="danger">Remove</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {cartItems.length > 0 && (
        <div className="text-center mt-4">
          <Button onClick={handleCheckout} variant="success" className="me-2">Proceed to Checkout</Button>
          <Button onClick={() => dispatch(clearCart())} variant="warning">Clear Cart</Button>
        </div>
      )}
    </Container>
  );
};

export default Cart;
