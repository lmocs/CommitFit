import {
	Avatar,
	Badge,
	Box,
	Button,
	Card,
	Collapse,
	Flex,
	Group,
	Progress,
	Stack,
	Text,
	Tooltip,
	Loader,
	Table,
} from '@mantine/core';
import { IconCalendar, IconTrophy } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { submitCheckin, getCheckinStatus, getLast7DaysCheckins } from '../lib/api/checkin';
import { useWallet } from '../context/WalletContext';
import dayjs from 'dayjs';

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
	const { walletAddress } = useWallet();
	const [checkedIn, setCheckedIn] = useState(false);
	const [checkingIn, setCheckingIn] = useState(false);
	const [loadingStatus, setLoadingStatus] = useState(true);
	const [expanded, setExpanded] = useState(false);
	const [history, setHistory] = useState<any[]>([]);
	const [loadingHistory, setLoadingHistory] = useState(false);

	const totalStreak = yourStreak + partnerStreak || 1;
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

					if (result.is_valid || result.alreadyCheckedIn) {
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

	const toggleHistory = async () => {
		setExpanded((prev) => !prev);
		if (!expanded && history.length === 0) {
			setLoadingHistory(true);
			try {
				const data = await getLast7DaysCheckins(id);
				setHistory(data);
			} catch (err) {
				console.error('Failed to fetch history:', err);
			} finally {
				setLoadingHistory(false);
			}
		}
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
							<IconCalendar size={12} />
							<Text size="xs">
								{dayjs(startDate).format('MMMM D, YYYY')} – {dayjs(endDate).format('MMMM D, YYYY')}
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
				<Button size="xs" variant="subtle" onClick={toggleHistory}>
					{expanded ? 'Hide History' : 'Show History'}
				</Button>
				<Group>
					<Button
						size="xs"
						variant="light"
						color={checkedIn ? 'gray' : 'grape'}
						disabled={checkedIn || checkingIn || loadingStatus}
						onClick={handleCheckin}
					>
						{checkingIn || loadingStatus ? <Loader size="xs" /> : checkedIn ? '✅ Checked In!' : 'Check In'}
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

			{/* History Drop-down */}
			<Collapse in={expanded} mt="md">
				{loadingHistory ? (
					<Loader size="sm" />
				) : (
					<Table striped withTableBorder mt="sm">
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Date</Table.Th>
								<Table.Th>You</Table.Th>
								<Table.Th>{partnerName}</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{history
								.filter((entry) =>
									dayjs(entry.date).isSame(dayjs(startDate), 'day') ||
									dayjs(entry.date).isAfter(dayjs(startDate), 'day')
								)
								.map((entry) => (
									<Table.Tr key={entry.date}>
										<Table.Td>{dayjs(entry.date).format('MMM D')}</Table.Td>
										<Table.Td>
											{entry.user1?.wallet_address === walletAddress || !entry.user1
												? entry.user1?.is_valid ? '✅' : '❌'
												: entry.user2?.is_valid ? '✅' : '❌'}
										</Table.Td>
										<Table.Td>
											{entry.user1?.wallet_address === walletAddress || !entry.user2
												? entry.user2?.is_valid ? '✅' : '❌'
												: entry.user1?.is_valid ? '✅' : '❌'}
										</Table.Td>
									</Table.Tr>
								))}
						</Table.Tbody>
					</Table>
				)}
			</Collapse>
		</Card>
	);
};

export default PactCard;
