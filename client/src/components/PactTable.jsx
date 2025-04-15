const PactTable = ({ pacts }) => {
	if (!pacts.length) return <p>No pacts found.</p>;

	return (
		<table border="1" cellPadding="8" cellSpacing="0">
			<thead>
				<tr>
					<th>ID</th>
					<th>User 1</th>
					<th>User 2</th>
					<th>Start Date</th>
					<th>End Date</th>
					<th>Stake (ETH)</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				{pacts.map((pact) => (
					<tr key={pact.id}>
						<td>{pact.id}</td>
						<td>{pact.user1_id}</td>
						<td>{pact.user2_id}</td>
						<td>{pact.start_date}</td>
						<td>{pact.end_date}</td>
						<td>{pact.stake_amount}</td>
						<td>{pact.status}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default PactTable;

