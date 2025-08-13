import { Candidate } from '../types';

export const MOCK_CANDIDATES_DB: Candidate[] = [
    {
        id: 301,
        name: "Alice Johnson",
        role: "Machine Learning Engineer",
        experience: "8 years",
        education: "M.S. in Computer Science",
        location: "San Francisco, CA",
        phone: "555-1234",
        skills: ["Python", "TensorFlow", "PyTorch", "AWS"],
        availabilityStatus: "Available Immediately",
        pipelineStatus: "Initial Screen",
        statusHistory: [{ status: "Sourced", date: "2024-06-15", actor: "Recruiter" }],
        notes: "Strong background in NLP. Great communication skills.",
        feedback: { recruiter: "Excellent", technical: "", manager: "" },
        resumes: [{ name: "Alice_Johnson_Resume.pdf", date: "2024-06-15" }],
        associatedJobId: 201,
        aiMatch: 92
    },
    {
        id: 302,
        name: "Bob Williams",
        role: "Quantum Physicist",
        experience: "5 years post-doc",
        education: "Ph.D. in Quantum Information",
        location: "Cambridge, MA",
        phone: "555-5678",
        skills: ["Qiskit", "Quantum Algorithms", "Cryogenics"],
        availabilityStatus: "Actively Looking",
        pipelineStatus: "Submitted to Client",
        statusHistory: [
            { status: "Sourced", date: "2024-06-01", actor: "Recruiter" },
            { status: "Initial Screen", date: "2024-06-05", actor: "Recruiter" },
            { status: "Technical Screen", date: "2024-06-10", actor: "Technical Reviewer" }
        ],
        notes: "Published several papers on quantum entanglement.",
        feedback: { recruiter: "Strong candidate", technical: "Passed", manager: "" },
        resumes: [{ name: "BW_CV_Quantum.pdf", date: "2024-06-01" }],
        associatedJobId: 202,
        aiMatch: 88
    }
];