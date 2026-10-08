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



const weatherOptions: Weather[] = [
  'sunny',
  'rainy',
  'cloudy',
  'stormy',
  'windy',
];

const visibilityOptions: Visibility[] = [
  'great',
  'good',
  'ok',
  'poor',
];

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
        const message = error.response?.data.error[0]?.message;

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

      <fieldset>
        <legend>Weather</legend>

        {weatherOptions.map(option => (
          <label key={option}>
            <input
              type="radio"
              name="weather"
              value={option}
              checked={weather === option}
              onChange={() => setWeather(option)}
            />
            {option}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Visibility</legend>

        {visibilityOptions.map(option => (
          <label key={option}>
            <input
              type="radio"
              name="visibility"
              value={option}
              checked={visibility === option}
              onChange={() => setVisibility(option)}
            />
            {option}
          </label>
        ))}
      </fieldset>

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