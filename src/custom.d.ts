declare namespace NodeJS {
  interface Global {
    fetch: (arg: any) => any;
    navigator: { userAgent: string | undefined };
  }

  interface Process {
    browser: boolean;

    env: {};
  }
}

declare module "*.graphql" {
  import { DocumentNode } from "graphql";

  const value: DocumentNode;
  export default value;
}
