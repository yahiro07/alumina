// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { VNode } from './types';

declare global {
  export namespace JSX {
    export interface IntrinsicElements {
      div: { class?: string; id?: string };
      h1: any;
      p: any;
    }
  }
}
