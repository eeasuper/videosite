export class Video{
  h3: string;
  thumbnail: string;
  uploader: string;
  views: string;
  order: number;
  url: string;
}

export class Playlist{
  name: string;
  updated: string;
  id: number;
  list: Video[];
  edit_url: string;
  uploader_id: number;
}

export class Playlists{
  playlists: Playlist[];
  uploader_id:number;
}