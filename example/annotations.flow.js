/* @flow */
//  This file was automatically generated and should not be edited.

export type HeroQuery = {|
  hero: ?( {
      __typename: "Human",
      // The name of the character
      name: string,
    } | {
      __typename: "Droid",
      // The name of the character
      name: string,
    }
  ),
|};