export interface ICertification {
  id?: number;
  title: string;
  link: string;
  imageUrl: string;
  categories: string[];
  issuedDate: string | Date;
}

export const Certification = null as any;
