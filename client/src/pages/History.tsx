import { Container, Table, Title, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { getPactsByUser } from '../lib/api/pact';
import BackToDashboard from '../components/BackToDashboard';

const History = () => {
  const { walletAddress } = useWallet();
  const [pacts, setPacts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPacts = async () => {
      if (!walletAddress) return;
      try {
        const data = await getPactsByUser(walletAddress);
        setPacts(data);
      } catch (err) {
        console.error('Failed to load pacts:', err);
      }
    };
    fetchPacts();
  }, [walletAddress]);

  const rows = pacts.map((pact) => (
    <Table.Tr key={pact.id}>
      <Table.Td>{pact.user1_name ?? pact.user1_id}</Table.Td>
      <Table.Td>{pact.user2_name ?? pact.user2_id}</Table.Td>
      <Table.Td>{pact.start_date}</Table.Td>
      <Table.Td>{pact.end_date}</Table.Td>
      <Table.Td>{pact.stake_amount} ETH</Table.Td>
      <Table.Td>{pact.status}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="lg" mt="xl">
      <BackToDashboard />
      <Title order={2} mb="md">📁 All Pacts</Title>
      <Text size="sm" mb="md" c="dimmed">
        Review your active and completed accountability pacts.
      </Text>

      <Table striped withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>User 1</Table.Th>
            <Table.Th>User 2</Table.Th>
            <Table.Th>Start</Table.Th>
            <Table.Th>End</Table.Th>
            <Table.Th>Pot</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Container>
  );
};

export default History;
