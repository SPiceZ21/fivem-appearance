import { createRoot } from 'react-dom/client';
import App from './App';
import Nui, { EventListener } from './Nui';

if (!import.meta.env.PROD) {
  window.Nui = Nui;
}

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

/*
 * NOT wrapped in React.StrictMode, and that is deliberate.
 *
 * StrictMode double-invokes render under React 18, and styled-components v5
 * cannot survive it: it marks each component's CSS as already injected on the
 * first pass, the sheet is discarded before the second, and the rule is never
 * written. The class names still appear on the elements, so the markup looks
 * correct while carrying no styles at all.
 *
 * Measured on this exact tree: 47 component rules in the stylesheet without
 * StrictMode, 0 with it. Every layout rule in the appearance UI was missing in
 * the shipped build — including `overflow-y: auto` on the scroll container,
 * which is why the clothing lists could not be scrolled and the panel ran off
 * the bottom of the screen at its full content height instead of 100vh.
 *
 * styled-components v5 is unmaintained and will not be fixed. If StrictMode is
 * wanted back, the styling layer has to move to v6 or to plain CSS first.
 */
root.render(
  <>
    <App />
    <EventListener />
  </>,
);
