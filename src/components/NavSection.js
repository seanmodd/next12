import PropTypes from 'prop-types';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import {
  Box,
  List,
  Collapse,
  ListItemText,
  Button,
  ListItemIcon,
  ListSubheader,
  ListItemButton,
} from '@mui/material';

// ----------------------------------------------------------------------

const ListSubheaderStyle = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(5),
  color: theme.palette.text.primary,
}));

const ListItemStyle = styled(ListSubheader)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  width: 'auto',
  display: 'flex',
  // backgroundColor: '#ff0000',
  alignItems: 'center',
  paddingLeft: theme.spacing(5),
  // paddingTop: theme.spacing(1.5),

  paddingBottom: '0',
  marginLeft: theme.spacing(2),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  '&:before': {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: 'none',
    position: 'absolute',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  isShow: PropTypes.bool,
  item: PropTypes.object,
};

function NavItem({ item, isShow }) {
  const theme = useTheme();
  const { pathname } = useRouter();
  const { title, path, icon, info, children } = item;
  const isActiveRoot = pathname.includes(path);

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen(!open);
  };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    '&:before': { display: 'block' },
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>

          {isShow && (
            <>
              <ListItemText primary={title} />
              {info && info}
              <Box
                component={Icon}
                icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
                sx={{ width: 16, height: 16, ml: 1 }}
              />
            </>
          )}
        </ListItemStyle>

        {isShow && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {children.map((item) => {
                const { title, path } = item;
                const isActiveSub = pathname.includes(path);

                return (
                  <NextLink key={item.title} href={item.path}>
                    <ListItemStyle
                      sx={{
                        ...(isActiveSub && activeSubStyle),
                      }}
                    >
                      <ListItemIconStyle>
                        <Box
                          component="span"
                          sx={{
                            width: 4,
                            height: 4,
                            display: 'flex',
                            borderRadius: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // bgcolor: 'text.disabled',
                            transition: (theme) =>
                              theme.transitions.create('transform'),
                            ...(isActiveSub && {
                              transform: 'scale(2)',
                              bgcolor: 'primary.main',
                            }),
                          }}
                        />
                      </ListItemIconStyle>
                      <ListItemText primary={title} />
                    </ListItemStyle>
                  </NextLink>
                );
              })}
            </List>
          </Collapse>
        )}
      </>
    );
  }

  return (
    <NextLink href={path}>
      {/* <ListItemStyle */}
      <ListItemStyle
        sx={{
          ...(isActiveRoot && activeRootStyle),
        }}
      >
        {/* <div> */}
        <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
        {isShow && (
          <>
            {/* <ListItemIconStyle> */}
            {/* {icon && icon} */}
            <ListItemText primary={title} />
            {/* {info && info} */}
            {/* </ListItemIconStyle> */}
          </>
        )}
        {/* </div> */}
      </ListItemStyle>
    </NextLink>
  );
}

// NavSection.propTypes = {
//   isShow: PropTypes.bool,
//   navConfig: PropTypes.array,
// };

export default function NavSection({ navConfig, isShow = true, ...other }) {
  return (
    <Box {...other}>
      {navConfig.map((list) => {
        const { subheader, items } = list;
        return (
          <List key={subheader} disablePadding>
            {isShow && <ListSubheaderStyle>{subheader}</ListSubheaderStyle>}
            {items.map((item) => (
              <>
                <NavItem key={item.title} item={item} isShow={isShow} />
              </>
            ))}
            {/* {items[0] && (
              <>
                <NavItem key={items[0].title} item={items[0]} isShow={isShow} />
              </>
            )} */}
          </List>
        );
      })}
    </Box>
  );
}
