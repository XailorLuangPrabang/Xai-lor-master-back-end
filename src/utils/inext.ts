import { IManyResponse, IOneResponse } from "../types/base";

export const handleSuccessManyResponse = ({
  code,
  message,
  total,
  data,
}: {
  code: string;
  message: string;
  total: number;
  data: Object;
}): IManyResponse => {
  return {
    is_error: false,
    code,
    message,
    total,
    data,
    error: null,
  };
};
export const handleSuccessOneRepones = ({
  code,
  message,
  data,
}: {
  code: string;
  message: string;
  data: Object;
}): IOneResponse => {
  return {
    is_error: false,
    code,
    message,
    data,
    error: null,
  };
};
export const handleErrorManyResponse = ({
  code,
  message,
  error,
}: {
  code: string;
  message: string;
  error: Object;
}): IManyResponse => {
  return {
    is_error: true,
    code,
    message,
    total: 0,
    data: null,
    error,
  };
};
export const handleErrorOneResponse = ({
  code,
  message,
  error,
}: {
  code: string;
  message: string;
  error: Object;
}): IOneResponse => {
  return {
    is_error: true,
    code,
    message,
    data: null,
    error,
  };
};