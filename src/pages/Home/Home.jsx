import React from "react";
import {
  ChakraProvider,
  Flex,
  Box,
  Heading,
  Button,
  Spacer,
  Container,
  Link,
  Image,
} from "@chakra-ui/react";
import img from './sideImage.png'
function Home() {
  return (
    <ChakraProvider>
      <Flex direction="row" minH="100vh"
        justifyContent="center"
        alignItems="center"
      >
       
        <Box flex={1} >
          <Flex
            
          >
            
        
            <Flex
              width="50%"
              flex={1} justifyContent="center" alignItems="center">
            <Container maxW="xl" textAlign="center">
              <Heading as="h1" size="2xl" mb={6}>
                  Elevate your career. Post. Discover. Succeed.
              </Heading>
                <Box
                 
              >
                  <p>Post your aspirations, discover opportunities, and succeed beyond expectations.</p>
                  <Flex
                    justifyContent="center"
                    alignItems="center"

                    display="flex"

                  
                  >
                  
                
                <Link color="blue.500" href="/alljobs">
                    <Button
                      marginTop="30px"
                     colorScheme="blue"
                    
                    >Get Started</Button>
                    </Link>

                  </Flex>
              </Box>
            </Container>
            </Flex>
            <Box
              width={{ base: "0", md: "50%", }}
              justifyContent="center"
              alignItems="center"
        
              display = "flex"
            
            >
              

              <Image
                width={{ base: "100px", md: "400px" , }}
                height={{ base: "100px", md: "400px" }}
                src={img}
                alt="Side Image"
              />

            </Box>
          </Flex>
          <Box
            position="absolute"
            bottom="0"

            width="100vw"
            left="0"
            color="black" px={4} py={3} textAlign="center">
            <p>&copy; 2024 JOBhive. All rights reserved.</p>
          </Box>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default Home;
