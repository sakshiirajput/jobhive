import React, { useState } from 'react';
import { Flex, Box, Heading, Spacer, IconButton, useDisclosure, Button, VStack, Link } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useLocation,useNavigate } from 'react-router-dom';
import { loadProfile, logout } from '../../redux/actions/User/User';
import { useSelector, useDispatch } from 'react-redux';
import './Navbar.css'
const Navbar = () => {
    const { isAuthenticated ,user} = useSelector((state) => state?.user)
    const dispatch = useDispatch();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const location = useLocation(); 

   
    const navigate = useNavigate();

    const logoutUser =async () => {
      await  logout()
        await dispatch(loadProfile());
        navigate('/login')
     window.location.reload();


    }

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            position="absolute"
            top="0"
            width="98vw"
            backgroundColor="white"
            zIndex={"2343"}

         
            padding="1rem"
     
            color="white"
        >
            <Flex align="center" mr={5}>
                <Heading
                    style={{
                        color : "black"
                    }}
                
                
                >JOBhive</Heading>
            </Flex>

            <Box display={{ base: "block", md: "none" }} onClick={isOpen ? onClose : onOpen}>
                {isOpen ? <CloseIcon /> : <HamburgerIcon />}
            </Box>
            <Box
                display={{ base: isOpen ? "block" : "none", md: "block" }}
                flexBasis={{ base: "100%", md: "auto" }}>
                <Flex
                    align={["center", "center", "center", "center"]}
                    justify={["center", "space-between", "flex-end", "flex-end"]}
                    direction={["column", "row", "row", "row"]}
                    pt={[4, 4, 0, 0]}
                >
                    <NavLink to="/" isActive={location.pathname === '/'}>Home</NavLink>
                    <NavLink to="/alljobs" isActive={location.pathname === '/alljobs'}>All Jobs</NavLink>
                    {

isAuthenticated  && 
                        
                 <>    { user?.role ==="Job Seeker" ? 
                            <NavLink to="/myapplication" isActive={location.pathname === '/myapplication'}>My Application</NavLink>
                            : <>
                            <NavLink to="/applicants" isActive={location.pathname === '/applicants'}>Applicants</NavLink>
                            <NavLink to="/myjobs" isActive={location.pathname === '/myapplication'}>My Jobs</NavLink>
                            <NavLink to="/postjob" isActive={location.pathname === '/postjob'}>Post Job</NavLink>    
                            </>}
                        
                        </>  
                    
                    }

        <div className="buttons">
                        {
                            isAuthenticated ?
                                <Button
                                    style = {{ borderRadius : "20px"}}
                                    onClick = {logoutUser}
                                >Log Out</Button>
                                :
                                <Button onClick={() => navigate('/login')}
                                    style={{ borderRadius: "20px" }}

                                >
                                        Log In
                                    </Button>
                                 
                              
                        }
</div>

                </Flex>
            </Box>
        </Flex>
    );
};

const NavLink = ({ to, isActive, children }) => (
    <Link
        as={RouterLink}
        to={to}
        p={4}
        style={
            isActive ? {
                color: "black",
                fontWeight: "500",
                fontSize : "18px"
                


            } : {}
        }
        color={isActive ? "black" : "gray.400"}
        _hover={{
            textDecoration: 'none',
            color: 'gray.400',
        }}
    >
        {children}
    </Link>
);

export default Navbar;
