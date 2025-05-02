import {
  Container,
  Flex,
  Stack,
  Text,
  Card,
  Button,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import PactCard from '../components/PactCard';
import { useWallet } from '../context/WalletContext';
import { getPactsByUser } from '../lib/api/pact';

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
                  partnerName={partnerName}
                  startDate={pact.start_date}
                  endDate={pact.end_date}
                  pot={pact.stake_amount}
                  yourStreak={0}
                  partnerStreak={0}
                  yourCheckins={[]} // for now
                  partnerCheckins={[]} // for now
                />
              );
            })
          ) : (
            <Text>No pacts found yet.</Text>
          )}
        </Stack>

        {/* Right Column */}
        <Stack w="33%">
          <Card withBorder p="lg">
            <Text>➕ Create a Pact</Text>
            <Text size="xs" c="dimmed" mt={4}>
              Start a new accountability pact with ETH stakes.
            </Text>
            <Button fullWidth mt="sm" color="grape" onClick={() => navigate('/create')}>
              Start New Pact
            </Button>
          </Card>

          {/* Other Cards (History, Gym, Notifications) can go here */}
        </Stack>
      </Flex>
    </Container>
  );
};

export default Dashboard;
