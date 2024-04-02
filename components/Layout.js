// components/Layout.js
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SideNav from './SideNav';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const Layout = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <SideNav />
            <main className={classes.content}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
