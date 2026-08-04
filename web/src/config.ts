// Optional clothing/prop thumbnail image pack.
//
// GTA has no runtime API to render clothing thumbnails, so real images need a
// pre-generated pack. When a base is set, ThumbGrid loads each tile from:
//   `${BASE}${model}_${componentOrPropId}_${drawable}.png`
// e.g. clothing/mp_m_freemode_01_11_5.png  (jackets, drawable 5)
// Any missing image silently falls back to a numbered tile, so the grid works
// with or without a pack. Point BASE at files shipped under web/dist (relative,
// e.g. 'clothing/') or an absolute https URL.
export const CLOTHING_IMAGE_BASE = 'https://cfx-nui-fivem-appearance/images/clothing/';
export const PROPS_IMAGE_BASE = 'https://cfx-nui-fivem-appearance/images/props/';
