import * as React from 'react';
import SortIcon from 'components/icons/sort.icon';
import { get } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { OpenerButton2 } from './category-header.styles';

const Sort = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    router.replace({
      query: { ...router.query, sort: get(event, 'target.value') },
    });
  };

  return (
    <div>
      <OpenerButton2
        id="demo-customized-button"
        aria-haspopup="true"
        disableElevation
        size="large"
        onClick={handleClick}
        endIcon={<SortIcon />}
        value={router?.query?.sort === 'new-book' ? 'old-book' : 'new-book'}
      >
        {router?.query?.sort === 'new-book' ? t('new') : t('old')}
      </OpenerButton2>
    </div>
  );
};

export default Sort;
