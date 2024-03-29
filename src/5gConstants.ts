import { Asset, Requirement } from "./hooks/usePlan";

export const EventAssets: Asset[] = [
    {
        ID: 1,
        UniquePlatformID: "F-35",
        Description: "F-35 Lightning II",
        AvailableFrom: new Date(23, 10, 2023),
        Sensor: "EO, IR, SAR",
        Unit: "1st Recon Unit",
        Location: "61.042497N 28.1418E",
        Capacity: "24"
    },
    {
        ID: 2,
        UniquePlatformID: "RQ-9",
        Description: "RQ-9 Reaper",
        AvailableFrom: new Date(23, 10, 2023),
        Sensor: "EO, IR",
        Unit: "1st Recon Unit",
        Location: "61.042497N 28.1418E",
        Capacity: "24"
    },
    {
        ID: 3,
        UniquePlatformID: "Tornado ECR",
        Description: "Tornado ECR (Electronic Combat/Reconnaissance)",
        AvailableFrom: new Date(23, 10, 2023),
        Sensor: "EO, IR",
        Unit: "1st Recon Unit",
        Location: "61.042497N 28.1418E",
        Capacity: "24"
    },
    {
        ID: 4,
        UniquePlatformID: "RQ-4A",
        Description: "RQ-4A Global Hawk",
        AvailableFrom: new Date(23, 10, 2023),
        Sensor: "EO, IR, SAR, GMTI",
        Unit: "1st Recon Unit",
        Location: "61.042497N 28.1418E",
        Capacity: "24"
    },
    {
        ID: 5,
        UniquePlatformID: "RQ-4D",
        Description: "RQ-4D Global Hawk",
        AvailableFrom: new Date(23, 10, 2023),
        Sensor: "EO, IR, SAR",
        Unit: "1st Recon Unit",
        Location: "61.042497N 28.1418E",
        Capacity: "24"
    },
    {
        ID: 6,
        UniquePlatformID: "MQ-1B",
        Description: "MQ-1B Predator",
        AvailableFrom: new Date(23, 10, 2023),
        Sensor: "EO, IR, SAR",
        Unit: "1st Recon Unit",
        Location: "61.042497N 28.1418E",
        Capacity: "24"
    },
    {
        ID: 7,
        UniquePlatformID: "Lanza LTR 35",
        Description: "Lanza LTR 35 (Light Tactical Radar)",
        AvailableFrom: new Date(23, 10, 2023),
        Sensor: "EW",
        Unit: "1st Recon Unit",
        Location: "61.042497N 28.1418E",
        Capacity: "24"
    },
]

export const EventRequirements: Requirement[] = [
    {
        ID: 1,
        Operation: "5G",
        Requester: "",
        Location: `Target 1 - Point Location`,
        Coordinates: "60.128848N 27.252927E",
        Coll_Start_Time: "15:00",
        Coll_End_Time: "15:30",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Confirm crash of Aircraft and provide location",
        Intel_Discipline: "SAR",
        Required_Product: "RECCEXREP",
        Recurrance: ""
    },
    {
        ID: 2,
        Operation: "5G",
        Requester: "",
        Location: `Target 2 - Point Location`,
        Coordinates: "60.129217N 27.253481E",
        Coll_Start_Time: "15:00",
        Coll_End_Time: "15:30",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Detect maritime equipment movement",
        Intel_Discipline: "MTI",
        Required_Product: "MTIEXREP",
        Recurrance: ""
    },
    {
        ID: 3,
        Operation: "5G",
        Requester: "",
        Location: `Target 3 - Point Location`,
        Coordinates: "60.129152N 27.253638E",
        Coll_Start_Time: "15:00",
        Coll_End_Time: "15:30",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Identify maritime equipment",
        Intel_Discipline: "EO",
        Required_Product: "RECCEXREP",
        Recurrance: ""
    },
    {
        ID: 4,
        Operation: "5G",
        Requester: "",
        Location: `Target 4 - Point Location`,
        Coordinates: "60.713336N 30.115474E",
        Coll_Start_Time: "15:00",
        Coll_End_Time: "15:30",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Detect convoy movement",
        Intel_Discipline: "MTI",
        Required_Product: "MTIEXREP",
        Recurrance: ""
    },
    {
        ID: 5,
        Operation: "5G",
        Requester: "",
        Location: `Target 5 - Point Location`,
        Coordinates: "60.924287N 26.131586E",
        Coll_Start_Time: "15:30",
        Coll_End_Time: "16:00",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Identify movements of migrants on border",
        Intel_Discipline: "EO",
        Required_Product: "RECCEXREP",
        Recurrance: ""
    },
    {
        ID: 6,
        Operation: "5G",
        Requester: "",
        Location: `Target 6 - Point Location`,
        Coordinates: "60.713204N 30.114297E",
        Coll_Start_Time: "16:00",
        Coll_End_Time: "16:30",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Detect convoy movement and identify the equipment carried by the convoy",
        Intel_Discipline: "MTI",
        Required_Product: "MTIEXREP",
        Recurrance: ""
    },
    {
        ID: 7,
        Operation: "5G",
        Requester: "",
        Location: `Target 7 - Point Location`,
        Coordinates: "60.714081N 30.114972E",
        Coll_Start_Time: "16:00",
        Coll_End_Time: "16:30",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Identify the equipment carried by the convoy (ref CR6)",
        Intel_Discipline: "EO",
        Required_Product: "RECCEXREP",
        Recurrance: ""
    },
    {
        ID: 8,
        Operation: "5G",
        Requester: "",
        Location: `Target 8 - Point Location`,
        Coordinates: "60.530935N 27.243154E",
        Coll_Start_Time: "09:00",
        Coll_End_Time: "09:30",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Cross cue FMV to reported plane crash area",
        Intel_Discipline: "FMV",
        Required_Product: "MIEXREP",
        Recurrance: ""
    },
    {
        ID: 9,
        Operation: "5G",
        Requester: "",
        Location: `Target 9 - Point Location`,
        Coordinates: "60.713010N 30.115182E",
        Coll_Start_Time: "09:00",
        Coll_End_Time: "09:30",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Report on activities in Gromov Station Area and identify equipment",
        Intel_Discipline: "EO",
        Required_Product: "RECCEXREP",
        Recurrance: ""
    },
    {
        ID: 10,
        Operation: "5G",
        Requester: "",
        Location: `Target 10 - Point Location`,
        Coordinates: "60.635365N 27.226914E",
        Coll_Start_Time: "09:00",
        Coll_End_Time: "10:00",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Report on activities along the route identified with the coordinates. ",
        Intel_Discipline: "FMV",
        Required_Product: "MIEXREP",
        Recurrance: ""
    },
    {
        ID: 11,
        Operation: "5G",
        Requester: "",
        Location: `Target 11 - Point Location`,
        Coordinates: "60.958220N 29.115388E",
        Coll_Start_Time: "10:00",
        Coll_End_Time: "10:30",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Detect and track ground equipment (Group 1 mixed AD/ARTY) movement",
        Intel_Discipline: "MTI",
        Required_Product: "MTIEXREP",
        Recurrance: ""
    },
    {
        ID: 12,
        Operation: "5G",
        Requester: "",
        Location: `Target 12 - Point Location`,
        Coordinates: "60.957780N 29.115702E",
        Coll_Start_Time: "10:00",
        Coll_End_Time: "10:30",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Identify ground equipment (Group 1) composition ",
        Intel_Discipline: "EO",
        Required_Product: "RECCEXREP",
        Recurrance: ""
    },
    {
        ID: 13,
        Operation: "5G",
        Requester: "",
        Location: `Target 13 - Point Location`,
        Coordinates: "60.958009N 29.116202E",
        Coll_Start_Time: "10:00",
        Coll_End_Time: "10:30",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Detect and track ground equipment (Group 2 mixed AD/ARTY) movement",
        Intel_Discipline: "MTI",
        Required_Product: "MTIEXREP",
        Recurrance: ""
    },
    {
        ID: 14,
        Operation: "5G",
        Requester: "",
        Location: `Target 14 - Point Location`,
        Coordinates: "60.958816N 29.115503E",
        Coll_Start_Time: "10:00",
        Coll_End_Time: "10:30",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Identify ground equipment (Group 2 composition) ",
        Intel_Discipline: "EO",
        Required_Product: "RECCEXREP",
        Recurrance: ""
    },
    {
        ID: 15,
        Operation: "5G",
        Requester: "",
        Location: `Target 15 - Point Location`,
        Coordinates: "60.958641N 29.116663E",
        Coll_Start_Time: "10:00",
        Coll_End_Time: "11:30",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Detect and track ground equipment movement",
        Intel_Discipline: "MTI",
        Required_Product: "MTIEXREP",
        Recurrance: ""
    },
    {
        ID: 16,
        Operation: "5G",
        Requester: "",
        Location: `Target 16 - Point Location`,
        Coordinates: "60.959217N 29.116306E",
        Coll_Start_Time: "10:00",
        Coll_End_Time: "11:30",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Identify ground equipment",
        Intel_Discipline: "EO",
        Required_Product: "RECCEXREP",
        Recurrance: ""
    },
    {
        ID: 17,
        Operation: "5G",
        Requester: "",
        Location: `Target 17 - Point Location`,
        Coordinates: "61.154839N 28.990382E",
        Coll_Start_Time: "11:00",
        Coll_End_Time: "11:30",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Identify enemy ground activity",
        Intel_Discipline: "EO",
        Required_Product: "RECCEXREP",
        Recurrance: ""
    },
    {
        ID: 18,
        Operation: "5G",
        Requester: "",
        Location: `Target 18 - Point Location`,
        Coordinates: "61.154449N 28.991090E",
        Coll_Start_Time: "11:00",
        Coll_End_Time: "11:30",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Detect and report on ELINT ",
        Intel_Discipline: "ELINT",
        Required_Product: "ELINT Report",
        Recurrance: ""
    },
    {
        ID: 19,
        Operation: "5G",
        Requester: "",
        Location: `Target 19 - Point Location`,
        Coordinates: "60.712647N 30.113953E",
        Coll_Start_Time: "13:00",
        Coll_End_Time: "14:00",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Detect and track ground equipment movement",
        Intel_Discipline: "MTI",
        Required_Product: "MTIEXREP",
        Recurrance: ""
    },
    {
        ID: 20,
        Operation: "5G",
        Requester: "",
        Location: `Target 20 - Point Location`,
        Coordinates: "60.712636N 30.114448E",
        Coll_Start_Time: "13:00",
        Coll_End_Time: "14:00",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Identify enemy ground activity",
        Intel_Discipline: "EO",
        Required_Product: "RECCEXREP",
        Recurrance: ""
    },
    {
        ID: 21,
        Operation: "5G",
        Requester: "",
        Location: `Target 21 - Point Location`,
        Coordinates: "61.243264N 29.231728E",
        Coll_Start_Time: "13:00",
        Coll_End_Time: "14:00",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Detect and track movement of ground force IVO border",
        Intel_Discipline: "MTI",
        Required_Product: "MTIEXREP",
        Recurrance: ""
    },
    {
        ID: 22,
        Operation: "5G",
        Requester: "",
        Location: `Target 22 - Point Location`,
        Coordinates: "60.486609N 26.549940E",
        Coll_Start_Time: "13:30",
        Coll_End_Time: "14:00",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Identify any obstacles along the route",
        Intel_Discipline: "FMV",
        Required_Product: "MIEXREP",
        Recurrance: ""
    },
    {
        ID: 23,
        Operation: "5G",
        Requester: "",
        Location: `Target 23 - Point Location`,
        Coordinates: "60.958138N 29.116580E",
        Coll_Start_Time: "14:00",
        Coll_End_Time: "14:30",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Detect and track ground equipment (Group 1 mixed AD/ARTY) movement",
        Intel_Discipline: "MTI",
        Required_Product: "MTIEXREP",
        Recurrance: ""
    },
    {
        ID: 24,
        Operation: "5G",
        Requester: "",
        Location: `Target 24 - Point Location`,
        Coordinates: "60.958965N 29.115700E",
        Coll_Start_Time: "14:00",
        Coll_End_Time: "14:30",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Identify ground equipment (Group 1) composition ",
        Intel_Discipline: "EO",
        Required_Product: "RECCEXREP",
        Recurrance: ""
    },
    {
        ID: 25,
        Operation: "5G",
        Requester: "",
        Location: `Target 25 - Point Location`,
        Coordinates: "60.486727N 26.913221E",
        Coll_Start_Time: "14:00",
        Coll_End_Time: "15:00",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Locate personnel within the named area of interest",
        Intel_Discipline: "SIGINT",
        Required_Product: "SIGINT Report",
        Recurrance: ""
    },
    {
        ID: 26,
        Operation: "5G",
        Requester: "",
        Location: `Target 26 - Point Location`,
        Coordinates: "60.516738N 26.706071E",
        Coll_Start_Time: "14:30",
        Coll_End_Time: "15:00",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Assess impact of flooding ",
        Intel_Discipline: "SAR",
        Required_Product: "RECCEXREP",
        Recurrance: ""
    },
    {
        ID: 27,
        Operation: "5G",
        Requester: "",
        Location: `Target 27 - Point Location`,
        Coordinates: "60.958345N 29.115767E",
        Coll_Start_Time: "15:30",
        Coll_End_Time: "16:00",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Detect and track ground equipment (Group 2 mixed AD/ARTY) movement",
        Intel_Discipline: "MTI",
        Required_Product: "MTIEXREP",
        Recurrance: ""
    },
    {
        ID: 28,
        Operation: "5G",
        Requester: "",
        Location: `Target 28 - Point Location`,
        Coordinates: "60.959215N 29.115856E",
        Coll_Start_Time: "15:30",
        Coll_End_Time: "16:00",
        LTIOV: "Fri Nov 27 2023",
        Required_Information: "Identify ground equipment (Group 2 composition) ",
        Intel_Discipline: "EO",
        Required_Product: "RECCEXREP",
        Recurrance: ""
    }
    ];