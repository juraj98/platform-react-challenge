import axios from "axios";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import type { NormalizedImageData } from "./images";
import { imagesRouter } from "./images";

export const Favorite = z.object({
  created_at: z.string(),
  id: z.number(),
  image: z.object({
    id: z.string(),
    url: z.string(),
  }),
  image_id: z.string(),
  sub_id: z.string(),
});

export interface FavoriteData {
  id: number;
  createdAt: string;
  imageData: NormalizedImageData;
}

export const favoritesRouter = createTRPCRouter({
  getFavorites: publicProcedure.query(async ({ input, ctx }) => {
    const response = await axios.get(
      "https://api.thecatapi.com/v1/favourites",
      {
        params: {
          sub_id: input.subId,
        },
      }
    );

    const favorites = z.array(Favorite).parse(response.data);

    const listOfFavorites = await Promise.all(
      favorites.map(async (favorite) => {
        const imageData = await imagesRouter
          .createCaller(ctx)
          .getImageById({ subId: input.subId, id: favorite.image_id });

        return {
          id: favorite.id,
          createdAt: favorite.created_at,
          imageData,
        } as FavoriteData;
      })
    );

    return listOfFavorites.flat();
  }),

  setFavorite: publicProcedure
    .input(z.object({ imageId: z.string() }))
    .mutation(async ({ input }) => {
      await axios.post("https://api.thecatapi.com/v1/favourites", {
        image_id: input.imageId,
        sub_id: input.subId,
      });
    }),

  deleteFavorite: publicProcedure
    .input(z.object({ favoriteId: z.number() }))
    .mutation(async ({ input }) => {
      await axios.delete(
        `https://api.thecatapi.com/v1/favourites/${input.favoriteId}`
      );
    }),
});
