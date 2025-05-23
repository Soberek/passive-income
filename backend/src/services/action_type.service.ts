import { ActionTypeRepository } from "../repositories/action_type.repository";
import { ServiceI } from "../types/index.type";
import { ActionType } from "../../../shared/types";
import { z } from "zod";

const actionTypeSchema = z.object({
  actionTypeId: z.number().min(1).optional(),
  name: z.string().min(2).max(100),
});

export class ActionTypeService implements ServiceI<ActionType, "actionTypeId"> {
  private actionTypeRepository: ActionTypeRepository;

  constructor(actionTypeRepository: ActionTypeRepository) {
    this.actionTypeRepository = actionTypeRepository;
  }

  add = (entity: Partial<ActionType>): number | null => {
    const validation = actionTypeSchema.safeParse(entity);
    if (!validation.success) {
      throw new Error("Invalid action type data");
    }
    return this.actionTypeRepository.add(entity);
  };

  getAll = (): ActionType[] => {
    return this.actionTypeRepository.getAll();
  };

  getById = (id: number): ActionType | null => {
    const validation = z.number().min(1).safeParse(id);
    if (!validation.success) {
      throw new Error("Invalid action type ID");
    }
    return this.actionTypeRepository.getById(id);
  };

  delete = (id: ActionType["actionTypeId"]): boolean => {
    const validation = z.number().min(1).safeParse(id);
    if (!validation.success) {
      throw new Error("Invalid action type ID");
    }
    return this.actionTypeRepository.delete(id);
  };

  update = (id: ActionType["actionTypeId"], entity: Partial<ActionType>): boolean => {
    const validation = actionTypeSchema.safeParse(entity);
    if (!validation.success) {
      throw new Error("Invalid action type data");
    }
    return this.actionTypeRepository.update(id, entity);
  };
}
