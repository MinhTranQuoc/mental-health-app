

export interface Page<T> {
    content: T[];
    pageable: {
      sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
      };
      offset: number;
      pageNumber: number;
      pageSize: number;
      unpaged: boolean;
      paged: boolean;
    };
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
  }
  