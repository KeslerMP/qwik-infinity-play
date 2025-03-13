import { createContextId, Signal } from "@builder.io/qwik";

export interface User {
  id: string | null;
  token: string | null;
  email: string | null;
}

export const UserContext = createContextId<Signal<User>>("user-context");
