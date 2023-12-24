import React, { useState, useEffect } from 'react';

const OrderApp = () => {
  const [id, setId] = useState('');
  const [price, setPrice] = useState('');
  const [dish, setDish] = useState('');
  const [table, setTable] = useState('table1');
  const [orders, setOrders] = useState({});

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || {};
    setOrders(storedOrders);
  }, []);

  const addOrder = () => {
    if (id && price && dish) {
      const newOrder = { id, price, dish };
      const updatedTable = { ...orders[table], [id]: newOrder };
      const updatedOrders = { ...orders, [table]: updatedTable };
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      clearInputs();
    } else {
      alert('Please fill in all fields.');
    }
  };

  const deleteOrder = (orderId) => {
    const { [orderId]: deletedOrder, ...rest } = orders[table];
    const updatedTable = { ...rest };
    const updatedOrders = { ...orders, [table]: updatedTable };
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const clearInputs = () => {
    setId('');
    setPrice('');
    setDish('');
  };

  return (
    <div>
      <h2>Add Order</h2>
      <label htmlFor="id">ID:</label>
      <input type="number" id="id" value={id} onChange={(e) => setId(e.target.value)} />

      <label htmlFor="price">Price:</label>
      <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />

      <label htmlFor="dish">Dish:</label>
      <input type="text" id="dish" value={dish} onChange={(e) => setDish(e.target.value)} />

      <label htmlFor="table">Select Table:</label>
      <select id="table" value={table} onChange={(e) => setTable(e.target.value)}>
        <option value="table1">Table 1</option>
        <option value="table2">Table 2</option>
        <option value="table3">Table 3</option>
      </select>

      <button onClick={addOrder}>Add Order</button>

      <h2>Table No 1</h2>
      <ul>
        {Object.entries(orders.table1 || {}).map(([orderId, order]) => (
          <li key={orderId}>
            {`Dish: ${order.dish}, Price: ${order.price}`}
            <button onClick={() => deleteOrder(orderId)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Table No 2</h2>
      <ul>
        {Object.entries(orders.table2 || {}).map(([orderId, order]) => (
          <li key={orderId}>
            {` Dish: ${order.dish}, Price: ${order.price}`}
            <button onClick={() => deleteOrder(orderId)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Table No 3</h2>
      <ul>
        {Object.entries(orders.table3 || {}).map(([orderId, order]) => (
          <li key={orderId}>
            {` Dish: ${order.dish}, Price: ${order.price}`}
            <button onClick={() => deleteOrder(orderId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderApp;
