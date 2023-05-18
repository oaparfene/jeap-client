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
import Head from 'next/head';
import JCAPContext from './context'
import { CollectionExploitationPlanType } from '@/types/main/collectionExploitationPlanType';
import { createCMPlan, generateRandomTasks, addTasksToPEDPlan } from '@/lib/helpers';

const drawerWidth = 240;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const drawer = (
    <div>
      <Toolbar />
      <Box sx={{ p: 1 }}>
        <Avatar sx={{ mb: 2 }}>JD</Avatar>
        <Typography variant='h5'>John Doe</Typography>
        <Typography>john.doe@email.com</Typography>
      </Box>

      <Divider />
      <List>
        {['Plans', 'Assets', 'Requirements', 'Assesment', 'Map'].map((text, index) => (
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
      <Divider />
    </div>
  );

    const [CMPlans, setCMPlans] = React.useState<Array<CollectionExploitationPlanType>>([])
    const [PEDPlans, setPEDPlans] = React.useState<Array<CollectionExploitationPlanType>>([])
    const [activePlan, setActivePlan] = React.useState<CollectionExploitationPlanType | null>(null)
    const [requirements, setRequirements] = React.useState<Array<any>>([])

    React.useEffect(() => {
      setRequirements(generateRandomTasks(100))
      setCMPlans([addTasksToPEDPlan(createCMPlan('AAA'), requirements.slice(0, 10))])
      setActivePlan(CMPlans[0])
    }, [])

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
          integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
          crossOrigin="" defer></script>
      </Head>
      <body>
        <JCAPContext.Provider
        value={{
          CMPlans,
          PEDPlans,
          activePlan,
          requirements,
          setRequirements,
          setActivePlan,
          setCMPlans,
          setPEDPlans,
        }}
        >

          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
              }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  edge="start"
                  sx={{ mr: 2, display: { sm: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  JCAP
                </Typography>
              </Toolbar>
            </AppBar>
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
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

        </JCAPContext.Provider>
      </body>
    </html>
  )
}
