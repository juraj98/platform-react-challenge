import axios from "axios";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { ImageBreedData, normalizeBreedData } from "./breeds";

export const ImageData = z.object({
  id: z.string(),
  breeds: z.array(ImageBreedData).optional(),
  height: z.number(),
  width: z.number(),
  url: z.string(),
});

export const normalizeImageData = (imageData: z.infer<typeof ImageData>) => {
  const breed = imageData.breeds?.[0];

  return {
    id: imageData.id,
    image: {
      height: imageData.height,
      width: imageData.width,
      src: imageData.url,
      alt: breed?.name ?? "Cat",
    },
    breed: breed ? normalizeBreedData(breed) : null,
  };
};

export type NormalizedImageData = ReturnType<typeof normalizeImageData>;

export const imagesRouter = createTRPCRouter({
  getImages: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        page: z.number().optional(),
        breedIds: z.string().array().optional(),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ input }) => {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search",
        {
          params: {
            breed_ids: input.breedIds?.join(","),
            has_breeds: 1,
            limit: input.limit,
            page: input.cursor,
            sub_id: input.subId,
            order: "ASC",
          },
        }
      );

      return z.array(ImageData).parse(response.data).map(normalizeImageData);
    }),

  getImageById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const response = await axios.get(
        `https://api.thecatapi.com/v1/images/${input.id}`
      );

      return normalizeImageData(ImageData.parse(response.data));
    }),

  getImagesByBreedId: publicProcedure
    .input(z.object({ id: z.string(), limit: z.number().optional() }))
    .query(async ({ input }) => {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search",
        {
          params: {
            breed_ids: input.id,
            has_breeds: 1,
            limit: input.limit ?? 1,
            sub_id: input.subId,
          },
        }
      );

      return z.array(ImageData).parse(response.data).map(normalizeImageData);
    }),
});
