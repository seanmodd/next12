import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import roundAddShoppingCart from '@iconify/icons-ic/round-add-shopping-cart';
import Link from 'next/link';
import { useFormik, Form, FormikProvider, useField } from 'formik';
// material
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Link as MuiLink,
  Stack,
  Button,
  Rating,
  Tooltip,
  Divider,
  TextField,
  Typography,
  FormHelperText,
} from '@mui/material';
// redux
// import { useDispatch, useSelector } from '../../../../___redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, onGotoStep } from '../../../../___redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fShortenNumber, fCurrency } from '../../../../utils/formatNumber';
//
import { MIconButton } from '../../../@material-extend';
import Label from '../../../Label';
import ColorSinglePicker from '../../../ColorSinglePicker';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'Facebook',
    icon: <Icon icon={facebookFill} width={20} height={20} color="#1877F2" />,
  },
  {
    name: 'Instagram',
    icon: (
      <Icon icon={instagramFilled} width={20} height={20} color="#D7336D" />
    ),
  },
  {
    name: 'Linkedin',
    icon: <Icon icon={linkedinFill} width={20} height={20} color="#006097" />,
  },
  {
    name: 'Twitter',
    icon: <Icon icon={twitterFill} width={20} height={20} color="#1C9CEA" />,
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

// ----------------------------------------------------------------------

const Incrementer = (props) => {
  const [field, , helpers] = useField(props);
  // eslint-disable-next-line react/prop-types
  const { available } = props;
  const { value } = field;
  const { setValue } = helpers;

  const incrementQuantity = () => {
    setValue(value + 1);
  };
  const decrementQuantity = () => {
    setValue(value - 1);
  };

  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032',
      }}
    >
      <MIconButton
        size="small"
        color="inherit"
        disabled={value <= 1}
        onClick={decrementQuantity}
      >
        <Icon icon={minusFill} width={16} height={16} />
      </MIconButton>
      <Typography
        variant="body2"
        component="span"
        sx={{
          width: 40,
          textAlign: 'center',
          display: 'inline-block',
        }}
      >
        {value}
      </Typography>
      <MIconButton
        size="small"
        color="inherit"
        disabled={value >= available}
        onClick={incrementQuantity}
      >
        <Icon icon={plusFill} width={16} height={16} />
      </MIconButton>
    </Box>
  );
};

export default function ProductDetailsSumary() {
  const theme = useTheme();
  // const navigate = useNavigate();
  const router = useRouter();
  const dispatch = useDispatch();
  const { product, checkout } = useSelector((state) => state.product);
  const {
    id,
    name,
    sizes,
    price,
    cover,
    status,
    // colors,
    available,
    priceSale,
    // totalRating,
    // totalReview,
    // inventoryType,
  } = product;
  const colors = product.variant.car_colorLabel;

  const inventoryType = product.variant.car_qty;
  const alreadyProduct = checkout.cart.map((item) => item.id).includes(id);
  const isMaxQuantity =
    checkout.cart
      .filter((item) => item.id === id)
      .map((item) => item.quantity)[0] >= available;

  const onAddCart = (product) => {
    dispatch(addCart(product));
  };

  const handleBuyNow = () => {
    dispatch(onGotoStep(0));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id,
      name,
      cover,
      available,
      price,
      // color: colors[0],
      color: product.variant.car_colorLabel,
      // size: sizes[4],
      quantity: available < 1 ? 0 : 1,
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (!alreadyProduct) {
          onAddCart({
            ...values,
            subtotal: values.price * values.quantity,
          });
        }
        setSubmitting(false);
        handleBuyNow();
        // navigate(PATH_DASHBOARD.shop.checkout);
        router.push(PATH_DASHBOARD.shop.checkout);
      } catch (error) {
        setSubmitting(false);
      }
    },
  });
  const { car_make_name } = product.variant;
  console.log(
    'This 🥮🥮🥮🥮🥮🥮🥮🥮 is the product.variant from ProductDetailsSumary.js : ',
    product.variant
  );
  // convert car_make_name to lowercase
  const car_make_name_lower = car_make_name.toLowerCase();

  const { values, touched, errors, getFieldProps, handleSubmit } = formik;

  const handleAddCart = () => {
    onAddCart({
      ...values,
      subtotal: values.price * values.quantity,
    });
  };

  // & Below is the adjustments made to the schema of product.variant:
  const drivetrain = product.variant.car_drivetrain;
  const engine = product.variant.car_engine;
  const exterior_color = product.variant.car_exterior_color;
  const interior_color = product.variant.car_interior_color;
  const fuel_economy = product.variant.car_fuel_economy;
  const highlight_features_1 =
    product.variant.car_highlighted_features_1_feature;
  const highlight_features_2 =
    product.variant.car_highlighted_features_2_feature;
  const highlight_features_3 =
    product.variant.car_highlighted_features_3_feature;
  const highlight_features_4 =
    product.variant.car_highlighted_features_4_feature;
  const highlight_features_5 =
    product.variant.car_highlighted_features_5_feature;
  const highlight_features_6 =
    product.variant.car_highlighted_features_6_feature;
  const highlight_features_7 =
    product.variant.car_highlighted_features_7_feature;
  const highlight_features_8 =
    product.variant.car_highlighted_features_8_feature;
  const name1 = product.variant.car_info;
  const name2 = product.variant.car_info2;
  const make_name = product.variant.car_make_name;
  const model_name = product.variant.car_name;
  const package1_upgrade1 = product.variant.car_package_options_1_attribute_1;
  const package1_upgrade2 = product.variant.car_package_options_1_attribute_2;
  const package1_upgrade3 = product.variant.car_package_options_1_attribute_3;
  const package1_name = product.variant.car_package_options_1_name;
  const string_package1_price = product.variant.car_package_options_1_price;
  const package2_upgrade1 = product.variant.car_package_options_2_attribute_1;
  const package2_upgrade2 = product.variant.car_package_options_2_attribute_2;
  const package2_upgrade3 = product.variant.car_package_options_2_attribute_3;
  const package2_upgrade4 = product.variant.car_package_options_2_attribute_10;
  const package2_upgrade5 = product.variant.car_package_options_2_attribute_11;
  const package2_upgrade6 = product.variant.car_package_options_2_attribute_12;
  const package2_name = product.variant.car_package_options_2_name;
  const string_package2_price = product.variant.car_package_options_2_price;
  const package3_upgrade1 = product.variant.car_package_options_3_attribute_1;
  const package3_upgrade2 = product.variant.car_package_options_3_attribute_2;
  const package3_upgrade3 = product.variant.car_package_options_3_attribute_3;
  const package3_upgrade4 = product.variant.car_package_options_3_attribute_10;
  const package3_upgrade5 = product.variant.car_package_options_3_attribute_11;
  const package3_upgrade6 = product.variant.car_package_options_3_attribute_12;
  const package3_name = product.variant.car_package_options_3_name;
  const string_package3_price = product.variant.car_package_options_3_price;
  const package4_upgrade1 = product.variant.car_package_options_4_attribute_1;
  const package4_upgrade2 = product.variant.car_package_options_4_attribute_2;
  const package4_upgrade3 = product.variant.car_package_options_4_attribute_3;
  const package4_upgrade4 = product.variant.car_package_options_4_attribute_10;
  const package4_upgrade5 = product.variant.car_package_options_4_attribute_11;
  const package4_upgrade6 = product.variant.car_package_options_4_attribute_12;
  const package4_name = product.variant.car_package_options_4_name;
  const string_package4_price = product.variant.car_package_options_4_price;
  const package5_upgrade1 = product.variant.car_package_options_5_attribute_1;
  const package5_upgrade2 = product.variant.car_package_options_5_attribute_2;
  const package5_upgrade3 = product.variant.car_package_options_5_attribute_3;
  const package5_upgrade4 = product.variant.car_package_options_5_attribute_10;
  const package5_upgrade5 = product.variant.car_package_options_5_attribute_11;
  const package5_upgrade6 = product.variant.car_package_options_5_attribute_12;
  const package5_name = product.variant.car_package_options_5_name;
  const string_package5_price = product.variant.car_package_options_5_price;
  const package6_upgrade1 = product.variant.car_package_options_6_attribute_1;
  const package6_upgrade2 = product.variant.car_package_options_6_attribute_2;
  const package6_upgrade3 = product.variant.car_package_options_6_attribute_3;
  const package6_upgrade4 = product.variant.car_package_options_6_attribute_10;
  const package6_upgrade5 = product.variant.car_package_options_6_attribute_11;
  const package6_upgrade6 = product.variant.car_package_options_6_attribute_12;
  const package6_name = product.variant.car_package_options_6_name;
  const string_package6_price = product.variant.car_package_options_6_price;

  const stringPrice = product.variant.car_price;
  const stringSpecial = product.variant.car_special;
  const stock_number = product.variant.car_stock;
  const transmission = product.variant.car_transmission;
  const { car_url } = product.variant;
  const { car_vin } = product.variant;
  const stringYear = product.variant.car_year;
  const { dealership } = product.variant;
  const { image_url } = product.variant;
  const { vehicle_status } = product.variant;

  // & Above is the adjustments made to the schema of product.variant:

  return (
    <RootStyle>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Link
            style={{ cursor: 'pointer' }}
            href={`/dashboard/shop/${car_make_name_lower}`}
          >
            <Typography
              variant="overline"
              style={{ cursor: 'pointer', fontSize: '36px' }}
              sx={{
                mt: 2,
                cusor: 'pointer',
                mb: 1,
                display: 'block',
                color: status === 'sale' ? 'error.main' : 'info.main',
              }}
            >
              {product.variant.car_make_name}
            </Typography>
          </Link>
          <Typography variant="h5" paragraph>
            {product.variant.car_vehicleStatus} {product.variant.car_name}
          </Typography>

          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={inventoryType >= 1 ? 'success' : 'success'}
            sx={{ textTransform: 'uppercase' }}
          >
            {console.log('THIS IS INVENTORY TYPE: ', inventoryType)}
            {inventoryType >= 1 ? 'Available Today' : 'Not Available'}
          </Label>
          <Typography variant="h4" sx={{ mb: 3 }}>
            <Box
              component="span"
              sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
            >
              {priceSale && fCurrency(priceSale)}
            </Box>
            &nbsp;{fCurrency(product.variant.price)}
          </Typography>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack spacing={3} sx={{ my: 3 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Exterior Color
              </Typography>
              {/* <ColorSinglePicker
                {...getFieldProps('color')}
                colors={colors}
                // sx={{
                //   ...(colors.length > 4 && {
                //     maxWidth: 144,
                //     justifyContent: 'flex-end',
                  // }),
                // }}
              /> */}

              {product.variant.car_exteriorColor}
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Interior Color
              </Typography>
              {product.variant.car_interiorColor}
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Size
              </Typography>
              <TextField
                select
                size="small"
                {...getFieldProps('size')}
                SelectProps={{ native: true }}
                FormHelperTextProps={{
                  sx: {
                    textAlign: 'right',
                    margin: 0,
                    mt: 1,
                  },
                }}
                helperText={
                  <MuiLink href="#" underline="always" color="text.primary">
                    Size Chart
                  </MuiLink>
                }
              >
                {/* {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))} */}
              </TextField>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Quantity
              </Typography>
              <div>
                <Incrementer name="quantity" available={available} />
                <Typography
                  variant="caption"
                  sx={{
                    mt: 1,
                    display: 'block',
                    textAlign: 'right',
                    color: 'text.secondary',
                  }}
                >
                  Available: {available}
                </Typography>

                <FormHelperText error>
                  {touched.quantity && errors.quantity}
                </FormHelperText>
              </div>
            </Stack>
          </Stack>
          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ mt: 5 }}
          >
            <Button
              fullWidth
              disabled={isMaxQuantity}
              size="large"
              type="button"
              color="warning"
              variant="contained"
              startIcon={<Icon icon={roundAddShoppingCart} />}
              onClick={handleAddCart}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Add to Cart
            </Button>
            <Button fullWidth size="large" type="submit" variant="contained">
              Buy Now
            </Button>
          </Stack>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            {SOCIALS.map((social) => (
              <Tooltip key={social.name} title={social.name}>
                <MIconButton>{social.icon}</MIconButton>
              </Tooltip>
            ))}
          </Box>
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}
