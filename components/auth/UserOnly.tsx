import { checkRole } from '@/utils/roles';
import React, { useState, useEffect, ReactNode } from 'react';

interface AdminOnlyProps {
  children: ReactNode;
}

const UserOnly: React.FC<AdminOnlyProps> = ({ children }) => {
  const [isUser, setIsUser] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const result = await checkRole('admin');
        setIsUser(!result);
      } catch (error) {
        console.error('Error checking admin role:', error);
        setIsUser(true);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAdmin();
  }, []);

  if (isLoading) {
    return <div>...</div>;
  }

  return isUser ? <>{children}</> : null;
};

export default UserOnly;
