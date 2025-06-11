export class ImageDTO {
    id!: number;
    url!: string;
    thumbnail!: string;
    webp!: string;
    tags!: string[];
    isFavourite!: boolean;
    format!: string;

    constructor(data: Partial<ImageDTO> = {}) {
        Object.assign(this, data);
      }
}