import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logo from '../../Components/Logo/Logo';
import { useToast } from '@chakra-ui/react';

import { loadProfile, login } from '../../redux/actions/User/User';
import './Login.css';
const Login = () => {
    const dispatch = useDispatch();
    const toast = useToast();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [errors, setErrors] = useState({});

    const handleLogin = async () => {
        try {
            const errors = {};

            if (!email.trim()) {
                errors.email = 'Email is required';
            }
            if (!password.trim()) {
                errors.password = 'Password is required';
            }

            if (Object.keys(errors).length > 0) {
                setErrors(errors);
                return;
            }

            const details = {
                email,
                password,
                role
            };
            const data = await login(details);
        

            if (data?.success) {
                toast({
                    title: 'Login successful!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
               await  dispatch(loadProfile());
                navigate('/')
                  window.location.reload();
               
            } else {
                toast({
                    title: 'Login failed',
                    description: 'Please check your credentials.',
                    status: 'error',
                    duration: 3000, 
                    isClosable: true,
                });
            }


            dispatch(loadProfile());
        } catch (e) {
            console.error('An error occurred during login:', e);
        }
    };

    return (
        <VStack as='form' mx='auto' w={{ base: '90%', md: 500 }} h="100vh" justifyContent="center">
            <div>
                <Logo />
            </div>
            <Box w="100%">
                <VStack w="100%">
                    <FormControl isRequired isInvalid={errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={errors.password}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                    {/* <Flex w='100%' justifyContent='flex-end'>Forgot Password?</Flex> */}
                    <Button
                        colorScheme='green'
                        w="100%"
                        mt='10px'
                        p="28px"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </VStack>
                <Flex mt='10px' w='100%' justifyContent='flex-end'>Create an account? <Box ml={'4px'} cursor={"pointer"} onClick={() => { navigate('/signup') }}>Signup</Box></Flex>
            </Box>
        </VStack>
    );
};

export default Login;
