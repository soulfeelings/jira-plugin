import Resolver from "@forge/resolver";

// step-12
const resolver = new Resolver();

export const handler = resolver.getDefinitions();
