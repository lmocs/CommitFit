import {
  Container,
  Text,
  TextInput,
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
import { CurrencyInput } from '../components/CurrencyInput';

const CreatePact = () => {
  const { walletAddress } = useWallet();
  const navigate = useNavigate();

  const [partnerAddress, setPartnerAddress] = useState('');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [stakeAmount, setStakeAmount] = useState<number | ''>('');
  const [currency, setCurrency] = useState('ETH');

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
        currency: currency,
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

        <CurrencyInput
          value={stakeAmount}
          onChange={setStakeAmount}
          currency={currency}
          setCurrency={setCurrency}
        />

        <Button mt="md" onClick={handleSubmit} color="grape">
          Create Pact
        </Button>
      </Stack>
    </Container>
  );
};

export default CreatePact;
