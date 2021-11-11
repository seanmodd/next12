import { Link as RouterLink } from 'next';

import {
  Backdrop,
  Container,
  Typography,
  Link,
  CircularProgress,
  Stack,
  Box,
  Card,
} from '@mui/material';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// hooks
import useSettings from 'src/hooks/useSettings';
import GuestGuard from 'src/guards/GuestGuard';
// components
import Page from 'src/components/Page';
import {
  Nav,
  DownloadImage,
  LoginNotification,
} from '/src/___global/components';
import GlobalStateProvider from 'src/___global/store/GlobalStateProvider';
import { useRecoilState, atom } from 'recoil';

export const Counter = atom({
  key: 'counter',
  default: 0,
});

export function MyCount(props) {
  const [counter, setCounter] = useRecoilState(Counter);

  return (
    <button
      onClick={() => {
        setCounter(counter + 1);
      }}
    >
      Count
    </button>
  );
}

// ----------------------------------------------------------------------

export default function PageOne(props) {
  console.log('This is props from pages/dashboard/one.js : ', props);
  const { themeStretch } = useSettings();
  const [counter, setCounter] = useRecoilState(Counter);
  return (
    <DashboardLayout>
      <Page title="Page One | CarX">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Typography variant="h3" component="h1" paragraph>
            Page One
          </Typography>
          //& Below are the links to navigate to other pages
          <Container>
            <GlobalStateProvider>
              {counter}
              <MyCount />
              <GuestGuard>
                <Container maxWidth="xs" sx={{ m: 5 }}>
                  <Card>
                    <Stack spacing={2} sx={{ p: 1.5, alignItems: 'center' }}>
                      <Nav />
                      <h1>Download Image</h1>
                      <DownloadImage />
                      <LoginNotification />
                    </Stack>
                  </Card>
                </Container>
              </GuestGuard>
            </GlobalStateProvider>
            <Container maxWidth="xs" sx={{ m: 5 }}>
              <Card>
                <Link
                  href="/dashboard/one"
                  color="inherit"
                  component={RouterLink}
                >
                  <Stack spacing={2} sx={{ p: 1.5, alignItems: 'center' }}>
                    <Typography variant="header" noWrap>
                      Visit Page One
                    </Typography>
                  </Stack>
                </Link>
              </Card>
            </Container>
            <Container maxWidth="xs" sx={{ m: 5 }}>
              <Card>
                <Link
                  href="/dashboard/two"
                  color="inherit"
                  component={RouterLink}
                >
                  <Stack spacing={2} sx={{ p: 1.5, alignItems: 'center' }}>
                    <Typography variant="header" noWrap>
                      Visit Page Two
                    </Typography>
                  </Stack>
                </Link>
              </Card>
            </Container>
            <Container maxWidth="xs" sx={{ m: 5 }}>
              <Card>
                <Link
                  href="/dashboard/three"
                  color="inherit"
                  component={RouterLink}
                >
                  <Stack spacing={2} sx={{ p: 1.5, alignItems: 'center' }}>
                    <Typography variant="header" noWrap>
                      Visit Page Three
                    </Typography>
                  </Stack>
                </Link>
              </Card>
            </Container>
          </Container>
          //& Above are the links to navigate to other pages
          <Typography gutterBottom>
            Curabitur turpis. Vestibulum facilisis, purus nec pulvinar iaculis,
            ligula mi congue nunc, vitae euismod ligula urna in dolor. Nam quam
            nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Phasellus
            blandit leo ut odio. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia Curae; Fusce id purus. Aliquam
            lorem ante, dapibus in, viverra quis, feugiat a, tellus. In
            consectetuer turpis ut velit. Aenean posuere, tortor sed cursus
            feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor
            sagittis lacus. Vestibulum suscipit nulla quis orci. Nam commodo
            suscipit quam. Sed a libero.
          </Typography>
          <Typography>
            Praesent ac sem eget est egestas volutpat. Phasellus viverra nulla
            ut metus varius laoreet. Curabitur ullamcorper ultricies nisi. Ut
            non enim eleifend felis pretium feugiat. Donec mi odio, faucibus at,
            scelerisque quis, convallis in, nisi. Fusce vel dui. Quisque libero
            metus, condimentum nec, tempor a, commodo mollis, magna. In enim
            justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Cras
            dapibus.
          </Typography>
        </Container>
      </Page>
    </DashboardLayout>
  );
}