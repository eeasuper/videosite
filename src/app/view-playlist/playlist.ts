export class Video{
  h3: string;
  thumbnail: string;
  uploader: string;
  views: string;
  order: number;
}

export class Playlist{
  name: string;
  created: string;
  list: Video[];
}

export class Playlists{
  playlists: Playlist[];
}