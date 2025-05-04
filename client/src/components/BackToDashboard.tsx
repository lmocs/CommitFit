import { Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

const BackToDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/dashboard') return null;

  return (
    <div style={{
      position: 'fixed',
      top: 16,
      left: 16,
      zIndex: 1000
    }}>
      <Button
        variant="light"
        size="sm"
        color="grape"
        leftSection={<IconArrowLeft size={14} />}
        onClick={() => navigate('/dashboard')}
      >
        Dashboard
      </Button>
    </div>
  );
};

export default BackToDashboard;
