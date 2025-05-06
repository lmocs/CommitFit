import { NativeSelect, NumberInput } from '@mantine/core';

interface CurrencyInputProps {
  value: number | '';
  onChange: (value: number | '') => void;
  currency: string;
  setCurrency: (value: string) => void;
}

export function CurrencyInput({ value, onChange, currency, setCurrency }: CurrencyInputProps) {
  const select = (
    <NativeSelect
      data={[
        { value: 'ETH', label: 'ETH' },
        { value: 'Wei', label: 'Wei' },
        { value: 'Gwei', label: 'Gwei' },
      ]}
      value={currency}
      onChange={(event) => setCurrency(event.currentTarget.value)}
      rightSectionWidth={28}
      styles={{
        input: {
          fontWeight: 500,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          width: 92,
          marginRight: -2,
        },
      }}
    />
  );

  return (
    <NumberInput
      label="Stake Amount"
      placeholder="0"
      min={0}
      value={value}
      onChange={(val) => onChange(val === '' ? '' : Number(val))}
      rightSection={select}
      rightSectionWidth={92}
      required
    />
  );
}
