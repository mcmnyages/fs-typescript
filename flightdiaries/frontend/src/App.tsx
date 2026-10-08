import { useEffect, useState } from 'react';
import DiaryForm from './components/DiaryForm';
import DiaryList from './components/DiaryList';
import Notification from './components/Notification';
import diaryService from './services/diaryService';
import type { DiaryEntry } from './types/diary';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    diaryService
      .getAll()
      .then(data => {
        setDiaries(data);
      })
      .catch(() => {
        setNotification('Failed to load diary entries');
      });
  }, []);

  const handleCreated = (diary: DiaryEntry) => {
    setDiaries(current => [...current, diary]);
  };

  return (
    <main>
      <h1>Flight Diaries</h1>

      <Notification message={notification} />

      <DiaryForm
        onCreated={handleCreated}
        setNotification={setNotification}
      />

      <DiaryList diaries={diaries} />
    </main>
  );
};

export default App;