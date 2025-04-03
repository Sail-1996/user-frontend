import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, resetProducts, setCategory, incrementPage, setHasMore } from '../slices/productSlice';
import { addToCart } from '../slices/cartSlice';
import { Card, Button, Container, Row, Col, Spinner, Form } from 'react-bootstrap';
import debounce from 'lodash.debounce';

const categories = [
  'All',
  'Electronics',
  'Jewelery',
  "Men's Clothing",
  "Women's Clothing",
];

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status, page, hasMore, selectedCategory } = useSelector((state) => state.products);
  const [searchQuery, setSearchQuery] = useState('');
  const observer = useRef();

  // Debounced search handler to reduce API calls
  const handleSearch = debounce((query) => {
    dispatch(resetProducts());
    dispatch(fetchProducts({ page: 1, category: selectedCategory, search: query }));
  }, 500);

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  // Load products when component mounts or page/category changes
  useEffect(() => {
    dispatch(fetchProducts({ page, category: selectedCategory }));
  }, [dispatch, page, selectedCategory]);

  // Observer for lazy loading
  const lastProductElementRef = useCallback(
    (node) => {
      if (status === 'loading') return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && hasMore) {
          dispatch(fetchProducts({ page: page + 1, category: selectedCategory, search: searchQuery }))
            .then((res) => {
              if (res.payload.length === 0) {
                dispatch(setHasMore(false));
              } else {
                dispatch(incrementPage());
              }
            });
        }
      }, { threshold: 1.0 });

      if (node) observer.current.observe(node);
    },
    [status, hasMore, dispatch, page, selectedCategory, searchQuery]
  );

  // Category filter handler
  const handleCategoryChange = (category) => {
    dispatch(resetProducts());
    dispatch(setCategory(category));
  };

  return (
    <Container>
      <h2 className="text-center my-4">Product Listing</h2>

      {/* Search Bar */}
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleChange}
        />
      </Form>

      {/* Category Filter */}
      <div className="mb-4">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'primary' : 'secondary'}
            className="me-2"
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <Row>
        {items.map((product, index) => (
          <Col
            key={product.id}
            sm={12}
            md={6}
            lg={4}
            className="mb-4"
            ref={items.length === index + 1 ? lastProductElementRef : null}
          >
            <Card>
              <Card.Img
                variant="top"
                src={product.image}
                style={{ height: '200px', objectFit: 'contain' }}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Button onClick={() => dispatch(addToCart(product))} variant="primary">
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {status === 'loading' && (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      )}

      {!hasMore && (
        <p className="text-center">No more products to load.</p>
      )}
    </Container>
  );
};

export default ProductList;
