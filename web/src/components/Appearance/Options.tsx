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
  padding: 11px 13px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--spz-panel);
  border: 1px solid var(--spz-border);
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
  flex-shrink: 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const GroupLabel = styled.span`
  font-family: var(--spz-mono);
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--spz-mute);
  width: 46px;
  flex-shrink: 0;
`;

const IconBtn = styled.button<{ active?: boolean }>`
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ active }) => (active ? 'var(--spz-border-hi)' : 'var(--spz-border)')};
  border-radius: 6px;
  color: ${({ active }) => (active ? 'var(--spz-accent)' : 'var(--spz-dim)')};
  background: ${({ active }) => (active ? 'var(--spz-accent-soft)' : 'transparent')};
  transition: all 0.15s;

  &:hover { color: var(--spz-text); border-color: rgba(255, 255, 255, 0.2); }
  &:active { transform: scale(0.9); }

  ${({ active }) =>
    active &&
    css`
      &:hover { color: var(--spz-accent); }
    `}
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 2px;
`;

const Save = styled.button`
  flex: 1;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: 8px;
  background: var(--spz-accent);
  color: #150a00;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: all 0.15s;

  &:hover { filter: brightness(1.08); }
  &:active { transform: translateY(1px); }
`;

const Exit = styled.button`
  height: 38px;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--spz-border);
  border-radius: 8px;
  color: var(--spz-dim);
  background: transparent;
  transition: all 0.15s;

  &:hover { color: #ff5566; border-color: rgba(255, 85, 102, 0.4); }
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
