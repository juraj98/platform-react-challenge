import axios from "axios";
import { z } from "zod";
import { clientEnv } from "./env/schema.mjs";

axios.defaults.params = {
  api_key: clientEnv.NEXT_PUBLIC_CAT_API_KEY,
};

export const CatStat = z.number().min(0).max(5).int();

export const CatBool = z.number().min(0).max(1).int();

export const CatBreed = z.object({
  alt_names: z.string().optional(),
  country_code: z.string(),
  country_codes: z.string(),
  description: z.string(),
  id: z.string(),
  life_span: z.string(),
  name: z.string(),
  origin: z.string(),
  reference_image_id: z.string().optional(),
  temperament: z.string(),
  weight: z.object({
    imperial: z.string(),
    metric: z.string(),
  }),

  cfa_url: z.string().optional(),
  vcahospitals_url: z.string().optional(),
  vetstreet_url: z.string().optional(),
  wikipedia_url: z.string().optional(),

  experimental: CatBool.optional(),
  hairless: CatBool.optional(),
  hypoallergenic: CatBool.optional(),
  indoor: CatBool.optional(),
  natural: CatBool.optional(),
  rare: CatBool.optional(),
  rex: CatBool.optional(),
  short_legs: CatBool.optional(),
  suppressed_tail: CatBool.optional(),

  adaptability: CatStat.optional(),
  affection_level: CatStat.optional(),
  bidability: CatStat.optional(),
  energy_level: CatStat.optional(),
  grooming: CatStat.optional(),
  health_issues: CatStat.optional(),
  intelligence: CatStat.optional(),
  lap: CatStat.optional(),
  shedding_level: CatStat.optional(),
  social_needs: CatStat.optional(),
  vocalisation: CatStat.optional(),

  cat_friendly: CatStat.optional(),
  child_friendly: CatStat.optional(),
  dog_friendly: CatStat.optional(),
  stranger_friendly: CatStat.optional(),
});

export type CatBreed = z.infer<typeof CatBreed>;

export const CatData = z.object({
  id: z.string(),
  breeds: z.array(CatBreed).optional(),
  height: z.number(),
  width: z.number(),
  url: z.string(),
});

export type CatData = z.infer<typeof CatData>;

export const normalizeBreed = (breed: CatBreed) => ({
  altNames: breed.alt_names,
  countryCode: breed.country_codes.split(", "),
  description: breed.description,
  id: breed.id,
  lifeSpan: breed.life_span.split(", ").map((value) => parseInt(value, 10)),
  name: breed.name,
  origin: breed.origin,
  referenceImageId: breed.reference_image_id,
  temperament: breed.temperament.split(", "),
  wright: {
    imperial: breed.weight.imperial
      .split(" - ")
      .map((value) => parseInt(value, 10)),
    metric: breed.weight.imperial
      .split(" - ")
      .map((value) => parseInt(value, 10)),
  },
  urls: {
    cfa: breed.cfa_url,
    vcahospitals: breed.vcahospitals_url,
    vetstreet: breed.vetstreet_url,
    wikipedia: breed.wikipedia_url,
  },
  stats: {
    adaptability: breed.adaptability,
    affectionLevel: breed.affection_level,
    bidability: breed.bidability,
    energyLevel: breed.energy_level,
    grooming: breed.grooming,
    health_issues: breed.health_issues,
    intelligence: breed.intelligence,
    lap: breed.lap,
    sheddingLevel: breed.shedding_level,
    socialNeeds: breed.social_needs,
    vocalisation: breed.vocalisation,
  },
  tags: [
    breed.cat_friendly ? "Cat Friendly" : null,
    breed.child_friendly ? "Child Friendly" : null,
    breed.dog_friendly ? "Dog Friendly" : null,
    breed.experimental ? "Experimental" : null,
    breed.hairless ? "Hairless" : null,
    breed.hypoallergenic ? "Hypoallergenic" : null,
    breed.indoor ? "Indoor" : null,
    breed.natural ? "Natural" : null,
    breed.rare ? "Rare" : null,
    breed.rex ? "Rex" : null,
    breed.short_legs ? "Short Legs" : null,
    breed.stranger_friendly ? "Stranger Friendly" : null,
    breed.suppressed_tail ? "Suppressed Tail" : null,
  ].filter((value) => value) as string[],
});

export type NormalizedCatBreed = ReturnType<typeof normalizeBreed>;

export type NormalizedCatData = Omit<CatData, "breeds"> & {
  breeds: NormalizedCatBreed[];
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

  return z
    .array(CatData)
    .parse(response.data)
    .map(
      (item) =>
        ({
          ...item,
          breeds: item.breeds?.map(normalizeBreed),
        } as NormalizedCatData)
    );
};

export const getImageById = async (imageId: string) => {
  const response = await axios.get(
    `https://api.thecatapi.com/v1/images/${imageId}`
  );

  const data = CatData.parse(response.data);

  return { ...data, breeds: data.breeds?.map(normalizeBreed) };
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

  return z.array(CatBreed).parse(response.data).map(normalizeBreed);
};

export const getBreedById = async (breedId: string) => {
  const response = await axios.get(
    `https://api.thecatapi.com/v1/breeds/${breedId}`
  );

  return normalizeBreed(CatBreed.parse(response.data));
};

export const getFavorites = async (subId: string) => {
  const response = await axios.get("https://api.thecatapi.com/v1/favourites", {
    params: {
      sub_id: subId,
    },
  });

  return z
    .array(CatData)
    .parse(response.data)
    .map((item) => ({
      ...item,
      breeds: item.breeds?.map(normalizeBreed),
    }));
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
