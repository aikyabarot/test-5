import type { PageProps } from '../types';

const DashboardPage: React.FC<PageProps> = ({ user }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome back, {user.name}!</p>
    </div>
  );
};

export default DashboardPage;