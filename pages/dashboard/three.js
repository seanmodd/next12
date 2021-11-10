import { Link as RouterLink } from 'next';

import { useState } from 'react';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';
import {
  Backdrop,
  Link,
  CircularProgress,
  Box,
  Grid,
  Card,
  Stack,
  Container,
  Typography,
  CardHeader,
  CardContent,
} from '@mui/material';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// hooks
import useSettings from 'src/hooks/useSettings';
// components
import Page from 'src/components/Page';
import { QuillEditor, DraftEditor } from 'src/components/editor';

// ----------------------------------------------------------------------

export default function PageThree() {
  const { themeStretch } = useSettings();
  const [quillContent, setQuillContent] = useState('');
  const [draftContent, setDraftContent] = useState(() =>
    EditorState.createEmpty()
  );

  return (
    <DashboardLayout>
      <Page title="Page Three | CarX">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Typography variant="h3" component="h1" sx={{ mb: 5 }}>
            Demo editor for next js
          </Typography>
          //& Below are the links to navigate to other pages
          <Container>
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
          <Grid container spacing={3} sx={{ mb: 5 }}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardHeader title="Quill Editor" />
                <CardContent>
                  <QuillEditor
                    id="simple-editor"
                    value={quillContent}
                    onChange={(value) => setQuillContent(value)}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={3} sx={{ height: 1 }}>
                <Card
                  sx={{
                    height: 1,
                    boxShadow: 0,
                    bgcolor: 'background.neutral',
                  }}
                >
                  <CardHeader title="Preview Plain Text" />
                  <Box
                    sx={{ p: 3 }}
                    dangerouslySetInnerHTML={{ __html: quillContent }}
                  />
                </Card>
                <Card
                  sx={{
                    height: 1,
                    boxShadow: 0,
                    bgcolor: 'background.neutral',
                  }}
                >
                  <CardHeader title="Preview Html" />
                  <Typography sx={{ p: 3 }}>{quillContent}</Typography>
                </Card>
              </Stack>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardHeader title="Draft Editor" />
                <CardContent>
                  <DraftEditor
                    editorState={draftContent}
                    onEditorStateChange={(value) => setDraftContent(value)}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={3} sx={{ height: 1 }}>
                <Card
                  sx={{
                    height: 1,
                    boxShadow: 0,
                    bgcolor: 'background.neutral',
                  }}
                >
                  <CardHeader title="Preview Plain Text" />
                  <Typography sx={{ p: 3 }}>
                    {draftContent.getCurrentContent().getPlainText('\u0001')}
                  </Typography>
                </Card>

                <Card
                  sx={{
                    height: 1,
                    boxShadow: 0,
                    bgcolor: 'background.neutral',
                  }}
                >
                  <CardHeader title="Preview Html" />
                  <Typography sx={{ p: 3 }}>
                    {draftToHtml(
                      convertToRaw(draftContent.getCurrentContent())
                    )}
                  </Typography>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </DashboardLayout>
  );
}
