import { TodoInterface } from './todos.state';

export namespace TodoActions {
  const ACTION_SCOPE: string = '[TODO]';

  export class Add {
    static readonly type = `${ACTION_SCOPE} Add Todo`;
    constructor(public todo: TodoInterface) {}
  }

  export class Edit {
    static readonly type = `${ACTION_SCOPE} Edit Todo`;
    constructor(public todo: TodoInterface) {}
  }

  export class Delete {
    static readonly type = `${ACTION_SCOPE} Delete Todo`;
    constructor(public id: number) {}
  }
}
