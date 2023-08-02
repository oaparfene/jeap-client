import { createContext } from "react";
import { CollectionExploitationPlanType } from "@/types/main/collectionExploitationPlanType";
import { InformationRequirementType } from "@/types/main/informationRequirementType";
import { GeographicAreaOfInterestType } from "@/types/main/geographicAreaOfInterestType";
import { Plan, Asset, Requirement, Task } from "@/hooks/usePlan";

export type JAPContextType = {
    plans: Plan[],
    getPlan: () => Plan,
    addAssetsToPlan: (assetsToAdd: Asset[]) => void,
    removeAssetsFromPlan: (assetsToRemove: Asset[]) => void,
    addCRsToPlan: (CRsToAdd: Requirement[]) => void,
    removeCRsFromPlan: (CRsToRemove: Requirement[]) => void,
    addTasksToPlan: (tasksToAdd: Task[]) => void,
    newPlan: (name: string) => void,
    activePlanIndex: number,
    setActivePlanIndex: (index: number) => void
}

export type JCAPContextType = {
    CMPlans: Array<CollectionExploitationPlanType>,
    PEDPlans: Array<CollectionExploitationPlanType>,
    activePlan: CollectionExploitationPlanType | null,
    requirements: InformationRequirementType[],
    GAOIs: GeographicAreaOfInterestType[],
    setGAOIs: (gaois: GeographicAreaOfInterestType[]) => void,
    setRequirements: (requirements: InformationRequirementType[]) => void,
    setActivePlan: (plan: CollectionExploitationPlanType) => void,
    setCMPlans: (plans: Array<CollectionExploitationPlanType>) => void
    setPEDPlans: (plans: Array<CollectionExploitationPlanType>) => void
}

export const JAPContext = createContext<JAPContextType>({
    plans: [],
    getPlan: () => { return { name: 'No Plan', assets: [], requirements: [] } },
    addAssetsToPlan: (assetsToAdd: Asset[]) => { },
    removeAssetsFromPlan: (assetsToRemove: Asset[]) => { },
    addCRsToPlan: (CRsToAdd: Requirement[]) => { },
    removeCRsFromPlan: (CRsToRemove: Requirement[]) => { },
    addTasksToPlan: (tasksToAdd: Task[]) => { },
    newPlan: (name: string) => { },
    activePlanIndex: 0,
    setActivePlanIndex: (index: number) => { }
})

export const JCAPContext =  createContext<JCAPContextType>({
    CMPlans: [],
    PEDPlans: [],
    activePlan: null,
    requirements: [],
    GAOIs: [],
    setGAOIs: (gaois: GeographicAreaOfInterestType[]) => gaois,
    setRequirements: (requirements: InformationRequirementType[]) => requirements,
    setActivePlan: (plan: CollectionExploitationPlanType) => plan,
    setCMPlans: (plans: Array<CollectionExploitationPlanType>) => plans,
    setPEDPlans: (plans: Array<CollectionExploitationPlanType>) => plans
})