import {
  CreateCofounderInterface,
  CofounderInterface,
} from "../types/cofounderInterface";
import { CofounderModel } from "../frameworks/database/mongoDb/models/cofounderModel";

export class CofounderEntity {
  private model: CofounderModel;

  constructor(model: CofounderModel) {
    this.model = model;
  }

  public async getCofounderByEmail(
    email: string
  ): Promise<CofounderInterface | null> {
    const cofounder = await this.model.findOne({ email }).exec();
    return cofounder;
  }

  public async createCofounder(
    cofounder: CreateCofounderInterface
  ): Promise<CofounderInterface> {
    const newCofounder = await this.model.create(cofounder);
    return newCofounder;
  }

  public async getCofounderById(
    id: string
  ): Promise<CofounderInterface | null> {
    const cofounder = await this.model.findById(id);
    return cofounder;
  }

  public async updateCofounder(
    cofounderId: string,
    updates: Partial<CofounderInterface>
  ): Promise<any> {
    const currentDetails = await this.model.findById(cofounderId);
    Object.assign(currentDetails ?? {}, updates);
    const updatedCofounder = await currentDetails?.save();
    return updatedCofounder;
  }
}
