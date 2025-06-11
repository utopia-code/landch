export class VideoDTO {
    id!: number;
    url!: string;
    thumbnail!: string;
    preview!: string;
    tags!: string[];
    isFavourite!: boolean;
    format!: string;
    showPreview!: boolean;

    constructor(data: Partial<VideoDTO> = {}) {
        Object.assign(this, data);
      }
}