import { useSubId } from "hooks/useSubId";
import Image from "next/image";
import Link from "next/link";
import { api } from "utils/api";

export interface AdditionalImagesProps {
  breedId: string;
}

export const AdditionalImages = ({ breedId }: AdditionalImagesProps) => {
  const subId = useSubId();

  const { data } = api.images.getImages.useQuery(
    {
      breedIds: [breedId],
      limit: 10,
      subId,
    },
    { enabled: Boolean(subId) }
  );

  if (!data) return null;

  return (
    <div className="carousel rounded-box mx-4 mb-4 h-32">
      {data.map((imageData) => {
        return (
          <div key={imageData.id} className="carousel-item">
            <Link href={`image/${imageData.id}`}>
              <Image
                src={imageData.image.src}
                alt={imageData.breed?.name || "Unknown breed"}
                width={imageData.image.width}
                className="h-full w-auto"
                height={imageData.image.height}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};
