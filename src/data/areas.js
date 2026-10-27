// TheMealDB lists ~200 areas, but most have no recipes. These are the
// cuisines with recipes and a photo in /public/images.
const areaNames = [
  'American',
  'British',
  'Canadian',
  'Chinese',
  'Croatian',
  'Dutch',
  'Egyptian',
  'Filipino',
  'French',
  'Greek',
  'Indian',
  'Irish',
  'Italian',
  'Jamaican',
  'Japanese',
  'Kenyan',
  'Malaysian',
  'Mexican',
  'Moroccan',
  'Polish',
  'Portuguese',
  'Russian',
  'Spanish',
  'Thai',
  'Tunisian',
  'Turkish',
  'Ukrainian',
  'Vietnamese',
];

const areas = areaNames.map((name) => ({
  name,
  image: `/images/${name.toLowerCase()}.jpg`,
}));

export const getAreaImage = (name) =>
  areas.find((area) => area.name === name)?.image;

export default areas;
