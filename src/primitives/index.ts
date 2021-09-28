export interface Success<R> {
  isError: false
  value: R
  orElse: (newMessage: string) => Result<R>
}

export interface Failure {
  isError: true
  message: string
  orElse: (newMessage: string) => Failure
  wrap: (newMessage: string) => Failure
}

export type Result<R = never> = Success<R> | Failure;

export function success<R>(value: R): Success<R> {
  return {
    isError: false,
    value: value,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    orElse: (newMessage: string): Success<R> => {
      return success(value)
    }
  };
}

export function failure(message: string): Failure {
  const wrapMessage = (newMessage: string): Failure => {
    return failure(`${newMessage}: ${message}`)
  };

  return {
    isError: true,
    message: message,
    wrap: wrapMessage,
    orElse: wrapMessage
  }
}
