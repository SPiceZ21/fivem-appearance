import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  overflow: hidden;
`;

/* Docked left column — NO overall background. Each piece below floats as its
   own module box, matching the rest of the SPiceZ UIs. */
export const Panel = styled.div`
  height: 100vh;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 14px;
  background: transparent;
`;

/* header module */
export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 12px 15px;
  background: var(--spz-panel);
  border: 1px solid var(--spz-border);
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
  flex-shrink: 0;
`;

export const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--spz-accent);
  box-shadow: 0 0 9px var(--spz-accent);
  flex-shrink: 0;
`;

export const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;

  .eyebrow {
    font-family: var(--spz-mono);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.24em;
    color: var(--spz-accent);
    text-transform: uppercase;
  }
  .title {
    font-size: 17px;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    line-height: 1;
  }
`;

/* Category tab rail — tabs float as their own chips (no container box) */
export const Nav = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  flex-shrink: 0;
`;

export const Tab = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 11px;
  border-radius: 7px;
  border: 1px solid ${({ active }) => (active ? 'var(--spz-border-hi)' : 'var(--spz-border)')};
  background: ${({ active }) => (active ? 'var(--spz-accent-soft)' : 'transparent')};
  color: ${({ active }) => (active ? 'var(--spz-accent)' : 'var(--spz-dim)')};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: all 0.15s;

  svg { width: 13px; height: 13px; }

  &:hover {
    color: ${({ active }) => (active ? 'var(--spz-accent)' : 'var(--spz-text)')};
    border-color: ${({ active }) => (active ? 'var(--spz-border-hi)' : 'rgba(255,255,255,0.18)')};
  }
`;

/* Scrollable content — the section cards inside are the modules; no bg here */
export const Container = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 4px;
  overflow-y: auto;
`;

export const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  > div {
    & + div { margin-left: 10px; }
  }
`;

/* Transparent full-height layer over the 3D area (right of the panel).
   Drag to spin the ped. */
export const DragLayer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 400px;
  right: 0;
  cursor: grab;
  &:active { cursor: grabbing; }
`;
