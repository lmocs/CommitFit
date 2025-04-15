import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButtons from './IconButton';

function createData(buddyName, startDate, endDate, daysRemaining, stakeAmount, currentEarnings) {
	return {
		buddyName,
		startDate,
		endDate,
		daysRemaining,
		stakeAmount,
		currentEarnings,
		history: [
			{
				date: '2025-04-14',
				gymName: 'The Arc',
				checkInTime: '06:45:00',
				buddyCheckInTime: 'Did Not Check-In',
			},
			{
				date: '2025-04-15',
				gymName: 'Planet Fitness',
				checkInTime: '18:30:00',
				buddyCheckInTime: '15:15:00',
			},
			{
				date: '2025-04-16',
				gymName: 'Crunch Fitness',
				checkInTime: 'Did Not Check-in',
				buddyCheckInTime: '12:00:00',
			},
		],
	};
}

function Row(props) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);

	return (
		<>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row.buddyName}
				</TableCell>
				<TableCell align="right">{row.startDate}</TableCell>
				<TableCell align="right">{row.endDate}</TableCell>
				<TableCell align="right">{row.daysRemaining}</TableCell>
				<TableCell align="right">{row.stakeAmount}</TableCell>
				<TableCell align="right">{row.currentEarnings}</TableCell>
				<TableCell>
					<IconButtons size="small" />
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div">
								History
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>Date</TableCell>
										<TableCell>Gym Location</TableCell>
										<TableCell align="right">Time of Your Check-in</TableCell>
										<TableCell align="right">Time of Buddy Check-in</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.history.map((historyRow) => (
										<TableRow key={historyRow.date}>
											<TableCell component="th" scope="row">
												{historyRow.date}
											</TableCell>
											<TableCell>{historyRow.gymName}</TableCell>
											<TableCell align="right">{historyRow.checkInTime}</TableCell>
											<TableCell align="right">{historyRow.buddyCheckInTime}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}

Row.propTypes = {
	row: PropTypes.shape({
		buddyName: PropTypes.string.isRequired,
		startDate: PropTypes.string.isRequired,
		endDate: PropTypes.string.isRequired,
		daysRemaining: PropTypes.string.isRequired,
		stakeAmount: PropTypes.number.isRequired,
		currentEarnings: PropTypes.number.isRequired,
		history: PropTypes.arrayOf(
			PropTypes.shape({
				date: PropTypes.string.isRequired,
				gymName: PropTypes.string.isRequired,
				checkInTime: PropTypes.string.isRequired,
				buddyCheckInTime: PropTypes.string.isRequired,
			}),
		).isRequired,
	}).isRequired,
};

const rows = [
	createData('Byron', '2025-04-14', '2025-05-14', '3/30', 30, 3),
	createData('Logan', '2025-06-28', '2025-07-28', '15/30', 100, 30)
];

export default function CollapsibleTable() {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell />
						<TableCell>Pact Buddy</TableCell>
						<TableCell align="right">Start Date</TableCell>
						<TableCell align="right">End Date</TableCell>
						<TableCell align="right">Days Remaining</TableCell>
						<TableCell align="right">Stake Amount&nbsp;(ETH)</TableCell>
						<TableCell align="right">Current Earnings&nbsp;(ETH)</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<Row key={row.name} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

