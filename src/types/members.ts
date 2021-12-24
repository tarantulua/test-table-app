import { IFilters } from "./filtets";

interface IMember {
  id: string;
  name: string;
  globalProfiling: number;
  role: string;
  operatingMode: string;
  competence: string;
  performance: string;
  talentPotential: string;
  visionValues: string;
  attritionRisk: string;
  reward: string;
}

interface IGetMembers {
  filters: IFilters;
  data: IMember[]
}

export { IMember, IGetMembers };
