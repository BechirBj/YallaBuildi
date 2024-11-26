import { Part } from "./parts";

export interface PreBuilt {
    id?: number;
    name: string;
    parts: Part[];
    totalPrice: number;
    description: string;
    imageUrl: string; 
  }