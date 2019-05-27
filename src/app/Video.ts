export interface Video{
  date: number;
  description: string;
  filename: string;
  id: number;
  thumbnail: string;
  title: string;
  uploaderId: number;
  uploaderUsername: string;
  view: number;
}

export interface Videos{
  videoList: Video[];
}