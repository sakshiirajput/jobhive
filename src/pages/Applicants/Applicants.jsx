import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { employeeGetAllApplication } from '../../redux/actions/Application/Application';
import { Box, Button, Flex, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Image, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure, useToast } from '@chakra-ui/react';

const Applicants = () => {
  const dispatch = useDispatch();
  const [selectedResumeUrl, setSelectedResumeUrl] = useState('');
  const { applicants } = useSelector((state) => state.applicants);
  const [showResumeModal, setShowResumeModal] = useState(false);

  useEffect(() => {
    dispatch(employeeGetAllApplication());
  }, []);
  const handleOpenResumeModal = (resumeUrl) => {
    setSelectedResumeUrl(resumeUrl);
    setShowResumeModal(true);
  };

  const handleCloseResumeModal = () => {
    setShowResumeModal(false);
  };
  return (
    < Box
      margin="auto"
      width='98%'
      direction="column" 
      paddingTop="100px"
    
    
    >
      {applicants.length === 0 ? (
        <p>No applications</p>
      ) : (
        <div className="applicant-cards">
          {applicants.map((applicant) => (
            <Box
              key={applicant._id}
              borderWidth="1px"
              borderRadius="lg"
              width='100%'
              overflow="hidden"
              p="4"
              mb="4"
              _hover={{ borderColor: 'blue.500' }}              
            >
              <Text fontSize="xl" fontWeight="semibold" mb="2">
                {applicant.name}
              </Text>
              <Text>Email: {applicant.email}</Text>
              <Text>Phone: {applicant.phone}</Text>
              <Text>Address: {applicant.address}</Text>
              <Text>Cover Letter: {applicant.coverLetter}</Text>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                  alignItems: 'center'

                }}

              >
               
                <Button
                  mt="2"
                  colorScheme="blue"
                  mx={2}
                  onClick={() => handleOpenResumeModal(applicant.resume.url)}
                >
                  View Resume
                </Button>
                <Modal isOpen={showResumeModal} onClose={handleCloseResumeModal}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Resume</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Image src={selectedResumeUrl} alt="Resume" />
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={handleCloseResumeModal}>
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
             
            </Box>
          ))}
        </div>
      )}
    </Box>
  );
};

export default Applicants;
