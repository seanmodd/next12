import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { filter, includes, orderBy } from 'lodash';
// material
import {
  Backdrop,
  Container,
  Typography,
  CircularProgress,
  Stack,
} from '@mui/material';
// redux
import {
  useDispatch,
  useSelector,
  useState as useStateRedux,
} from 'react-redux';
import { PATH_DASHBOARD } from 'src/otherComponents/routes/paths';
import { getProducts, filterProducts } from 'src/___redux/slices/product';
// utils
import fakeRequest from 'src/otherComponents/utils/fakeRequest';
// hooks
import useSettings from 'src/otherComponents/hooks/useSettings';
// components
import Page from 'src/allTemplateComponents/Page';
import HeaderBreadcrumbs from 'src/allTemplateComponents/HeaderBreadcrumbs';
import {
  ShopProductList,
} from 'src/allTemplateComponents/_dashboard/e-commerce/shop';
// import CartWidget from 'src/allTemplateComponents/_dashboard/e-commerce/CartWidget';
import DashboardLayout from 'src/otherComponents/layouts/dashboard';
import axios from 'axios';

const EcommerceShop = (props) => {
  const { themeStretch } = useSettings();

  const [favouriteData, setFavouriteData] = useState([])

  const getFavouritesData = () => {
    axios.get("http://localhost:1337/users-favourites")
      .then(response => {
        setFavouriteData(response.data[0].variants)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getFavouritesData()
  }, [])

  return (
    // <AuthGuard>
    <DashboardLayout>
      <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ mb: 0, mt: 0, px: 15 }}
      >
      </Stack>
        <Page title="Shop: All Vehicles | CarX">

          <Container maxWidth={themeStretch ? false : 'lg'}>
            <HeaderBreadcrumbs
              heading="Favourites"
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                // {
                //   name: 'E-Commerce',
                //   href: PATH_DASHBOARD.shop.root,
                // },
                { name: 'Favourites' },
              ]}
            />

            {favouriteData?.length === 0 ? 
              <span className="no-data">No Favourites at this time</span> :
              <ShopProductList
              products={favouriteData}
              from={"favourite_page"}
            />}
          </Container>
        </Page>
    </DashboardLayout>
    // </AuthGuard>
  );
};

export default EcommerceShop;
