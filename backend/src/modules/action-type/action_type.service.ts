import { ActionTypeRepository } from "./action_type.repository";
import { ActionType } from "../../../../shared/types";

import { actionTypeSchema, actionTypeCreateSchema, actionTypeUpdateSchema } from "./action_type.schema";

import type { CreatableServiceI, DeletableServiceI, UpdatableServiceI, ReadableServiceI } from "../../types/index.type";

export class ActionTypeService
  implements
    CreatableServiceI<ActionType, "actionTypeId">,
    DeletableServiceI<ActionType, "actionTypeId">,
    UpdatableServiceI<ActionType, "actionTypeId">,
    ReadableServiceI<ActionType, "actionTypeId">
{
  private actionTypeRepository: ActionTypeRepository;

  constructor(actionTypeRepository: ActionTypeRepository) {
    this.actionTypeRepository = actionTypeRepository;
  }

  add = (entity: Partial<ActionType>): number | null => {
    const validation = actionTypeCreateSchema.safeParse(entity);
    if (!validation.success) {
      throw new Error("Invalid action type data " + JSON.stringify(validation.error.issues));
    }
    return this.actionTypeRepository.add(entity);
  };

  getAll = (): ActionType[] => {
    return this.actionTypeRepository.getAll();
  };

  getById = (id: number): ActionType | null => {
    const validateId = actionTypeSchema.shape.actionTypeId.safeParse(id);
    const validateEntity = actionTypeSchema.safeParse(id);
    if (!validateEntity.success) {
      throw new Error("Invalid action type data " + JSON.stringify(validateEntity.error.issues));
    }
    if (!validateId.success) {
      // error with zod issues
      throw new Error("Invalid action type ID " + JSON.stringify(validateId.error.issues));
    }
    return this.actionTypeRepository.getById(id);
  };

  delete = (id: ActionType["actionTypeId"]): boolean => {
    const validation = actionTypeSchema.shape.actionTypeId.safeParse(id);
    if (!validation.success) {
      throw new Error("Invalid action type ID " + JSON.stringify(validation.error.issues));
    }
    return this.actionTypeRepository.delete(id);
  };

  update = (id: ActionType["actionTypeId"], entity: Partial<ActionType>): boolean => {
    const validation = actionTypeUpdateSchema.safeParse(entity);
    if (!validation.success) {
      throw new Error("Invalid action type data " + JSON.stringify(validation.error.issues));
    }
    return this.actionTypeRepository.update(id, entity);
  };
}
