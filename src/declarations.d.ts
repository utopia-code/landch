declare module 'masonry-layout' {
    export default class Masonry {
      constructor(selector: Element | string, options?: any);
      layout(): void;
      destroy(): void;
    }
}

declare module 'fslightbox' {
  const fslightbox: any;
  export default fslightbox;
}