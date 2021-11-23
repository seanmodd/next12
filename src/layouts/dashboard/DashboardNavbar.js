import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
//
import { MHidden } from '../../components/@material-extend';
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 80;
const COLLAPSE_WIDTH = 102;

const APPBAR_MOBILE = 64;
// const APPBAR_DESKTOP = 64;
// const APPBAR_DESKTOP = 88;
const APPBAR_DESKTOP = 0;
// const APPBAR_DESKTOP = 75;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  //* CHECK BACK HERE!
  // & BELOW NEEDS TO BE UNCOMMENTED
  // backdropFilter: 'blur(6px)',
  // WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  // backgroundColor: alpha(theme.palette.background.default, 0.72),
  // & BELOW NEEDS TO BE COMMENTED
  backgroundColor: alpha(theme.palette.background.default, 0),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar }) {
  const { isCollapse } = useCollapseDrawer();

  //   return (
  //     <RootStyle
  //       sx={{
  //         ...(isCollapse && {
  //           width: { lg: `calc(100% - ${COLLAPSE_WIDTH}px)` },
  //         }),
  //       }}
  //     >
  //       <ToolbarStyle>
  //         <MHidden width="lgUp">
  //           <IconButton
  //             onClick={onOpenSidebar}
  //             sx={{ mr: 1, color: 'text.primary' }}
  //           >
  //             <Icon icon={menu2Fill} />
  //           </IconButton>
  //         </MHidden>

  //         <Searchbar />
  //         <Box sx={{ flexGrow: 1 }} />

  //         <Stack
  //           direction="row"
  //           alignItems="center"
  //           spacing={{ xs: 0.5, sm: 1.5 }}
  //         >
  //           <LanguagePopover />
  //           <NotificationsPopover />
  //           <AccountPopover />
  //         </Stack>
  //       </ToolbarStyle>
  //     </RootStyle>
  //   );
  // }
  return <></>;
}
