import type { DiaryEntry as DiaryEntryType } from '../types/diary';
import DiaryEntry from './DiaryEntry';

interface Props {
  diaries: DiaryEntryType[];
}

const DiaryList = ({ diaries }: Props) => {
  console.log('Diaries',diaries)
  return (
    <section>
      {diaries.map(diary => (
        <DiaryEntry key={diary.id} diary={diary} />
      ))}
    </section>
  );
};

export default DiaryList;