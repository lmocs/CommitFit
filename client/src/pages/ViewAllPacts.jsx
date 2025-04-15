import { useState } from 'react';
import { getGyms } from '../lib/api/pacts.js';
import PactTable from '../components/PactTable.jsx';

const ViewAllPacts = () => {
  const [pacts, setPacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPacts = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getGyms();
      setPacts(data);
    } catch (err) {
      setError("Failed to load pacts.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>View All Pacts</h2>
      <button onClick={fetchPacts}>Load Pacts</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <PactTable pacts={pacts} />
    </div>
  );
};

export default ViewAllPacts;

