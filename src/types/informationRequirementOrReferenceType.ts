import { InformationRequirementType } from "./main/informationRequirementType";

export interface InformationRequirementOrReferenceType {
  //#region ODataApi Properties
  ownedId: number;
  InformationRequirementReference?: string;
  InformationRequirement?: InformationRequirementType;
  //#endregion
}
