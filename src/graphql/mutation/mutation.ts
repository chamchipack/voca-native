import {gql} from '@apollo/client';

export const KAKAO_LOGIN_MUTATION = (fields: string[] | []) => {
  const defaultFields = [
    'accessToken',
    'refreshToken',
    'user { id nickname email }',
  ];
  const mutationFields = fields && fields.length > 0 ? fields : defaultFields;

  return gql`
      mutation KakaoLogin($token: String!) {
        kakaoLogin(token: $token) {
          ${mutationFields.join('\n')}
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
