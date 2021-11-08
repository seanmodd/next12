// mock api
import '../src/_apis_';

// i18n
// import '../src/locales/i18n';

// highlight
// import '../src/utils/highlight';
// read the blog here: https://sunde.dev/blog/Beautify_your_markdown_Nextjs_blog_with_Highlightjs
// scroll bar
import 'simplebar/src/simplebar.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// lightbox
import 'react-image-lightbox/style.css';

// editor
import 'react-quill/dist/quill.snow.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

// next
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
// material
import { NoSsr } from '@mui/material';
// contexts
import { SettingsProvider } from 'src/contexts/SettingsContext';
import { CollapseDrawerProvider } from 'src/contexts/CollapseDrawerContext';
// theme
import ThemeConfig from 'src/theme';
import GlobalStyles from 'src/theme/globalStyles';
// utils
import createEmotionCache from 'src/utils/createEmotionCache';
// components
import Settings from 'src/components/settings';
import RtlLayout from 'src/components/RtlLayout';
import ProgressBar from 'src/components/ProgressBar';
import LoadingScreen from 'src/components/LoadingScreen';

import ThemePrimaryColor from 'src/components/ThemePrimaryColor';

//! ----------------------------------------------------------------------
//! all imports below are from index.js full javascript version... not sure about relevancy for next.js for some...
//! ----------------------------------------------------------------------

import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// redux
import { persistor, makeStore } from 'src/___redux/store';

import { AuthProvider } from 'src/contexts/FirebaseContext';

//! below is from App.js within javascript version...
import GoogleAnalytics from 'src/minimalComponents/GoogleAnalytics';
import NotistackProvider from 'src/minimalComponents/NotistackProvider';
import ThemeLocalization from 'src/minimalComponents/ThemeLocalization';
import { BaseOptionChartStyle } from 'src/minimalComponents/charts/BaseOptionChart';
import {
  UserWrapper,
  FeedbackWrapper,
  CartWrapper,
} from 'src/__gatsby/contexts';
import { ApolloWrapper } from 'src/__graphql/ApolloWrapper';
//! All imports from full javascript version end here ...
//! below is from root-wrapper.js within gatsby version...
import { ThemeProvider } from '@material-ui/core/styles';
import MainLayout from 'src/layouts/main';
import { wrapperStore } from 'src/___redux/store.js';

// by daniel
import App, { AppInitialProps, AppContext } from 'next/app';

import theme from '../theme';

require('dotenv').config();

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  console.log(
    'This is from _app.js, here is the props of the root function of the entire application: ',
    props
  );

  return (
    <HelmetProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SettingsProvider>
          <CollapseDrawerProvider>
            <CacheProvider value={emotionCache}>
              <Head>
                <meta
                  name="viewport"
                  content="initial-scale=1, width=device-width"
                />
              </Head>

              <ThemeConfig>
                <ThemePrimaryColor>
                  <RtlLayout>
                    <NoSsr>
                      <Settings />
                    </NoSsr>
                    <ThemeProvider theme={theme}>
                      <ApolloWrapper>
                        <NotistackProvider>
                          <GlobalStyles />
                          <ProgressBar />
                          {/* <LoadingScreen /> */}
                          <BaseOptionChartStyle />
                          <GoogleAnalytics />
                          <UserWrapper>
                            <FeedbackWrapper>
                              <CartWrapper>
                                <AuthProvider>
                                  <MainLayout>
                                    <Component {...pageProps} />
                                  </MainLayout>
                                </AuthProvider>
                              </CartWrapper>
                            </FeedbackWrapper>
                          </UserWrapper>
                        </NotistackProvider>
                      </ApolloWrapper>
                    </ThemeProvider>
                  </RtlLayout>
                </ThemePrimaryColor>
              </ThemeConfig>
            </CacheProvider>
          </CollapseDrawerProvider>
        </SettingsProvider>
      </LocalizationProvider>
    </HelmetProvider>
  );
};

MyApp.getInitialProps = async (appContext) => {
  console.log(
    'This is from _app.js where I have MyApp.getInitialProps = async (appContext) => { ... }, here is the appContext, view https://bit.ly/next12_9 : ',
    appContext
  );
  const appProps = await App.getInitialProps(appContext);
  console.log(
    'This is from _app.js where I have MyApp.getInitialProps, appProps = await App.getInitialProps(appContext), here is appProps, view https://bit.ly/next12_9 : ',
    appContext
  );
  appProps.pageProps = {
    ...appProps.pageProps,
  };

  return appProps;
};

export default wrapperStore.withRedux(MyApp);
