import {
  generate,
} from 'apollo-codegen';
import * as path from 'path';
import * as fs from 'fs';
import * as glob from 'glob';

export const command = 'codegen';
export const desc = 'Generates apollo-codegen code/annotations from your .graphqlconfig';
export const builder = {};

const globAsync = (globPath: string): Promise<string[]> => {
  return new Promise((res, rej) => {
    glob(globPath, (err, paths) => {
      if (err) {
        return rej(err);
      }
      res(paths || []);
    });
  });
};

const getInputs = async (config, configPath): Promise<string[]> => {
  const configBase = path.dirname(configPath);
  const includes: string[] = config.includes || [];
  const globResults = await Promise.all(includes.map(g => globAsync(g)));
  return globResults.reduce((acc, r) => [...acc, ...r]);
};

export const handler = async ({ getConfig }) => {
  const { config, configPath } = await getConfig();
  const options = (config.extensions || {}).codegen || {};
  const configBase = path.dirname(configPath);
  const inputFiles = await getInputs(config, configPath);

  generate(
    inputFiles,
    null, // load schema from config
    path.join(configBase, options.output || 'codegen'),
    null, // Parse all input files, but only output generated code for the specified file [Swift only]
    options.target || 'swift' ,
    options.tagName || 'gql',
    undefined, // for multi-project config (https://github.com/graphcool/graphql-config#multi-project-configuration-advanced)
    options,
  );
};
