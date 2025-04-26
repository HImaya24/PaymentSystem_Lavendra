import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CheckoutForm from './components/CheckoutForm';
import PaymentList from './components/PaymentList';
import { loadStripe } from '@stripe/stripe-js';
import NavBar from './components/NavBar'; // Import NavBar
import { Elements } from '@stripe/react-stripe-js'; // Import Elements
import AdminPaymentView from './components/AdminPaymentView';
//import PaymentChatbot from'./components/PaymentChatbot';


// Load your Stripe publishable key
const stripePromise = loadStripe('pk_test_51Qt4VIGaVSNorcZ7k77Ea074NYwqQAEED5jVr77L6HL3q0ZhUIQK6kl6eNrKKmDDl2EBB27Box0zSm3seGGuxUnq00zJs87snB');


const App = () => {
    return (
        <Router>
            {/* Add the NavBar here */}
            <NavBar />
            <Elements stripe={stripePromise}>
                <Routes>
                    <Route path="/" element={<CheckoutForm />} />
                    <Route path="/payments" element={<PaymentList />} />
                    <Route path="/adminpayments" element={<AdminPaymentView />} />
                    {/*<Route path="/chat" element={<PaymentChatbot />} />*/}
                </Routes>
            </Elements>
        </Router>
    );
};

export default App;