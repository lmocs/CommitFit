import {
  Container,
  Flex,
  Stack,
  Text,
  Button,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import PactCard from '../components/PactCard';
import DashboardActionCard from '../components/DashboardActionCard';
import { useWallet } from '../context/WalletContext';
import { getPactsByUser, deletePact } from '../lib/api/pact';

const Dashboard = () => {
  const navigate = useNavigate();
  const { walletAddress, disconnectWallet } = useWallet();
  const [pacts, setPacts] = useState<any[]>([]);

  const handleLogout = () => {
    disconnectWallet();
    navigate('/');
  };

  const fetchPacts = async () => {
    if (!walletAddress) return;
    try {
      const pactsData = await getPactsByUser(walletAddress);
      setPacts(pactsData);
    } catch (err) {
      console.error('Failed to fetch pacts:', err);
    }
  };

  const handleDeletePact = async (id: number) => {
    try {
      await deletePact(id);
      fetchPacts();
    } catch (err) {
      console.error('Failed to delete pact:', err);
    }
  };
  useEffect(() => {
    fetchPacts();
  }, [walletAddress]);

  return (
    <Container size="lg" mt="xl">
      <Text size="xl" fw={700}>
        Welcome to CommitFit 💪
      </Text>
      <Button mt="md" variant="outline" color="red" onClick={handleLogout}>
        Log Out
      </Button>

      <Flex gap="xl" align="flex-start" mt="xl">
        {/* Left Column */}
        <Stack w="70%">
          {pacts.length > 0 ? (
            pacts.map((pact) => {
              const partnerName =
                pact.user1_id === walletAddress
                  ? pact.user2_name || pact.user2_id
                  : pact.user1_name || pact.user1_id;

              return (
                <PactCard
                  key={pact.id}
                  id={pact.id}
                  partnerName={partnerName}
                  startDate={pact.start_date}
                  endDate={pact.end_date}
                  pot={pact.stake_amount}
                  yourStreak={0}
                  partnerStreak={0}
                  yourCheckins={[]}
                  partnerCheckins={[]}
<<<<<<< HEAD
                  onDelete={handleDeletePact}
=======
>>>>>>> 59876e8 (Create `AddGym` functionality and modularize dashboard action cards.)
                />
              );
            })
          ) : (
            <Text>No pacts found yet.</Text>
          )}
        </Stack>

        {/* Right Column */}
        <Stack w="33%">
          <DashboardActionCard
            title="➕ Create a Pact"
            description="Start a new accountability pact with ETH stakes."
            buttonLabel="Start New Pact"
            buttonColor="grape"
            onClick={() => navigate('/create')}
          />

          <DashboardActionCard
            title="📍 Add a Gym"
            description="Search for your gym using Google Maps."
            buttonLabel="Add Gym"
            buttonColor="green"
            onClick={() => navigate('/add-gym')}
          />
        </Stack>
      </Flex>
    </Container>
  );
};

export default Dashboard;
