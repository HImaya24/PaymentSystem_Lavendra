const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create Payment Intent
router.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency, customerEmail, description } = req.body;

        // Validate amount
        if (!amount || isNaN(amount)) {
            return res.status(400).send({ error: 'Invalid amount' });
        }

        // Convert amount to cents
        const amountInCents = Math.round(parseFloat(amount) * 100);

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: currency || 'usd',
            automatic_payment_methods: { enabled: true },
            description: description || 'Lavendra Photography Services',
            metadata: { customerEmail }
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send({ error: error.message });
    }
});

// Store Payment in Database
router.post('/store-payment', async (req, res) => {
    try {
        const { name, email, amount, paymentStatus, paymentIntentId } = req.body;

        const payment = new Payment({
            name,
            email,
            amount,
            paymentStatus,
            paymentIntentId
        });

        await payment.save();
        res.send({ message: 'Payment stored successfully!' });
    } catch (error) {
        console.error('Error storing payment:', error);
        res.status(500).send({ error: error.message });
    }
});

// Get All Payments
router.get('/payments', async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;