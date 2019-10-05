export interface Root {
  data: GifObj[];
  pagination: Pagination;
  meta: Meta;
}

export interface GifObj {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: Images;
  user: User;
  analytics: Analytics;
}

export interface Images {
  fixed_height_still: FixedHeightStill;
  original_still: OriginalStill;
  fixed_width: FixedWidth;
  fixed_height_small_still: FixedHeightSmallStill;
  fixed_height_downsampled: FixedHeightDownsampled;
  preview: Preview;
  fixed_height_small: FixedHeightSmall;
  downsized_still: DownsizedStill;
  downsized: Downsized;
  downsized_large: DownsizedLarge;
  fixed_width_small_still: FixedWidthSmallStill;
  preview_webp: PreviewWebp;
  fixed_width_still: FixedWidthStill;
  fixed_width_small: FixedWidthSmall;
  downsized_small: DownsizedSmall;
  fixed_width_downsampled: FixedWidthDownsampled;
  downsized_medium: DownsizedMedium;
  original: Original;
  fixed_height: FixedHeight;
  looping: Looping;
  original_mp4: OriginalMp4;
  preview_gif: PreviewGif;
  '480w_still': N480WStill;
}

export interface FixedHeightStill {
  height: string;
  size: string;
  url: string;
  width: string;
}

export interface OriginalStill {
  height: string;
  size: string;
  url: string;
  width: string;
}

export interface FixedWidth {
  height: string;
  mp4: string;
  mp4_size: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}

export interface FixedHeightSmallStill {
  height: string;
  size: string;
  url: string;
  width: string;
}

export interface FixedHeightDownsampled {
  height: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}

export interface Preview {
  height: string;
  mp4: string;
  mp4_size: string;
  width: string;
}

export interface FixedHeightSmall {
  height: string;
  mp4: string;
  mp4_size: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}

export interface DownsizedStill {
  height: string;
  size: string;
  url: string;
  width: string;
}

export interface Downsized {
  height: string;
  size: string;
  url: string;
  width: string;
}

export interface DownsizedLarge {
  height: string;
  size: string;
  url: string;
  width: string;
}

export interface FixedWidthSmallStill {
  height: string;
  size: string;
  url: string;
  width: string;
}

export interface PreviewWebp {
  height: string;
  size: string;
  url: string;
  width: string;
}

export interface FixedWidthStill {
  height: string;
  size: string;
  url: string;
  width: string;
}

export interface FixedWidthSmall {
  height: string;
  mp4: string;
  mp4_size: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}

export interface DownsizedSmall {
  height: string;
  mp4: string;
  mp4_size: string;
  width: string;
}

export interface FixedWidthDownsampled {
  height: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}

export interface DownsizedMedium {
  height: string;
  size: string;
  url: string;
  width: string;
}

export interface Original {
  frames: string;
  hash: string;
  height: string;
  mp4: string;
  mp4_size: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}

export interface FixedHeight {
  height: string;
  mp4: string;
  mp4_size: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}

export interface Looping {
  mp4: string;
  mp4_size: string;
}

export interface OriginalMp4 {
  height: string;
  mp4: string;
  mp4_size: string;
  width: string;
}

export interface PreviewGif {
  height: string;
  size: string;
  url: string;
  width: string;
}

export interface N480WStill {
  url: string;
  width: string;
  height: string;
}

export interface User {
  avatar_url: string;
  banner_url: string;
  banner_image: string;
  profile_url: string;
  username: string;
  display_name: string;
  is_verified: boolean;
}

export interface Analytics {
  onload: Onload;
  onclick: Onclick;
  onsent: Onsent;
}

export interface Onload {
  url: string;
}

export interface Onclick {
  url: string;
}

export interface Onsent {
  url: string;
}

export interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}

export interface Meta {
  status: number;
  msg: string;
  response_id: string;
}
