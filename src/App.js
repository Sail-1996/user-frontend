import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderList from './components/OrderList';
import ViewOrder from './components/ViewOrder';
import { Container, Navbar, Nav, Badge } from 'react-bootstrap';

const App = () => {
  const cartItems = useSelector((state) => state.cart.cartItems) ?? [];

  console.log(cartItems );
  

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">My Shop</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/cart">
              Cart {cartItems.length > 0 && <Badge pill bg="danger">{cartItems.length}</Badge>}
            </Nav.Link>
            <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/order/:id" element={<ViewOrder />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;