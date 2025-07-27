export interface IOneResponse {
  is_error: boolean;
  code: string;
  message: string;
  data: Object | null;
  error: Object | null;
}
export interface IManyResponse {
  is_error: boolean;
  code: string;
  message: string;
  total: number;
  data: Object | null;
  error: Object | null;
}
