import { ContentType } from "@/types/contentType";
import { CountryCodeType } from "@/types/countryCodeType";
import { FunctionalCategoryCodeType } from "@/types/functionalCategoryCodeType";
import { GeographicAreaCategoryType } from "@/types/geographicAreaCategoryType";
import { InformationRequirementStatusType } from "@/types/informationRequirementStatusType";
import { IntelligenceDisciplineType } from "@/types/intelligenceDisciplineType";
import { CollectionExploitationPlanType } from "@/types/main/collectionExploitationPlanType";
import { GeographicAreaOfInterestType } from "@/types/main/geographicAreaOfInterestType";
import { InformationRequirementType } from "@/types/main/informationRequirementType";
import { MissionType } from "@/types/missionType";
import { ProductTypeType } from "@/types/productTypeType";
import { PublishedStatusType } from "@/types/publishedStatusType";
import { SecurityClassificationType } from "@/types/securityClassificationType";
import { uuid } from 'uuidv4';

export const addTasksToCMPlan = (plan: CollectionExploitationPlanType, tasks: InformationRequirementType[]): CollectionExploitationPlanType => {
    plan.InformationRequirements = [];
    for (let i = 0; i < tasks.length; i++) {
        plan.InformationRequirements?.push({
            ownedId: i,
            InformationRequirement: tasks[i]
        });
    }
    return plan;
}

export const addTasksToPEDPlan = (plan: CollectionExploitationPlanType, tasks: InformationRequirementType[]): CollectionExploitationPlanType => {
    plan.InformationRequirements = [];
    for (let i = 0; i < tasks.length; i++) {
        plan.InformationRequirements?.push({
            ownedId: i,
            InformationRequirement: tasks[i]
        });
    }
    return plan;
}

export const generateRandomTasks = (amount: number): InformationRequirementType[] => {
    const tasks: InformationRequirementType[] = [];
    for (let i = 0; i < amount; i++) {
        tasks.push(createCollectionTask(`Task ${i}`));
    }
    return tasks;
}

export const generateRandomTasksWithGAOI = (gaois: GeographicAreaOfInterestType[]): InformationRequirementType[] => {
    const tasks: InformationRequirementType[] = [];
    for (let i = 0; i < gaois.length; i++) {
        tasks.push(createCollectionTask(`Task ${i}`, gaois[i]));
    }
    return tasks;
}

export const generateRandomGAOIs = (amount: number): GeographicAreaOfInterestType[] => {
    const gaois: GeographicAreaOfInterestType[] = [];
    for (let i = 0; i < amount; i++) {
        gaois.push(createGAOI(`GAOI ${i}`));
    }
    return gaois;
}

export const createGAOI = (name: string): GeographicAreaOfInterestType => {
    const gaoi: GeographicAreaOfInterestType = {
        Identifier: uuid(),
        GeographicAreaCategory: GeographicAreaCategoryType.NAI,
        SerialNumber: uuid(),
        CountryCode: CountryCodeType.NLD,
        Description: "Example GAOI Description",
        Name: name,
        FunctionalCategoryCode: FunctionalCategoryCodeType.GROUNDACTIVITY,
        CreationDateTime: {
            Value: new Date()
        },
        Creator: {
            MilitaryUnit: {
                UnitIdentifier: "1",
                Nation: CountryCodeType.NLD
            },
            UniquePlatformIdentification: {
                CountryCode: CountryCodeType.NLD,
                PlatformID: "1"
            },
            Author: "admin"
        },
        Security: {
            Policy: "NATO",
            Classification: SecurityClassificationType.UNCLASSIFIED,
        },
        Deleted: false
    }
    return gaoi
}

export const createCMPlan = (name: string): CollectionExploitationPlanType => {
    return {
        Identifier: uuid(),
        Content: ContentType.CollectionTaskList,
        Name: name,
        SerialNumber: uuid(),
        OpenEndedTimeInterval: {
            Start: {
                Value: new Date()
            }
        },
        PublishedStatus: PublishedStatusType.Draft,
        MissionName: "Testing...",
        MissionType: MissionType.ExerciseName,
        ExerciseIndicator: true,
        schemaVersion: 1,
        CreationDateTime: {
            Value: new Date()
        },
        Creator: {
            MilitaryUnit: {
                UnitIdentifier: "1",
                Nation: CountryCodeType.NLD
            },
            UniquePlatformIdentification: {
                CountryCode: CountryCodeType.NLD,
                PlatformID: "1"
            },
            Author: "admin"
        },
        Security: {
            Policy: "NATO",
            Classification: SecurityClassificationType.UNCLASSIFIED,
        },
        Deleted: false,
        InformationRequirements: [],
    }
}

export const createCollectionTask = (name: string, gaoi?: GeographicAreaOfInterestType): InformationRequirementType => {
    return {
        active: false,
        Identifier: uuid(),
        RequiredInformation: "Example Required Information",
        LatestDateTimeZuluOfInformationValue: {
            Continuously: false,
            EndDateTimeZulu: {
                Value: new Date('December 17, 2023 03:24:00')
            }
        },
        Name: name,
        Priority: "1",
        Status: InformationRequirementStatusType.APPROVED,
        SerialNumber: uuid(),
        RequiredProduct: [
            {
                MaximumAllowedClassificationLevel: {
                    Policy: "NATO",
                    Classification: SecurityClassificationType.UNCLASSIFIED,
                },
                Product: {
                    Product: {},
                    ProductTypeType: ProductTypeType.StillImage,
                }
            }
        ],
        Originator: {
            Requestor: "ACO"
        },
        IntelCollectionDiscipline: [IntelligenceDisciplineType.ELINT],
        CreationDateTime: {
            Value: new Date()
        },
        Creator: {
            MilitaryUnit: {
                UnitIdentifier: "1",
                Nation: CountryCodeType.NLD
            },
            Author: "admin",
        },
        Security: {
            Policy: "NATO",
            Classification: SecurityClassificationType.UNCLASSIFIED,
        },
        Deleted: false,
        GeographicAreaOfInterestReference: gaoi ? [{
            ownedId: 0,
            GeographicAreaOfInterest: gaoi
        }] : undefined
    }
}


export const createPEDPlan = (name: string): CollectionExploitationPlanType => {
    return {
        Identifier: uuid(),
        Content: ContentType.CollectionExploitationPlan,
        Name: name,
        SerialNumber: uuid(),
        OpenEndedTimeInterval: {
            Start: {
                Value: new Date()
            }
        },
        PublishedStatus: PublishedStatusType.Draft,
        MissionName: "Testing...",
        MissionType: MissionType.ExerciseName,
        ExerciseIndicator: true,
        schemaVersion: 1,
        CreationDateTime: {
            Value: new Date()
        },
        Creator: {
            MilitaryUnit: {
                UnitIdentifier: "1",
                Nation: CountryCodeType.NLD
            },
            UniquePlatformIdentification: {
                CountryCode: CountryCodeType.NLD,
                PlatformID: "1"
            },
            Author: "admin"
        },
        Security: {
            Policy: "NATO",
            Classification: SecurityClassificationType.UNCLASSIFIED,
        },
        Deleted: false,
        InformationRequirements: [],
    }
}