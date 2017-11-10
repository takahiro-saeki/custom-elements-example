import fetch from 'isomorphic-fetch';

const path = 'https://api.photozou.jp/rest/search_public.json?keyword="海"';

const api = async () => {
  try {
    const res = await fetch(path);
    const json = await res.json();
    return json;
  } catch (err) {
    return err;
  }
};

export default api;
