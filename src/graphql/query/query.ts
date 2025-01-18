import {gql} from '@apollo/client';

export const GET_WORD_LIST_AND_TYPE = (fields: string[] | []) => {
  const defaultFields = ['_id', 'ko', 'jp', 'ro'];
  const queryFields = fields && fields.length > 0 ? fields : defaultFields;

  return gql`
      query GetWordListAndType($input: JapaneseInput!, $offset: Int, $limit: Int) {
        getWordListAndType(input: $input, offset: $offset, limit: $limit) {
          ${queryFields.join('\n')}
        }
      }
    `;
};

export const GET_WORD_LIST_TOTAL_COUNT = gql`
  query GetWordListTotalCount($input: JapaneseInput!) {
    getWordListTotalcount(input: $input)
  }
`;

export const GET_ONE_WORD_FROM_ID = (fields: string[] | []) => {
  const defaultFields = ['_id', 'ko', 'jp', 'ro'];
  const queryFields = fields && fields.length > 0 ? fields : defaultFields;

  return gql`
      query GetOneWordFromID($input: ID!) {
         getOneWordFromId(input: $input) {
          ${queryFields.join('\n')}
        }
      }
    `;
};

export const GET_START_KAKAO_LOGIN = (fields: string[] | []) => {
  // Default fields for the query response
  const defaultFields = ['result'];
  const queryFields = fields && fields.length > 0 ? fields : defaultFields;

  return gql`
    query GetStartKakaoLogin {
      getStartKakaoLogin {
        ${queryFields.join('\n')}
      }
    }
  `;
};
