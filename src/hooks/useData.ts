import { EventAssets, EventRequirements } from "@/5gConstants";
import { SettingsContext } from "@/app/context";
import { crs, generateDataFromORBAT } from "@/constants";
import { useContext, useEffect, useState } from "react";
import { Asset, Requirement } from "./usePlan";
import PocketBase from 'pocketbase';


export const useData = () => {

    const [allRequirements, setAllRequirements] = useState<Requirement[]>([]);
    const [allAssets, setAllAssets] = useState<Asset[]>([]);
    const { BackendAPIURL } = useContext(SettingsContext)
    const pb = new PocketBase(BackendAPIURL);
    console.log(BackendAPIURL)

    useEffect(() => {
        //setAllAssets(generateDataFromORBAT()!)
        // fetch(`${BackendAPIURL}/collections/Assets/records`).then(res => res.json().then(data => {
        //     setAllAssets(data.items.map((item: any, index: number) => {
        //         return {
        //             ID: index,
        //             UniquePlatformID: item.UniquePlatformID,
        //             Description: item.Description,
        //             AvailableFrom: new Date(item.AvailableFrom),
        //             Sensor: item.Sensor,
        //             Unit: item.Unit,
        //             Location: item.Location,
        //             Capacity: item.Capacity
        //         }
        //     }))
        //     console.log(data)
        // })).catch(err => {
        //     console.log(err)
        //     setAllAssets(EventAssets)
        // })

        // fetch(`${BackendAPIURL}/collections/Requirements/records`).then(res => res.json().then(data => {
        //     setAllRequirements(data.items.map((item: any, index: number) => {
        //         return {
        //             ID: index,
        //             Operation: item.Operation,
        //             Requester: item.Requester,
        //             CR_Rank: item.CR_Rank,
        //             Justification: item.Justification,
        //             Location: item.Location,
        //             Coordinates: item.Coordinates,
        //             Target_ID: item.Target_ID,
        //             Location_Category: item.Location_Category,
        //             Coll_Start_Time: item.Coll_Start_Time,
        //             Coll_End_Time: item.Coll_End_Time,
        //             Sensor_Visibility: item.Sensor_Visibility,
        //             LTIOV: (new Date(item.LTIOV)).toDateString(),
        //             Required_Information: item.Required_Information,
        //             Intel_Discipline: item.Intel_Discipline,
        //             Required_Product: item.Required_Product,
        //             ER_Report_Frequency: item.ER_Report_Frequency,
        //             Recurrance: item.Recurrance,
        //             RP_Remarks: item.RP_Remarks,
        //             Reporting_Instructions: item.Reporting_Instructions,
        //             ER_Remarks: item.ER_Remarks,
        //         }
        //     }))
        //     console.log(data)
        // })).catch(err => {
        //     console.log(err)
        //     setAllRequirements(EventRequirements)
        // })
        fetchAssetsFromBackend()
        fetchCRsFromBackend()

    }, [])

    const fetchAssetsFromBackend = async () => {
        fetch(`${BackendAPIURL}/api/collections/Assets/records`).then(res => res.json().then(data => {
            setAllAssets(data.items.map((item: any, index: number) => {
                return {
                    ID: index,
                    UniquePlatformID: item.UniquePlatformID,
                    Description: item.Description,
                    AvailableFrom: new Date(item.AvailableFrom),
                    Sensor: item.Sensor,
                    Unit: item.Unit,
                    Location: item.Location,
                    Capacity: item.Capacity
                }
            }))
            console.log(data)
        })).catch(err => {
            console.log(err)
            setAllAssets(EventAssets)
        })
    }

    const fetchCRsFromBackend = async () => {
        fetch(`${BackendAPIURL}/api/collections/Requirements/records`).then(res => res.json().then(data => {
            setAllRequirements(data.items.map((item: any, index: number) => {
                return {
                    ID: index,
                    Operation: item.Operation,
                    Requester: item.Requester,
                    CR_Rank: item.CR_Rank,
                    Justification: item.Justification,
                    Location: item.Location,
                    Coordinates: item.Coordinates,
                    Target_ID: item.Target_ID,
                    Location_Category: item.Location_Category,
                    Coll_Start_Time: item.Coll_Start_Time,
                    Coll_End_Time: item.Coll_End_Time,
                    Sensor_Visibility: item.Sensor_Visibility,
                    LTIOV: item.LTIOV,
                    Required_Information: item.Required_Information,
                    Intel_Discipline: item.Intel_Discipline,
                    Required_Product: item.Required_Product,
                    ER_Report_Frequency: item.ER_Report_Frequency,
                    Recurrance: item.Recurrance,
                    RP_Remarks: item.RP_Remarks,
                    Reporting_Instructions: item.Reporting_Instructions,
                    ER_Remarks: item.ER_Remarks,
                }
            }))
            console.log(data)
        })).catch(err => {
            console.log(err)
            setAllRequirements(EventRequirements)
        })
    }

    const uploadCRtoBackend = async (cr: Requirement) => {
        const res = await pb.collection('Requirements').create({
            Operation: cr.Operation,
            Requester: cr.Requester,
            CR_Rank: cr.CR_Rank,
            Justification: cr.Justification,
            Location: cr.Location,
            Coordinates: cr.Coordinates,
            Target_ID: cr.Target_ID,
            Location_Category: cr.Location_Category,
            Coll_Start_Time: cr.Coll_Start_Time,
            Coll_End_Time: cr.Coll_End_Time,
            Sensor_Visibility: cr.Sensor_Visibility,
            LTIOV: cr.LTIOV,
            Required_Information: cr.Required_Information,
            Intel_Discipline: cr.Intel_Discipline,
            Required_Product: cr.Required_Product,
            ER_Report_Frequency: cr.ER_Report_Frequency,
            Recurrance: cr.Recurrance,
            RP_Remarks: cr.RP_Remarks,
            Reporting_Instructions: cr.Reporting_Instructions,
            ER_Remarks: cr.ER_Remarks,
        });
        console.log(res)
        await fetchCRsFromBackend()
    }

    const uploadAssetToBackend = async (asset: Asset) => {
        const res = await pb.collection('Assets').create({
            UniquePlatformID: asset.UniquePlatformID,
            Description: asset.Description,
            AvailableFrom: asset.AvailableFrom,
            Sensor: asset.Sensor,
            Unit: asset.Unit,
            Location: asset.Location,
            Capacity: asset.Capacity
        });
        console.log(res)
        await fetchAssetsFromBackend()
    }

    const addAssets = (assetsToAdd: Asset[]) => {
        console.log(assetsToAdd)
        setAllAssets([...allAssets, ...assetsToAdd])
        console.log(allAssets)
    }

    const removeAssets = (assetsToRemove: Asset[]) => {
        setAllAssets(allAssets.filter(asset => !assetsToRemove.includes(asset)))
    }

    const addCRs = (CRsToAdd: Requirement[]) => {
        setAllRequirements([...allRequirements, ...CRsToAdd])
    }

    const removeCRs = (CRsToRemove: Requirement[]) => {
        setAllRequirements(allRequirements.filter(cr => !CRsToRemove.includes(cr)))
    }

    return {
        allRequirements,
        allAssets,
        addAssets,
        removeAssets,
        addCRs,
        removeCRs,
        fetchAssetsFromBackend,
        fetchCRsFromBackend,
        uploadCRtoBackend,
        uploadAssetToBackend
    }

}