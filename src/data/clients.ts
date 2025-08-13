import type { Client } from '../types';

export const MOCK_CLIENTS_DB: Client[] = [
  {
    id: 101,
    name: "Innovatech Solutions",
    address: "123 Tech Park, Silicon Valley, CA",
    notes: "Leading AI research firm. High-demand for ML engineers.",
    satisfaction: 95,
    avgTimeToFill: 28,
    contacts: [
      { contactId: 1, personId: 1, position: "Hiring Manager", email: "s.bee@innovatech.com" }
    ]
  },
  {
    id: 102,
    name: "QuantumLeap Dynamics",
    address: "456 Future Drive, Boston, MA",
    notes: "Focus on quantum computing. Requires PhD-level candidates.",
    satisfaction: 88,
    avgTimeToFill: 45,
    contacts: [
      { contactId: 2, personId: 2, position: "Lead Recruiter", email: "d.chen@quantumleap.com" }
    ]
  }
];