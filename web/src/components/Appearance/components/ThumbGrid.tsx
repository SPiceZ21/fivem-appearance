import { useState } from 'react';
import styled from 'styled-components';

interface ThumbGridProps {
  label: string;
  min: number;
  max: number;
  value: number;
  storedValue?: number;
  onSelect: (v: number) => void;
  imageFor?: (v: number) => string | undefined;
}

const Wrap = styled.div`
  width: 100%;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;

  .name {
    font-size: 11px;
    color: var(--spz-dim);
  }
  .count {
    font-family: var(--spz-mono);
    font-size: 9px;
    color: var(--spz-mute);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(46px, 1fr));
  gap: 5px;
  max-height: 188px;
  overflow-y: auto;
  padding-right: 2px;
`;

const Tile = styled.button<{ selected: boolean; stored: boolean }>`
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid ${({ selected }) => (selected ? 'var(--spz-accent)' : 'var(--spz-border)')};
  background: ${({ selected }) => (selected ? 'var(--spz-accent-soft)' : 'rgba(255,255,255,0.02)')};
  transition: all 0.12s;

  ${({ stored, selected }) => stored && !selected && `box-shadow: inset 0 0 0 1px rgba(255,255,255,0.25);`}

  &:hover { border-color: ${({ selected }) => (selected ? 'var(--spz-accent)' : 'rgba(255,255,255,0.25)')}; }

  img { width: 100%; height: 100%; object-fit: cover; display: block; }

  .num {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--spz-mono);
    font-size: 12px;
    font-weight: 700;
    color: ${({ selected }) => (selected ? 'var(--spz-accent)' : 'var(--spz-dim)')};
  }

  /* number chip when an image is shown */
  .chip {
    position: absolute;
    bottom: 2px;
    right: 3px;
    font-family: var(--spz-mono);
    font-size: 8px;
    font-weight: 700;
    color: #fff;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 3px;
    padding: 0 3px;
  }
`;

const Cell = ({
  v,
  selected,
  stored,
  onSelect,
  src,
}: {
  v: number;
  selected: boolean;
  stored: boolean;
  onSelect: (v: number) => void;
  src?: string;
}) => {
  const [imgOk, setImgOk] = useState(Boolean(src));

  return (
    <Tile type="button" selected={selected} stored={stored} onClick={() => onSelect(v)} title={String(v)}>
      {src && imgOk ? (
        <>
          <img src={src} alt="" onError={() => setImgOk(false)} />
          <span className="chip">{v}</span>
        </>
      ) : (
        <span className="num">{v}</span>
      )}
    </Tile>
  );
};

const ThumbGrid = ({ label, min, max, value, storedValue, onSelect, imageFor }: ThumbGridProps) => {
  const items: number[] = [];
  for (let i = min; i <= max; i++) items.push(i);

  return (
    <Wrap>
      <Head>
        <span className="name">{label}</span>
        <span className="count">
          {value} / {max}
        </span>
      </Head>
      <Grid>
        {items.map(v => (
          <Cell
            key={v}
            v={v}
            selected={v === value}
            stored={v === storedValue}
            onSelect={onSelect}
            src={imageFor ? imageFor(v) : undefined}
          />
        ))}
      </Grid>
    </Wrap>
  );
};

export default ThumbGrid;
