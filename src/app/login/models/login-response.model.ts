import {Tokenpair} from "./tokenpair.model";

export class LoginResponse {
  constructor(public email: string,
              public username: string,
              public tokenPair: Tokenpair) {
  }
}
