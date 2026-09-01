import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10000;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  user-select: none;
  text-align: center;
  /* Full-screen over a transparent NUI page, so there is no in-page backdrop to
     blur — see the Header in ../Appearance/styles.ts. A backdrop-filter here
     resolved to a solid black screen. */
  background: rgba(6, 7, 9, 0.8);

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
    line-height: 1.5;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 24px;

  button {
    height: 40px;
    min-width: 120px;
    padding: 0 24px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border-radius: 8px;
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid var(--spz-border);
    background: rgba(255, 255, 255, 0.03);
    color: var(--spz-dim);

    &:hover {
      color: var(--spz-text);
      border-color: rgba(255, 255, 255, 0.2);
    }
  }

  button:first-child {
    background: linear-gradient(135deg, #ff7700 0%, #ff5500 100%);
    border-color: transparent;
    color: #120700;
    box-shadow: 0 4px 14px rgba(255, 102, 0, 0.35);

    &:hover {
      filter: brightness(1.12);
      box-shadow: 0 6px 18px rgba(255, 102, 0, 0.5);
    }
  }
`;
