import { useNuiState } from '../../hooks/nuiState';

import Section from './components/Section';
import Item from './components/Item';
import Input from './components/Input';
import { FlexWrapper } from './styles';

import { PropSettings, PedProp } from './interfaces';

interface PropsProps {
  settings: PropSettings[];
  data: PedProp[];
  storedData: PedProp[];
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

const Props = ({ settings, data, storedData, handlePropDrawableChange, handlePropTextureChange }: PropsProps) => {
  const { locales } = useNuiState();

  const settingsById = settings.reduce((object, { prop_id, drawable, texture }) => {
    return { ...object, [prop_id]: { drawable, texture } };
  }, {} as DataById<Omit<PropSettings, 'prop_id'>>);

  const propsById: any = data.reduce((object, { prop_id, drawable, texture }) => {
    return { ...object, [prop_id]: { drawable, texture } };
  }, {} as DataById<Omit<PedProp, 'prop_id'>>);

  const storedPropsById: any = storedData.reduce((object, { prop_id, drawable, texture }) => {
    return { ...object, [prop_id]: { drawable, texture } };
  }, {} as DataById<Omit<PedProp, 'prop_id'>>);

  if (!locales) {
    return null;
  }

  return (
    <Section title={locales.props.title}>
      {PROP_ITEMS.map(({ id, key }) => {
        if (!settingsById[id] || !propsById[id]) return null;

        return (
          <Item key={id} title={(locales.props as any)[key]}>
            <FlexWrapper>
              <Input
                title={locales.props.drawable}
                min={settingsById[id].drawable.min}
                max={settingsById[id].drawable.max}
                defaultValue={propsById[id].drawable}
                clientValue={storedPropsById[id]?.drawable}
                onChange={value => handlePropDrawableChange(id, value)}
              />
              <Input
                title={locales.props.texture}
                min={settingsById[id].texture.min}
                max={settingsById[id].texture.max}
                defaultValue={propsById[id].texture}
                clientValue={storedPropsById[id]?.texture}
                onChange={value => handlePropTextureChange(id, value)}
              />
            </FlexWrapper>
          </Item>
        );
      })}
    </Section>
  );
};

export default Props;
