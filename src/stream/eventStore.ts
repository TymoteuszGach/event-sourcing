import {Event} from "../events";
import {Result} from "../primitives";

export interface StreamAppender<StreamEvent extends Event> {
  append: (streamName: string, event: StreamEvent) => Promise<Result<boolean>>
}

export interface StreamReader<StreamEvent extends Event> {
  read: (streamName: string) => Promise<Result<Generator<StreamEvent>>>
}

export type EventStore<StreamEvent extends Event> = StreamAppender<StreamEvent> & StreamReader<StreamEvent>