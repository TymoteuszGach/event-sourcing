import {Event} from "../events";
import {Result} from "../primitives";

export interface AppendToStream<StreamEvent extends Event> {
  (streamName: string, event: StreamEvent): Promise<Result<boolean>>
}

export interface ReadFromStream<StreamEvent extends Event> {
  (streamName: string): Promise<Result<Generator<StreamEvent>>>
}

export interface EventStore<StreamEvent extends Event> {
  AppendToStream: AppendToStream<StreamEvent>
  ReadFromStream: ReadFromStream<StreamEvent>
}