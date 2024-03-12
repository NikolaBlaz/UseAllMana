import { CanActivateFn } from "@angular/router";




export function DummyGuard():  CanActivateFn {
    return () => { return true};
  }