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
import dayjs from 'dayjs';
import { useWallet } from '../context/WalletContext';
import { useNavigate } from 'react-router-dom';
import { createPact } from '../lib/api/pact';
import BackToDashboard from '../components/BackToDashboard';

const CreatePact = () => {
  const { walletAddress } = useWallet();
  const navigate = useNavigate();

  const [partnerAddress, setPartnerAddress] = useState('');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [stakeAmount, setStakeAmount] = useState<number | undefined>(undefined);

  const [startDate, endDate] = dateRange;

  const handleSubmit = async () => {
    if (!walletAddress || !partnerAddress || !startDate || !endDate || !stakeAmount) return;

    try {
      await createPact({
        user1_id: walletAddress,
        user2_id: partnerAddress,
        start_date: dayjs(startDate).format('YYYY-MM-DD'),
        end_date: dayjs(endDate).format('YYYY-MM-DD'),
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
      <BackToDashboard />
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
          type="range"
          label="Select date range"
          minDate={new Date()}
          value={dateRange}
          onChange={setDateRange}
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
