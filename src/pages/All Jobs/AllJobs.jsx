import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Heading, Input, Select, StackDivider, Text, VStack, useDisclosure } from '@chakra-ui/react';
import JobCard from '../../Components/JobCard/JobCard';
import JobDetailsModal from '../../Components/JobDetailsModal/JobDetailsModal';
import { getAllJobs } from '../../redux/actions/Job/Job';

const AllJobs = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector(state => state.user);
    const { jobs } = useSelector(state => state.allJobs);

    useEffect(() => {
        dispatch(getAllJobs());
    }, [dispatch]);

    const [selectedJob, setSelectedJob] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleLocationChange = event => {
        setSelectedLocation(event.target.value);
    };

    const handleMinPriceChange = event => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = event => {
        setMaxPrice(event.target.value);
    };

    const handleViewDetails = job => {
        setSelectedJob(job);
        onOpen();
    };

    const filteredJobs = jobs.filter(job => {
        const titleMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
        const locationMatch =
            selectedLocation === '' || job.city.toLowerCase().includes(selectedLocation.toLowerCase());

        let salaryMatch = true;
        if (minPrice !== '' && maxPrice !== '') {
            salaryMatch = job.salaryFrom >= parseInt(minPrice) && job.salaryTo <= parseInt(maxPrice);
        } else if (minPrice !== '') {
            salaryMatch = job.salaryFrom >= parseInt(minPrice);
        } else if (maxPrice !== '') {
            salaryMatch = job.salaryTo <= parseInt(maxPrice);
        }

        return titleMatch && locationMatch && salaryMatch;
    });


    return (
        <VStack
            style={{
                padding : "20px"
            }}
        
            align="stretch">
            <Heading
                marginTop="120px"
                fontWeight="300"
            
            >All Jobs</Heading>
            <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <Box display="flex" justifyContent="space-between">
                <Select
                    placeholder="Filter by Location"
                    value={selectedLocation}
                    onChange={handleLocationChange}
                >
                    <option value="">All Locations</option>
                    {
                        jobs?.map((job) => {
                            return <option
                                value = {job?.city}
                            >
                                {
                                    job?.city
                                }
                            </option>
                        })
                    }
                    
                </Select>
                <Box display="flex">
                    <Input
                        placeholder="Min Salary"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        type="number"
                        min="0"
                        mx={2}
                    />
                    
                    <Input
                        placeholder="Max Salary"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        type="number"
                        min="0"
                    />
                </Box>
            </Box>
            <Box divider={<StackDivider />} borderRadius="lg">
                {filteredJobs.map(job => (
                    <JobCard
                        isAuthenticated={isAuthenticated}
                        user={user}
                        key={job.id}
                        job={job}
                        onViewDetails={() => handleViewDetails(job)}
                    />
                ))}
            </Box>
            <JobDetailsModal isOpen={isOpen} onClose={onClose} job={selectedJob} />
        </VStack>
    );
};

export default AllJobs;
