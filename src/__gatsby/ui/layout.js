/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
// import { useStaticQuery, graphql } from 'gatsby'
// import { makeStyles } from '@material-ui/core/styles';

// import Header from './header';
import Footer from './footer';

// const useStyles = makeStyles((theme) => ({
//   spacer: {
//     marginBottom: '4.5rem',

//     // height: '5rem',
//     [theme.breakpoints.down('md')]: {
//       marginBottom: '2rem',
//     },
//   },
//   middleBox: {
//     marginTop: '4.5rem',
//     alignItems: 'center',
//     justifyContent: 'center',
//     textAlign: 'center',

//     // height: '5rem',
//     // [theme.breakpoints.down('md')]: {
//     //   // marginBottom: '2rem',
//     // },
//   },
// }));

const Layout = ({ children }) => (
  // const classes = useStyles();

  // const data = useStaticQuery(graphql`
  //   query GetCategories {
  //     allStrapiCategory {
  //       edges {
  //         node {
  //           name
  //           strapiId
  //         }
  //       }
  //     }
  //   }
  // `)

  <>
    {/* <Header categories={data.allStrapiCategory.edges} /> */}
    {/* <div className={classes.spacer} /> */}
    <div
      style={{
        marginTop: '10rem',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <main>{children}</main>
    </div>
    {/* <Footer /> */}
  </>
);
export default Layout;
