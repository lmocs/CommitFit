import { Card, Text, Button, Stack } from '@mantine/core';
import { ReactNode } from 'react';

interface DashboardActionCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  buttonLabel: string;
  buttonColor?: string;
  onClick: () => void;
}

const DashboardActionCard = ({
  icon,
  title,
  description,
  buttonLabel,
  buttonColor = 'blue',
  onClick,
}: DashboardActionCardProps) => {
  return (
    <Card withBorder p="lg">
      <Stack spacing="xs">
        <Text>{icon} {title}</Text>
        <Text size="xs" c="dimmed">
          {description}
        </Text>
        <Button fullWidth mt="sm" color={buttonColor} onClick={onClick}>
          {buttonLabel}
        </Button>
      </Stack>
    </Card>
  );
};

export default DashboardActionCard;
