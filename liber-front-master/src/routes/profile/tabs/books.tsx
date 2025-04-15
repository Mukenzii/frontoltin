import { get } from 'lodash';
import { Box } from '@mui/material';
import * as React from 'react';
import BooksCard from '../components/books-card';
import BookTabs from '../components/books-tab';
import {
  useMyOnlineBooks,
  useMyAudioBooks,
} from '../../../services/api/mybooks';

const Books: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const [value, setValue] = React.useState('one');
  const myOnlineBooks = useMyOnlineBooks();
  const myAudioBooks = useMyAudioBooks();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <BookTabs {...{ value, handleChange, isMobile }} />
      {value === 'one' && (
        <Box sx={{ margin: '30px 0' }}>
          {get(myAudioBooks, 'data.results', []).map((product: any) => (
            <BooksCard key={get(product, 'guid')} {...{ product }} horizontal />
          ))}
        </Box>
      )}
      {value === 'two' && (
        <Box sx={{ margin: '30px 0' }}>
          {get(myOnlineBooks, 'data.results', []).map((product: any) => (
            <BooksCard key={get(product, 'guid')} {...{ product }} horizontal />
          ))}
        </Box>
      )}
    </>
  );
};
export default Books;
