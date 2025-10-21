import { MEDIA_URL } from "@/constants/variables";

export const handleImageSrc = (img: string) => {
  if (img.includes("storage/images")) {
    return MEDIA_URL?.concat(img);
  } else {
    return img;
  }
};
