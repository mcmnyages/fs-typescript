import type { DiaryEntry as DiaryEntryType } from '../types/diary';

interface Props {
  diary: DiaryEntryType;
}

const DiaryEntry = ({ diary }: Props) => {
  return (
    <article>
      <h2>{diary.date}</h2>
      <p>Weather: {diary.weather}</p>
      <p>Visibility: {diary.visibility}</p>
    </article>
  );
};

export default DiaryEntry;