import {Event} from "../events";
import {StreamReader} from "./eventStore";
import {failure, Result} from "../primitives";

export async function read<StreamEvent extends Event>(
  streamReader: StreamReader<StreamEvent>,
  streamName: string,
): Promise<Result<Generator<StreamEvent>>> {
  try {
    return streamReader.read(streamName)
  } catch (error) {
    if (error instanceof Error) {
      return failure(error.message)
    }
    return failure("unknown failure when reading event stream")
  }
}