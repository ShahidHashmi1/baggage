import { Club } from "./club.model";

export interface Profile {
    id: number;
    name: string;
    bag: Club[];
  }