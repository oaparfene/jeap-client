'use client'


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import next from 'next';
import Link from 'next/link';

const drawerWidth = 240;
export default function PlanLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const drawer = (
        <div>
            <Toolbar />
            <Box sx={{ p: 1 }}>
                <Typography variant='h5'>PED Plans</Typography>
                <Typography>Showing 2 out of 2</Typography>
            </Box>

            <Divider />
            <List>
                {['AAA', 'AAB'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <Link href={text.toLowerCase()} style={{ textDecoration: 'none', color: 'black', width: '100%' }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <MailIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, position: 'relative', height: 880 }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        variant="permanent"
                        sx={{
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                            '& .MuiDrawer-root': {
                                position: 'absolute'
                            },
                            '& .MuiPaper-root': {
                                position: 'absolute'
                            },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 0, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                    {children}
                </Box>
            </Box>

        </>
    )
}
