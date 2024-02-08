// Импорт необходимых библиотек и стилей
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Form, Button, ListGroup} from 'react-bootstrap';
import './App.css';

// Компонент формы добавления заказа
const OrderForm = ({onAddOrder}) => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phoneNumber: '',
        address: '',
        order: '',
        count: '',
        note: '',
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5159/Orders', formData);
            onAddOrder(response.data);
            setFormData({
                name: '',
                surname: '',
                phoneNumber: '',
                address: '',
                order: '',
                count: '',
                note: '',
            });
        } catch (error) {
            console.error('Error adding order:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="my-4">
            <h2>Add New Order</h2>
            <Form.Group controlId="formName">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formSurname">
                <Form.Label>Surname:</Form.Label>
                <Form.Control
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number:</Form.Label>
                <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formAddress">
                <Form.Label>Address:</Form.Label>
                <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formOrder">
                <Form.Label>Order:</Form.Label>
                <Form.Control
                    type="text"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formCount">
                <Form.Label>Count:</Form.Label>
                <Form.Control
                    type="text"
                    name="count"
                    value={formData.count}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formNote">
                <Form.Label>Note:</Form.Label>
                <Form.Control
                    type="text"
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Add Order
            </Button>
        </Form>
    );
};

// Компонент для отображения списка заказов
const OrderList = ({ orders, onUpdateOrder }) => {
    const handleCheckboxChange = async (id) => {
        const orderToUpdate = orders.find((order) => order.id === id);

        try {
            const response = await axios.patch(`http://localhost:5159/Orders/${id}`, {
                isDelivered: !orderToUpdate.isDelivered,
            });

            if (response.status === 200) {
                onUpdateOrder(id, !orderToUpdate.isDelivered); // Update local state
            } else {
                console.error('Failed to update delivery status');
            }
        } catch (error) {
            console.error('Error updating delivery status:', error);
        }
    };

    return (
        <div>
            <h2>Order List</h2>
            <ListGroup>
                {orders.map((order) => (
                    <ListGroup.Item key={order.id}>
                        <strong>{order.name} {order.surname}</strong>
                        <p>Phone Number: {order.phoneNumber}</p>
                        <p>Address: {order.address}</p>
                        <p>Order: {order.order}</p>
                        <p>Count: {order.count}</p>
                        <Form.Check
                            type="checkbox"
                            label="Delivered"
                            checked={order.isDelivered}
                            onChange={() => handleCheckboxChange(order.id)}
                        />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};



// Главный компонент приложения
const App = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5159/Orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleAddOrder = (newOrder) => {
        setOrders([...orders, newOrder]);
    };

    const handleUpdateOrder = (id, isDelivered) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.orderId === id ? {...order, isDelivered} : order
            )
        );
    };

    return (
        <Container>
            <OrderForm onAddOrder={handleAddOrder}/>
            <OrderList orders={orders} onUpdateOrder={handleUpdateOrder}/>
        </Container>
    );
};

export default App;
