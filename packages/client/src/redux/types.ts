export interface IPageOption {
  page?: number;
  take?: number;
  q?: string;
}

export interface IMetaData {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemCount: number;
  page: number;
  pageCount: number;
  take: number;
}

export interface IPageResponse<T> {
  data: T[];
  meta: IMetaData;
}
