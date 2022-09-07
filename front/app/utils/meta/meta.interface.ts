import { StaticImageData } from "next/image";

export interface ISeo {
    title: string,
    description?: string,
    image?: string,
    children: React.ReactNode
}