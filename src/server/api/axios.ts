import axios from "axios";
import { env } from "../../env.mjs";

axios.defaults.params = {
  api_key: env.CAT_API_KEY,
};
