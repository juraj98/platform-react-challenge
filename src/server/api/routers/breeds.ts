import axios from "axios";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { imagesRouter } from "./images";

export const ImageBreedStat = z.number().min(0).max(5).int();

export const ImageBreedAttribute = z.number().min(0).max(1).int();

export const ImageBreedData = z.object({
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

  experimental: ImageBreedAttribute.optional(),
  hairless: ImageBreedAttribute.optional(),
  hypoallergenic: ImageBreedAttribute.optional(),
  indoor: ImageBreedAttribute.optional(),
  natural: ImageBreedAttribute.optional(),
  rare: ImageBreedAttribute.optional(),
  rex: ImageBreedAttribute.optional(),
  short_legs: ImageBreedAttribute.optional(),
  suppressed_tail: ImageBreedAttribute.optional(),

  adaptability: ImageBreedStat.optional(),
  affection_level: ImageBreedStat.optional(),
  bidability: ImageBreedStat.optional(),
  energy_level: ImageBreedStat.optional(),
  grooming: ImageBreedStat.optional(),
  health_issues: ImageBreedStat.optional(),
  intelligence: ImageBreedStat.optional(),
  lap: ImageBreedStat.optional(),
  shedding_level: ImageBreedStat.optional(),
  social_needs: ImageBreedStat.optional(),
  vocalisation: ImageBreedStat.optional(),

  cat_friendly: ImageBreedStat.optional(),
  child_friendly: ImageBreedStat.optional(),
  dog_friendly: ImageBreedStat.optional(),
  stranger_friendly: ImageBreedStat.optional(),
});

export const normalizeBreedData = (
  breedData: z.infer<typeof ImageBreedData>
) => ({
  id: breedData.id,
  name: breedData.name,
  description: breedData.description,
  stats: {
    adaptability: breedData.adaptability ?? null,
    affectionLevel: breedData.affection_level ?? null,
    bidability: breedData.bidability ?? null,
    energyLevel: breedData.energy_level ?? null,
    grooming: breedData.grooming ?? null,
    health_issues: breedData.health_issues ?? null,
    intelligence: breedData.intelligence ?? null,
    sheddingLevel: breedData.shedding_level ?? null,
    socialNeeds: breedData.social_needs ?? null,
    vocalisation: breedData.vocalisation ?? null,
  },
  tags: [
    breedData.cat_friendly ? "Cat Friendly" : null,
    breedData.child_friendly ? "Child Friendly" : null,
    breedData.dog_friendly ? "Dog Friendly" : null,
    breedData.experimental ? "Experimental" : null,
    breedData.hairless ? "Hairless" : null,
    breedData.hypoallergenic ? "Hypoallergenic" : null,
    breedData.indoor ? "Indoor" : null,
    breedData.lap ? "Lap" : null,
    breedData.natural ? "Natural" : null,
    breedData.rare ? "Rare" : null,
    breedData.rex ? "Rex" : null,
    breedData.short_legs ? "Short Legs" : null,
    breedData.stranger_friendly ? "Stranger Friendly" : null,
    breedData.suppressed_tail ? "Suppressed Tail" : null,
  ].filter((value) => value) as string[],
});

export type NormalizedBreedData = ReturnType<typeof normalizeBreedData>;

export const breedsRouter = createTRPCRouter({
  getListOfBreeds: publicProcedure.query(async ({ input, ctx }) => {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");

    const breeds = z.array(ImageBreedData).parse(response.data);

    const listOfBreeds = await Promise.all(
      breeds.map(async (breed) =>
        imagesRouter
          .createCaller(ctx)
          .getImageByBreedId({ subId: input.subId, id: breed.id })
      )
    );

    return listOfBreeds.flat();
  }),
});
