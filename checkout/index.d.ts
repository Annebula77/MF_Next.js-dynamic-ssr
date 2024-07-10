declare module '@module-federation/runtime' {
  export function init(options: any): void;
  export function loadRemote(module: string): Promise<any>;
}
