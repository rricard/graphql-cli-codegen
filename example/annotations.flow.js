/* @flow */
//  This file was automatically generated and should not be edited.

export type HeroQuery = {|
  hero: ?( {
      // The name of the character
      name: string,
      // The friends of the character, or an empty list if they have none
      friends: ?Array< ?( {
        } | {
        }
      ) >,
    } | {
      // The name of the character
      name: string,
      // The friends of the character, or an empty list if they have none
      friends: ?Array< ?( {
        } | {
        }
      ) >,
    }
  ),
|};

export type HeroFragment = ( {
      // The ID of the character
      id: string,
      // The name of the character
      name: string,
    } | {
      // The ID of the character
      id: string,
      // The name of the character
      name: string,
    }
  );