// Assuming you're passing job details as props to JobDetailsModal
import React from 'react';
import {
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const JobDetailsModal = ({ isOpen, onClose, job }) => {
    const { isAuthenticated, user } = useSelector((state) => state?.user);
    const navigate = useNavigate();
    let salaryText;
    if (job?.fixedSalary !== null
        && job?.fixedSalary !== undefined
    ) {
     
        salaryText = `$${job?.fixedSalary} per year`;
    } else if (job?.salaryFrom !== null && job?.salaryTo !== null) {
        salaryText = ` $${job?.salaryFrom} - $${job?.salaryTo} per year`;
    } else {
        salaryText = 'Not specified';
    }


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Job Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text><strong>Title:</strong> {job ? job.title : ''}</Text>
                    <Text><strong>Location:</strong> {job ? job.location : ''}</Text>
                    <Text><strong>City :</strong> {job ? job.city : ''}</Text>
                    <Text><strong>Category :</strong> {job ? job.category : ''}</Text>
                    <Text><strong>Description:</strong> {job ? job.description : ''}</Text>
                    <Text><strong>Salary :</strong> {salaryText}</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    {isAuthenticated && user?.role === 'Job Seeker' && (
                        <Button variant="ghost" onClick={() => navigate(`/applyjob/${job?._id}`)}>
                            Apply
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default JobDetailsModal;
