import type { DiaryEntry } from '../types';

interface DiaryEntryArray {
  diaryEntries: DiaryEntry[]
}


const Diary = ({ diaryEntries }: DiaryEntryArray ) => {
   return(
    <div>
      <h1>Diary</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Weather</th>
              <th>Visibility</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
          {
            diaryEntries.map(entry => 
              (
        
                      <tr key={entry.id}>
                        <td>{entry.date}</td>
                        <td>{entry.weather}</td>
                        <td>{entry.visibility}</td>
                        <td>{entry.comment}</td>
                      </tr>
              )
            )
          }
          </tbody>
        </table>
      </div>
    </div>
  ) 
}

export default Diary;