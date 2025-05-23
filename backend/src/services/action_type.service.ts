import { ActionTypeRepository } from "../repositories/action_type.repository";
import { ServiceI } from "../types/index.type";
import { ActionType } from "../../../shared/types";

export class ActionTypeService implements ServiceI<ActionType, "actionTypeId"> {
  private actionTypeRepository: ActionTypeRepository;

  constructor(actionTypeRepository: ActionTypeRepository) {
    this.actionTypeRepository = actionTypeRepository;
  }

  add = (entity: Partial<ActionType>): number | BigInt | null => {
    return this.actionTypeRepository.add(entity);
  };

  getAll = (): ActionType[] => {
    return this.actionTypeRepository.getAll();
  };

  getById = (id: number | BigInt): ActionType | null => {
    return this.actionTypeRepository.getById(id);
  };

  delete = (id: number | BigInt): boolean => {
    return this.actionTypeRepository.delete(id);
  };

  update = (id: number | BigInt, entity: Partial<ActionType>): boolean => {
    return this.actionTypeRepository.update(id, entity);
  };
}
