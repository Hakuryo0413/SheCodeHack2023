import { CofounderInterface } from "../../../types/cofounderInterface";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { CofounderDbInterface } from "../../repositories/cofounderDbRepository";

export const findCofounderById = (
  id: string,
  dbRepositoryCofounder: ReturnType<CofounderDbInterface>
) => {
  try {
    const cofounder = dbRepositoryCofounder.findCofounderById(id);
    if (!cofounder) {
      throw new AppError("No cofounder found", HttpStatus.UNAUTHORIZED);
    }
    return cofounder;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updatedCofounder = (
  cofounderId: string,
  updates: Partial<CofounderInterface>,
  dbRepositoryCofounder: ReturnType<CofounderDbInterface>
) => {
  try {
    const cofounder = dbRepositoryCofounder.updateCofounder(
      cofounderId,
      updates
    );
    if (!cofounder) {
      throw new AppError("No cofounder updates", HttpStatus.UNAUTHORIZED);
    }
    return cofounder;
  } catch (error: any) {
    throw new Error(`error while updating the cofounder ${error.message}`);
  }
};
