import { useEffect, useState } from "react";

interface Plan {
    name: string,
    assets: any[],
    requirements: any[]
}

interface Asset {
    UniquePlatformID: string,
    Description: string,
    AvailableFrom: string,
    Sensor: string,
    Unit: string,
    Location: string,
    Capacity: string
}

interface Requirement {
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
    }

    const addCRsToPlan = (CRsToAdd: Requirement[]) => {
        var tempPlans = plans
        var plan = tempPlans[activePlanIndex]
        const updatedPlan = {
            name: plan.name,
            assets: plan.assets,
            requirements: Array.from(new Set(plan.requirements.concat(CRsToAdd)))
        }
        tempPlans[activePlanIndex] = updatedPlan
        setPlans(tempPlans)
    }

    const addAssetsToPlan = (assetsToAdd: Asset[]) => {
        var tempPlans = plans
        var plan = tempPlans[activePlanIndex]
        const updatedPlan = {
            name: plan.name,
            assets: Array.from(new Set(plan.assets.concat(assetsToAdd))) ,
            requirements: plan.requirements
        }
        tempPlans[activePlanIndex] = updatedPlan
        setPlans(tempPlans)
    }

    useEffect(() => {
        //newPlan('AAA')
    }, [])

    return {
        plans,
        getPlan,
        addAssetsToPlan,
        addCRsToPlan,
        newPlan,
        activePlanIndex,
        setActivePlanIndex
    }
}