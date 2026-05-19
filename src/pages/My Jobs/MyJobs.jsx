import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyJobs, updateJob } from '../../redux/actions/Job/Job';
import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Textarea, FormErrorMessage } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react';
const MyJobs = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.myJobs);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    country: '',
    city: '',
    location: '',
    fixedSalary: '',
    isExpired: false,
    salaryFrom: "",
    salaryTo: "",
    jobId : ""

  });
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    dispatch(getMyJobs());
  }, [dispatch]);

  const handleEditClick = (job) => {
    setSelectedJob(job);
    setFormData({
      title: job.title,
      description: job.description,
      category: job.category,
      country: job.country,
      city: job.city,
      location: job.location,
      fixedSalary: job.fixedSalary,
      isExpired: job.isExpired,
      salaryFrom: job.salaryFrom,
      salaryTo: job.salaryTo,
      jobId  : job._id
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (jobId) => {

  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (
      formData.title.trim() === '' ||
      formData.description.trim() === '' ||
      formData.category.trim() === '' ||
      formData.country.trim() === '' ||
      formData.city.trim() === '' ||
      formData.location.trim() === '' ||
      (formData.fixedSalary === '' && formData.salaryFrom === '' && formData.salaryTo === '')
    ) {
      setFormError('Please fill in all required fields.');
      return;
    }

    setFormError(null);
    const data =await updateJob(formData);

    console.log(data,'the ddata is')

    // setFormData({
    //   title: '',
    //   description: '',
    //   category: '',
    //   country: '',
    //   city: '',
    //   location: '',
    //   fixedSalary: '',
    //   isExpired: false,
    //   salaryFrom: "",
    //   salaryTo: ""
    // });

   



    if (data?.success) {
      toast({
        title: 'Login successful!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setIsEditModalOpen(false);
    } else {
      toast({
        title: 'Update failed',
        description: 'Check all details.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }









    // setIsEditModalOpen(false);
  };

  return (
    <div
      style={{
        paddingTop: "100px"
      }}
    >
      {jobs.map((job) => {
        let salaryText;
        if (job.fixedSalary !== null) {
          salaryText = `$${job.fixedSalary} per year`;
        } else if (job.salaryFrom !== null && job.salaryTo !== null) {
          salaryText = `$${job.salaryFrom} - $${job.salaryTo} per year`;
        } else {
          salaryText = ' Not specified';
        }

        return (
          <Box key={job.id} border="1px" p="4" width="97%" margin="20px  auto " borderRadius="md">
            <div><strong>Title:</strong> {job.title}</div>
            <div><strong>Description:</strong> {job.description}</div>
            <div><strong>Category:</strong> {job.category}</div>
            <div><strong>Country:</strong> {job.country}</div>
            <div><strong>City:</strong> {job.city}</div>
            <div><strong>Location:</strong> {job.location}</div>
            <div><strong>Salary :</strong>{salaryText}</div>
            <div style={{ display: 'flex', justifyContent: "flex-end", width: "100%" }}>
              <Button colorScheme='blue' onClick={() => handleEditClick(job)}>Edit</Button>
              <Button colorScheme='red' ml="2" onClick={() => handleDeleteClick(job.id)}>Delete</Button>
            </div>
          </Box>
        )
      })}
      {selectedJob && (
        <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Job</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input type="text" name="title" value={formData.title} onChange={handleChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea name="description" value={formData.description} onChange={handleChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Input type="text" name="category" value={formData.category} onChange={handleChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Country</FormLabel>
                <Input type="text" name="country" value={formData.country} onChange={handleChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>City</FormLabel>
                <Input type="text" name="city" value={formData.city} onChange={handleChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Location</FormLabel>
                <Input type="text" name="location" value={formData.location} onChange={handleChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Salary</FormLabel>
                {selectedJob.fixedSalary != null ?
                  <Input type="text" name="fixedSalary" value={formData.fixedSalary} onChange={handleChange} />
                  :
                  <div>
                    <Input type="text" name="salaryFrom" value={formData.salaryFrom} onChange={handleChange} />
                    <Input type="text" name="salaryTo" value={formData.salaryTo} onChange={handleChange} />
                  </div>
                }
              </FormControl>
              <FormControl isInvalid={!!formError}>
                {formError && <FormErrorMessage>{formError}</FormErrorMessage>}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSubmit}>Save</Button>
              <Button onClick={handleCloseEditModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default MyJobs;
