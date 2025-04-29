import { Car } from "./types";

export default function (car: Car, angle?: string, surr?: boolean): string {
  const url = new URL(
    "https://cdn.imagin.studio/getImage?customer=hrjavascript-mastery&make=BMW&modelFamily=m4"
  );
  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", car.make);
  url.searchParams.append("modelFamily", car.model);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("randomPaint", "true");
  url.searchParams.append("modelYear", car.year);

  if (angle) {
    url.searchParams.append("angle", angle);
  }

  if (surr) {
    url.searchParams.append("surrounding", "sur6");
    url.searchParams.append("viewPoint", "1");
    url.searchParams.append("aspectRatio", "32:9");
    url.searchParams.append("overlayArea", "none");
  }

  return url.href;
}
