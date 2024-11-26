import { Part } from "./parts";

export interface Build {
    id?: number;
    name: string;
    userId: number; 
    parts: Part[];
    totalPrice: number;
    imageUrl?: string; 
}