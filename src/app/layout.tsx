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
import { JCAPContext } from './context'
import { JAPContext } from './context';
import { CollectionExploitationPlanType } from '@/types/main/collectionExploitationPlanType';
import { createCMPlan, generateRandomTasks, addTasksToPEDPlan, generateRandomGAOIs, generateRandomTasksWithGAOI } from '@/lib/helpers';
import { GeographicAreaOfInterestType } from '@/types/main/geographicAreaOfInterestType';
import { InformationRequirementType } from '@/types/main/informationRequirementType';
import { generateDataFromORBAT } from '@/constants';
import { usePlan } from '@/hooks/usePlan';

const drawerWidth = 240;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { getPlan, addCRsToPlan, removeCRsFromPlan, addAssetsToPlan, removeAssetsFromPlan, plans, newPlan, activePlanIndex, setActivePlanIndex } = usePlan()

  const drawer = (
    <div>
      <Toolbar />
      <Box sx={{ p: 1 }}>
        <Avatar sx={{ mb: 2 }}>JD</Avatar>
        <Typography variant='h5'>John Doe</Typography>
        <Typography>john.doe@email.com</Typography>
      </Box>

      <Divider />
      <Typography
        variant="h6"
        component="h6"
        sx={{ textAlign: 'left', mt: 1, ml: 2 }}
      >Planning:</Typography>
      <List>
        {['Requirements', 'Assets', 'Plans'].map((text, index) => (
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
      <Typography
        variant="h6"
        component="h6"
        sx={{ textAlign: 'left', mt: 1, ml: 2 }}
      >Allocation:</Typography>
      <List>
        {['Assesment', 'Map'].map((text, index) => (
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

  // const [CMPlans, setCMPlans] = React.useState<Array<CollectionExploitationPlanType>>([])
  // const [PEDPlans, setPEDPlans] = React.useState<Array<CollectionExploitationPlanType>>([])
  // const [activePlan, setActivePlan] = React.useState<CollectionExploitationPlanType | null>(null)
  // const [requirements, setRequirements] = React.useState<Array<InformationRequirementType>>([])
  // const [GAOIs, setGAOIs] = React.useState<Array<GeographicAreaOfInterestType>>([])

  // React.useEffect(() => {
  //   const gaois = generateRandomGAOIs(10)
  //   setGAOIs(gaois)
  //   setRequirements(generateRandomTasksWithGAOI(gaois))
  //   setCMPlans([addTasksToPEDPlan(createCMPlan('AAA'), requirements.slice(0, 10))])
  //   setActivePlan(CMPlans[0])
  //   console.log(generateDataFromORBAT())
  // }, [])

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
        {/* <JCAPContext.Provider
        value={{
          CMPlans,
          PEDPlans,
          activePlan,
          requirements,
          GAOIs,
          setGAOIs,
          setRequirements,
          setActivePlan,
          setCMPlans,
          setPEDPlans,
        }}
        > */}
        <JAPContext.Provider
          value={{
            getPlan,
            plans,
            newPlan,
            activePlanIndex,
            setActivePlanIndex,
            addCRsToPlan,
            addAssetsToPlan,
            removeCRsFromPlan,
            removeAssetsFromPlan,
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
                  JAP
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
        </JAPContext.Provider>
        {/* </JCAPContext.Provider> */}
      </body>
    </html>
  )
}
