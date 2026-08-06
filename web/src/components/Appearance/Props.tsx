import { useState } from 'react';
import styled from 'styled-components';
import { useNuiState } from '../../hooks/nuiState';

import Item from './components/Item';
import Input from './components/Input';
import ThumbGrid from './components/ThumbGrid';
import { PROPS_IMAGE_BASE } from '../../config';

import { PropSettings, PedProp } from './interfaces';

interface PropsProps {
  settings: PropSettings[];
  data: PedProp[];
  storedData: PedProp[];
  model?: string;
  handlePropDrawableChange: (prop_id: number, drawable: number) => void;
  handlePropTextureChange: (prop_id: number, texture: number) => void;
}

interface DataById<T> {
  [key: number]: T;
}

// prop_id → locale key
const PROP_ITEMS: { id: number; key: string }[] = [
  { id: 0, key: 'hats' },
  { id: 1, key: 'glasses' },
  { id: 2, key: 'ear' },
  { id: 6, key: 'watches' },
  { id: 7, key: 'bracelets' },
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

const Menu = styled.div`
  width: 128px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
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

const Props = ({
  settings,
  data,
  storedData,
  model,
  handlePropDrawableChange,
  handlePropTextureChange,
}: PropsProps) => {
  const { locales } = useNuiState();
  const [slot, setSlot] = useState(PROP_ITEMS[0].id);

  const settingsById = settings.reduce((object, { prop_id, drawable, texture }) => {
    return { ...object, [prop_id]: { drawable, texture } };
  }, {} as DataById<Omit<PropSettings, 'prop_id'>>);

  const propsById: any = data.reduce((object, { prop_id, drawable, texture }) => {
    return { ...object, [prop_id]: { drawable, texture } };
  }, {} as DataById<Omit<PedProp, 'prop_id'>>);

  const storedPropsById: any = storedData.reduce((object, { prop_id, drawable, texture }) => {
    return { ...object, [prop_id]: { drawable, texture } };
  }, {} as DataById<Omit<PedProp, 'prop_id'>>);

  if (!locales) return null;

  const slots = PROP_ITEMS.filter(s => settingsById[s.id] && propsById[s.id]);
  const active = slots.some(s => s.id === slot) ? slot : slots[0]?.id;
  if (active == null) return null;

  const id = active;
  const imageFor =
    PROPS_IMAGE_BASE && model
      ? (v: number) => `${PROPS_IMAGE_BASE}${model}_p${id}_${v}.jpg`
      : undefined;

  return (
    <Row>
      <GridCol>
        <ThumbGrid
          label={(locales.props as any)[PROP_ITEMS.find(s => s.id === id)!.key]}
          min={settingsById[id].drawable.min}
          max={settingsById[id].drawable.max}
          value={propsById[id].drawable}
          storedValue={storedPropsById[id]?.drawable}
          onSelect={v => handlePropDrawableChange(id, v)}
          imageFor={imageFor}
        />
        <Item title={locales.props.texture}>
          <Input
            title={locales.props.texture}
            min={settingsById[id].texture.min}
            max={settingsById[id].texture.max}
            defaultValue={propsById[id].texture}
            clientValue={storedPropsById[id]?.texture}
            onChange={value => handlePropTextureChange(id, value)}
          />
        </Item>
      </GridCol>

      <Menu>
        {slots.map(s => (
          <SlotBtn key={s.id} active={s.id === active} onClick={() => setSlot(s.id)}>
            {(locales.props as any)[s.key]}
          </SlotBtn>
        ))}
      </Menu>
    </Row>
  );
};

export default Props;
