import Error from "next/error";


export class ApiError extends Error {
    constructor(url, status) {
        super(`'${url}' returned ${status}`);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this.ApiError);
        }
        this.name = 'ApiError';
        this.status = status;
    }
}

// fetchJson disini digunakan untuk file lib/products.tsx
// jadi tidak ada pengulangan code untuk parameter atau function yang sering dipanggil
// argument 'options' digunakan ketika kita akan login
export async function fetchJson(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`request failed: ${response.status}`);
    }
    return await response.json();
}