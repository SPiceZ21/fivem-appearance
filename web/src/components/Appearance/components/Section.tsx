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

const Container = styled.div<{ active: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: var(--spz-text);
  user-select: none;
  background: var(--spz-panel);
  border: 1px solid ${({ active }) => (active ? 'rgba(255, 102, 0, 0.25)' : 'var(--spz-border)')};
  border-radius: 10px;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-shadow: ${({ active }) => (active ? '0 4px 16px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.2)')};
`;

const Header = styled.div<HeaderProps>`
  width: 100%;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  transition: background 0.15s;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  span {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${({ active }) => (active ? 'var(--spz-accent)' : 'var(--spz-dim)')};
    transition: color 0.15s;
  }

  svg {
    color: ${({ active }) => (active ? 'var(--spz-accent)' : 'var(--spz-mute)')};
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    transform: rotate(${({ active }) => (active ? '180deg' : '0deg')});
  }
`;

const ContentWrapper = styled.div<{ active: boolean }>`
  display: ${({ active }) => (active ? 'block' : 'none')};
  padding: 4px 12px 14px;
`;

const Section: React.FC<SectionProps> = ({ children, title }) => {
  const [active, setActive] = useState(true);

  return (
    <Container active={active}>
      <Header active={active} onClick={() => setActive(state => !state)}>
        <span>{title}</span>
        <FiChevronDown size={18} />
      </Header>

      <ContentWrapper active={active}>{children}</ContentWrapper>
    </Container>
  );
};

export default Section;
