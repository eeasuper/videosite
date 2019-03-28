export class Video{
  h3: string;
  thumbnail: string;
  uploader: string;
  views: string;
  order: number;
}

export class Playlist{
  name: string;
  updated: string;
  id: number;
  list: Video[];
}

export class Playlists{
  playlists: Playlist[];
}