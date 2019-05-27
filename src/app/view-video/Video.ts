export class Video{
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

export class Videos{
  videoList: Video[];
}