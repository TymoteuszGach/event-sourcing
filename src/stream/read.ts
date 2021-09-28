import {Event} from "../events";
import {ReadFromStream} from "./eventStore";
import {failure, Result} from "../primitives";

export async function read<StreamEvent extends Event>(
  readFromStream: ReadFromStream<StreamEvent>,
  streamName: string,
): Promise<Result<Generator<StreamEvent>>> {
  try {
    return readFromStream(streamName)
  } catch (error) {
    if (error instanceof Error) {
      return failure(error.message)
    }
    return failure("unknown failure when reading event stream")
  }
}