export type Command<Type extends string = string,
  Data extends Record<string, unknown> = Record<string, unknown>,
  Metadata extends Record<string, unknown> = Record<string, unknown>> = {
    type: Readonly<Type>
    data: Readonly<Data>
    metadata?: Readonly<Metadata>
  }

export function isCommand<Type extends string = string,
  Data extends Record<string, unknown> = Record<string, unknown>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
  Metadata extends Record<string, unknown> = Record<string, unknown>>(command: any): command is Command<Type, Data, Metadata> {
  return typeof command.type !== 'undefined'
    && typeof command.data !== 'undefined'
}