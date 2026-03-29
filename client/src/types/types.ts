export type Playlist = {
  _id: string;
  title: string;
  thumbnail: string;
  playlistId: string;
};

export type RectangleShape = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fillColor: string;
  strokeColor: string;
};

export type CircleShape = {
  id: string;
  x: number;
  y: number;
  radius: number;
  fillColor: string;
  strokeColor: string;
};

export type ArrowShape = {
  id: string;
  points: number[];
  strokeColor: string;
};

export type ScribbleShape = {
  id: string;
  points: number[];
  strokeColor: string;
};
