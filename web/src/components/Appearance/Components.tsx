import { useNuiState } from '../../hooks/nuiState';

import Section from './components/Section';
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

const Components = ({
  settings,
  data,
  storedData,
  model,
  handleComponentDrawableChange,
  handleComponentTextureChange,
}: ComponentsProps) => {
  const { locales } = useNuiState();

  const settingsById = settings.reduce((object, { component_id, drawable, texture }) => {
    return { ...object, [component_id]: { drawable, texture } };
  }, {} as DataById<Omit<ComponentSettings, 'component_id'>>);

  const componentsById: any = data.reduce((object, { component_id, drawable, texture }) => {
    return { ...object, [component_id]: { drawable, texture } };
  }, {} as DataById<Omit<PedComponent, 'component_id'>>);

  const storedComponentsById: any = storedData.reduce((object, { component_id, drawable, texture }) => {
    return { ...object, [component_id]: { drawable, texture } };
  }, {} as DataById<Omit<PedComponent, 'component_id'>>);

  if (!locales) {
    return null;
  }

  return (
    <Section title={locales.components.title}>
      {COMPONENT_ITEMS.map(({ id, key }) => {
        if (!settingsById[id] || !componentsById[id]) return null;

        const imageFor =
          CLOTHING_IMAGE_BASE && model
            ? (v: number) => `${CLOTHING_IMAGE_BASE}${model}_${id}_${v}.png`
            : undefined;

        return (
          <Item key={id} title={(locales.components as any)[key]}>
            <ThumbGrid
              label={locales.components.drawable}
              min={settingsById[id].drawable.min}
              max={settingsById[id].drawable.max}
              value={componentsById[id].drawable}
              storedValue={storedComponentsById[id]?.drawable}
              onSelect={v => handleComponentDrawableChange(id, v)}
              imageFor={imageFor}
            />
            <Input
              title={locales.components.texture}
              min={settingsById[id].texture.min}
              max={settingsById[id].texture.max}
              defaultValue={componentsById[id].texture}
              clientValue={storedComponentsById[id]?.texture}
              onChange={value => handleComponentTextureChange(id, value)}
            />
          </Item>
        );
      })}
    </Section>
  );
};

export default Components;
