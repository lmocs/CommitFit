import {
  Container,
  Text,
  TextInput,
  NumberInput,
  Button,
  Stack,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { useNavigate } from 'react-router-dom';
import { createPact } from '../lib/api/pact';

const CreatePact = () => {
  const { walletAddress } = useWallet();
  const navigate = useNavigate();

  const [partnerAddress, setPartnerAddress] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [stakeAmount, setStakeAmount] = useState<number | undefined>(undefined);

  const handleSubmit = async () => {
    if (!walletAddress || !partnerAddress || !startDate || !endDate || !stakeAmount) return;

    try {
      await createPact({
        user1_id: walletAddress,
        user2_id: partnerAddress,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        stake_amount: stakeAmount,
        contract_address: '0x', // placeholder for now
      });

      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to create pact:', err);
    }
  };

  return (
    <Container size="sm" mt="xl">
      <Text size="xl" fw={700} mb="md">Create a New Pact</Text>
      <Stack>
        <TextInput
          label="Partner Wallet Address"
          placeholder="0xABC..."
          value={partnerAddress}
          onChange={(e) => setPartnerAddress(e.currentTarget.value)}
          required
        />

        <DatePickerInput
          label="Start Date"
          value={startDate}
          onChange={setStartDate}
          required
        />

        <DatePickerInput
          label="End Date"
          value={endDate}
          onChange={setEndDate}
          required
        />

        <NumberInput
          label="Stake Amount (ETH)"
          value={stakeAmount}
          onChange={(value) => typeof value === 'number' && setStakeAmount(value)}
          min={0}
          required
        />

        <Button mt="md" onClick={handleSubmit} color="grape">
          Create Pact
        </Button>
      </Stack>
    </Container>
  );
};

export default CreatePact;
