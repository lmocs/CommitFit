import PactForm from '../components/PactForm.jsx';
import { createPact } from '../lib/api/pacts.js';

const CreatePact = () => {
  const handlePactSubmit = async (data) => {
    try {
      const response = await createPact(data);
      console.log('Pact created:', response);
      alert('Pact created successfully!');
    } catch (err) {
      console.error('CreatePact error: ', err);
      alert('Failed to create pact.');
    }
  };

  return (
    <div>
      <h2>Create a Pact</h2>
      <PactForm onSubmit={handlePactSubmit} />
    </div>
  );
};

export default CreatePact;
