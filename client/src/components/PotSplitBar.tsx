import { Group, Progress, Stack, Text } from '@mantine/core';

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
  const total = yourCheckins + partnerCheckins;
  const base = total || 1;

  let yourPercent = (yourCheckins / base) * 100;
  let partnerPercent = 100 - yourPercent;

  if (yourPercent === 0 && yourCheckins === 0) yourPercent = 0.1;
  if (partnerPercent === 0 && partnerCheckins === 0) partnerPercent = 0.1;

  const yourAmount = (totalPot * yourPercent) / 100;
  const partnerAmount = totalPot - yourAmount;

  return (
    <Stack gap={4} mt="sm">
      <Group gap={6}>
        <Text size="sm" fw={500}>🏆 Potential Winnings</Text>
      </Group>

      <Progress
        sections={[
          { value: yourPercent, color: 'grape', label: `${yourPercent.toFixed(0)}% ${youLabel}` },
          { value: partnerPercent, color: 'blue', label: `${partnerPercent.toFixed(0)}% ${partnerLabel}` },
        ]}
        radius="xl"
        size="lg"
        style={{ width: '100%' }}
      />

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
