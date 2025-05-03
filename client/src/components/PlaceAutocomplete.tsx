import { useRef, useEffect, useState } from 'react';

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!inputRef.current || !window.google?.maps?.places) return;

    const ac = new google.maps.places.Autocomplete(inputRef.current, {
      fields: ['geometry', 'name', 'formatted_address', 'place_id'],
    });
    setAutocomplete(ac);
  }, []);

  useEffect(() => {
    if (!autocomplete) return;
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      onPlaceSelect(place);
    });
  }, [autocomplete]);

  return (
    <input
      ref={inputRef}
      placeholder="Search for your gym..."
      style={{
        width: '100%',
        padding: '10px',
        fontSize: '14px',
        borderRadius: '8px',
        border: '1px solid #ccc',
      }}
    />
  );
};

export default PlaceAutocomplete;
