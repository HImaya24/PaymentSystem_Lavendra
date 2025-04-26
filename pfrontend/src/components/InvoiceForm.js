import React, { useState } from 'react';
import axios from 'axios';

const InvoiceForm = () => {
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/payments/create-invoice`,
                { customerEmail: email, amount }
            );
            alert(`Invoice URL: ${data.invoiceUrl}`);
        } catch (error) {
            console.error('Error creating invoice:', error);
            alert('Failed to create invoice. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <input
                type="email"
                placeholder="Customer Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block mb-2"
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block mb-2"
            />
            <button type="submit" className="bg-green-500 text-white py-2 px-4">
                Send Invoice
            </button>
        </form>
    );
};

export default InvoiceForm;