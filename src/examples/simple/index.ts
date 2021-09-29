import {aggregate} from "../../stream/aggregate";
import {aggregateUser, UserEvent} from "./users";

function* getUserEvents(): Generator<UserEvent> {
  yield {
    type: 'UserRegistered',
    data: {
      name: 'Tom',
      surname: 'Jones',
      time: new Date(),
      email: 'tom@example.com'
    },
    version: 'v1',
  }
  yield {
    type: 'UserNameChanged',
    data: {
      newName: 'Derrick',
    },
    version: 'v1',
  }
}

aggregate(getUserEvents(), aggregateUser).then(res => {
  if (res.isError) {
    console.log(res.message)
    return
  }
  console.log(res.value)
})