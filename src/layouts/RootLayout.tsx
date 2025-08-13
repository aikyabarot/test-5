import type { User } from '../types';
import { useAppData } from '../context/AppContext';
import { DashboardIcon, ClientsIcon, JobsIcon, LogoutIcon } from '../assets/icons';
import DashboardPage from '../pages/DashboardPage';
import ClientsListPage from '../pages/ClientsListPage';
import ClientDetailPage from '../pages/ClientDetailPage';
import CandidateProfileModal from '../components/CandidateProfileModal';
import Toast from '../components/Toast';

const buxtonLogoDataUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAFeCAYAAABq9yC3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGgAAP+lSURBVHhe7J0FnFRl+8/vN6203k26kLQ[...]";

interface RootLayoutProps {
    user: User;
    onLogout: () => void;
}

const RootLayout: React.FC<RootLayoutProps> = ({ user, onLogout }) => {
    const { 
        currentPage, 
        navigate, 
        pageContext, 
        isCandidateModalOpen, 
        closeCandidateModal,
        selectedCandidateId,
        getCandidateProfile,
        toastMessage,
        openCandidateModal
    } = useAppData();

    const renderPage = () => {
        switch (currentPage) {
            case 'clients':
                return <ClientsListPage user={user} onNavigate={navigate} onOpenCandidate={() => {}} />;
            case 'clientDetail':
                return <ClientDetailPage user={user} onNavigate={navigate} onOpenCandidate={openCandidateModal} context={pageContext} />;
            case 'dashboard':
            default:
                return <DashboardPage user={user} onNavigate={navigate} onOpenCandidate={openCandidateModal} />;
        }
    };

    const candidateProfile = selectedCandidateId ? getCandidateProfile(selectedCandidateId) : undefined;

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="h-16 flex items-center justify-center">
                   <img src={buxtonLogoDataUrl} alt="Buxton Logo" className="h-10"/>
                </div>
                <nav className="flex-1 px-2 py-4 space-y-2">
                    <button
                      onClick={() => navigate('dashboard')}
                      className={`flex items-center px-4 py-2 rounded-md w-full ${currentPage === 'dashboard' ? 'bg-gray-900' : 'hover:bg-gray-700'}`}
                    >
                        <DashboardIcon />
                        <span className="ml-3">Dashboard</span>
                    </button>
                    <button
                      onClick={() => navigate('clients')}
                      className={`flex items-center px-4 py-2 rounded-md w-full ${currentPage.startsWith('client') ? 'bg-gray-900' : 'hover:bg-gray-700'}`}
                    >
                        <ClientsIcon />
                        <span className="ml-3">Clients</span>
                    </button>
                    <button
                      className="flex items-center px-4 py-2 rounded-md w-full hover:bg-gray-700"
                      type="button"
                      disabled
                    >
                        <JobsIcon />
                        <span className="ml-3">Jobs</span>
                    </button>
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.role}</p>
                    <button onClick={onLogout} className="w-full mt-4 text-left flex items-center text-sm text-red-400 hover:text-red-300">
                        <LogoutIcon />
                        <span className="ml-2">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                {renderPage()}
            </main>

            {/* Modals and Toasts */}
            {isCandidateModalOpen && candidateProfile && (
                <CandidateProfileModal 
                    profile={candidateProfile} 
                    onClose={closeCandidateModal} 
                />
            )}
            {toastMessage && <Toast message={toastMessage} />}
        </div>
    );
};

export default RootLayout;