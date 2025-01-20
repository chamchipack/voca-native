import {gql} from '@apollo/client';

export const KAKAO_INITIAL_CHECK_MUTATION = (fields: string[] | []) => {
  const defaultFields = ['status', 'isAuthenticated'];

  return gql`
  mutation kakaoInitialCheck($input: kakaoInitialCheckType) {
    kakaoInitialCheck(input: $input) {
      ${defaultFields.join('\n')}
    }
  }
`;
};

export const KAKAO_LOGIN_MUTATION = (fields: string[] | []) => {
  const defaultFields = [
    'status',
    'message',
    'data { _id social_id name provider}',
  ];
  // const mutationFields = fields && fields.length > 0 ? fields : defaultFields;

  return gql`
      mutation kakaoLogin($input: kakaoLoginType) {
        kakaoLogin(input: $input) {
          ${defaultFields.join('\n')}
        }
      }
    `;
};

export const START_KAKAO_LOGIN_MUTATION = (fields: string[] | []) => {
  // Default fields for the mutation response
  const defaultFields = ['result'];
  const mutationFields = fields && fields.length > 0 ? fields : defaultFields;

  return gql`
    mutation getStartKakaoLogin {
      getStartKakaoLogin {
        ${mutationFields.join('\n')}
      }
    }
  `;
};
