import {Aggregate} from "../../../aggregates";
import {handleRegister, UserRegistered} from "./register";
import {handleChangeName, UserNameChanged} from "./changeName";
import {Result} from "../../../primitives";

export type User = Aggregate<'User'> & {
  name: string,
  surname: string,
  email: string
}

export type UserEvent = UserRegistered | UserNameChanged

export const aggregateUser = (currentState: User | Record<string, never>, event: UserEvent): Result<User> => {
  switch (event.type) {
    case 'UserRegistered':
      return handleRegister(currentState, event)
    case 'UserNameChanged':
      return handleChangeName(currentState, event)
  }
}