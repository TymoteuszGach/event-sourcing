import {Event} from "../../../../events";
import {failure, Result, success} from "../../../../primitives";
import {isAggregate} from "../../../../aggregates";
import {User} from "../user";

export type UserRegistered = Event<'UserRegistered', 'v1', { time: Date, name: string, surname: string, email: string }>

export function handleRegister(currentState: User | Record<string, never>, event: UserRegistered): Result<User> {
  if (isAggregate(currentState)) {
    return failure("user already registered")
  }
  return success({
    type: 'User',
    name: event.data.name,
    surname: event.data.surname,
    email: event.data.email
  })
}