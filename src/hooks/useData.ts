import { crs, generateDataFromORBAT } from "@/constants";
import { useEffect, useState } from "react";
import { Asset, Requirement } from "./usePlan";

export const useData = () => {

    const [allRequirements, setAllRequirements] = useState<Requirement[]>([]);
    const [allAssets, setAllAssets] = useState<Asset[]>([]);

    useEffect(() => {
        setAllAssets(generateDataFromORBAT()!)
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