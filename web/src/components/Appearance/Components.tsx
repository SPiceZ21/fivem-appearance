import { useState } from 'react';
import styled from 'styled-components';
import { useNuiState } from '../../hooks/nuiState';

import Item from './components/Item';
import Input from './components/Input';
import ThumbGrid from './components/ThumbGrid';
import { CLOTHING_IMAGE_BASE } from '../../config';

import { ComponentSettings, PedComponent } from './interfaces';

interface ComponentsProps {
  settings: ComponentSettings[];
  data: PedComponent[];
  storedData: PedComponent[];
  model?: string;
  handleComponentDrawableChange: (component_id: number, drawable: number) => void;
  handleComponentTextureChange: (component_id: number, texture: number) => void;
}

interface DataById<T> {
  [key: number]: T;
}

// component_id → locale key
const COMPONENT_ITEMS: { id: number; key: string }[] = [
  { id: 1, key: 'mask' },
  { id: 3, key: 'upperBody' },
  { id: 4, key: 'lowerBody' },
  { id: 5, key: 'bags' },
  { id: 6, key: 'shoes' },
  { id: 7, key: 'scarfAndChains' },
  { id: 8, key: 'shirt' },
  { id: 9, key: 'bodyArmor' },
  { id: 10, key: 'decals' },
  { id: 11, key: 'jackets' },
];

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const GridCol = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

/* right-hand slot menu */
const Menu = styled.div`
  width: 128px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 380px;
  overflow-y: auto;
  padding-right: 2px;
`;

const SlotBtn = styled.button<{ active: boolean }>`
  display: block;
  width: 100%;
  text-align: left;
  padding: 8px 10px;
  border-radius: 7px;
  border: 1px solid ${({ active }) => (active ? 'var(--spz-border-hi)' : 'var(--spz-border)')};
  background: ${({ active }) => (active ? 'var(--spz-accent-soft)' : 'var(--spz-card)')};
  color: ${({ active }) => (active ? 'var(--spz-accent)' : 'var(--spz-dim)')};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  transition: all 0.15s;

  &:hover {
    color: ${({ active }) => (active ? 'var(--spz-accent)' : 'var(--spz-text)')};
    border-color: ${({ active }) => (active ? 'var(--spz-border-hi)' : 'rgba(255,255,255,0.2)')};
  }
`;

const Components = ({
  settings,
  data,
  storedData,
  model,
  handleComponentDrawableChange,
  handleComponentTextureChange,
}: ComponentsProps) => {
  const { locales } = useNuiState();
  const [slot, setSlot] = useState(COMPONENT_ITEMS[0].id);

  const settingsById = settings.reduce((object, { component_id, drawable, texture }) => {
    return { ...object, [component_id]: { drawable, texture } };
  }, {} as DataById<Omit<ComponentSettings, 'component_id'>>);

  const componentsById: any = data.reduce((object, { component_id, drawable, texture }) => {
    return { ...object, [component_id]: { drawable, texture } };
  }, {} as DataById<Omit<PedComponent, 'component_id'>>);

  const storedComponentsById: any = storedData.reduce((object, { component_id, drawable, texture }) => {
    return { ...object, [component_id]: { drawable, texture } };
  }, {} as DataById<Omit<PedComponent, 'component_id'>>);

  if (!locales) return null;

  // available slots (have settings), and the currently active one
  const slots = COMPONENT_ITEMS.filter(s => settingsById[s.id] && componentsById[s.id]);
  const active = slots.some(s => s.id === slot) ? slot : slots[0]?.id;
  if (active == null) return null;

  const id = active;
  const imageFor =
    CLOTHING_IMAGE_BASE && model
      ? (v: number) => `${CLOTHING_IMAGE_BASE}${model}_${id}_${v}.jpg`
      : undefined;

  return (
    <Row>
      {/* grids — left */}
      <GridCol>
        <ThumbGrid
          label={(locales.components as any)[COMPONENT_ITEMS.find(s => s.id === id)!.key]}
          min={settingsById[id].drawable.min}
          max={settingsById[id].drawable.max}
          value={componentsById[id].drawable}
          storedValue={storedComponentsById[id]?.drawable}
          onSelect={v => handleComponentDrawableChange(id, v)}
          imageFor={imageFor}
        />
        <Item title={locales.components.texture}>
          <Input
            title={locales.components.texture}
            min={settingsById[id].texture.min}
            max={settingsById[id].texture.max}
            defaultValue={componentsById[id].texture}
            clientValue={storedComponentsById[id]?.texture}
            onChange={value => handleComponentTextureChange(id, value)}
          />
        </Item>
      </GridCol>

      {/* slot menu — right */}
      <Menu>
        {slots.map(s => (
          <SlotBtn key={s.id} active={s.id === active} onClick={() => setSlot(s.id)}>
            {(locales.components as any)[s.key]}
          </SlotBtn>
        ))}
      </Menu>
    </Row>
  );
};

export default Components;
