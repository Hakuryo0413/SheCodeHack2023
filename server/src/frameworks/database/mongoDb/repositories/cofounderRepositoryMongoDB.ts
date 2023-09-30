import {
  CreateCofounderInterface,
  CofounderInterface,
} from "../../../../types/cofounderInterface";
import { CofounderModel } from "../models/cofounderModel";
import { CofounderEntity } from "../../../../entities/CofounderEntity";

export const CofounderRepositoryMongoDB = (model: CofounderModel) => {
  const cofounderEntity = new CofounderEntity(model);

  const getCofounderByEmail = async (email: string) => {
    const cofounder = cofounderEntity.getCofounderByEmail(email);
    return cofounder;
  };

  const createCofounder = async (cofounder: CreateCofounderInterface) => {
    const newCofounder = cofounderEntity.createCofounder(cofounder);
    return newCofounder;
  };

  const getCofounderById = async (id: string) => {
    const cofounder = cofounderEntity.getCofounderById(id);
    return cofounder;
  };

  const updateCofounder = async (
    cofounderId: string,
    updates: Partial<CofounderInterface>
  ) => {
    const cofounder = cofounderEntity.updateCofounder(cofounderId, updates);
    return cofounder;
  };

  return {
    getCofounderByEmail,
    createCofounder,
    getCofounderById,
    updateCofounder,
  };
};

export type CofounderRepositoryMongoDB = typeof CofounderRepositoryMongoDB;
