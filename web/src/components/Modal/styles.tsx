import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  user-select: none;
  text-align: center;
  background: rgba(6, 7, 9, 0.72);

  /* the content reads as a floating card in the middle */
  p {
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--spz-text);
  }

  span {
    font-size: 13px;
    color: var(--spz-dim);
    max-width: 360px;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 26px;

  button {
    height: 40px;
    min-width: 120px;
    padding: 0 22px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border-radius: 8px;
    transition: all 0.15s;
    border: 1px solid var(--spz-border);
    background: transparent;
    color: var(--spz-dim);
  }

  /* accept = primary */
  button:first-child {
    background: var(--spz-accent);
    border-color: var(--spz-accent);
    color: #150a00;

    &:hover { filter: brightness(1.08); }
  }

  button:last-child:hover {
    color: var(--spz-text);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;
