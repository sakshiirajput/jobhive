import {useNavigate} from 'react-router-dom'
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Radio, RadioGroup, Stack, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';

import { postJob } from '../../redux/actions/Job/Job';
const PostJob = () => {
const navigate= useNavigate()
  const toast = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    country: '',
    city: '',
    location: '',
    salaryType: 'fixed',
    fixedSalary: '',
    salaryFrom: '',
    salaryTo: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangeRadio = (e) => {
    setFormData(prevState => ({
      ...prevState,
      salaryType: e
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    if (!formData.category.trim()) {
      errors.category = 'Category is required';
    }
    if (!formData.country.trim()) {
      errors.country = 'Country is required';
    }
    if (!formData.city.trim()) {
      errors.city = 'City is required';
    }
    if (!formData.location.trim()) {
      errors.location = 'Location is required';
    }
    if (formData.salaryType === 'fixed') {
      if (!formData.fixedSalary.trim()) {
        errors.fixedSalary = 'Fixed Salary is required';
      }
    } else {
      if (!formData.salaryFrom.trim()) {
        errors.salaryFrom = 'Salary From is required';
      }
      if (!formData.salaryTo.trim()) {
        errors.salaryTo = 'Salary To is required';
      }
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      
      const postData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        country: formData.country,
        city: formData.city,
        location: formData.location,
      };

      if (formData.salaryType === 'fixed') {
        postData.salaryType = formData.salaryType;
        postData.fixedSalary = formData.fixedSalary;
      } else {
        postData.salaryType = formData.salaryType;
        postData.salaryFrom = formData.salaryFrom;
        postData.salaryTo = formData.salaryTo;
      }
      

     const data =  await postJob(postData);
      if (data?.success) {
        toast({
          title: 'Job posted successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/')
      } else {
        toast({
          title: 'job posted failed',
          description: 'Something went wrong',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }

      setFormData({
        title: '',
        description: '',
        category: '',
        country: '',
        city: '',
        location: '',
        salaryType: 'fixed',
        fixedSalary: '',
        salaryFrom: '',
        salaryTo: ''
      });
      setErrors({});
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div
   
    >


      <Box
        style = {{ paddingTop :"100px"}}
       
    
        maxWidth="600px" mx="auto" p={4}>


      <Heading as="h2" size="lg" mb={4}>Post a Job</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4} isInvalid={errors.title}>
          <FormLabel>Title</FormLabel>
          <Input type="text" name="title" value={formData.title} onChange={handleChange} />
          <FormErrorMessage>{errors.title}</FormErrorMessage>
        </FormControl>
        <FormControl mb={4} isInvalid={errors.description}>
          <FormLabel>Description</FormLabel>
          <Textarea name="description" value={formData.description} onChange={handleChange} />
          <FormErrorMessage>{errors.description}</FormErrorMessage>
        </FormControl>
        <FormControl mb={4} isInvalid={errors.category}>
          <FormLabel>Category</FormLabel>
          <Input type="text" name="category" value={formData.category} onChange={handleChange} />
          <FormErrorMessage>{errors.category}</FormErrorMessage>
        </FormControl>
        <FormControl mb={4} isInvalid={errors.country}>
          <FormLabel>Country</FormLabel>
          <Input type="text" name="country" value={formData.country} onChange={handleChange} />
          <FormErrorMessage>{errors.country}</FormErrorMessage>
        </FormControl>
        <FormControl mb={4} isInvalid={errors.city}>
          <FormLabel>City</FormLabel>
          <Input type="text" name="city" value={formData.city} onChange={handleChange} />
          <FormErrorMessage>{errors.city}</FormErrorMessage>
        </FormControl>
        <FormControl mb={4} isInvalid={errors.location}>
          <FormLabel>Location</FormLabel>
          <Textarea name="location" value={formData.location} onChange={handleChange} />
          <FormErrorMessage>{errors.location}</FormErrorMessage>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Salary Type</FormLabel>
          <RadioGroup name="salaryType" value={formData.salaryType} onChange={handleChangeRadio}>
            <Stack spacing={2} direction="row">
              <Radio name="salaryType" value="fixed">Fixed Salary</Radio>
              <Radio name="salaryType" value="range">Salary Range</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        {formData.salaryType === 'fixed' ? (
          <FormControl mb={4} isInvalid={errors.fixedSalary}>
            <FormLabel>Fixed Salary</FormLabel>
            <Input type="number" name="fixedSalary" value={formData.fixedSalary} onChange={handleChange} />
            <FormErrorMessage>{errors.fixedSalary}</FormErrorMessage>
          </FormControl>
        ) : (
          <>
            <FormControl mb={4} isInvalid={errors.salaryFrom}>
              <FormLabel>Salary From</FormLabel>
              <Input type="number" name="salaryFrom" value={formData.salaryFrom} onChange={handleChange} />
              <FormErrorMessage>{errors.salaryFrom}</FormErrorMessage>
            </FormControl>
            <FormControl mb={4} isInvalid={errors.salaryTo}>
              <FormLabel>Salary To</FormLabel>
              <Input type="number" name="salaryTo" value={formData.salaryTo} onChange={handleChange} />
              <FormErrorMessage>{errors.salaryTo}</FormErrorMessage>
            </FormControl>
          </>
        )}
        <Button type="submit" colorScheme="blue">Post Job</Button>
      </form>
      </Box>
    </div>
  );
};

export default PostJob;
