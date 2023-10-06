import { EventAssets } from "@/5gConstants";
import { crs, generateDataFromORBAT } from "@/constants";
import { useEffect, useState } from "react";
import { Asset, Requirement } from "./usePlan";

export const useData = () => {

    const [allRequirements, setAllRequirements] = useState<Requirement[]>([]);
    const [allAssets, setAllAssets] = useState<Asset[]>([]);

    useEffect(() => {
        //setAllAssets(generateDataFromORBAT()!)
        fetch('http://localhost:8090/api/collections/Assets/records').then(res => res.json().then(data => {
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

        setAllRequirements(crs)
    }, [])

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
        removeCRs
    }

}