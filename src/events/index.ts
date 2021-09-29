export type Event<Type extends string = string,
  Version extends string = string,
  Data extends Record<string, unknown> = Record<string, unknown>,
  Metadata extends Record<string, unknown> = Record<string, unknown>> = Readonly<{
    type: Readonly<Type>,
    version: Readonly<Version>,
    data: Readonly<Data>,
    metadata?: Readonly<Metadata>
  }>

export function isEvent<Type extends string = string,
  Version extends string = string,
  Data extends Record<string, unknown> = Record<string, unknown>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
  Metadata extends Record<string, unknown> = Record<string, unknown>>(event: any): event is Event<Type, Version, Data, Metadata> {
  return typeof event.type !== "undefined"
    && typeof event.sequence === "bigint"
    && typeof event.version !== "undefined"
    && typeof event.data !== "undefined"
}