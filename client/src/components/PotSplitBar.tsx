import { Box, Group, Flex, Stack, Text, Tooltip } from '@mantine/core';

interface PotSplitBarProps {
  youLabel: string;
  partnerLabel: string;
  yourCheckins: number;
  partnerCheckins: number;
  totalPot: number;
  currency: string;
}

export const PotSplitBar = ({
  youLabel,
  partnerLabel,
  yourCheckins,
  partnerCheckins,
  totalPot,
  currency,
}: PotSplitBarProps) => {

  totalPot = Number(totalPot);
  const total = yourCheckins + partnerCheckins;
  const base = total || 1;

  const showEqual = yourCheckins === 0 && partnerCheckins === 0;

  const yourPercent = showEqual ? 50 : (yourCheckins / base) * 100;
  const partnerPercent = 100 - yourPercent;

  const yourAmount = (totalPot * yourPercent) / 100;
  const partnerAmount = totalPot - yourAmount;

  return (
    <Stack gap={4} mt="sm">
      <Group gap={6}>
        <Text size="sm" fw={500}>🏆 Potential Winnings</Text>
      </Group>

      <Flex w="100%" h={16} radius="xl" bg="gray.1" style={{ overflow: 'hidden', borderRadius: 999 }}>
        <Box
          w={`${yourPercent}%`}
          h="100%"
          bg="grape.5"
          title={`${yourPercent.toFixed(0)}% ${youLabel}`}
        />
        <Box
          w={`${partnerPercent}%`}
          h="100%"
          bg="blue.5"
          title={`${partnerPercent.toFixed(0)}% ${partnerLabel}`}
        />
      </Flex>

      <Group justify="space-between" mt={4}>
        <Text size="xs" c="dimmed">
          {youLabel}: {yourAmount.toFixed(2)} {currency}
        </Text>
        <Text size="xs" c="dimmed">
          {partnerLabel}: {partnerAmount.toFixed(2)} {currency}
        </Text>
      </Group>
    </Stack>
  );
};
