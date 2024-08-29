import { checkRole } from '@/utils/roles';
import React, { useState, useEffect, ReactNode } from 'react';

interface AdminOnlyProps {
  children: ReactNode;
}

const AdminOnly: React.FC<AdminOnlyProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const result = await checkRole('admin');
        setIsAdmin(result);
      } catch (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAdmin();
  }, []);

  if (isLoading) {
    return <div>...</div>;
  }

  return isAdmin ? <>{children}</> : null;
};

export default AdminOnly;
