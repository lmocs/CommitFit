import {
  Card,
  Stack,
  Text,
  Button,
  Loader,
} from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { loadGoogleMapsApi } from '../lib/utils/loadGoogleMaps';
import { addGym } from '../lib/api/gym';
import { useWallet } from '../context/WalletContext';

const AddGymCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [gymInfo, setGymInfo] = useState<any>(null);
  const { walletAddress } = useWallet();

  useEffect(() => {
    const initAutocomplete = async () => {
      try {
        await loadGoogleMapsApi(import.meta.env.VITE_GOOGLE_PLACES_API_KEY);
        if (!containerRef.current) return;

        const el = document.createElement('gmp-place-autocomplete');
        el.setAttribute('style', 'width: 100%;');
        el.setAttribute('input-placeholder', 'Search for a gym...');

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

        containerRef.current.appendChild(el);
      } catch (err) {
        console.error('Google Maps failed to load:', err);
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
      if (containerRef.current) containerRef.current.innerHTML = '';
    } catch (err) {
      console.error('Failed to add gym:', err);
      alert('Failed to add gym');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card withBorder p="lg">
      <Text>📍 Add Gym</Text>
      <Text size="xs" c="dimmed" mt={4}>
        Use Google Maps to search and save your gym location.
      </Text>
      <Stack mt="sm">
        <div ref={containerRef}></div>
        <Button
          fullWidth
          color="green"
          onClick={handleSubmit}
          disabled={!gymInfo || loading}
        >
          {loading ? <Loader size="xs" color="white" /> : 'Add Gym'}
        </Button>
      </Stack>
    </Card>
  );
};

export default AddGymCard;
