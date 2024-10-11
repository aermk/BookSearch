export type FiltredBook = {
  author: string;
  title: string;
  editionCount: number;
  firstPublishYear: string | number;
};

export type FiltredBookWithNumFound = {
  numFound: number;
  docs: FiltredBook[];
};

export type ApiBooksResponse = {
  numFound: number;
  docs: ApiBook[];
};

export type ApiBook = {
  author_name?: string[];
  title: string;
  edition_count: number;
  first_publish_year?: number;
};

export type HomePageProps = {
  onSearch: (query: string) => void;
  averageDuration: number;
  bookListOnPage: FiltredBook[];
  loading: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
  numAllBooks: number;
  query: string | number;
};

export type BookListProps = {
  bookListOnPage: FiltredBook[];
  loading: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
  numAllBooks: number;
  query: string | number;
};
