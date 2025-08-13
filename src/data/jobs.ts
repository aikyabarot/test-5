import { Job } from '../types';

export const MOCK_JOBS_DB: Job[] = [
    {
        id: 201,
        clientId: 101,
        title: "Senior Machine Learning Engineer",
        location: "Remote",
        type: "Tech",
        employmentType: "Full-time",
        startDate: "2024-08-01",
        salary: "$180,000",
        posted: "2024-06-10",
        status: 'Open',
        recruiterId: 1,
        description: "Seeking a senior ML engineer to lead our new predictive analytics team."
    },
    {
        id: 202,
        clientId: 102,
        title: "Quantum Research Scientist",
        location: "Boston, MA",
        type: "Research",
        employmentType: "Full-time",
        startDate: "2024-09-01",
        salary: "$220,000",
        posted: "2024-05-20",
        status: 'Open',
        recruiterId: 1,
        description: "PhD in Quantum Physics or related field required. Post-doc experience preferred."
    }
];