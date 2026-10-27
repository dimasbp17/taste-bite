import axios from 'axios';

const client = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
});

const get = async (path, params) => {
  const response = await client.get(path, { params });
  return response.data;
};

// TheMealDB returns `null` (or occasionally a string) instead of an empty list.
const asList = (value) => (Array.isArray(value) ? value : []);

export const searchMeals = async (query = '') =>
  asList((await get('/search.php', { s: query })).meals);

export const getMealById = async (id) =>
  asList((await get('/lookup.php', { i: id })).meals)[0] || null;

export const getRandomMeal = async () =>
  asList((await get('/random.php')).meals)[0] || null;

export const getCategories = async () =>
  asList((await get('/categories.php')).categories);

export const filterByCategory = async (category) =>
  asList((await get('/filter.php', { c: category })).meals);

export const filterByArea = async (area) =>
  asList((await get('/filter.php', { a: area })).meals);

export const filterByIngredient = async (ingredient) =>
  asList((await get('/filter.php', { i: ingredient })).meals);

export const getIngredientList = async () =>
  asList((await get('/list.php', { i: 'list' })).meals)
    .map((item) => item.strIngredient?.trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

export const getIngredients = (meal) =>
  Array.from({ length: 20 }, (_, i) => ({
    name: meal[`strIngredient${i + 1}`]?.trim(),
    measure: meal[`strMeasure${i + 1}`]?.trim(),
  })).filter((item) => item.name);

// Instructions come as free text: some use "STEP 1" markers, some numbered
// lines, most just line breaks. Normalise all of them into a list of steps.
export const getSteps = (instructions = '') =>
  instructions
    .split(/\r?\n|(?=STEP \d+)/i)
    .map((line) =>
      line
        .trim()
        .replace(/^step\s*\d+[:.)-]?\s*/i, '')
        .replace(/^\d+[.)]\s+/, '')
    )
    .filter((line) => line && !/^\d+[.)]?$/.test(line));

export const getIngredientImage = (name) =>
  `https://www.themealdb.com/images/ingredients/${encodeURIComponent(name)}-small.png`;

export const getYoutubeId = (url = '') =>
  url?.match(/(?:[?&]v=|youtu\.be\/|\/embed\/)([\w-]{11})/)?.[1];
