import React, { useState } from "react";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Image, Input, Stack, Text, Textarea, Spinner, useToast } from "@chakra-ui/react";
import { imageUpload } from "../../middlewares";
import { postApplication } from "../../redux/actions/Application/Application";
import { useParams } from "react-router-dom";

const ApplyJob = () => {
    const toast = useToast();
    const params = useParams();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        coverLetter: "",
        resume: {
            public_id: "",
            url: ""
        },
        jobId: params.id
    });
    const [resumePreview, setResumePreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleResumeChange = async (event) => {
        setUploading(true);
        const file = event.target.files[0];
        const allowedTypes = ["image/jpeg", "image/png"];

        if (file && allowedTypes.includes(file.type)) {
            const resumeUrl = URL.createObjectURL(file);
            setResumePreview(resumeUrl);
            const image = await imageUpload(event);
            setFormData({
                ...formData,
                resume: image.data
            });
            setErrors({ ...errors, resume: "" });
        } else {
            setResumePreview(null);
            setErrors({ ...errors, resume: "Please upload a valid image file (JPEG or PNG)." });
        }
        setUploading(false);
    };

    const handleSubmit = async () => {
        setLoading(true);
        const requiredFields = ["name", "email", "phone", "address", "coverLetter", "resume"];
        const newErrors = {};
        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = `Please enter your ${field}`;
            } else {
                newErrors[field] = "";
            }
        });

        setErrors(newErrors); 

        if (Object.values(newErrors).some(error => error)) {
            setLoading(false); 
        } else {
            try {
                const response = await postApplication(formData);
                setLoading(false);
                if (response.success) {
                    toast({
                        title: "Application submitted successfully",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });




                    setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        address: "",
                        coverLetter: "",
                        resume: {
                            public_id: "",
                            url: ""
                        },
                        jobId: params.id
                    })
                    
                } else {
                    toast({
                        title: "Failed to submit application",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                }
            } catch (error) {
                toast({
                    title: "An error occurred while submitting application",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                setLoading(false);
            }
        }
    };

    return (
        <div
            style={{
                width: "100vw",
                display: 'flex',
                justifyContent: "center",
                alignItems: 'center',
            }}
        >
            <Box
                style={{
                    marginTop: "100px"
                }}
                maxW="md"
                borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
                <Stack spacing="4">
                    <FormControl id="name" isRequired isInvalid={!!errors.name}>
                        <FormLabel>Name</FormLabel>
                        <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="email" isRequired isInvalid={!!errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="phone" isRequired isInvalid={!!errors.phone}>
                        <FormLabel>Phone</FormLabel>
                        <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                        <FormErrorMessage>{errors.phone}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="address" isRequired isInvalid={!!errors.address}>
                        <FormLabel>Address</FormLabel>
                        <Input type="text" name="address" value={formData.address} onChange={handleChange} />
                        <FormErrorMessage>{errors.address}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="coverLetter" isRequired isInvalid={!!errors.coverLetter}>
                        <FormLabel>Cover Letter</FormLabel>
                        <Textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} />
                        <FormErrorMessage>{errors.coverLetter}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="resume" isRequired isInvalid={!!errors.resume}>
                        <FormLabel>Resume (JPEG or PNG)</FormLabel>
                        <input type="file" accept="image/jpeg, image/png" onChange={handleResumeChange} />
                        {uploading && <Spinner size="sm" />}
                        {resumePreview && <Image src={resumePreview} alt="Resume Preview" maxH="200px" mt="2" />}
                        <FormErrorMessage>{errors.resume}</FormErrorMessage>
                    </FormControl>
                    <Button colorScheme="blue" onClick={handleSubmit} disabled={loading || uploading}>
                        {loading ? <Spinner size="sm" mr="2" /> : null} Apply
                    </Button>
                </Stack>
            </Box>
        </div>
    );
};

export default ApplyJob;
