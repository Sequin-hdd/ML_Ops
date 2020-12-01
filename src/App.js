import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import GetHeader from "./getHeader";
import GetDrawer from "./getDrawer";
import PropTypes from 'prop-types';

function Copyright() {
  return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

function Panel(props) {
  const { children, value, index} = props;

  return (
      <div
          hidden={value !== index}
      >
        {value === index && (
            <Box >
              {children}
            </Box>
        )}
      </div>
  );
}

Panel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [panelValue, setPanelValue] = React.useState(0);
  const handleDrawerOpen=()=>{
    setOpen(true);
  };
  const handleDrawerClose=()=>{
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  function handleTabClick(value){
    setPanelValue(value);
    console.log(panelValue)
  };
  return (
      <div className={classes.root}>
        <CssBaseline />
        <GetHeader drawerOpen={open} onDrawerOpen={handleDrawerOpen}/>
        <GetDrawer drawerOpen={open} onDrawerClose={handleDrawerClose} onTabClick={(value)=>handleTabClick(value)} />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Panel value={panelValue} index={0}>
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                  <Paper className={fixedHeightPaper}>

                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <Paper className={fixedHeightPaper}>

                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>

                  </Paper>
                </Grid>
              </Grid>
              <Box pt={4}>
                <Copyright />
              </Box>
            </Container>
          </Panel>
          <Panel value={panelValue} index={1}>
          </Panel>
          <Panel value={panelValue} index={2}>
          </Panel>
          <Panel value={panelValue} index={3}>
          </Panel>
        </main>
      </div>
  );
}



export default App;
