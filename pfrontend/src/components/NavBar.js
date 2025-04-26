import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

const NavBar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'primary.main', boxShadow: 3 }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
                    <Button
                        component={Link}
                        to="/"
                        sx={{ color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }}
                    >
                        Checkout
                    </Button>
                    <Button
                        component={Link}
                        to="/payments"
                        sx={{ color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }}
                    >
                        MyPayments
                    </Button>
                    <Button
                        component={Link}
                        to="/adminpayments"
                        sx={{ color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }}
                    >
                        Admin PayControl
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;