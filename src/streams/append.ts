import {Event} from "../events"
import {failure, Result} from "../primitives"
import {StreamAppender} from "./eventStore"

export async function append<Command, StreamEvent extends Event>(
  handle: (command: Command) => Result<StreamEvent>,
  streamAppender: StreamAppender<StreamEvent>,
  streamName: string,
  command: Command
): Promise<Result<boolean>> {
  try {
    const handleResult = handle(command)
    if (handleResult.isError) {
      return handleResult.wrap("cannot handle command")
    }
    const newEvent = handleResult.value
    return streamAppender.append(streamName, newEvent)
      .then(res => res.orElse("cannot append event to stream"))
  } catch (error) {
    if (error instanceof Error) {
      return failure(error.message)
    }
    return failure("unknown failure when appending event stream")
  }
}
