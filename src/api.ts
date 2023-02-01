import axios from "axios";
import { z } from "zod";
import { clientEnv } from "./env/schema.mjs";
import { CatBreed, CatData } from "./schema";

axios.defaults.params = {
  api_key: clientEnv.NEXT_PUBLIC_CAT_API_KEY,
};

export const getImages = async (
  params: {
    limit?: number;
    page?: number;
    order?: "ASC" | "DESC" | "RAND";
    hasBreeds?: boolean;
    breedIds?: string[];
    categoryIds?: string[];
    subId?: string;
  } = {}
) => {
  const response = await axios.get(
    "https://api.thecatapi.com/v1/images/search",
    {
      params: {
        ...params,
        has_breeds:
          params.hasBreeds === undefined ? undefined : Number(params.hasBreeds),
        breed_ids: params.breedIds?.join(","),
        category_ids: params.categoryIds?.join(","),
        sub_id: params.subId,
      },
    }
  );

  return z.array(CatData).parse(response.data);
};

export const getImageById = async (imageId: string) => {
  const response = await axios.get(
    `https://api.thecatapi.com/v1/images/${imageId}`
  );

  return CatData.parse(response.data);
};

export const getBreeds = async (
  params: {
    limit?: number;
    page?: number;
  } = {}
) => {
  const response = await axios.get("https://api.thecatapi.com/v1/breeds", {
    params,
  });

  return z.array(CatBreed).parse(response.data);
};

export const getBreedById = async (breedId: string) => {
  const response = await axios.get(
    `https://api.thecatapi.com/v1/breeds/${breedId}`
  );

  return CatBreed.parse(response.data);
};

export const getFavorites = async (subId: string) => {
  const response = await axios.get("https://api.thecatapi.com/v1/favourites", {
    params: {
      sub_id: subId,
    },
  });

  return z.array(CatData).parse(response.data);
};

export const setFavorite = async (imageId: string, subId: string) => {
  return await axios.post("https://api.thecatapi.com/v1/favourites", {
    image_id: imageId,
    sub_id: subId,
  });
};

export const deleteFavorite = async (imageId: string, subId: string) => {
  return await axios.delete(
    `https://api.thecatapi.com/v1/favourites/${imageId}`,
    {
      params: {
        sub_id: subId,
      },
    }
  );
};
