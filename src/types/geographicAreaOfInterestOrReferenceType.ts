import { GeographicAreaOfInterestType } from "./geographicAreaOfInterestType";

export interface GeographicAreaOfInterestOrReferenceType {
  //#region ODataApi Properties
  ownedId: number;
  GeographicAreaOfInterestReference?: string;
  GeographicAreaOfInterest?: GeographicAreaOfInterestType;
  //#endregion
}
