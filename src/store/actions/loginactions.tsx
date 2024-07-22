import { DATA } from './types';

export const setData = (data: string) => ({
  type: DATA,
  payload: data,
});