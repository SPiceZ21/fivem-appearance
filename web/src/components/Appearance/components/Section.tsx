import { useState, useEffect, useRef, ReactNode } from 'react';
import styled from 'styled-components';
import { FiChevronDown } from 'react-icons/fi';
import { useSpring, animated } from 'react-spring';

interface SectionProps {
  title: string;
  deps?: any[];
  children?: ReactNode;
}

interface HeaderProps {
  active: boolean;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: var(--spz-text);
  user-select: none;
  background: var(--spz-panel);
  border: 1px solid var(--spz-border);
  border-radius: 9px;
  overflow: hidden;
`;

const Header = styled.div<HeaderProps>`
  width: 100%;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  transition: background 0.15s;

  &:hover { cursor: pointer; background: rgba(255, 255, 255, 0.02); }

  span {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${({ active }) => (active ? 'var(--spz-text)' : 'var(--spz-dim)')};
  }

  svg {
    color: ${({ active }) => (active ? 'var(--spz-accent)' : 'var(--spz-mute)')};
    transition: transform 0.2s;
    transform: rotate(${({ active }) => (active ? '180deg' : '0deg')});
  }
`;

const Items = styled.div`
  padding: 4px 12px 12px;
  overflow: hidden;
`;

const Section: React.FC<SectionProps> = ({ children, title, deps = [] }) => {
  const [active, setActive] = useState(true); // open by default — categories keep it tidy

  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const props = useSpring({
    height: active ? height : 0,
    opacity: active ? 1 : 0,
  });

  useEffect(() => {
    if (ref.current) setHeight(ref.current.offsetHeight);
  }, [ref, setHeight]);

  useEffect(() => {
    if (ref.current) setHeight(ref.current.offsetHeight);
  }, [ref, setHeight, deps]);

  return (
    <Container>
      <Header active={active} onClick={() => setActive(state => !state)}>
        <span>{title}</span>
        <FiChevronDown size={18} />
      </Header>

      <animated.div style={{ ...props, overflow: 'hidden' }}>
        <Items ref={ref}>{children}</Items>
      </animated.div>
    </Container>
  );
};

export default Section;
