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
} from '@mantine/core';
import { IconCalendar, IconTrophy } from '@tabler/icons-react';

import { useNavigate } from 'react-router-dom';

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

  const totalStreak = yourStreak + partnerStreak || 1; // prevent divide-by-zero
  const yourPercent = (yourStreak / totalStreak) * 100;
  const partnerPercent = 100 - yourPercent;

  return (
    <Card withBorder radius="md" p="lg" shadow="sm">
      {/* Header */}
      <Group justify="space-between" mb="md">
        <Group>
          <Avatar radius="xl" />
          <Stack gap={0}>
            <Text fw={600}>Pact with {partnerName}</Text>
            <Group gap={4} c="dimmed">
              <IconCalendar size={14} />
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
        <Text size="xs" fw={500}>
          Last 7 Days
        </Text>
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
        <Button size="xs" variant="subtle" onClick={() => navigate('/history')}>Show History</Button>
        <Button size="xs" variant="light" color="grape" onClick={() => navigate('/checkin')}>
          Check In
        </Button>
        <Button
          size="xs"
          color="red"
          variant="outline"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this pact?")) {
              onDelete(id);
            }
          }}
        >
          Delete
        </Button>
      </Group>

    </Card>
  );
};

export default PactCard;
