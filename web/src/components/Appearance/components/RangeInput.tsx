import { useCallback, useRef } from 'react';
import styled from 'styled-components';

interface RangeInputProps {
  title?: string;
  min: number;
  max: number;
  factor?: number;
  defaultValue?: number;
  clientValue?: number;
  onChange: (value: number) => void;
}

const Container = styled.div`
  width: 100%;

  > span {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: var(--spz-dim);

    small { font-family: var(--spz-mono); font-size: 10px; }
  }

  > div {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 9px;

    > small {
      font-size: 8px;
      color: var(--spz-mute);
      font-family: var(--spz-mono);
    }
  }

  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    outline: none;
    opacity: 1;
    border-radius: 99px;
    margin: 0 10px;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    background: var(--spz-accent);
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(255, 102, 0, 0.5);
  }
`;

const RangeInput: React.FC<RangeInputProps> = ({
  min,
  max,
  factor = 1,
  title,
  defaultValue = 1,
  clientValue,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleChange = useCallback(
    (e: { target: { value: string } }) => {
      const parsedValue = parseFloat(e.target.value);

      onChange(parsedValue);
    },
    [onChange],
  );

  return (
    <Container onClick={handleContainerClick}>
      <span>
        <small>
          {title}: {defaultValue}
        </small>
        <small>{clientValue}</small>
      </span>
      <div>
        <small>{min}</small>
        <input
          type="range"
          ref={inputRef}
          value={defaultValue}
          min={min}
          max={max}
          step={factor}
          onChange={handleChange}
        />
        <small>{max}</small>
      </div>
    </Container>
  );
};

export default RangeInput;
