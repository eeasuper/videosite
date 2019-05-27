import {Video} from './Video';

export interface Playlist{
  title: string;
  date: any;
  id: number;
  playlist: Video[];
  userId: number;
  username: string;
}
