import { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface InputProps {
  title?: string;
  min?: number;
  max?: number;
  defaultValue: number;
  clientValue: number;
  onChange: (value: number) => void;
}

const Container = styled.div<{ hasTitle: boolean }>`
  min-width: 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: ${({ hasTitle }) => (hasTitle ? '6px' : '0')};

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

  .input-controls {
    min-width: 0;
    height: 34px;
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.35);
    border: 1px solid var(--spz-border);
    border-radius: 7px;
    padding: 2px;
    transition: border-color 0.15s, box-shadow 0.15s;

    &:focus-within {
      border-color: var(--spz-border-hi);
      box-shadow: 0 0 10px rgba(255, 102, 0, 0.15);
    }

    button {
      height: 100%;
      width: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--spz-dim);
      border: none;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.04);
      transition: all 0.15s;
      flex-shrink: 0;

      &:hover {
        background: var(--spz-accent-soft);
        color: var(--spz-accent);
      }

      &:active {
        transform: scale(0.92);
      }
    }

    input {
      min-width: 0;
      height: 100%;
      flex: 1;
      text-align: center;
      font-size: 13px;
      font-weight: 700;
      font-family: var(--spz-mono);
      color: var(--spz-text);
      border: none;
      background: transparent;
      outline: none;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
`;

const Input: React.FC<InputProps> = ({ title, min = 0, max = 255, defaultValue, clientValue, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const getSafeValue = useCallback(
    (_value: number) => {
      let safeValue = _value;

      if (safeValue < min) {
        safeValue = max;
      } else if (safeValue > max) {
        safeValue = min;
      }

      return safeValue;
    },
    [min, max],
  );

  const handleChange = useCallback(
    (_value: any) => {
      let parsedValue;

      if (!_value && _value !== 0) return;

      if (Number.isNaN(_value)) return;

      if (typeof _value === 'string') {
        parsedValue = parseInt(_value, 10);
      } else {
        parsedValue = _value;
      }

      const safeValue = getSafeValue(parsedValue);

      onChange(safeValue);
    },
    [getSafeValue, onChange],
  );

  return (
    <Container hasTitle={!!title} onClick={handleContainerClick}>
      {title && (
        <span>
          <span className="title-text">{title}</span>
          {clientValue !== undefined && <span className="saved-badge">Saved: {clientValue}</span>}
        </span>
      )}
      <div className="input-controls">
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            handleChange(defaultValue - 1);
          }}
        >
          <FiChevronLeft size={16} />
        </button>
        <input
          type="number"
          ref={inputRef}
          value={defaultValue}
          onWheel={e => (e.target as HTMLElement).blur()}
          onChange={e => handleChange(e.target.value)}
        />
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            handleChange(defaultValue + 1);
          }}
        >
          <FiChevronRight size={16} />
        </button>
      </div>
    </Container>
  );
};

export default Input;
