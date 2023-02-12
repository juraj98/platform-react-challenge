import { createTRPCRouter } from "./trpc";
import { env } from "../../env.mjs";
import { imagesRouter } from "./routers/images";
import axios from "axios";
import { breedsRouter } from "./routers/breeds";
import { favoritesRouter } from "./routers/favorites";

axios.defaults.params = {
  api_key: env.CAT_API_KEY,
};

export const appRouter = createTRPCRouter({
  images: imagesRouter,
  breeds: breedsRouter,
  favorites: favoritesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
