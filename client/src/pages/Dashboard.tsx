import { Container, Flex, Stack, Text, Card, Button, Modal, TextInput, NumberInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import PactCard from '../components/PactCard';
import { useWallet } from '../context/WalletContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createPact, getPactsByUser } from '../lib/api/pact';

const Dashboard = () => {
  const { walletAddress, disconnectWallet } = useWallet();
  const navigate = useNavigate();
  const [pacts, setPacts] = useState<any[]>([]);
  const [opened, setOpened] = useState(false);

  // Pact form fields
  const [partnerAddress, setPartnerAddress] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [stakeAmount, setStakeAmount] = useState<number | undefined>(undefined);

  const handleLogout = () => {
    disconnectWallet();
    navigate('/');
  };

  const handleCreatePact = async () => {
    if (!walletAddress || !partnerAddress || !startDate || !endDate || !stakeAmount) return;

    try {
      await createPact({
        user1_id: walletAddress,
        user2_id: partnerAddress,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        stake_amount: stakeAmount,
        contract_address: '0x', // optional placeholder
      });

      // ✅ Re-fetch pacts after successful creation
      await fetchPacts();

      // ✅ Close the modal after data is fetched
      setOpened(false);

      // ✅ Reset form fields if you want clean UX
      setPartnerAddress('');
      setStartDate(null);
      setEndDate(null);
      setStakeAmount(undefined);
    } catch (err) {
      console.error('Failed to create pact:', err);
    }
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
      <Text size="xl" fw={700}>Welcome to CommitFit 💪</Text>
      <Button mt="md" variant="outline" color="red" onClick={handleLogout}>Log Out</Button>

      <Flex gap="xl" align="flex-start" mt="xl">
        {/* Left Column */}
        <Stack w="70%">
          {pacts.length > 0 ? pacts.map((pact) => (
            <PactCard
              key={pact.id}
              partnerName={pact.partner_name || 'Unknown'}
              startDate={pact.start_date}
              endDate={pact.end_date}
              pot={pact.stake_amount}
              yourStreak={0}
              partnerStreak={0}
              yourCheckins={[]} // for now
              partnerCheckins={[]} // for now
            />
          )) : (
            <Text>No pacts found yet.</Text>
          )}
        </Stack>

        {/* Right Column */}
        <Stack w="33%">
          <Card withBorder p="lg">
            <Text>➕ Create a Pact</Text>
            <Text size="xs" c="dimmed" mt={4}>Start a new accountability pact with ETH stakes.</Text>
            <Button fullWidth mt="sm" color="grape" onClick={() => setOpened(true)}>Start New Pact</Button>
          </Card>

          {/* (Other cards like View History, Add Gym, Notifications here) */}
        </Stack>
      </Flex>

      {/* Modal for Create Pact */}
      <Modal opened={opened} onClose={() => setOpened(false)} title="Create a New Pact">
        <Stack>
          <TextInput
            label="Partner Wallet Address"
            placeholder="0xABC..."
            value={partnerAddress}
            onChange={(e) => setPartnerAddress(e.currentTarget.value)}
          />
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={setStartDate}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={setEndDate}
          />
          <NumberInput
            label="Stake Amount (ETH)"
            value={stakeAmount}
            onChange={(value) => setStakeAmount(value ?? undefined)}
            min={0}
          />
          <Button mt="md" onClick={handleCreatePact}>Create Pact</Button>
        </Stack>
      </Modal>
    </Container>
  );
};

export default Dashboard;
