import { useEffect, useState } from "react";

export interface Plan {
    name: string,
    assets: any[],
    requirements: any[],
    allocation?: any[]
}

export interface Asset {
    ID: number,
    UniquePlatformID: string,
    Description: string,
    AvailableFrom: string,
    Sensor: string,
    Unit: string,
    Location: string,
    Capacity: string
}

export interface Requirement {
    ID: number,
    Operation: string,
    Requester: string,
    CR_Rank: string,
    Justification: string,
    Status: string,
    Location: string,
    Shape: string,
    Location_Type: string,
    Coordinates: string,
    Circle_Radius: number | null | string,
    Target_ID: string,
    Location_Category: string,
    Coll_Start_Date: string,
    Coll_End_Date: string,
    Coll_Start_Time: string,
    Coll_End_Time: string,
    Recurrance: string,
    ISR_Role: string,
    Sensor_Visibility: string,
    Required_Information:
        string,
    Intel_Discipline: string,
    Exploitation_Requirement: string,
    ER_Remarks: string,
    ER_Report_Frequency: string,
    Required_Product: string,
    RP_Remarks: string,
    RP_Report_Frequency: string,
    LTIOV: string,
    Latest_Report_Time: string,
    Reporting_Instructions:
        string,
}

export const usePlan = () => {
    const [plans, setPlans] = useState<Plan[]>([])
    const [activePlanIndex, setActivePlanIndex] = useState(0)

    const getPlan = () => {
        if (plans)
            return plans[activePlanIndex]
        return { name: 'No Plan', assets: [], requirements: [] }
    }

    const newPlan = (name: string) => {
        const plan = {
            name: name,
            assets: [],
            requirements: []
        }
        var tempPlans = plans
        tempPlans.push(plan)
        setPlans(tempPlans)
        setActivePlanIndex(tempPlans.length - 1)
        console.log('plans: ', plans)
        console.log('activePlanIndex: ', activePlanIndex)
    }

    const addCRsToPlan = (CRsToAdd: Requirement[]) => {
        var tempPlans = plans
        var plan = tempPlans[activePlanIndex]
        const updatedPlan = {
            name: plan.name,
            assets: plan.assets,
            requirements: [...new Set(plan.requirements.concat(CRsToAdd))]
        }
        tempPlans[activePlanIndex] = updatedPlan
        //setPlans(tempPlans)
    }

    const removeCRsFromPlan = (CRsToRemove: Requirement[]) => {
        var tempPlans = plans
        var plan = tempPlans[activePlanIndex]
        const updatedPlan = {
            name: plan.name,
            assets: plan.assets,
            requirements: plan.requirements.filter(el => !CRsToRemove.includes(el))
        }
        tempPlans[activePlanIndex] = updatedPlan
        //setPlans(tempPlans)
    }

    const addAssetsToPlan = (assetsToAdd: Asset[]) => {
        var tempPlans = plans
        var plan = tempPlans[activePlanIndex]
        console.log('plan', plan)
        const updatedPlan = {
            name: plan.name,
            assets: addAssetsWithNoDuplicates(plan.assets, assetsToAdd) ,
            requirements: plan.requirements
        }
        tempPlans[activePlanIndex] = updatedPlan
        //setPlans(tempPlans)
    }

    const removeAssetsFromPlan = (assetsToRemove: Asset[]) => {
        var tempPlans = plans
        var plan = tempPlans[activePlanIndex]
        const updatedPlan = {
            name: plan.name,
            assets: plan.assets.filter(el => !assetsToRemove.includes(el)),
            requirements: plan.requirements
        }
        tempPlans[activePlanIndex] = updatedPlan
        //setPlans(tempPlans)
    }

    const addAssetsWithNoDuplicates = (array: Asset[], items: Asset[]) => {
        var tempArray = array
        console.log('existing items', tempArray)
        items.forEach(item => {
            console.log('item to add:', item)
            if (!tempArray.find(el => el.ID === item.ID))
                tempArray = [ ...tempArray, item]
        })
        return tempArray
    }

    useEffect(() => {
        //newPlan('AAA')
    }, [])

    return {
        plans,
        getPlan,
        addAssetsToPlan,
        removeAssetsFromPlan,
        addCRsToPlan,
        removeCRsFromPlan,
        newPlan,
        activePlanIndex,
        setActivePlanIndex
    }
}