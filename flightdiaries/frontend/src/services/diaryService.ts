import axios from 'axios';
import type { DiaryEntry } from '../types/diary';

const baseUrl = 'http://localhost:3000';

const getAll = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(`${baseUrl}/api/diaries`);
  return response.data;
};

export default {
  getAll,
};