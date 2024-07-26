export interface Movie {
  id: string;
  title: string;
  summary: string;
}

export interface Pagination {
  page: number;
  perPage: number;
  totalPages: number;
}

export interface MoviesData {
  movies: {
    nodes: Movie[];
    pagination: Pagination;
  };
}
