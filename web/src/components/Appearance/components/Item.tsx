import styled from 'styled-components';
import { ReactNode } from 'react';

interface ItemProps {
  title?: string;
  children?: ReactNode;
}

const Container = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  padding: 10px 11px;
  border-radius: 7px;
  background: var(--spz-card);
  border: 1px solid var(--spz-border);

  > span {
    color: var(--spz-dim);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`;

const Inputs = styled.div`
  width: 100%;
  display: inline-flex;
  flex-wrap: wrap;
  margin-top: 9px;

  > div {
    & + div { margin-top: 10px; }
  }
`;

const Item: React.FC<ItemProps> = ({ children, title }) => {
  return (
    <Container>
      {title && <span>{title}</span>}
      <Inputs>{children}</Inputs>
    </Container>
  );
};

export default Item;
