import type { Region } from "../utils/types";

const limit = 20;

export const getRegions = async (url: string) => {
  const res:Region = await new Promise((resolve) => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => resolve(res));
  });

  if (res.count <= limit) return res

  const resp:Region = await new Promise((resolve) => {
    fetch(`${url}?offset=0&limit=${res.count}`)
      .then((res) => res.json())
      .then((res) => resolve(res));
  });

  return resp
};
