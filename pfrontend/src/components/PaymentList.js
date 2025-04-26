/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const PaymentList = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/payments/payments`);
                setPayments(data);
            } catch (error) {
                console.error('Error fetching payments:', error);
                setError('Failed to fetch payments. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <div className="p-6">
            <Typography variant="h4" className="mb-4">All Payments</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Email</strong></TableCell>
                            <TableCell><strong>Amount</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Date</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payments.map((payment) => (
                            <TableRow key={payment._id}>
                                <TableCell>{payment.name}</TableCell>
                                <TableCell>{payment.email}</TableCell>
                                <TableCell>${payment.amount}</TableCell>
                                <TableCell>{payment.paymentStatus}</TableCell>
                                <TableCell>{new Date(payment.createdAt).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default PaymentList;*/
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const receiptRefs = useRef({});

  const userEmail = 'percy.demigod@iris.com'; // Target user

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/payments/payments`);
        const filtered = data.filter(
          (payment) => payment.email?.toLowerCase() === userEmail.toLowerCase()
        );
        setPayments(filtered);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setError('Failed to fetch payments. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handlePrintReceipt = (paymentId) => {
    const content = receiptRefs.current[paymentId];
    if (content) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Payment Receipt - ${paymentId}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .receipt { max-width: 400px; margin: 0 auto; text-align: center; }
              .receipt h1 { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
              .receipt h2 { font-size: 20px; font-weight: bold; margin-bottom: 20px; }
              .receipt p { margin-bottom: 10px; }
            </style>
          </head>
          <body>
            <div class="receipt">
              <h1>Lavendra Photography - Capture your Best Moments</h1>
              <h2>Payment Receipt</h2>
              <p><strong>Name:</strong> ${content.name}</p>
              <p><strong>Email:</strong> ${content.email}</p>
              <p><strong>Amount:</strong> LKR ${content.amount}</p>
              <p><strong>Status:</strong> ${content.paymentStatus}</p>
              <p><strong>Date:</strong> ${new Date(content.createdAt).toLocaleString()}</p>
              <p><strong>Thank you for your Payment.</strong></p>
              <p><strong>Have a Nice Day!</strong></p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div className="p-6">
      <Typography variant="h4" className="mb-4">
        My Payments
      </Typography>
      {payments.length === 0 ? (
        <Typography>No payments found for {userEmail}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Amount</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Receipt</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell>{payment.name}</TableCell>
                  <TableCell>{payment.email}</TableCell>
                  <TableCell>LKR {payment.amount}</TableCell>
                  <TableCell>{payment.paymentStatus}</TableCell>
                  <TableCell>{new Date(payment.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <div ref={(el) => (receiptRefs.current[payment._id] = payment)} />
                    <Button
                      onClick={() => handlePrintReceipt(payment._id)}
                      variant="contained"
                      color="secondary"
                    >
                      Download Receipt
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default PaymentList;


/*import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Chip, Box, Typography, Button, Divider, CircularProgress } from '@mui/material';
import { Receipt, Delete } from '@mui/icons-material';

const UserPaymentsPage = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const testUserName = "himaya"; //name to filter by

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/api/payments");
            const data = await response.json();
            setPayments(data);
        } catch (error) {
            console.error("Error fetching payments:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const userPayments = (payments || []).filter(payment => 
        payment.name?.toLowerCase() === testUserName.toLowerCase()
    );

    const handlePrintReceipt = (payment) => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Payment Receipt</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        .receipt { max-width: 500px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; }
                        h1, h2 { text-align: center; }
                        .detail { margin: 10px 0; }
                        .thank-you { font-style: italic; text-align: center; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="receipt">
                        <h1>Lavendra Photography</h1>
                        <h2>Payment Receipt</h2>
                        <div class="detail"><strong>Transaction ID:</strong> ${payment._id}</div>
                        <div class="detail"><strong>Name:</strong> ${payment.name}</div>
                        <div class="detail"><strong>Email:</strong> ${payment.email}</div>
                        <div class="detail"><strong>Amount:</strong> LKR ${payment.amount}</div>
                        <div class="detail"><strong>Status:</strong> ${payment.paymentStatus}</div>
                        <div class="detail"><strong>Date:</strong> ${new Date(payment.createdAt).toLocaleString()}</div>
                        <div class="thank-you">
                            <p>Thank you for your payment!</p>
                            <p>Have a wonderful day!</p>
                        </div>
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>My Payments</Typography>
            
            {userPayments.length === 0 ? (
                <Box sx={{ textAlign: 'center', p: 4, border: '1px dashed #ccc', borderRadius: 1 }}>
                    <Typography variant="body1">
                        No payments found for <strong>{testUserName}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Debug: First payment name is {payments[0]?.name}
                    </Typography>
                </Box>
            ) : (
                <List>
                    {userPayments.map((payment, index) => (
                        <React.Fragment key={payment._id}>
                            <ListItem sx={{ 
                                borderLeft: '4px solid',
                                borderLeftColor: payment.paymentStatus === 'completed' ? 'success.main' : 'warning.main',
                                backgroundColor: payment.paymentStatus === 'completed' ? 'rgba(76, 175, 80, 0.08)' : 'transparent'
                            }}>
                                <ListItemText
                                    primary={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Typography variant="body1"><strong>Payment #{index + 1}</strong></Typography>
                                            <Chip 
                                                label={payment.paymentStatus} 
                                                color={payment.paymentStatus === 'completed' ? 'success' : 'warning'} 
                                                size="small" 
                                            />
                                        </Box>
                                    }
                                    secondary={
                                        <>
                                            <Typography variant="body2"><strong>Amount:</strong> LKR {payment.amount}</Typography>
                                            <Typography variant="body2"><strong>Date:</strong> {new Date(payment.createdAt).toLocaleString()}</Typography>
                                        </>
                                    }
                                />
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<Receipt />}
                                        onClick={() => handlePrintReceipt(payment)}
                                    >
                                        Receipt
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        startIcon={<Delete />}
                                        onClick={() => console.log('Delete payment', payment._id)}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </ListItem>
                            {index < userPayments.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default UserPaymentsPage;*/
