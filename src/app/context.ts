import { createContext } from "react";
import { CollectionExploitationPlanType } from "@/types/main/collectionExploitationPlanType";
import { InformationRequirementType } from "@/types/main/informationRequirementType";

export type JCAPContextType = {
    CMPlans: Array<CollectionExploitationPlanType>,
    PEDPlans: Array<CollectionExploitationPlanType>,
    activePlan: CollectionExploitationPlanType | null,
    requirements: InformationRequirementType[],
    setRequirements: (requirements: InformationRequirementType[]) => void,
    setActivePlan: (plan: CollectionExploitationPlanType) => void,
    setCMPlans: (plans: Array<CollectionExploitationPlanType>) => void
    setPEDPlans: (plans: Array<CollectionExploitationPlanType>) => void
}

export default createContext<JCAPContextType>({
    CMPlans: [],
    PEDPlans: [],
    activePlan: null,
    requirements: [],
    setRequirements: (requirements: InformationRequirementType[]) => requirements,
    setActivePlan: (plan: CollectionExploitationPlanType) => plan,
    setCMPlans: (plans: Array<CollectionExploitationPlanType>) => plans,
    setPEDPlans: (plans: Array<CollectionExploitationPlanType>) => plans
})