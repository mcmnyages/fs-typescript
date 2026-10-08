import { useEffect, useState } from 'react';
import DiaryList from './components/DiaryList';
import diaryService from './services/diaryService';
import type { DiaryEntry } from './types/diary';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    diaryService
      .getAll()
      .then(data => {
        setDiaries(data);
      })
      .catch(() => {
        setError('Failed to fetch diary entries');
      });
  }, []);

  return (
    <main>
      <h1>Flight Diaries</h1>

      {error && <p>{error}</p>}

      <DiaryList diaries={diaries} />
    </main>
  );
};

export default App;
