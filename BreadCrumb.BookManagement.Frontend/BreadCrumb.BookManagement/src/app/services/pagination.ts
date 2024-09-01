import { Book } from "../book";

export interface PaginatedResponse {
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    items: Book[];
}
  