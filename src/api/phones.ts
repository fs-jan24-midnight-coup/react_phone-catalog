import { Phone } from '../Types/Phone';
import { client } from '../utils/fetchClient';

export const getPhones = () => {
  return client.get<Phone[]>(`/phones.json`);
};
