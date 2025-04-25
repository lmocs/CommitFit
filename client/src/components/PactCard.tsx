import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Progress,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { IconCalendar, IconTrophy } from '@tabler/icons-react';

type CheckinStatus = 'success' | 'fail' | 'none';

interface PactCardProps {
  partnerName: string;
  startDate: string;
  endDate: string;
  yourStreak: number;
  partnerStreak: number;
  pot: number;
  yourCheckins: CheckinStatus[];
  partnerCheckins: CheckinStatus[];
}

const CheckinDot = ({ status }: { status: CheckinStatus }) => {
  const color = status === 'success' ? 'green' : status === 'fail' ? 'red' : 'gray';
  return <Box w={12} h={12} bg={color} style={{ borderRadius: '50%' }} />;
};

const PactCard = ({
  partnerName,
  startDate,
  endDate,
  yourStreak,
  partnerStreak,
  pot,
  yourCheckins,
  partnerCheckins,
}: PactCardProps) => {
  const totalStreak = yourStreak + partnerStreak;
  const yourPercent = (yourStreak / totalStreak) * 100;
  const partnerPercent = 100 - yourPercent;

  return (
    <Card withBorder radius="md" p="lg" shadow="sm">
      {/* Header */}
      <Group position="apart" mb="md">
        <Group>
          <Avatar radius="xl" />
          <Stack spacing={0}>
            <Text weight={600}>Pact with {partnerName}</Text>
            <Group spacing={4} c="dimmed">
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
      <Stack spacing={4} mb="sm">
        <Group spacing={4}>
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
      <Stack spacing="xs" mt="md">
        <Text size="xs" weight={500}>
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
      <Group mt="lg" position="apart">
        <Text size="xs" variant="link">
          Show History
        </Text>
        <Button size="xs" variant="light" color="grape">
          Check In
        </Button>
      </Group>
    </Card>
  );
};

export default PactCard;

