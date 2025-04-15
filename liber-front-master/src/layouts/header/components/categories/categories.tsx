import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDown from 'components/icons/arrow-down.icon';
import { useTranslation } from 'next-i18next';
import { useQuery } from 'react-query';
import { getAllData } from 'services/api/get';
import MenuIcon from 'components/icons/menu.icon';
import { COLORS } from 'config/styles-config';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import { OpenerButton } from './category.styles';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: '#1C1014',
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Categories: React.FC<{ isLabel?: boolean }> = ({ isLabel }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { locale } = useRouter();
  const router = useRouter();

  const open = Boolean(anchorEl);
  const { t } = useTranslation('common');
  const { data, isSuccess } = useQuery('categories', () =>
    getAllData('/category/list/')
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (guid: string) => {
    handleClose();
    router.replace({
      pathname: '/filter',
      query: { ...router.query, category: guid },
    });
  };

  return (
    <div>
      <OpenerButton
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        disableElevation
        sx={{ backgroundColor: 'transparent!important' }}
        onClick={handleClick}
        startIcon={<MenuIcon color={COLORS.primary} />}
        endIcon={<ArrowDown />}
      >
        {isLabel && t('ruknlar')}
      </OpenerButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {isSuccess &&
          get(data, 'data.results', []).map((item: any) => (
            <MenuItem
              key={item.guid}
              onClick={() => handleChange(item?.guid)}
              disableRipple
            >
              {get(item, `title_${locale}`)}
            </MenuItem>
          ))}
      </StyledMenu>
    </div>
  );
};

export default Categories;
