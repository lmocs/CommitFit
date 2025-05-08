import {
  Container,
  Text,
  Button,
  Stack,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import dayjs from 'dayjs';

import { useWallet } from '../context/WalletContext';
import { useNavigate } from 'react-router-dom';
import { createPact } from '../lib/api/pact';
import BackToDashboard from '../components/BackToDashboard';
import { CurrencyInput } from '../components/CurrencyInput';
import { PartnerAutocomplete } from '../components/PartnerAutocomplete';

const CreatePact = () => {
  const { walletAddress } = useWallet();
  const navigate = useNavigate();

  const [partner, setPartner] = useState('');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [stakeAmount, setStakeAmount] = useState<number | ''>('');
  const [currency, setCurrency] = useState('ETH');

  const [startDate, endDate] = dateRange;

  const handleSubmit = async () => {
    const match = partner.match(/\((0x[a-fA-F0-9]{1,40})\)$/);
    const partnerAddress = match ? match[1] : '';

    if (!walletAddress || !partnerAddress || !startDate || !endDate || !stakeAmount) {
      notifications.show({
        title: 'Missing Information',
        message: 'Please fill in all required fields before submitting.',
        color: 'red',
      });
      return;
    }

    try {
      notifications.show({
        id: 'create-pact',
        loading: true,
        title: 'Creating Pact...',
        message: 'Deploying smart contract onchain. Please wait.',
        autoClose: false,
        withCloseButton: false,
      });

      const result = await createPact({
        user1_id: walletAddress,
        user2_id: partnerAddress,
        start_date: dayjs(startDate).format('YYYY-MM-DD'),
        end_date: dayjs(endDate).format('YYYY-MM-DD'),
        stake_amount: stakeAmount,
        currency: currency,
        contract_address: '0x', // Backend overwrites this placeholder
      });

      notifications.update({
        id: 'create-pact',
        color: 'green',
        title: '✅ Pact Created!',
        message: `Contract deployed to ${result.contract_address}`,
        icon: <IconCheck size={16} />,
        autoClose: 5000,
      });

      navigate('/dashboard');
    } catch (err) {
      notifications.update({
        id: 'create-pact',
        color: 'red',
        title: '❌ Pact creation failed',
        message: 'Something went wrong while deploying your pact contract.',
        icon: null,
        autoClose: 5000,
      });
      console.error('Failed to create pact:', err);
    }
  };

  return (
    <Container size="sm" mt="xl">
      <BackToDashboard />
      <Text size="xl" fw={700} mb="md">Create a New Pact</Text>
      <Stack>
        <PartnerAutocomplete
          value={partner}
          onChange={setPartner}
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
