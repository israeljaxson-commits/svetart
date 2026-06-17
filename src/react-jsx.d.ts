// Fallback declarations to help TypeScript resolve JSX/runtime in unusual environments
declare module 'react/jsx-runtime';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};
