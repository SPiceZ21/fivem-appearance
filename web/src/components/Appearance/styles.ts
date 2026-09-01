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
  width: 520px;
  max-width: 92vw;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 16px;
  background: transparent;
  z-index: 10;
`;

/* header module */
export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--spz-panel);
  border: 1px solid var(--spz-border);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
  flex-shrink: 0;
  /* NO backdrop-filter. Nothing in this page sits behind the header — the game
     is composited under the whole browser surface, not inside it — so the blur
     had transparent pixels to filter and CEF resolved them to BLACK. The header
     rendered as a solid black bar. --spz-panel is already translucent, which is
     what the blur was reaching for. */
`;

export const Dot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--spz-accent);
  box-shadow: 0 0 10px var(--spz-accent);
  flex-shrink: 0;
`;

export const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  .eyebrow {
    font-family: var(--spz-mono);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.24em;
    color: var(--spz-accent);
    text-transform: uppercase;
  }
  .title {
    font-size: 18px;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    line-height: 1;
    color: var(--spz-text);
  }
`;

/* Category tab rail — tabs float as their own chips */
export const Nav = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  flex-shrink: 0;
`;

export const Tab = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 13px;
  border-radius: 8px;
  border: 1px solid ${({ active }) => (active ? 'var(--spz-border-hi)' : 'var(--spz-border)')};
  background: ${({ active }) => (active ? 'var(--spz-accent-soft)' : 'var(--spz-panel)')};
  color: ${({ active }) => (active ? 'var(--spz-accent)' : 'var(--spz-dim)')};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ active }) => (active ? '0 0 12px rgba(255, 102, 0, 0.2)' : 'none')};

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover {
    color: ${({ active }) => (active ? 'var(--spz-accent)' : 'var(--spz-text)')};
    border-color: ${({ active }) => (active ? 'var(--spz-border-hi)' : 'rgba(255,255,255,0.22)')};
    background: ${({ active }) => (active ? 'var(--spz-accent-soft)' : 'rgba(255,255,255,0.04)')};
  }

  &:active {
    transform: scale(0.96);
  }
`;

/* Scrollable content — the section cards inside are the modules; no bg here */
export const Container = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 6px;
  overflow-y: auto;
  overscroll-behavior: contain;
  scroll-behavior: smooth;

  /*
   * A flex column will SHRINK its children before it overflows, and a container
   * that never overflows never scrolls. With twelve clothing sections open this
   * squashed every card down to fit the panel instead of giving a scrollbar —
   * the lists became unusable and there was no way to reach the ones below.
   *
   * Pinning the children at their natural height is what makes the overflow —
   * and therefore the scrollbar — actually happen.
   */
  > * {
    flex-shrink: 0;
  }
`;

export const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  > div {
    flex: 1;
  }
`;

/* Transparent full-height layer over the 3D area (right of the panel).
   Drag to spin the ped. */
export const DragLayer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 520px;
  right: 0;
  cursor: grab;
  z-index: 1;
  &:active {
    cursor: grabbing;
  }
`;
