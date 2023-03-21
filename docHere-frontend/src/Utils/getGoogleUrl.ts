// import { URLSearchParams } from 'url';
import { GOOGLE_ROOT_URL, USER_BACKEND_PORT } from './Config/URLS';

export const getGoogleUrl = (from: string) => {

    const rootUrl = `${GOOGLE_ROOT_URL}`;

    const options = {
      redirect_uri: `${USER_BACKEND_PORT}/oauth/google` as string,
      client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID as string,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
    //   scope: [
    //     'https://www.googleapis.com/auth/userinfo.profile',
    //   'https://www.googleapis.com/auth/userinfo.email',
    //   ].join(' '),
      state: from,
    };

    const qs = new URLSearchParams(options);

    // return `${rootUrl}?${qs.toString()}`;
}