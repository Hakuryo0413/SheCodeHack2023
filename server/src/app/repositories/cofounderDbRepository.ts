import { CofounderRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/cofounderRepositoryMongoDB";
import {
  CreateCofounderInterface,
  CofounderInterface,
} from "../../types/cofounderInterface";

export const cofounderDbRepository = (
  repository: ReturnType<CofounderRepositoryMongoDB>
) => {
  const getCofounderByEmail = async (email: string) => {
    return await repository.getCofounderByEmail(email);
  };

  const createCofounder = async (cofounder: CreateCofounderInterface) => {
    return await repository.createCofounder(cofounder);
  };

  const findCofounderById = async (id: string) => {
    const cofounder = await repository.getCofounderById(id);
    return cofounder;
  };

  const updateCofounder = async (
    cofounderId: string,
    updates: Partial<CofounderInterface>
  ) => {
    const cofounder = await repository.updateCofounder(cofounderId, updates);
    return cofounder;
  };

  return {
    getCofounderByEmail,
    createCofounder,
    findCofounderById,
    updateCofounder,
  };
};

export type CofounderDbInterface = typeof cofounderDbRepository;
