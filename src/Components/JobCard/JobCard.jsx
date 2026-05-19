import {
    Box,
    Heading,
    Text,
    Button
} from '@chakra-ui/react';

const JobCard = ({ job, onViewDetails, isAuthenticated, user }) => {

    let salaryText;
    if (job?.fixedSalary !== null
        && job?.fixedSalary !== undefined
    ) {
        console.log(job?.fixedSalary, 'the fixe salary')
        salaryText = `$${job?.fixedSalary} per year`;
    } else if (job?.salaryFrom !== null && job?.salaryTo !== null) {
        salaryText = ` $${job?.salaryFrom} - $${job?.salaryTo} per year`;
    } else {
        salaryText = 'Not specified';
    }


    return (
        <Box p={4} my={5} borderWidth="1px" borderRadius="lg">
            <Heading size="md">{job.title}</Heading>
            <Text><strong>City:</strong> {job?.city}</Text>
            <Text><strong>Description:</strong> {job.description}</Text>
            <Text><strong>Salary :</strong> {salaryText}</Text>
            <div
            
                style={{
                    
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems : "center"
                }}           
            >
                
                <Button
                    colorScheme='blue'
            
                    mt={4} onClick={onViewDetails}>View Details

                {isAuthenticated && user?.role === 'Job Seeker' && (
                    <div>& Apply</div>
                )}
            </Button>
           </div>
        </Box>
    );
};

export default JobCard;
