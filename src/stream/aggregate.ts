import {Event} from "../events";
import {failure, Result, success} from "../primitives";
import {Aggregate, isAggregate} from "../aggregates";

export async function aggregate<StreamAggregate extends Aggregate, StreamEvent extends Event>(
  eventsGenerator: Generator<StreamEvent>,
  aggregator: (currentState: StreamAggregate | Record<string, never>, event: StreamEvent) => Result<StreamAggregate>
): Promise<Result<StreamAggregate>> {
  let state: StreamAggregate | Record<string, never> = {}
  for (const event of eventsGenerator) {
    const result = aggregator(state, event)
    if (result.isError) {
      return result.wrap("cannot build aggregate state")
    }
    state = result.value
  }
  if (isAggregate(state)) {
    return success(state)
  }
  return failure("empty aggregate state")
}