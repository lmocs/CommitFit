import {
  APIProvider,
  Map,
  AdvancedMarker,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { Button, Container, Loader, Stack, Text, Title } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { addGym } from '../lib/api/gym';
import BackToDashboard from '../components/BackToDashboard';
import PlaceAutocomplete from '../components/PlaceAutocomplete';

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_GOOGLE_MAPS_ID;

const AddGym = () => {
  const navigate = useNavigate();
  const { walletAddress } = useWallet();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!walletAddress || !place?.geometry?.location || !place.place_id || !place.name || !place.formatted_address) {
      alert('Please select a valid gym from the map search.');
      return;
    }

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    setSubmitting(true);
    try {
      await addGym({
        wallet_address: walletAddress,
        name: place.name,
        address: place.formatted_address,
        place_id: place.place_id,
        lat,
        lng,
      });
      alert('Gym added successfully!');
      setPlace(null);
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to add gym:', err);
      alert('Error adding gym.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <APIProvider apiKey={apiKey} libraries={['places']}>
      <BackToDashboard />
      <Container size="sm" mt="xl">
        <Stack spacing="lg">
          <Title order={2}>📍 Add Your Gym</Title>

          <Text size="sm" c="dimmed">
            Register your gym location to enable automatic check-ins.
          </Text>

          <PlaceAutocomplete onPlaceSelect={setPlace} />

          <Map
            mapId={mapId}
            defaultZoom={5}
            defaultCenter={{ lat: 39.8283, lng: -98.5795 }}
            style={{ width: '100%', height: 400, borderRadius: 8 }}
            disableDefaultUI={false}
            gestureHandling="greedy"
          >
            <AdvancedMarker ref={markerRef} position={null} />
          </Map>

          <Button fullWidth color="green" onClick={handleSubmit} disabled={!place || submitting}>
            {submitting ? <Loader size="xs" color="white" /> : '✅ Register This Gym'}
          </Button>
        </Stack>
      </Container>
    </APIProvider>
  );
};

export default AddGym;

