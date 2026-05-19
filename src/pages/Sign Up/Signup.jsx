import { Box, Button, Flex, FormControl, FormLabel, Input, Select, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../Components/Logo/Logo'
import { register } from '../../redux/actions/User/User'
import './Signup.css'
import { useToast } from '@chakra-ui/react';

const Signup = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});

    const handleSignup = async () => {
        try {
           
            const errors = {};
            if (!name.trim()) {
                errors.name = 'Name is required';
            }
            if (!email.trim()) {
                errors.email = 'Email is required';
            }
            if (!password.trim()) {
                errors.password = 'Password is required';
            }
            if (!role) {
                errors.role = 'Role is required';
            }
            if (!phone.trim()) {
                errors.phone = 'Phone is required';
            }

            if (Object.keys(errors).length > 0) {
                setErrors(errors);
                return;
            }
            const details = {
                name,email,password, role,phone
            }
            const data = await register(details);
            if (data?.success) {
                toast({
                    title: 'Sign Up successful!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                navigate('/login')
            } else {
                toast({
                    title: 'Sign up failed',
                    description: 'Something went wrong.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }



        } catch (e) {
            console.log(e);
        }
    };

    return (
        <VStack
            as='form'
            mx='auto'
            w={{ base: '90%', md: 500 }}
            h='100vh'
            justifyContent='center'
        >
            <div>
                <Logo />
            </div>
            <Box w='100%'>
                <VStack w='100%'>
                    <FormControl isRequired isInvalid={errors.name}>
                        <FormLabel>Name</FormLabel>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                        {errors.name && <Box color='red'>{errors.name}</Box>}
                    </FormControl>
                    <FormControl isRequired isInvalid={errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <Box color='red'>{errors.email}</Box>}
                    </FormControl>
                    <FormControl isRequired isInvalid={errors.password}>
                        <FormLabel>Password</FormLabel>
                        <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        {errors.password && <Box color='red'>{errors.password}</Box>}
                    </FormControl>
                    <FormControl isRequired isInvalid={errors.role}>
                        <FormLabel>Role</FormLabel>
                        <Select
                            placeholder='Select Role'
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option>Employee</option>
                            <option>Job Seeker</option>
                        </Select>
                        {errors.role && <Box color='red'>{errors.role}</Box>}
                    </FormControl>
                    <FormControl isRequired isInvalid={errors.phone}>
                        <FormLabel>Phone</FormLabel>
                        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                        {errors.phone && <Box color='red'>{errors.phone}</Box>}
                    </FormControl>
                    <Button isLoading = {loading} colorScheme='green' w='100%' mt='10px' p='28px' onClick={handleSignup}>
                        Sign Up
                    </Button>
                </VStack>
                <Flex mt='10px' w='100%' justifyContent='flex-end'>
                    Already have an account?{' '}
                    <Box  ml={'4px'} cursor={'pointer'} onClick={() => navigate('/login')}>
                        Login
                    </Box>
                </Flex>
            </Box>
        </VStack>
    );
};

export default Signup;
