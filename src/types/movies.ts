// Pagination types
export interface Pagination {
  page: number;
  perPage: number;
  totalPages: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

// Movie types
export interface Movie {
  id: string;
  title: string;
  summary: string;
}

export interface MoviesData {
  nodes: Movie[];
  pagination: {
    page: number;
    perPage: number;
    totalPages: number;
  };
}

export interface MovieListProps {
  page: number;
  perPage: number;
}

export interface MoviePageProps {
  searchParams: { page?: string };
}
