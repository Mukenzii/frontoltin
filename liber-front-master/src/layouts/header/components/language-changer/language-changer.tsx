import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Stack, Typography } from '@mui/material';
import ArrowDown from 'components/icons/arrow-down.icon';
import FlagUzIcon from 'components/icons/flag-uz.icon';
import { COLORS } from 'config/styles-config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { loadState, saveState } from 'utils/storage';
import FlagRuIcon from 'components/icons/flag-ru.icon';
import { i18n } from 'next-i18next';

const LanguageChanger = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { locale, locales, asPath } = useRouter();
  const selectedLang: string = locale || 'uz';
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const selectedIndex: number | undefined = locales?.indexOf(locale!);
  React.useEffect(() => {
    saveState('language', selectedLang);
    const langStorage = loadState('language');
    i18n?.changeLanguage(langStorage);
  }, [locale]);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    event: React.MouseEvent<HTMLElement>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    index: number
  ) => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{
          padding: 0,
          backgroundColor: COLORS.lightBg,
          borderRadius: '14px',
        }}
      >
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          sx={{
            // backgroundColor: COLORS.lightBg,
            borderRadius: '14px',
            padding: '13.2px 16px',
          }}
          aria-label="when device is locked"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <Stack alignItems="center" spacing={1} direction="row">
            {locale === 'uz' ? <FlagUzIcon /> : <FlagRuIcon />}
            <Typography variant="subtitle1">
              {locale === 'uz' ? 'Ўз' : 'Ру'}
            </Typography>
            <ArrowDown />
          </Stack>
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {locales &&
          locales.map((option, index) => (
            // eslint-disable-next-line @next/next/link-passhref
            <Link key={option.toString()} href={asPath} locale={option}>
              <MenuItem
                key={option.toString()}
                disabled={index === selectedIndex}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option === 'uz' ? (
                  <span>
                    <FlagUzIcon /> Ўз
                  </span>
                ) : (
                  <span>
                    <FlagRuIcon /> Ру
                  </span>
                )}
              </MenuItem>
            </Link>
          ))}
      </Menu>
    </div>
  );
};

export default LanguageChanger;
