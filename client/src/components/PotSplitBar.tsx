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

  const pot = Number(totalPot); // Make sure it's a number
  const total = yourCheckins + partnerCheckins;
  const base = total || 1;

  let yourPercent = (yourCheckins / base) * 100;
  let partnerPercent = 100 - yourPercent;

  console.log('yourPercent 1', yourPercent);

  if (!Number.isFinite(yourPercent)) yourPercent = 0;
  if (!Number.isFinite(partnerPercent)) partnerPercent = 0;

  console.log('yourPercent 2', yourPercent);

  if (yourPercent === 0 && yourCheckins === 0) yourPercent = 0.1;
  if (partnerPercent === 0 && partnerCheckins === 0) partnerPercent = 0.1;

  console.log('yourPercent 3', yourPercent);

  const yourAmount = (pot * yourPercent) / 100;
  const partnerAmount = pot - yourAmount;

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
