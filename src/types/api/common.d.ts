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

export interface PaginationData {
  current_page: number;
  total: number;
  last_page: number;
  from: number;
  to: number;
  page_size: number;
}
