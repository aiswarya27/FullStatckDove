import { createStyles, makeStyles, Paper, Theme } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
      margin: theme.spacing(3, 0),
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
)

interface Props {
  title: string
  link: string
}

export const LinkPreview: React.FC<Props> = ({ title, link }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Link component={RouterLink} to={link}>
        {title}
      </Link>
    </Paper>
  )
}
