import { Autocomplete, Loader } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { searchUsers } from '../lib/api/user';

interface Props {
  value: string;
  onChange: (label: string) => void;
}

export function PartnerAutocomplete({ value, onChange }: Props) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const timeoutRef = useRef<number>(-1);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(async () => {
      try {
        const results = await searchUsers(query);
        setData(results);
      } catch (err) {
        console.error('Autocomplete fetch failed:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [query]);

  return (
    <Autocomplete
      label="Partner Username or Wallet Address"
      placeholder="Search by username or address"
      value={value}
      data={data}
      onChange={(val) => {
        setQuery(val);
        onChange(val); // Always pass full string like 'zero (0xabc...)'
      }}
      rightSection={loading ? <Loader size={16} /> : null}
      required
    />
  );
}
