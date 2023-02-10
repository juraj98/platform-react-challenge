import type { NormalizedCatData } from "../../../api";

export interface CatTagsProps {
  catData: NormalizedCatData;
}

const CatTags = ({ catData }: CatTagsProps) => {
  const breed = catData.breeds?.[0];

  if (!breed) return null;

  return (
    <div className="max-h-full w-96 overflow-auto p-4">
      <ul className="flex flex-wrap items-center gap-2">
        {breed.tags.map((tag, index) => (
          <li key={index} className="badge-primary badge whitespace-pre">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CatTags;
