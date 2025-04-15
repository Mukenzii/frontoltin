import { FilterAltOutlined } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
import ListIcon from 'components/icons/list.icon';
import MenuIcon from 'components/icons/menu.icon';
import { COLORS } from 'config/styles-config';
import { useFilterContext } from 'context/filter';
import React from 'react';
import { ControllerWrapper } from './category-header.styles';
import Sort from './sort';

interface FilterHeaderProps {
  categoryTitle?: string;
  setOpen: (open: boolean) => void;
  isnotmobile?: boolean;
}

const FilterHeader: React.FC<FilterHeaderProps> = ({
  categoryTitle,
  setOpen,
  isnotmobile,
}) => {
  const { grid_view, setGridView, setListView } = useFilterContext();
  return (
    <ControllerWrapper>
      <Stack
        margin={isnotmobile ? '0.5rem 1.5rem' : '0.5rem 1rem'}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        {isnotmobile && (
          <Typography variant="subtitle1" fontWeight={600}>
            {categoryTitle}
          </Typography>
        )}
        <Stack
          gap="0.5rem"
          direction="row"
          sx={{ justifyContent: isnotmobile ? 'flex-end' : 'space-between' }}
          width="100%"
        >
          {!isnotmobile ? (
            <Stack
              direction="row"
              sx={{ justifyContent: 'space-between', width: '100%' }}
            >
              {/* <IconButton onClick={() => setOpen(true)}>
                <FilterAltOutlined color="inherit" />
                <Typography variant="subtitle1" fontWeight={600}>
                  Filter
                </Typography>
              </IconButton> */}
              <div>
                <IconButton onClick={setListView}>
                  <ListIcon color={!grid_view ? COLORS.primary : undefined} />
                </IconButton>
                <IconButton onClick={setGridView}>
                  <MenuIcon color={grid_view ? COLORS.primary : undefined} />
                </IconButton>
              </div>
            </Stack>
          ) : (
            <>
              <IconButton onClick={setListView}>
                <ListIcon color={!grid_view ? COLORS.primary : undefined} />
              </IconButton>
              <IconButton onClick={setGridView}>
                <MenuIcon color={grid_view ? COLORS.primary : undefined} />
              </IconButton>
            </>
          )}
        </Stack>
      </Stack>
      <Sort />
    </ControllerWrapper>
  );
};

export default FilterHeader;
