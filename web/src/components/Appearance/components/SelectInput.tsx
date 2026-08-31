import { useRef } from 'react';
import styled from 'styled-components';
import Select from 'react-select';

interface SelectInputProps {
  title: string;
  items: string[];
  defaultValue: string;
  clientValue: string;
  onChange: (value: string) => void;
}

const Container = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  > span {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    font-weight: 600;
    color: var(--spz-dim);
    margin-bottom: 6px;

    .title-text {
      color: var(--spz-text);
      letter-spacing: 0.02em;
    }

    .saved-badge {
      font-family: var(--spz-mono);
      font-size: 9px;
      padding: 1px 5px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: var(--spz-mute);
    }
  }
`;

const PANEL = 'rgba(20, 21, 26, 0.98)';

const customStyles: any = {
  control: (styles: any, { isFocused }: any) => ({
    ...styles,
    minHeight: '36px',
    background: 'rgba(0, 0, 0, 0.35)',
    fontSize: '13px',
    color: '#f0f0f4',
    border: `1px solid ${isFocused ? 'rgba(255, 102, 0, 0.5)' : 'rgba(255, 255, 255, 0.08)'}`,
    borderRadius: '7px',
    outline: 'none',
    boxShadow: isFocused ? '0 0 10px rgba(255, 102, 0, 0.15)' : 'none',
    '&:hover': { borderColor: 'rgba(255,255,255,0.2)' },
  }),
  placeholder: (styles: any) => ({ ...styles, fontSize: '13px', color: '#9a9aa5' }),
  input: (styles: any) => ({ ...styles, fontSize: '13px', color: '#f0f0f4' }),
  singleValue: (styles: any) => ({
    ...styles,
    fontSize: '13px',
    fontWeight: '600',
    color: '#f0f0f4',
    border: 'none',
    outline: 'none',
  }),
  indicatorSeparator: (styles: any) => ({ ...styles, background: 'rgba(255,255,255,0.1)' }),
  dropdownIndicator: (styles: any) => ({ ...styles, color: '#9a9aa5' }),
  menuPortal: (styles: any) => ({ ...styles, zIndex: 9999 }),
  menu: (styles: any) => ({
    ...styles,
    background: PANEL,
    border: '1px solid rgba(255,255,255,0.12)',
    position: 'absolute',
    marginBottom: '10px',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
  }),
  menuList: (styles: any) => ({
    ...styles,
    background: PANEL,
    borderRadius: '8px',
    padding: '4px',
    '&::-webkit-scrollbar': { width: '6px' },
    '&::-webkit-scrollbar-track': { background: 'none' },
    '&::-webkit-scrollbar-thumb': { borderRadius: '3px', background: 'rgba(255,255,255,0.15)' },
  }),
  option: (styles: any, { isFocused, isSelected }: any) => ({
    ...styles,
    fontSize: '13px',
    borderRadius: '5px',
    color: isSelected ? '#ff6600' : '#f0f0f4',
    background: isFocused ? 'rgba(255, 102, 0, 0.14)' : 'transparent',
    cursor: 'pointer',
    fontWeight: isSelected ? '700' : '500',
  }),
};

const SelectInput = ({ title, items, defaultValue, clientValue, onChange }: SelectInputProps) => {
  const selectRef = useRef<any>(null);

  const handleChange = (event: any, { action }: any): void => {
    if (action === 'select-option') {
      onChange(event.value);
    }
  };

  return (
    <Container>
      <span>
        <span className="title-text">{title}</span>
        {clientValue !== undefined && <span className="saved-badge">Saved: {clientValue}</span>}
      </span>
      <Select
        ref={selectRef}
        styles={customStyles}
        options={items.map(item => ({ value: item, label: item }))}
        value={{ value: defaultValue, label: defaultValue }}
        onChange={handleChange}
        menuPortalTarget={document.body}
      />
    </Container>
  );
};

export default SelectInput;
