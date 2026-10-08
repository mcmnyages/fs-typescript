import axios from 'axios';
import { useState, type FormEvent } from 'react';
import diaryService from '../services/diaryService';
import type {
  DiaryEntry,
  NewDiaryEntry,
  Weather,
  Visibility,
} from '../types/diary';
import type { ErrorResponse } from '../types/errorTypes';

interface Props {
  onCreated: (diary: DiaryEntry) => void;
  setNotification: (message: string) => void;
}

const DiaryForm = ({ onCreated, setNotification }: Props) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>('sunny');
  const [visibility, setVisibility] = useState<Visibility>('good');
  const [comment, setComment] = useState('');

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newDiary: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    try {
      const createdDiary = await diaryService.create(newDiary);

      onCreated(createdDiary);
      setNotification('');

      setDate('');
      setWeather('sunny');
      setVisibility('good');
      setComment('');
    } catch (error: unknown) {
      if (axios.isAxiosError<ErrorResponse>(error)) {
        const message = error.response?.data.error.message;

        setNotification(message ?? error.message);
      } else {
        setNotification('An unknown error occurred');
      }
    }
  };

  return (
    <form onSubmit={submit}>
      <div>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
      </div>

      <div>
        <label htmlFor="weather">Weather</label>
        <select
          id="weather"
          value={weather}
          onChange={({ target }) => setWeather(target.value as Weather)}
        >
          <option value="sunny">Sunny</option>
          <option value="rainy">Rainy</option>
          <option value="cloudy">Cloudy</option>
          <option value="stormy">Stormy</option>
          <option value="windy">Windy</option>
        </select>
      </div>

      <div>
        <label htmlFor="visibility">Visibility</label>
        <select
          id="visibility"
          value={visibility}
          onChange={({ target }) =>
            setVisibility(target.value as Visibility)
          }
        >
          <option value="great">Great</option>
          <option value="good">Good</option>
          <option value="ok">Okay</option>
          <option value="poor">Poor</option>
        </select>
      </div>

      <div>
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
      </div>

      <button type="submit">Add diary entry</button>
    </form>
  );
};

export default DiaryForm;