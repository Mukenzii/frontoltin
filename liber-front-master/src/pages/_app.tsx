/* eslint-disable @typescript-eslint/ban-ts-comment */
import { appWithTranslation } from 'next-i18next';
import { useEffect, useMemo } from 'react';
import NextNProgress from 'nextjs-progressbar';
import type { AppProps } from 'next/app';
import type { NextComponentType, NextPageContext } from 'next';
import { UserProvider } from 'context/user';
import { ThemeProvider } from '@mui/material';
import { FilterProvider } from 'context/filter';
import { ChangerProvider } from 'context/is-changed';
import { BookViewProvider } from 'context/book-view';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { NewUserDetailsProvider } from 'context/auth';
import { ToastContainer } from 'react-toastify';
import { createTheme } from '@mui/material/styles';
// import theme from '../config/mui-config';
// eslint-disable-next-line import/named
import { GlobalStyle, loaderStyle } from '../config/styles-config';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import getDesignTokens from '../config/mui-config';
import 'config/font.css';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const MyApp = ({
  Component,
  pageProps,
}:
  | AppProps
  | {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Component: NextComponentType<NextPageContext, any> | any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pageProps: any;
    }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // const [routeEvent, setRouteEvent] = useState('');
  // Router.events.on('routeChangeStart', () => setRouteEvent('start'));
  // Router.events.on('routeChangeError', () => setRouteEvent('error'));
  // Router.events.on('routeChangeComplete', () => setRouteEvent('done'));

  const mode = 'light';
  // @ts-ignore:next-line
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <NextNProgress
          color="#3F51B5"
          startPosition={0.3}
          stopDelayMs={200}
          height={5}
          showOnShallow
        />
        <ThemeProvider theme={theme}>
          {/* @ts-ignore:next-line */}
          <GlobalStyle {...{ theme }} />
          <UserProvider>
            <BookViewProvider>
              <ChangerProvider>
                <FilterProvider>
                  <NewUserDetailsProvider>
                    <ToastContainer theme="colored" />
                    {/* {routeEvent === 'start' && (
                    // @ts-ignore:next-line
                    <div style={loaderStyle}>
                      <CircularProgress
                        color="primary"
                        size={60}
                        thickness={4}
                      />
                    </div>
                  )} */}
                    <Component {...pageProps} />
                  </NewUserDetailsProvider>
                </FilterProvider>
              </ChangerProvider>
            </BookViewProvider>
          </UserProvider>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};
export default appWithTranslation(MyApp);
