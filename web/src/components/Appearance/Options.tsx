import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import {
  FaStreetView,
  FaUndo,
  FaRedo,
  FaSmile,
  FaMale,
  FaShoePrints,
  FaSave,
  FaTimes,
  FaTshirt,
  FaHatCowboy,
  FaSocks,
} from 'react-icons/fa';

import { CameraState, ClothesState, CustomizationConfig, RotateState } from './interfaces';

interface OptionsProps {
  camera: CameraState;
  rotate: RotateState;
  clothes: ClothesState;
  config: CustomizationConfig;
  handleSetClothes: (key: keyof ClothesState) => void;
  handleSetCamera: (key: keyof CameraState) => void;
  handleTurnAround: () => void;
  handleRotateLeft: () => void;
  handleRotateRight: () => void;
  handleSave: () => void;
  handleExit: () => void;
}

const Footer = styled.div`
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--spz-panel);
  border: 1px solid var(--spz-border);
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
  flex-shrink: 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const GroupLabel = styled.span`
  font-family: var(--spz-mono);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--spz-mute);
  width: 52px;
  flex-shrink: 0;
`;

const IconBtn = styled.button<{ active?: boolean }>`
  height: 34px;
  width: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ active }) => (active ? 'var(--spz-border-hi)' : 'var(--spz-border)')};
  border-radius: 7px;
  color: ${({ active }) => (active ? 'var(--spz-accent)' : 'var(--spz-dim)')};
  background: ${({ active }) => (active ? 'var(--spz-accent-soft)' : 'rgba(255, 255, 255, 0.02)')};
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ active }) => (active ? '0 0 10px rgba(255, 102, 0, 0.2)' : 'none')};

  &:hover {
    color: var(--spz-text);
    border-color: rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.06);
  }
  &:active {
    transform: scale(0.92);
  }

  ${({ active }) =>
    active &&
    css`
      &:hover {
        color: var(--spz-accent);
        background: var(--spz-accent-soft);
        border-color: var(--spz-border-hi);
      }
    `}
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

const Save = styled.button`
  flex: 1;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: 8px;
  background: linear-gradient(135deg, #ff7700 0%, #ff5500 100%);
  color: #120700;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  box-shadow: 0 4px 14px rgba(255, 102, 0, 0.35);
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    filter: brightness(1.12);
    box-shadow: 0 6px 18px rgba(255, 102, 0, 0.5);
  }
  &:active {
    transform: translateY(1px);
  }
`;

const Exit = styled.button`
  height: 40px;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--spz-border);
  border-radius: 8px;
  color: var(--spz-dim);
  background: rgba(255, 255, 255, 0.02);
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    color: #ff5566;
    border-color: rgba(255, 85, 102, 0.4);
    background: rgba(255, 85, 102, 0.08);
  }
  &:active {
    transform: scale(0.94);
  }
`;

const Cluster = ({ children }: { children: ReactNode }) => <Row>{children}</Row>;

const Options: React.FC<OptionsProps> = ({
  camera,
  rotate,
  clothes,
  config,
  handleSetClothes,
  handleSetCamera,
  handleTurnAround,
  handleRotateLeft,
  handleRotateRight,
  handleExit,
  handleSave,
}) => {
  return (
    <Footer>
      <Cluster>
        <GroupLabel>View</GroupLabel>
        <IconBtn active={camera.head} onClick={() => handleSetCamera('head')} title="Head">
          <FaSmile size={15} />
        </IconBtn>
        <IconBtn active={camera.body} onClick={() => handleSetCamera('body')} title="Body">
          <FaMale size={15} />
        </IconBtn>
        <IconBtn active={camera.bottom} onClick={() => handleSetCamera('bottom')} title="Legs">
          <FaShoePrints size={15} />
        </IconBtn>
        <IconBtn onClick={handleTurnAround} title="Turn around">
          <FaStreetView size={15} />
        </IconBtn>
        <IconBtn active={rotate.left} onClick={handleRotateLeft} title="Spin left">
          <FaRedo size={14} />
        </IconBtn>
        <IconBtn active={rotate.right} onClick={handleRotateRight} title="Spin right">
          <FaUndo size={14} />
        </IconBtn>
      </Cluster>

      <Cluster>
        <GroupLabel>Try on</GroupLabel>
        <IconBtn active={clothes.head} onClick={() => handleSetClothes('head')} title="Headwear">
          <FaHatCowboy size={15} />
        </IconBtn>
        <IconBtn active={clothes.body} onClick={() => handleSetClothes('body')} title="Top">
          <FaTshirt size={15} />
        </IconBtn>
        <IconBtn active={clothes.bottom} onClick={() => handleSetClothes('bottom')} title="Shoes">
          <FaSocks size={15} />
        </IconBtn>
      </Cluster>

      <Actions>
        <Save onClick={handleSave}>
          <FaSave size={15} /> Save
        </Save>
        {config.allowExit && (
          <Exit onClick={handleExit} title="Exit">
            <FaTimes size={16} />
          </Exit>
        )}
      </Actions>
    </Footer>
  );
};

export default Options;
