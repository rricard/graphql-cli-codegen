exports.command = 'codegen [--target] [--output]';
export const desc = 'Generates apollo-codegen code/annotations from your .graphqlconfig';
export const builder = {
  target: {
    alias: 't',
    description: 'generation target: [choices: "swift", "json", "ts", "typescript", "flow"] [default: "swift" or defined in your config]',
  },
  output: {
    alias: 'o',
    description: 'output directory for the generated files',
  },
};

export const handler = console.log;
