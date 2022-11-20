export const reflauntLoader = ({
  src,
  width,
  quality,
}: {
  src: string | undefined;
  width?: number | undefined;
  quality?: number | undefined;
}) => {
  if (width && src) {
    const arr_src = src.split("/");
    if (
      arr_src.find((i) => i === "assets") ||
      arr_src[2] === "s3.eu-west-3.amazonaws.com" ||
      arr_src[2] === "media.gannirepeat.com" ||
      arr_src[2] === "media-dev2074.ganni-repeat.com" ||
      arr_src[2] === "media-dev.reflaunt.com" ||
      arr_src[2] === "media.reflaunt.com"
    ) {
      return src;
    }
    return `${process.env.NEXT_PUBLIC_MEDIA_URL}/${arr_src[1]}/${
      arr_src[2]
    }/${width}x/${arr_src[3]}?q=${quality || 75}`;
  }
  return "";
};
