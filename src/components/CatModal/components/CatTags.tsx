export interface CatTagsProps {
  tags: string[];
}

export const CatTags = ({ tags }: CatTagsProps) => {
  return (
    <div className="max-h-full overflow-auto p-4">
      <ul className="flex flex-wrap items-center gap-2">
        {tags.map((tag, index) => (
          <li key={index} className="badge-primary badge whitespace-pre">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};
