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

const Container = styled.div<{ fillPct: number }>`
  width: 100%;
  margin-top: 6px;

  > span {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    font-weight: 600;
    color: var(--spz-dim);
    margin-bottom: 6px;

    .title-group {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .value-pill {
      font-family: var(--spz-mono);
      font-size: 10px;
      font-weight: 700;
      color: var(--spz-accent);
      background: var(--spz-accent-soft);
      padding: 1px 6px;
      border-radius: 4px;
      border: 1px solid var(--spz-border-hi);
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

  .slider-wrapper {
    display: flex;
    align-items: center;
    position: relative;
    height: 32px;
    padding: 0 4px;
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid var(--spz-border);
    border-radius: 7px;

    > small {
      font-size: 9px;
      font-weight: 700;
      color: var(--spz-mute);
      font-family: var(--spz-mono);
      min-width: 16px;
      text-align: center;
    }
  }

  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 5px;
    background: linear-gradient(
      to right,
      var(--spz-accent) 0%,
      var(--spz-accent) ${({ fillPct }) => fillPct}%,
      rgba(255, 255, 255, 0.1) ${({ fillPct }) => fillPct}%,
      rgba(255, 255, 255, 0.1) 100%
    );
    outline: none;
    border-radius: 99px;
    margin: 0 10px;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: #ffffff;
    cursor: pointer;
    border-radius: 50%;
    border: 2px solid var(--spz-accent);
    box-shadow: 0 0 10px var(--spz-accent);
    transition: transform 0.15s, background-color 0.15s;
  }

  input[type='range']::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    background: var(--spz-accent);
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

  const fillPct = max > min ? Math.max(0, Math.min(100, ((defaultValue - min) / (max - min)) * 100)) : 0;

  return (
    <Container fillPct={fillPct} onClick={handleContainerClick}>
      <span>
        <div className="title-group">
          <span>{title}</span>
          <span className="value-pill">{defaultValue}</span>
        </div>
        {clientValue !== undefined && <span className="saved-badge">Saved: {clientValue}</span>}
      </span>
      <div className="slider-wrapper">
        <small>{min}</small>
        <input
          type="range"
          ref={inputRef}
          value={defaultValue}
          min={min}
          max={max}
          step={factor}
          onWheel={e => (e.target as HTMLElement).blur()}
          onChange={handleChange}
        />
        <small>{max}</small>
      </div>
    </Container>
  );
};

export default RangeInput;
