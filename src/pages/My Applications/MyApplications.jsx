import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { jobSeekerDeleteApplication, jobSeekerGetAllApplication } from '../../redux/actions/Application/Application';
import { Box, Button, Flex, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Image, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure, useToast } from '@chakra-ui/react';

const MyApplications = () => {
  const dispatch = useDispatch();
  const { applications } = useSelector((state) => state.appliedApplication);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [selectedResumeUrl, setSelectedResumeUrl] = useState('');
  const { isOpen: isDeleteAlertOpen, onOpen: onDeleteAlertOpen, onClose: onDeleteAlertClose } = useDisclosure();
  const [applicationIdToDelete, setApplicationIdToDelete] = useState(null);
  const toast = useToast();

  useEffect(() => {
    dispatch(jobSeekerGetAllApplication());
  }, []);

  const handleDelete = async () => {
    if (applicationIdToDelete) {
      try {
        const response = await (jobSeekerDeleteApplication(applicationIdToDelete));
        if (response?.success) {
          toast({
            title: 'Application deleted successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          dispatch(jobSeekerGetAllApplication());
        } else {
          toast({
            title: 'Error deleting application.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error('Error deleting application:', error);
        toast({
          title: 'Error deleting application.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      onCloseDeleteAlert();
    }
  };

  const onCloseDeleteAlert = () => {
    setApplicationIdToDelete(null);
    onDeleteAlertClose();
  };

  const handleOpenDeleteAlert = (applicationId) => {
    setApplicationIdToDelete(applicationId);
    onDeleteAlertOpen();
  };

  const handleOpenResumeModal = (resumeUrl) => {
    setSelectedResumeUrl(resumeUrl);
    setShowResumeModal(true);
  };

  const handleCloseResumeModal = () => {
    setShowResumeModal(false);
  };

  return (
    <Flex
     margin = "auto"
      width='98%'
      direction="column" align="center" justify="center"
    >
      <div
        style={{
          width: "100%",
          marginTop: '100px'
        }}
      >
        {applications.length === 0 ? (
          <Text>No applications found.</Text>
        ) : (
          applications.map((application) => (
            <Box
              key={application._id}
              borderWidth="1px"
              borderRadius="lg"
              width='100%'
              overflow="hidden"
              p="4"
              mb="4"
              _hover={{ borderColor: 'blue.500' }}
            >
              <Text fontSize="xl" fontWeight="semibold" mb="2">
                {application.name}
              </Text>
              <Text>Email: {application.email}</Text>
              <Text>Phone: {application.phone}</Text>
              <Text>Cover Letter: {application.coverLetter}</Text>
              <Text>Address: {application.address}</Text>
              {/* <img src={application.resume.url} alt="Resume" /> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                  alignItems :'center'
                  
                }}
              
              >
                <Button
                  mt="2"
                  colorScheme="red"
                  onClick={() => handleOpenDeleteAlert(application._id)}
                >
                  Delete
                </Button>
                <Button
                  mt="2"
                  colorScheme="blue"
                  mx={2}
                  onClick={() => handleOpenResumeModal(application.resume.url)}
                >
                  View Resume
                </Button>
            </div>
            </Box>
          ))
        )}
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
        <AlertDialog
          isOpen={isDeleteAlertOpen}
          leastDestructiveRef={undefined}
          onClose={onCloseDeleteAlert}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Application
              </AlertDialogHeader>
              <AlertDialogBody>
                Are you sure you want to delete this application? This action cannot be undone.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={undefined} onClick={onCloseDeleteAlert}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </div>
    </Flex>
  );
};

export default MyApplications;
