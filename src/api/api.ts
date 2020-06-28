import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ApiConfig } from '../config/api.config';

export default function api(
    path: string,
    method: 'get' | 'post' | 'patch' | 'delete' | 'put',
    body: any | undefined, // get metod nema body, tako da je njegova podrazumevana vrednost "undefined"
) {

    return new Promise<ApiResponse>((resolve) => {
        // request
        const requestData = {

            method: method,
            url: path,
            baseURL: ApiConfig.API_URL,
            data: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getToken(),
            },
        };

        axios(requestData)
            .then(res => responseHandler(res, resolve, requestData))
            .catch(err => {
                const response: ApiResponse = {
                    status: 'error',
                    data: err
                };
                resolve(response);
            });
    });
}

interface ApiResponse {
    status: 'ok' | 'error' | 'login';
    data: any;
}

async function responseHandler(
    res: AxiosResponse<any>,
    resolve: (value?: ApiResponse) => void,
    requestData: AxiosRequestConfig

) {
    // http error statusi
    if (res.status < 200 || res.status >= 300) {

        if (res.status === 401) {
            const newToken = await refreshToken(requestData);

            if (!newToken) {
                const response: ApiResponse = {

                    status: 'login',
                    data: null,
                };
                return resolve(response);
            }

            saveToken(newToken);

            requestData.headers['Authorization'] = getToken();

            return await repeatRequest(requestData, resolve);
        }

        const response: ApiResponse = {

            status: 'error',
            data: res.data,
        };

        return resolve(res.data);
    }

    // negativna vrednost znaci greska
    let response: ApiResponse;

    if (res.data.statusCode < 0) {
        response = {
            status: 'login',
            data: null,
        };

    } else {
        response = {
            status: 'ok',
            data: res.data,
        };
    }

    resolve(response);
}


function getToken(): string {
    const token = localStorage.getItem('api_token');
    return 'Berer' + token;
}

function saveToken(token: string) {
    localStorage.setItem('api_token', token);
}

function getRefreshToken(): string {
    const token = localStorage.getItem('api_refresh_token');
    return token + '';
}

function saveRefreshToken(token: string) {
    localStorage.setItem('api_refresh_token', token);
}



async function refreshToken(
    requestData: AxiosRequestConfig,

): Promise<string | null> {
    const path = 'administrator/refresh';
    const data = {
        token: getRefreshToken(),
    }

    const refreshTokenrequestData: AxiosRequestConfig = {

        method: 'post',
        url: path,
        baseURL: ApiConfig.API_URL,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',

        },
    };

    // refresh token response
    const rtr: { data: { token: string | undefined } } = await axios(refreshTokenrequestData);

    if (!rtr.data.token) {
        return null;
    }
    return rtr.data.token;
}

async function repeatRequest(
    requestData: AxiosRequestConfig,
    resolve: (value?: ApiResponse) => void) {

    axios(requestData)
        .then(res => {
            let response: ApiResponse;
            if (res.status === 401) {
                response = {
                    status: 'login',
                    data: null,
                };
            } else {
                response = {

                    status: 'ok',
                    data: res,
                };
            }

            return resolve(response);
        })
        .catch(err => {
            const response: ApiResponse = {

                status: 'error',
                data: err,
            };

            return resolve(response);
        });
}