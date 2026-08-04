import { ReactNode } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: string | ReactNode;
  onClick: () => void;
}

const CustomButton = styled.span`
  padding: 6px 12px;
  color: var(--spz-text);
  background: var(--spz-card);
  border: 1px solid var(--spz-border);
  text-align: center;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;

  &:hover { border-color: var(--spz-border-hi); color: var(--spz-accent); background: var(--spz-accent-soft); }
`;

const Button = ({ children, onClick }: ButtonProps) => {
  return <CustomButton onClick={onClick}>{children}</CustomButton>;
};

export default Button;
