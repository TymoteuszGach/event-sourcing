import {Aggregate} from "../aggregates";
import {Event} from "../events";
import {Result} from "../primitives";
import {aggregate} from "./aggregate";
import {EventStore} from "./eventStore";

export type AggregateUpdater<StreamAggregate extends Aggregate, StreamEvent extends Event> = {
  update: (aggregate: StreamAggregate | Record<string, never>) => Result<StreamEvent>
}

export async function getAndUpdate<StreamAggregate extends Aggregate, StreamEvent extends Event>(
  eventStore: EventStore<StreamEvent>,
  streamName: string,
  aggregateFn: (currentState: StreamAggregate | Record<string, never>, event: StreamEvent) => Result<StreamAggregate>,
  aggregateUpdater: AggregateUpdater<StreamAggregate, StreamEvent>
): Promise<Result<StreamEvent>> {
  const readEventsResult = await eventStore.read(streamName)
  if (readEventsResult.isError) {
    return readEventsResult.wrap("cannot read events from store")
  }

  const aggregateUserResult = await aggregate(readEventsResult.value, aggregateFn)
  if (aggregateUserResult.isError) {
    return aggregateUserResult.wrap("cannot build aggregate from events")
  }

  const updateResult = aggregateUpdater.update(aggregateUserResult.value);
  if (updateResult.isError) {
    return updateResult.wrap("cannot update state")
  }

  const appendResult = await eventStore.append(streamName, updateResult.value)
  if (appendResult.isError) {
    return appendResult.wrap("cannot append event")
  }

  return updateResult
}