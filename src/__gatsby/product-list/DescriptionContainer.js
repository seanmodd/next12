import React, { useState } from 'react'
import clsx from 'clsx'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/core/styles'

// import background from '../../images/repeating-smallest.svg'
import ListIcon from '../../images/List'
import GridIcon from '../../images/Grid'

const useStyles = makeStyles(theme => ({
  description: {
    color: theme.palette.primary.main,
    fontSize: '1.15rem',
  },
  descriptionContainer: {
    color: theme.palette.primary.main,
    fontSize: '0.5rem',
    width: '100%',
    // marginTop: '5rem',
    // padding: '1rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      borderRadius: 0,
    },
  },
  itemTitle: {
    color: theme.palette.primary.main,
  },
  mainContainer: {
    // padding: '3rem',
    // backgroundColor: theme.palette.primary.main,

    // backgroundImage: `url(${background})`,
    fontSize: '0.5rem',
    // backgroundSize: 'fill',
    // backgroundPosition: 'center',
    // color: '#ff0000',
    // backgroundRepeat: 'repeat',
    // position: 'relative',
    [theme.breakpoints.down('sm')]: {
      padding: '3rem 0',
    },
  },
  button: {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRightColor: `${theme.palette.primary.main} !important`,
    borderRadius: 25,
    backgroundColor: '#fff',
    // padding: '0.5rem 1.5rem',
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
  selected: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  buttonGroup: {
    // position: 'absolute',
    right: 0,
    bottom: 0,
    elevate: 9,
    // marginRight: '3rem',
    // marginBottom: '1rem',
    marginTop: '1rem',
    [theme.breakpoints.down('md')]: {
      position: 'relative',
      display: 'flex',
      alignSelf: 'flex-end',
      marginRight: 0,
      marginBottom: 0,
      marginTop: '3rem',
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: '1.5rem',
    },
  },
}))

export default function DescriptionContainer({
  name,
  description,
  layout,
  setLayout,
}) {
  const classes = useStyles()

  const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'))

  const changeLayout = option => {
    setLayout(option)
  }

  return (
    <Grid
      item
      container
      direction={matchesMD ? 'column' : 'row'}
      classes={{ root: classes.mainContainer }}
      justifyContent="center"
      alignItems={matchesMD ? 'center' : undefined}
    >
      {/* <Grid item classes={{ root: classes.descriptionContainer }}>
        <Typography className={classes.itemTitle} align="center" variant="h4">
          {name}
        </Typography>
        <Typography
          align="center"
          variant="body1"
          classes={{ root: classes.description }}
        >
          {description}
        </Typography>
      </Grid> */}
      <Grid item classes={{ root: classes.buttonGroup }}>
        <ButtonGroup>
          <Button
            onClick={() => changeLayout('list')}
            classes={{
              outlined: clsx(classes.button, {
                [classes.selected]: layout === 'list',
              }),
            }}
          >
            <ListIcon color={layout === 'list' ? '#fff' : undefined} />
          </Button>
          <Button
            onClick={() => changeLayout('grid')}
            classes={{
              outlined: clsx(classes.button, {
                [classes.selected]: layout === 'grid',
              }),
            }}
          >
            <GridIcon color={layout === 'grid' ? '#fff' : undefined} />
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}
