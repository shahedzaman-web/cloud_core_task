import config from "./constants";


export const getImageUrl = (folder: string, image: string) =>
    `${config.IMAGE_BASE}/${folder}/${image}`;