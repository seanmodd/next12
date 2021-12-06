import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';
import fileFill from '@iconify/icons-eva/file-fill';
// routes
import SvgIconStyle from 'src/components/SvgIconStyle';
import { PATH_DASHBOARD } from '../../routes/paths';
// ----------------------------------------------------------------------
//* Below is mobile nav menu!!!!!
const ICON_SIZE = {
  width: 22,
  height: 22,
};

const getIcon = (name) => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: '100%', height: '100%' }}
  />
);
const myIcon = (name) => (
  <SvgIconStyle
    src={`/static/icons/${name}.svg`}
    // sx={{ width: '100%', height: '100%' }}
  />
);

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  mail: getIcon('ic_mail'),
  blog: getIcon('ic_blog'),
  booking: getIcon('ic_booking'),
  chat: getIcon('ic_chat'),
  danger: myIcon('_danger-14'),
  user8: myIcon('_user-8'),
  user28: myIcon('_user-28'),
  carfax1: myIcon('carfax1'),
  smiley8: myIcon('_smiley-8'),
  car4: myIcon('_car-4'),
  noun_newcar: myIcon('noun_new-car'),
  noun_cleancar: myIcon('noun_cleancar'),
  noun_sell: myIcon('noun_sell'),
  noun_checkout: myIcon('noun_checkout'),
  noun_checkout2: myIcon('noun_checkout2'),
};

const menuConfig = [
  {
    title: 'Home',
    path: '/',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
  },
  {
    title: 'Dashboard',
    path: PATH_DASHBOARD.root,
    icon: ICONS.noun_cleancar,
  },
  {
    title: 'Account',
    path: 'dashboard/account',
    icon: ICONS.user8,
  },
  {
    title: 'Cars',
    path: '/dashboard/shop',
    icon: ICONS.car4,
  },
  {
    title: `Price Estimator`,
    path: '/dashboard/carfax-value',
    icon: ICONS.noun_checkout,
  },
  // {
  //   title: 'Inbox',
  //   path: '/dashboard/mail/all',
  //   icon: ICONS.user28,
  // },
];

export default menuConfig;
