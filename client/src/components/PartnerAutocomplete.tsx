import { Autocomplete, Loader } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { searchUsers } from '../lib/api/user';

interface Props {
  value: string;
  onChange: (wallet: string) => void;
}

export function PartnerAutocomplete({ value, onChange }: Props) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState(value);
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
      label="Partner Wallet Address or Username"
      placeholder="Search by username or address"
      value={inputValue}
      data={data}
      onChange={(val) => {
        setInputValue(val);
        setQuery(val);

        const match = val.match(/\((0x[a-fA-F0-9]{40})\)$/);
        if (match) {
          onChange(match[1]); // extract wallet_address
        }
      }}
      rightSection={loading ? <Loader size={16} /> : null}
    />
  );
}
