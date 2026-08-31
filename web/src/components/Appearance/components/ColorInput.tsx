import { useCallback } from 'react';
import styled, { css } from 'styled-components';

interface ColorInputProps {
  title?: string;
  colors?: number[][];
  defaultValue?: number;
  clientValue?: number;
  onChange: (value: number) => void;
}

interface ButtonProps {
  selected: boolean;
}

const Container = styled.div`
  width: 100%;
  margin-top: 8px;

  > span {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    font-weight: 600;
    color: var(--spz-dim);
    margin-bottom: 8px;

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

  .swatch-grid {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding: 8px;
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid var(--spz-border);
    border-radius: 8px;
    max-height: 120px;
    overflow-y: auto;
  }
`;

const SwatchButton = styled.button<ButtonProps>`
  height: 22px;
  width: 22px;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:hover {
    transform: scale(1.2);
    z-index: 2;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
  }

  ${({ selected }) =>
    selected &&
    css`
      transform: scale(1.15);
      z-index: 1;
      box-shadow: 0 0 0 2px var(--spz-accent), 0 0 10px var(--spz-accent);
      border-color: #ffffff;
    `}
`;

const ColorInput: React.FC<ColorInputProps> = ({ title, colors = [], defaultValue = 0, clientValue, onChange }) => {
  const selectColor = useCallback(
    (color: number) => {
      onChange(color);
    },
    [onChange],
  );

  return (
    <Container>
      <span>
        <div className="title-group">
          <span>{title}</span>
          <span className="value-pill">#{defaultValue}</span>
        </div>
        {clientValue !== undefined && <span className="saved-badge">Saved: #{clientValue}</span>}
      </span>
      <div className="swatch-grid">
        {colors.map((color, index) => (
          <SwatchButton
            key={index}
            style={{ backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})` }}
            selected={defaultValue === index}
            onClick={() => selectColor(index)}
            title={`Color ${index}`}
          />
        ))}
      </div>
    </Container>
  );
};

export default ColorInput;
