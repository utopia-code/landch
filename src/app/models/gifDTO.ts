export class GifDTO {
    id!: number;
    url!: string;
    tags!: string[];
    format!: string;

    constructor(data: Partial<GifDTO> = {}) {
        Object.assign(this, data);
      }
}