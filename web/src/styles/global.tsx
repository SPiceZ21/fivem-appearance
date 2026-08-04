import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700;800&display=swap');

  :root {
    --spz-bg:          rgba(12, 13, 16, 0.94);
    --spz-panel:       rgba(20, 21, 26, 0.9);
    --spz-card:        rgba(255, 255, 255, 0.03);
    --spz-border:      rgba(255, 255, 255, 0.08);
    --spz-border-hi:   rgba(255, 102, 0, 0.4);
    --spz-accent:      #ff6600;
    --spz-accent-soft: rgba(255, 102, 0, 0.14);
    --spz-text:        #f0f0f4;
    --spz-dim:         #9a9aa5;
    --spz-mute:        #62626e;
    --spz-mono:        'JetBrains Mono', monospace;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-family: 'Inter', sans-serif;
  }

  body {
    background: transparent;
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
    color: var(--spz-text);
  }

  button { cursor: pointer; outline: 0; font-family: 'Inter', sans-serif; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.12); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--spz-accent); }
`;
