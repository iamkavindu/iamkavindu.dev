const AVAILABLE_WIDTHS = [256, 384, 512, 640, 768, 1024, 1280];

function findClosestWidth(width: number): number {
  return AVAILABLE_WIDTHS.reduce((prev, curr) =>
    Math.abs(curr - width) < Math.abs(prev - width) ? curr : prev
  );
}

export default function imageLoader({ src, width, quality = 85 }: { src: string; width: number; quality?: number }) {
  // External URLs pass through unchanged
  if (!src.startsWith('/')) {
    return src;
  }

  const extension = src.split('.').pop();
  const basePath = src.replace(`.${extension}`, '');
  const closestWidth = findClosestWidth(width);
  return `${basePath}-${closestWidth}w-q${quality}.webp`;
}