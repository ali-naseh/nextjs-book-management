interface Author {
  firstName: string;
  lastName: string;
  id: number;
}

export interface Book {
  id: number;
  title: string;
  coverUri: string;
  authors: Author[];
  price: number;
  rating: number;
  isAudio: boolean;
  isInfinity: boolean;
  createdAt: Date;
}

export interface GetBooksRes {
  bookList: {
    books: Book[];
  };
  hasMore: boolean;
  nextOffset: string;
}

export interface GetBooksReq {
  nextOffset: string;
  filter: BookFilters;
  order: number;
}

export interface BookFilters {
  audio: boolean;
  infinity?: boolean;
}
