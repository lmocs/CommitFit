import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Progress,
  Stack,
  Text,
  Tooltip,
  Loader,
} from '@mantine/core';
import { IconCalendar, IconTrophy } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { submitCheckin, getCheckinStatus } from '../lib/api/checkin';
import { useWallet } from '../context/WalletContext';

type CheckinStatus = 'success' | 'fail' | 'none';

interface PactCardProps {
  id: number;
  partnerName: string;
  startDate: string;
  endDate: string;
  yourStreak: number;
  partnerStreak: number;
  pot: number;
  yourCheckins: CheckinStatus[];
  partnerCheckins: CheckinStatus[];
  onDelete: (id: number) => void;
}

const CheckinDot = ({ status }: { status: CheckinStatus }) => {
  const color = status === 'success' ? 'green' : status === 'fail' ? 'red' : 'gray';
  return <Box w={12} h={12} bg={color} style={{ borderRadius: '50%' }} />;
};

const PactCard = ({
  id,
  partnerName,
  startDate,
  endDate,
  yourStreak,
  partnerStreak,
  pot,
  yourCheckins,
  partnerCheckins,
  onDelete,
}: PactCardProps) => {
  const navigate = useNavigate();
  const { walletAddress } = useWallet();
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkingIn, setCheckingIn] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true);

  const totalStreak = yourStreak + partnerStreak || 1; // prevent divide-by-zero
  const yourPercent = (yourStreak / totalStreak) * 100;
  const partnerPercent = 100 - yourPercent;

  useEffect(() => {
    const checkStatus = async () => {
      if (!walletAddress) return;
      try {
        const result = await getCheckinStatus(walletAddress, id);
        setCheckedIn(result.checkedIn);
      } catch (err) {
        console.error('Failed to fetch check-in status:', err);
      } finally {
        setLoadingStatus(false); // ✅ mark as loaded
      }
    };
    checkStatus();
  }, [walletAddress, id]);

  const handleCheckin = () => {
    if (!navigator.geolocation || !walletAddress) return;
    setCheckingIn(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const result = await submitCheckin({
            wallet_address: walletAddress,
            pact_id: id,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });

          if (result.alreadyCheckedIn) {
            setCheckedIn(result.is_valid);
            alert('Already checked in today!');
          } else if (result.is_valid) {
            setCheckedIn(true);
          } else {
            alert('You must be within 100m of your registered gym to check in.');
          }
        } catch (err: any) {
          alert(err.message);
        } finally {
          setCheckingIn(false);
        }
      },
      (err) => {
        alert('Failed to get location');
        console.error('Check in error: ', err);
        setCheckingIn(false);
      }
    );
  };

  return (
    <Card withBorder radius="md" p="lg" shadow="sm">
      {/* Header */}
      <Group justify="space-between" mb="md">
        <Group>
          <Avatar radius="xl" />
          <Stack gap={0}>
            <Text fw={600}>Pact with {partnerName}</Text>
            <Group gap={4} c="dimmed">
              <IconCalendar size={8} />
              <Text size="xs">
                {startDate} – {endDate}
              </Text>
            </Group>
          </Stack>
        </Group>
        <Badge variant="filled" color="grape">{pot} ETH Pot</Badge>
      </Group>

      {/* Progress Winnings */}
      <Stack gap={4} mb="sm">
        <Group gap={4}>
          <IconTrophy size={14} />
          <Text size="sm">Potential Winnings</Text>
        </Group>
        <Progress
          sections={[
            { value: yourPercent, color: 'grape', label: `${yourPercent.toFixed(0)}% You` },
            { value: partnerPercent, color: 'blue', label: `${partnerPercent.toFixed(0)}% ${partnerName}` },
          ]}
          radius="xl"
          size="lg"
        />
      </Stack>

      {/* Last 7 Days Check-ins */}
      <Stack gap="xs" mt="md">
        <Text size="xs" fw={500}>Last 7 Days</Text>
        <Flex justify="space-between">
          {yourCheckins.map((status, i) => (
            <Tooltip key={i} label="You">
              <CheckinDot status={status} />
            </Tooltip>
          ))}
        </Flex>
        <Flex justify="space-between">
          {partnerCheckins.map((status, i) => (
            <Tooltip key={i} label={partnerName}>
              <CheckinDot status={status} />
            </Tooltip>
          ))}
        </Flex>
      </Stack>

      {/* Actions */}
      <Group mt="lg" justify="space-between">
        <Button size="xs" variant="subtle" onClick={() => navigate('/history')}>
          Show History
        </Button>
        <Group>
          <Button
            size="xs"
            variant="light"
            color={checkedIn ? 'gray' : 'grape'}
            disabled={checkedIn || checkingIn || loadingStatus}
            onClick={handleCheckin}
          >
            {checkingIn || loadingStatus ? (
              <Loader size="xs" />
            ) : checkedIn ? '✅ Checked In!' : 'Check In'}
          </Button>
          <Button
            size="xs"
            variant="subtle"
            color="red"
            onClick={() => {
              if (confirm('Are you sure you want to delete this pact?')) {
                onDelete(id);
              }
            }}
          >
            Delete
          </Button>
        </Group>
      </Group>
    </Card>
  );
};

export default PactCard;
