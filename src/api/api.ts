import axios, { AxiosResponse } from 'axios';
import { ApiConfig } from '../config/api.config';
import { resolve } from 'dns';
import { rejects } from 'assert';

export default function api(
    path: string,
    method: 'get' | 'post' | 'patch' | 'delete' | 'put',
    body: any | undefined, // get metod nema body, tako da je njegova podrazumevana vrednost "undefined"
) {
    const config = {

    };
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: path,
            baseURL: ApiConfig.API_URL,
            data: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getToken(),
            }
        })
            .then(res => responseHandler(res, resolve, reject))
            .catch(err => reject(err));
    });

}

function responseHandler(
    res: AxiosResponse<any>,
    resolve: (value?: unknown) => void,
    reject: (reason?: any) => void
) {
    // http error statusi
    if (res.status < 200 || res.status >= 300) {
        return reject(res.data);
    }
    // negativna vrednost znaci greska
    if (res.data.status < 0) {
        return reject(res.data);
    }
    resolve(res.data);
}

function getToken(): string {
    const token = localStorage.getItem('api_token');
    return 'Berer' + token;
}

function saveToken(token: string) {
    localStorage.setItem('api_token', token);
}