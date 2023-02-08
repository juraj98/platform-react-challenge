import { useState } from "react";
import type { NormalizedCatData } from "../api";
import { normalizeBreed } from "../api";
import { ImageCard } from "../components/ImageCard/ImageCard";
import MainLayout from "../layouts/MainLayout";
import type { NextPageWithLayout } from "./_app";

const catData = {
  breeds: [
    {
      weight: {
        imperial: "7 - 20",
        metric: "3 - 9",
      },
      id: "tvan",
      name: "Turkish Van",
      cfa_url: "http://cfa.org/Breeds/BreedsSthruT/TurkishVan.aspx",
      vetstreet_url: "http://www.vetstreet.com/cats/turkish-van",
      vcahospitals_url:
        "https://vcahospitals.com/know-your-pet/cat-breeds/turkish-van",
      temperament: "Agile, Intelligent, Loyal, Playful, Energetic",
      origin: "Turkey",
      country_codes: "TR",
      country_code: "TR",
      description:
        "While the Turkish Van loves to jump and climb, play with toys, retrieve and play chase, she is is big and ungainly; this is one cat who doesn’t always land on his feet. While not much of a lap cat, the Van will be happy to cuddle next to you and sleep in your bed. ",
      life_span: "12 - 17",
      indoor: 0,
      alt_names: "Turkish Cat, Swimming cat",
      adaptability: 5,
      affection_level: 5,
      child_friendly: 4,
      dog_friendly: 5,
      energy_level: 5,
      grooming: 2,
      health_issues: 1,
      intelligence: 5,
      shedding_level: 3,
      social_needs: 4,
      stranger_friendly: 4,
      vocalisation: 5,
      experimental: 0,
      hairless: 0,
      natural: 1,
      rare: 0,
      rex: 0,
      suppressed_tail: 0,
      short_legs: 0,
      wikipedia_url: "https://en.wikipedia.org/wiki/Turkish_Van",
      hypoallergenic: 0,
      reference_image_id: "sxIXJax6h",
    },
  ],
  id: "r9PDjW3xP",
  url: "https://cdn2.thecatapi.com/images/r9PDjW3xP.jpg",
  width: 750,
  height: 937,
};

const normalizedCatData: NormalizedCatData = {
  ...catData,
  breeds: [normalizeBreed(catData.breeds[0])],
};

const Test: NextPageWithLayout = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button className="btn" onClick={() => setExpanded((state) => !state)}>
        {expanded ? "Expanded" : "Collapsed "}
      </button>
      <div className="mt-10 flex w-full items-center ">
        <ImageCard catData={normalizedCatData} expanded={expanded} />
      </div>
    </div>
  );
};

Test.getLayout = MainLayout;

export default Test;
