export interface FetckerResponse<T> extends Response {
    data: T;
    error: FetckerError;
}
export interface FetckerError {
    name: string;
    jsEngine: string;
    message: string;
    stack: string;
}
export class FetckerInitOption {
    baseUrl?: string;
    defaultHeaders?: Record<string, string> = {};
    requestTimeOut?: number;
    onError?: (error: FetckerError, isClient: boolean) => void;
}

export class Fetcker extends FetckerInitOption {
    setHeader: (key: string, value: string) => void = (key: string, value: string) => {
        this.defaultHeaders = {
            ...this.defaultHeaders,
            [key]: value,
        };
    };
    removeHeader: (key: string) => void = (key: string) => {
        const { [key]: removedHeader, ...remainingHeaders } = this.defaultHeaders!;
        this.defaultHeaders = remainingHeaders;
    };
    setAuthorizationBearer: (token: string) => void = (token) => {
        this.setHeader("Authorization", `Bearer ${token}`);
    };
    removeAuthorizationBearer: () => void = () => {
        this.removeHeader("Authorization");
    };
    
    get: <T>(url: string, init?: RequestInit) => Promise<FetckerResponse<T>> = async <T>(url: string, init?: RequestInit) => {
        try {
            const response = (await fetchTimeout(`${this.baseUrl}${url}`, {
                ...init,
                headers: { ...this.defaultHeaders, ...init?.headers },
                timeout: this.requestTimeOut || 6000
            })) as FetckerResponse<T>;
            response.data = await (response.json() as Promise<T>);
            return response;
        } catch (e: any) {
            this.onError && this.onError(e, isClient());
            return responseFactory<T>(e);
        }
    };
    post: <T>(url: string, data: unknown, init: RequestInit) => Promise<FetckerResponse<T>> = async <T>(url: string, data: unknown, init: RequestInit) => {
        try {
            const response = (await fetchTimeout(`${this.baseUrl}${url}`, {
                ...init,
                timeout: this.requestTimeOut || 6000,
                method: 'POST',
                headers: {
                    ...(this.defaultHeaders),
                    ...(init?.headers || {}),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })) as FetckerResponse<T>;
            response.data = await (response.json() as Promise<T>);
            return response;
        } catch (e: any) {
            this.onError && this.onError(e, isClient());
            return responseFactory<T>(e);
        }
    };
    postForm: <T>(url: string, data: FormData, init: RequestInit) => Promise<FetckerResponse<T>> = async <T>(url: string, data: FormData, init: RequestInit) => {
        try {
            const response = (await fetchTimeout(`${this.baseUrl}${url}`, {
                ...init,
                method: 'POST',
                body: data,
                timeout: this.requestTimeOut || 6000,
                headers: {
                    ...(this.defaultHeaders),
                    ...(init?.headers || {})
                }
            })) as FetckerResponse<T>;
            response.data = await (response.json() as Promise<T>);
            return response;
        } catch (error: any) {
            this.onError && this.onError(error, isClient());
            return responseFactory<T>(error);
        }
    }
    put: <T>(url: string, data: unknown, init: RequestInit) => Promise<FetckerResponse<T>> = async <T>(url: string, data: unknown, init: RequestInit) => {
        try {
            const response = (await fetchTimeout(`${this.baseUrl}${url}`, {
                ...init,
                timeout: this.requestTimeOut || 6000,
                method: 'PUT',
                headers: {
                    ...(this.defaultHeaders),
                    ...(init?.headers || {}),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })) as FetckerResponse<T>;
            response.data = await (response.json() as Promise<T>);
            return response;
        } catch (e: any) {
            this.onError && this.onError(e, isClient());
            return responseFactory<T>(e);
        }
    }
    putForm: <T>(url: string, data: FormData, init: RequestInit) => Promise<FetckerResponse<T>> = async <T>(url: string, data: FormData, init: RequestInit) => {
        try {
            const response = (await fetchTimeout(`${this.baseUrl}${url}`, {
                ...init,
                method: 'PUT',
                body: data,
                timeout: this.requestTimeOut || 6000,
                headers: {
                    ...(this.defaultHeaders),
                    ...(init?.headers || {})
                }
            })) as FetckerResponse<T>;
            response.data = await (response.json() as Promise<T>);
            return response;
        } catch (error: any) {
            this.onError && this.onError(error, isClient());
            return responseFactory<T>(error);
        }
    }
    patch: <T>(url: string, data: unknown, init: RequestInit) => Promise<FetckerResponse<T>> = async <T>(url: string, data: unknown, init: RequestInit) =>{
        try {
            const response = (await fetchTimeout(`${this.baseUrl}${url}`, {
                ...init,
                timeout: this.requestTimeOut || 6000,
                method: 'PATCH',
                headers: {
                    ...(this.defaultHeaders),
                    ...(init?.headers || {}),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })) as FetckerResponse<T>;
            response.data = await (response.json() as Promise<T>);
            return response;
        } catch (e: any) {
            this.onError && this.onError(e, isClient());
            return responseFactory<T>(e);
        }
    }
    patchForm: <T>(url: string, data: FormData, init: RequestInit) => Promise<FetckerResponse<T>> = async <T>(url: string, data: FormData, init: RequestInit) => {
        try {
            const response = (await fetchTimeout(`${this.baseUrl}${url}`, {
                ...init,
                method: 'PATCH',
                body: data,
                timeout: this.requestTimeOut || 6000,
                headers: {
                    ...(this.defaultHeaders),
                    ...(init?.headers || {})
                }
            })) as FetckerResponse<T>;
            response.data = await (response.json() as Promise<T>);
            return response;
        } catch (error: any) {
            this.onError && this.onError(error, isClient());
            return responseFactory<T>(error);
        }
    }
    delete: <T>(url: string, init?: RequestInit) => Promise<FetckerResponse<T>> = async <T>(url: string, init?: RequestInit) => {
        try {
            const response = (await fetchTimeout(`${this.baseUrl}${url}`, {
                ...init,
                headers: { ...this.defaultHeaders, ...init?.headers },
                timeout: this.requestTimeOut || 6000,
                method : "DELETE"
            })) as FetckerResponse<T>;
            response.data = await (response.json() as Promise<T>);
            return response;
        } catch (e: any) {
            this.onError && this.onError(e, isClient());
            return responseFactory<T>(e);
        }
    };
    options: <T>(url: string, init?: RequestInit) => Promise<FetckerResponse<T>> = async <T>(url: string, init?: RequestInit) =>{
        try {
            const response = (await fetchTimeout(`${this.baseUrl}${url}`, {
                ...init,
                headers: { ...this.defaultHeaders, ...init?.headers },
                timeout: this.requestTimeOut || 6000,
                method : "OPTIONS"
            })) as FetckerResponse<T>;
            response.data = await (response.json() as Promise<T>);
            return response;
        } catch (e: any) {
            this.onError && this.onError(e, isClient());
            return responseFactory<T>(e);
        }
    };
}


export function createFetcker(options: FetckerInitOption) {
    const result = new Fetcker();
    result.baseUrl = options.baseUrl;
    result.defaultHeaders = options.defaultHeaders;
    result.requestTimeOut = options.requestTimeOut;
    result.onError = options.onError;
    return result;
}

function isClient() {
    return typeof window !== 'undefined';
}
async function fetchTimeout(url: string, init: RequestInit & { timeout: number }) {
    if (!init.timeout) {
        init.timeout = 6000;
    }
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), init.timeout);
    const response = await fetch(url, {
        ...init,
        signal: controller.signal
    });
    clearTimeout(id);
    return response;
}
function responseFactory<T>(error: FetckerError): FetckerResponse<T> {
    return {
        error: error,
        ok: false,
        status: 0,
        headers: {} as Headers,
        redirected: false,
        statusText: "",
        type: "default",
        url: "",
        clone: function (): Response {
            throw new Error("Function not implemented.");
        },
        body: null,
        bodyUsed: false,
        arrayBuffer: function (): Promise<ArrayBuffer> {
            throw new Error("Function not implemented.");
        },
        blob: function (): Promise<Blob> {
            throw new Error("Function not implemented.");
        },
        formData: function (): Promise<FormData> {
            throw new Error("Function not implemented.");
        },
        json: function (): Promise<any> {
            throw new Error("Function not implemented.");
        },
        text: function (): Promise<string> {
            throw new Error("Function not implemented.");
        },
        data: {} as T
    }
}
