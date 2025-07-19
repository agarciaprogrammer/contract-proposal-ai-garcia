import { readFileSync } from "fs";
import { join } from "path";

export function loadContractData() {
  const file = join(process.cwd(), "data/contract-data/contract.json");
  return JSON.parse(readFileSync(file, "utf-8"));
}

export function loadAllContracts() {
  // MVP 1 only has one contract; later we can glob *.json
  return [loadContractData()];
}

export function loadEntity() {
  const file = join(process.cwd(), "data/entity-data/entity.json");
  return JSON.parse(readFileSync(file, "utf-8"));
}

export function loadCapabilityStatement() {
  const file = join(process.cwd(), "data/entity-data/capability-statement.json");
  return JSON.parse(readFileSync(file, "utf-8"));
}