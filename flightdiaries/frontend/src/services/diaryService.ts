import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry } from '../types/diary';

const baseUrl = 'http://localhost:3000';

const getAll = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(`${baseUrl}/api/diaries`);
  return response.data;
};

const create = async (diary: NewDiaryEntry): Promise<DiaryEntry> => {
  const response = await axios.post<DiaryEntry>(`${baseUrl}/api/diaries`, diary);
  console.log('Resp',response)
  return response.data;
};

export default {
  getAll,
  create,
};