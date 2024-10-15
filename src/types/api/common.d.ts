export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  phone: string;
}

export interface FormattedUser {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
}

export interface Artist {
  id?: number;
  user_id?: number;
  name: string;
  no_of_albums_released: number;
  first_release_year: number;
  music_count?: number;
}
export interface PaginationData {
  current_page: number;
  total: number;
  last_page: number;
  from: number;
  to: number;
  page_size: number;
}

export interface Music {
  id: number;
  title: string;
  album_name: string;
  genre: string;
}
