/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, IconButton } from '@mui/material';
import BookViewContext from 'context/book-view';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { get } from 'lodash';
import { ReactReader, ReactReaderStyle } from 'react-reader';
import LogoIcon from 'components/icons/logo';
import SettingsIcon from '@mui/icons-material/Settings';
import Settings from './components/settings';

const ReactEpubViewerComponent = ({ epubBook }: any) => {
  // And your own state logic to persist state
  const { settings } = useContext(BookViewContext);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState('');
  const [location, setLocation] = useState(null);
  const tocRef = useRef(null);
  const renditionRef = useRef(null);

  const customStyles = {
    // @ts-ignore:next-line
    ...ReactReaderStyle,
    arrow: {
      // @ts-ignore:next-line
      ...ReactReaderStyle.arrow,
      color: 'rgb(63, 81, 181)',
      padding: 0,
    },
    readerArea: {
      // @ts-ignore:next-line
      ...ReactReaderStyle.readerArea,
      background: settings?.darkMode ? '#000' : '#fff',
      // opacity: settings?.light,
      filter: `brightness(100%) saturate(100%) invert(${settings?.light}%) sepia(${settings?.light}%) contrast(92%)`,
    },
    reader: {
      // @ts-ignore:next-line
      ...ReactReaderStyle.reader,
      right: '10px!important',
      left: '10px!important',
    },
    tocButton: {
      // @ts-ignore:next-line
      ...ReactReaderStyle.tocButton,
      color: '#000!important',
      background: 'rgb(63, 81, 181)!important',
    },
    tocButtonExpanded: {
      // @ts-ignore:next-line
      ...ReactReaderStyle.tocButtonExpanded,
      color: '#000!important',
      background: '#000!important',
    },
  };
  const locationChanged = (epubcifi: React.SetStateAction<null>) => {
    if (renditionRef.current && tocRef.current) {
      // @ts-ignore:next-line
      const { displayed, href } = renditionRef.current.location.start;
      // @ts-ignore:next-line
      const chapter = tocRef.current.find(
        (item: { href: any }) => item.href === href
      );
      setPage(
        `Сахифа: ${displayed.page} / ${displayed.total}. Bo'lim: ${
          chapter ? chapter.label : 'n/a'
        }`
      );
    }
    setLocation(epubcifi);
  };
  useEffect(() => {
    if (renditionRef.current) {
      // @ts-ignore:next-line
      renditionRef.current.themes.fontSize(`${settings?.fontSize}px`);
      // @ts-ignore:next-line
      renditionRef.current.themes.default({
        '*': {
          color: settings?.darkMode ? '#fff!important' : '#000!important',
          'font-family': settings?.font,
        },
        '.chaptitle': {
          color: settings?.darkMode ? '#fff!important' : 'blue!important',
        },
      });
    }
  }, [settings]);

  return (
    <>
      <div style={{ height: '100vh', position: 'relative' }}>
        {/* @ts-ignore:next-line */}
        <ReactReader
          location={location}
          locationChanged={locationChanged}
          swipeable
          // @ts-ignore:next-line
          tocChanged={(toc) => (tocRef.current = toc)}
          loadingView={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <LogoIcon />
            </Box>
          }
          title={get(epubBook, 'title')}
          styles={customStyles}
          getRendition={(rendition) => {
            // @ts-ignore:next-line
            renditionRef.current = rendition;
            // @ts-ignore:next-line
            rendition.themes.default({
              '::selection': {
                background: 'red',
              },
            });
          }}
          epubInitOptions={{
            openAs: 'epub',
            flow: 'scrolled',
            manager: 'continuous',
          }}
          url={`${process.env.NEXT_PUBLIC_BASE_URL}${get(epubBook, 'body')}`}
        />
        <IconButton
          aria-label="fingerprint"
          color="success"
          sx={{ position: 'absolute', top: 5, right: 5, zIndex: 1 }}
          onClick={() => setOpen(true)}
        >
          <SettingsIcon sx={{ fontSize: 30, color: 'rgb(63, 81, 181)' }} />
        </IconButton>
        <div
          style={{
            position: 'absolute',
            bottom: '0.5rem',
            right: '1rem',
            left: '1rem',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          {page}
        </div>
      </div>

      <Settings {...{ open, setOpen }} />
    </>
  );
};

export default ReactEpubViewerComponent;
