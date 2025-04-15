import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useRouter } from 'next/router';
import { get } from 'lodash';
import { CategoryTypes } from 'types/category.types';

interface ICheckboxProps {
  checkBoxData: CategoryTypes[];
  isSuccess?: boolean;
  locale?: string;
  type: string;
}

const CheckboxesGroup: React.FC<ICheckboxProps> = ({
  checkBoxData,
  isSuccess,
  locale,
  type,
}) => {
  const router = useRouter();
  const [state, setState] = React.useState<
    { id: string; isChecked: boolean }[]
  >([]);
  const [isEvent, setIsEvent] = React.useState(false);
  const [isEvent2, setIsEvent2] = React.useState(false);

  // step-1: getting unique categories and book_type
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEvent(!isEvent);
    setIsEvent2(true);
    for (let i = 0; i <= get(state, 'length'); i += 1) {
      if (get(state, `[${i}].id`) === event.target.name) {
        state.splice(i, 1);
        setState([
          ...state,
          { id: event.target.name, isChecked: event.target.checked },
        ]);
      } else {
        setState([
          ...state,
          { id: event.target.name, isChecked: event.target.checked },
        ]);
      }
    }
  };
  // step-2: getting only selected or isChecked=true categories and book_type
  useEffect(() => {
    for (let i = 0; i <= get(state, 'length'); i += 1) {
      if (get(state, `[${i}].isChecked`) === false) {
        state.splice(i, 1);
        setState(state);
      }
    }
  }, [isEvent]);

  // step-3: generation for request and setting context value
  useEffect(() => {
    if (isEvent2) {
      const cat_guids: string[] = [];
      const book_type_guids: string[] = [];
      if (type === 'category') {
        state?.forEach((item: { id: string; isChecked: boolean }) => {
          cat_guids.push(item.id);
        });
        router.replace({
          query: { ...router.query, category: cat_guids },
        });
      } else {
        state?.forEach((item: { id: string; isChecked: boolean }) => {
          book_type_guids.push(item.id);
        });
        router.replace({
          query: { ...router.query, book_type: book_type_guids },
        });
      }
    }
  }, [isEvent]);

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl component="fieldset" variant="standard">
        <FormGroup>
          {isSuccess &&
            checkBoxData?.map((item: CategoryTypes) => (
              <FormControlLabel
                key={get(item, 'guid')}
                control={
                  <Checkbox
                    checked={router?.query[
                      type === 'category' ? 'category' : 'book_type'
                    ]?.includes(item?.guid)}
                    onChange={handleChange}
                    name={get(item, 'guid')}
                  />
                }
                label={get(item, `title_${locale}`)}
              />
            ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default CheckboxesGroup;
