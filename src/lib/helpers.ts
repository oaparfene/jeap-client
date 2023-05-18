import { ContentType } from "@/types/contentType";
import { CountryCodeType } from "@/types/countryCodeType";
import { InformationRequirementStatusType } from "@/types/informationRequirementStatusType";
import { IntelligenceDisciplineType } from "@/types/intelligenceDisciplineType";
import { CollectionExploitationPlanType } from "@/types/main/collectionExploitationPlanType";
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

export const createCollectionTask = (name: string): InformationRequirementType => {
    return {
        Identifier: uuid(),
        RequiredInformation: "Example Required Information",
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