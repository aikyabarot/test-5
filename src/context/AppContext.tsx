import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AppContextType, User, Client, Job, Candidate, Person, CandidateProfile, ClientContact } from '../types';

import { MOCK_USERS_DB } from '../data/users';
import { MOCK_CANDIDATES_DB } from '../data/candidates';
import { MOCK_CLIENTS_DB } from '../data/clients';
import { MOCK_JOBS_DB } from '../data/jobs';
import { MOCK_PEOPLE_DB } from '../data/people';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [activeUser, setActiveUser] = useState<User | null>(null);
    const [currentPage, setCurrentPage] = useState<string>('dashboard');
    const [pageContext, setPageContext] = useState<any>(null);
    const [isCandidateModalOpen, setCandidateModalOpen] = useState(false);
    const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Data state
    const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS_DB);
    const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS_DB);
    const [candidates, setCandidates] = useState<Candidate[]>(MOCK_CANDIDATES_DB);
    const [people, setPeople] = useState<Person[]>(MOCK_PEOPLE_DB);


    const login = (email: string) => {
        const user = MOCK_USERS_DB.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (user) {
            setActiveUser(user);
            navigate('dashboard');
        } else {
            alert('User not found!');
        }
    };

    const logout = () => {
        setActiveUser(null);
        setCurrentPage('login');
    };

    const navigate = (page: string, context: any = null) => {
        setCurrentPage(page);
        setPageContext(context);
    };

    const openCandidateModal = (candidateId: number) => {
        setSelectedCandidateId(candidateId);
        setCandidateModalOpen(true);
    };

    const closeCandidateModal = () => {
        setCandidateModalOpen(false);
        setSelectedCandidateId(null);
    };

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3000);
    };
    
    const addClientContact = (clientId: number, newContact: Omit<ClientContact, 'contactId' | 'personId'>) => {
        const newPersonId = Math.max(...people.map(p => p.personId), 0) + 1;
        const newPerson: Person = { personId: newPersonId, name: newContact.name };
        setPeople([...people, newPerson]);

        const newContactId = Math.max(...clients.flatMap(c => c.contacts.map(ct => ct.contactId)), 0) + 1;
        const contactToAdd: ClientContact = { ...newContact, contactId: newContactId, personId: newPersonId };

        const updatedClients = clients.map(client => {
            if (client.id === clientId) {
                return { ...client, contacts: [...client.contacts, contactToAdd] };
            }
            return client;
        });
        setClients(updatedClients);
        showToast("Contact added successfully!");
    };

    const getCandidateProfile = (candidateId: number): CandidateProfile | undefined => {
        const candidate = candidates.find(c => c.id === candidateId);
        if (!candidate) return undefined;
        const job = jobs.find(j => j.id === candidate.associatedJobId);
        if (!job) return undefined;

        return { ...candidate, job };
    };

    const getClient = (clientId: number) => clients.find(c => c.id === clientId);
    const getJobsForClient = (clientId: number) => jobs.filter(j => j.clientId === clientId);
    const getOpenJobsCount = () => jobs.filter(j => j.status === 'Open').length;
    const getJobs = () => jobs;
    const getClients = () => clients;
    const getPeople = () => people;


    const value = {
        activeUser,
        currentPage,
        pageContext,
        isCandidateModalOpen,
        selectedCandidateId,
        toastMessage,
        login,
        logout,
        navigate,
        openCandidateModal,
        closeCandidateModal,
        showToast,
        addClientContact,
        getCandidateProfile,
        getClient,
        getJobsForClient,
        getOpenJobsCount,
        getJobs,
        getClients,
        getPeople
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppData = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppData must be used within an AppProvider');
    }
    return context;
};