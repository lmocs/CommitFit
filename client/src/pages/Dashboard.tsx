import { Container, Flex, Stack, Text, Card, Button } from '@mantine/core';
import PactCard from '../components/PactCard';

const Dashboard = () => {
  return (
    <Container size="lg" mt="xl">
      <Text size="xl" fw={700}>Welcome, Alex Johnson!</Text>
      <Text size="sm" c="dimmed" p={20}>🔥 12 Day Streak • 💎 1.45 ETH Earned</Text>

      <Flex gap="xl" align="flex-start">
        {/* Left Column */}
        <Stack w="70%">
          <PactCard
            partnerName="Jamie Smith"
            startDate="Mar 1, 2025"
            endDate="Apr 1, 2025"
            pot={1}
            yourStreak={6}
            partnerStreak={5}
            yourCheckins={['success', 'success', 'fail', 'success', 'success', 'success', 'success']}
            partnerCheckins={['success', 'success', 'fail', 'fail', 'success', 'success', 'success']}
          />

          <PactCard
            partnerName="Taylor Wong"
            startDate="Mar 10, 2025"
            endDate="Apr 10, 2025"
            pot={1.5}
            yourStreak={5}
            partnerStreak={5}
            yourCheckins={['success', 'success', 'fail', 'success', 'success', 'fail', 'success']}
            partnerCheckins={['success', 'success', 'success', 'success', 'fail', 'success', 'success']}
          />
        </Stack>

        {/* Right Column */}
        <Stack w="33%">
          <Card withBorder p="lg">
            <Text >➕ Create a Pact</Text>
            <Text size="xs" c="dimmed" mt={4}>Start a new accountability pact with ETH stakes.</Text>
            <Button fullWidth mt="sm" color="grape">Start New Pact</Button>
          </Card>

          <Card withBorder p="lg">
            <Text >⏱ View All Pacts</Text>
            <Text size="xs" c="dimmed" mt={4}>See your pact history and stats.</Text>
            <Button fullWidth mt="sm" variant="light">View History</Button>
          </Card>

          <Card withBorder p="lg">
            <Text >📍 Add Gym</Text>
            <Text size="xs" c="dimmed" mt={4}>Use the map to set your gym location.</Text>
            <Button fullWidth mt="sm" variant="outline" color="green">Find My Gym</Button>
          </Card>

          <Card withBorder p="lg">
            <Text >📍 View Notifications</Text>
            <Text size="xs" c="dimmed" mt={4}>See pact requests and reminders.</Text>
            <Button fullWidth mt="sm" variant="outline" color="green">View Notifications</Button>
          </Card>
        </Stack>
      </Flex>
    </Container>
  );
};

export default Dashboard;

