import { Stack } from '@mui/material';
import ArrowIcon from 'components/icons/arrow.icon';
import { COLORS } from 'config/styles-config';
import React from 'react';
import { ControllerButtons, PaginationWrapper } from './controller.styles';

interface ControllerProps {
  nextRef: any;
  prevRef: any;
  pagination: any;
}

const Controller: React.FC<ControllerProps> = ({
  nextRef,
  prevRef,
  pagination,
}) => (
  <Stack direction="row" alignItems="center">
    <ControllerButtons ref={prevRef} className="slider-prev">
      <ArrowIcon color={COLORS.primary} />
    </ControllerButtons>
    <PaginationWrapper ref={pagination} />
    <ControllerButtons ref={nextRef} className="slider-next">
      <ArrowIcon
        color={COLORS.primary}
        style={{ transform: 'rotate(180deg)' }}
      />
    </ControllerButtons>
  </Stack>
);

export default Controller;
