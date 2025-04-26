import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { TextField, Button, CircularProgress, Typography } from '@mui/material';


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);

        try {
            // Use the environment variable for the API URL
            const { data: { clientSecret } } = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/payments/create-payment-intent`,
                {
                    amount: parseFloat(amount) * 100,
                    currency: 'usd',
                    customerEmail: email,
                    description: 'Payment for Lavendra Photography Services'
                }
            );

            const cardElement = elements.getElement(CardElement);

            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name,
                        email,
                    },
                },
            });

            if (error) {
                setMessage(error.message);
            } else if (paymentIntent.status === 'succeeded') {
                setMessage('Payment successful!');

                // Use the environment variable for the API URL
                await axios.post(
                    `${process.env.REACT_APP_API_URL}/api/payments/store-payment`,
                    {
                        name,
                        email,
                        amount,
                        paymentStatus: 'Completed',
                        paymentIntentId: paymentIntent.id
                    }
                );
            }
        } catch (error) {
            console.error('Payment error:', error);
            setMessage('Payment failed. Please try again.');
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mt-8 p-6 border rounded-lg shadow">
            <Typography variant="h5" className="mb-4">Checkout Form</Typography>

            <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
            />

            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
            />

            <TextField
                label="Amount"
                variant="outlined"
                fullWidth
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                margin="normal"
            />

            <div className="my-4">
                <CardElement />
            </div>

            {loading ? (
                <CircularProgress />
            ) : (
                <Button type="submit" variant="contained" color="primary" disabled={!stripe}>
                    Pay Now
                </Button>
            )}

            {message && <Typography className="mt-4">{message}</Typography>}
            
        </form>
        
    );
};
console.log('API URL:', process.env.REACT_APP_API_URL);



export default CheckoutForm;