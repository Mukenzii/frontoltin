import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowDown from 'components/icons/arrow-down.icon';
import { COLORS } from 'config/styles-config';

interface CustomAccordionProps {
  details?: React.ReactNode;
  summary?: React.ReactNode;
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} {...props} />
))(({ theme }) => ({
  //   border: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${COLORS.borderColor}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary {...props} />
))(({ theme }) => ({
  //   backgroundColor:
  //     theme.palette.mode === 'dark'
  //       ? 'rgba(255, 255, 255, .05)'
  //       : 'rgba(225, 225, 225)',
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  boxShadow: 'none',
  borderTop: `1px solid ${COLORS.borderColor}`,
}));

const CustomizedAccordion: React.FC<CustomAccordionProps> = ({
  details,
  summary,
}) => {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Accordion
      expanded={expanded === 'panel1'}
      onChange={handleChange('panel1')}
    >
      <AccordionSummary
        expandIcon={<ArrowDown style={{ fontSize: '0.9rem' }} />}
        aria-controls="panel1d-content"
        id="panel1d-header"
      >
        {summary}
      </AccordionSummary>
      <AccordionDetails>{details}</AccordionDetails>
    </Accordion>
  );
};

export default CustomizedAccordion;
