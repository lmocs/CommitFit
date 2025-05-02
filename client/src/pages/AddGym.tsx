import {
  Button,
  Container,
  Stack,
  Text,
  Title,
  Loader,
} from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { loadGoogleMapsApi } from '../lib/utils/loadGoogleMaps';
import { addGym } from '../lib/api/gym';

const AddGym = () => {
  const { walletAddress } = useWallet();
  const placeRef = useRef<HTMLDivElement>(null);
  const [gymInfo, setGymInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initAutocomplete = async () => {
      try {
        await loadGoogleMapsApi(import.meta.env.VITE_GOOGLE_PLACES_API_KEY);
        if (!placeRef.current) return;

        const el = document.createElement('gmp-place-autocomplete');
        el.setAttribute('style', 'width: 100%; max-width: 100%;');
        el.setAttribute('input-placeholder', 'Search your gym...');

        el.addEventListener('gmp-placechange', (event: any) => {
          const place = event.detail;
          if (!place || !place.location || !place.id || !place.displayName?.text || !place.formattedAddress) return;

          setGymInfo({
            name: place.displayName.text,
            address: place.formattedAddress,
            place_id: place.id,
            lat: place.location.latitude,
            lng: place.location.longitude,
          });
        });

        placeRef.current.appendChild(el);
      } catch (err) {
        console.error('Failed to initialize Google Maps:', err);
      }
    };

    initAutocomplete();
  }, []);

  const handleSubmit = async () => {
    if (!gymInfo || !walletAddress) return;
    setLoading(true);
    try {
      await addGym({ ...gymInfo, user_id: walletAddress });
      alert('Gym added successfully!');
      setGymInfo(null);
      if (placeRef.current) placeRef.current.innerHTML = '';
    } catch (err) {
      console.error('Failed to add gym:', err);
      alert('Failed to add gym');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" mt="xl">
      <Stack spacing="lg">
        <Title order={2}>📍 Add a New Gym</Title>
        <Text size="sm" c="dimmed">
          Use Google Maps to search for your gym location. Once selected, click "Add Gym" to save it.
        </Text>
        <div ref={placeRef} style={{ width: '100%' }}></div>
        <Button fullWidth onClick={handleSubmit} disabled={!gymInfo || loading} color="green">
          {loading ? <Loader size="xs" color="white" /> : 'Add Gym'}
        </Button>
      </Stack>
    </Container>
  );
};

export default AddGym;
