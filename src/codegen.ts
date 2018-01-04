import {
  generate,
} from 'apollo-codegen';
import {
  buildASTSchema,
  parse,
  GraphQLSchema,
  graphql,
} from 'graphql';
import { introspectionQuery } from 'graphql/utilities';
import * as path from 'path';
import * as fs from 'fs';
import * as glob from 'glob';

export const command = 'codegen [--target] [--output]';
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

const getSchema = async (config, configPath): Promise<GraphQLSchema> => {
  const configBase = path.dirname(configPath);
  const schemaPath = path.join(configBase, config.schemaPath);
  const schemaContents = fs.readFileSync(schemaPath).toString();
  const schema = await buildASTSchema(parse(schemaContents));
  return schema;
};

const writeSchema = async (schema: GraphQLSchema, path: string): Promise<void> => {
  const results = await graphql(schema, introspectionQuery);
  fs.writeFileSync(path, JSON.stringify(results));
};

const getInputs = async (config, configPath): Promise<string[]> => {
  const configBase = path.dirname(configPath);
  const includes: string[] = config.includes || [];
  const globResults = await Promise.all(includes.map(g => globAsync(g)));
  return globResults.reduce((acc, r) => [...acc, ...r]);
};

export const handler = async ({getConfig}) => {
  const {config, configPath} = await getConfig();
  const options = (config.extensions || {}).codegen || {};
  const configBase = path.dirname(configPath);
  const schema = await getSchema(config, configPath);
  const schemaLoc = '/tmp/gql-schema.json'; // todo: change this
  await writeSchema(schema, schemaLoc);
  const inputFiles = await getInputs(config, configPath);
  generate(
    inputFiles,
    schemaLoc,
    path.join(configBase, options.output || 'codegen'),
    options.target || 'swift' ,
    options.tagName || 'gql',
    options,
  );
};
