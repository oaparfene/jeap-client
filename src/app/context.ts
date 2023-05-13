import { createContext } from "react";

export interface Plan {
    name: string,
    entries: Array<any>
}

export type JCAPContextType = {
    plans: Array<Plan>,
    setPlans: (plans: Array<Plan>) => void
}

export default createContext<JCAPContextType>({
    plans: [],
    setPlans: (plans: Array<Plan>) => plans
})