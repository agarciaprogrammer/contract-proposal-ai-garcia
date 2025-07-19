import { readFileSync } from "fs";
import { join } from "path";

export function loadContractData() {
  const file = join(process.cwd(), "data/contract-data/contract.json");
  return JSON.parse(readFileSync(file, "utf-8"));
}

export function loadAllContracts() {
  const mainContract = loadContractData();
  
  // Additional hardcoded contracts
  const additionalContracts = [
    {
      id: "facility-maintenance-2025",
      title: "Facility Maintenance Services",
      solicitationNumber: "FA301625Q0051",
      agencyName: "DEPT OF THE AIR FORCE",
      naicsCode: "561210",
      naicsName: "Facilities Support Services",
      deadlineDate: "2025-08-15T17:00:00.000Z",
      description: "Comprehensive facility maintenance services including HVAC, electrical, plumbing, and general building maintenance for Joint Base San Antonio facilities. The contract covers preventive maintenance, emergency repairs, and facility upgrades across multiple buildings and infrastructure systems."
    },
    {
      id: "it-support-services-2025",
      title: "IT Support and Network Infrastructure Services",
      solicitationNumber: "FA301625Q0052", 
      agencyName: "DEPT OF THE AIR FORCE",
      naicsCode: "541519",
      naicsName: "Other Computer Related Services",
      deadlineDate: "2025-09-30T17:00:00.000Z",
      description: "Information technology support services including network infrastructure management, cybersecurity implementation, software deployment, and technical support for military personnel. Services include 24/7 help desk support, system administration, and IT project management."
    }
  ];

  return [mainContract, ...additionalContracts];
}

export function loadEntity() {
  const file = join(process.cwd(), "data/entity-data/entity.json");
  return JSON.parse(readFileSync(file, "utf-8"));
}

export function loadCapabilityStatement() {
  const file = join(process.cwd(), "data/entity-data/capability-statement.json");
  return JSON.parse(readFileSync(file, "utf-8"));
}
