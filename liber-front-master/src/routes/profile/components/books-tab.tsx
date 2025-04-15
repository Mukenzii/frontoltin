import { Tabs, Tab } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { TabBox } from '../tabs/styles/books.style';
import { Title } from '../tabs/styles/tabs-title.style';

interface tabsProps {
  value?: string;
  handleChange?: (event: React.SyntheticEvent, newValue: string) => void;
  isMobile: boolean;
}
const BookTabs: React.FC<tabsProps> = ({ value, handleChange, isMobile }) => {
  const { t } = useTranslation();
  return (
    <TabBox {...{ isMobile }}>
      <Title {...{ isMobile }}>{t('my-books')}</Title>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable"
        aria-label="scrollable force tabs example"
        sx={{
          marginLeft: !isMobile ? '80px' : '0',
          height: 'max-content',
          '.MuiTab-root': {
            color: '#242424',
            fontSize: '16px',
            fontWeight: 900,
            textTransform: 'none',
            '&:focus': {
              color: '#3F51B5',
            },
          },
        }}
      >
        <Tab value="one" label={t('audioBooks')} />
        <Tab value="two" label={t('eBooks')} />
        {/* <Tab value="three" label="Босма китоб" /> */}
      </Tabs>
    </TabBox>
  );
};
export default BookTabs;
