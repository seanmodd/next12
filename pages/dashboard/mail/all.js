import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'next';
import { useRouter } from 'next/router';
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

//! From full template
import { PATH_DASHBOARD } from 'src/routes/paths';
import { getLabels } from 'src/___redux/slices/mail';
import { useDispatch } from 'react-redux';
import HeaderBreadcrumbs from 'src/minimalComponents/HeaderBreadcrumbs';
import {
  MailList,
  MailDetails,
  MailSidebar,
  MailCompose,
} from 'src/minimalComponents/_dashboard/mail';
// ----------------------------------------------------------------------

export default function MailAll(props) {
  console.log('This is props from mail/all.js ', props);
  const { themeStretch } = useSettings();
  const router = useRouter();
  const { id } = router.query;
  console.log('This 📭📭📭📭📭📭📭📭📭📭 is id from mail/all.js ', id);
  const mailId = id;
  const dispatch = useDispatch();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openCompose, setOpenCompose] = useState(false);

  useEffect(() => {
    dispatch(getLabels());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <Page title="Page One | CarX">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <HeaderBreadcrumbs
            heading="Mail"
            links={[
              {
                name: 'Dashboard',
                href: PATH_DASHBOARD.root,
              },
              { name: 'Mail' },
            ]}
          />
          <Card sx={{ height: { md: '72vh' }, display: { md: 'flex' } }}>
            {!mailId && (
              <MailSidebar
                isOpenSidebar={openSidebar}
                onCloseSidebar={() => setOpenSidebar(false)}
                onOpenCompose={() => setOpenCompose(true)}
              />
            )}
            {mailId && <MailDetails />}

            {mailId && <MailList onOpenSidebar={() => setOpenSidebar(true)} />}
            {mailId && (
              <MailCompose
                isOpenCompose={openCompose}
                onCloseCompose={() => setOpenCompose(false)}
              />
            )}
          </Card>
        </Container>
      </Page>
    </DashboardLayout>
  );
}
