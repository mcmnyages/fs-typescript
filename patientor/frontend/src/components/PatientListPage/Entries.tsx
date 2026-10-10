import type { Entry } from '../../types';

interface Props {
  entries: Entry[];
}

const Entries = ({ entries }: Props) => {
  return (
    <div>
      <h3>Entries</h3>

      {entries.map((entry) => (
        <div
          key={entry.id}
          style={{
            border: '1px solid gray',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '10px',
          }}
        >
          <p>
            <strong>{entry.date}</strong>
          </p>

          <p>{entry.description}</p>

          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
            <div>
              <strong>Diagnosis codes:</strong>
              <ul>
                {entry.diagnosisCodes.map((code) => (
                  <li key={code}>{code}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Entries;