import { z } from "zod";

export const CatStat = z.number().min(0).max(5).int();

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

  adaptability: CatStat.optional(),
  affection_level: CatStat.optional(),
  bidability: CatStat.optional(),
  cat_friendly: CatStat.optional(),
  child_friendly: CatStat.optional(),
  dog_friendly: CatStat.optional(),
  energy_level: CatStat.optional(),
  experimental: CatStat.optional(),
  grooming: CatStat.optional(),
  hairless: CatStat.optional(),
  health_issues: CatStat.optional(),
  hypoallergenic: CatStat.optional(),
  indoor: CatStat.optional(),
  intelligence: CatStat.optional(),
  lap: CatStat.optional(),
  natural: CatStat.optional(),
  rare: CatStat.optional(),
  rex: CatStat.optional(),
  shedding_level: CatStat.optional(),
  short_legs: CatStat.optional(),
  social_needs: CatStat.optional(),
  stranger_friendly: CatStat.optional(),
  suppressed_tail: CatStat.optional(),
  vocalisation: CatStat.optional(),
});

export const CatData = z.object({
  id: z.string(),
  breeds: z.array(CatBreed).optional(),

  height: z.number(),
  width: z.number(),
  url: z.string(),
});
