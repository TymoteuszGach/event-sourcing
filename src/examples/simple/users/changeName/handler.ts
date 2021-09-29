import {Event} from "../../../../events";
import {failure, Result, success} from "../../../../primitives";
import {isAggregate} from "../../../../aggregates";
import {User} from "../user";

export type UserNameChanged = Event<'UserNameChanged', 'v1', { newName: string }>

export function handleChangeName(currentState: User | Record<string, never>, event: UserNameChanged): Result<User> {
  if (!isAggregate(currentState)) {
    return failure("user not registered")
  }
  return success({
    ...currentState,
    name: event.data.newName
  })
}