export type Aggregate<Type extends string = string> = {
  type: Readonly<Type>
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export function isAggregate<Type extends string = string>(aggregate: any): aggregate is Aggregate<Type> {
  return typeof aggregate.type !== 'undefined'
}