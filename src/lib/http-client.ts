interface HttpClient {
  get: <T>(url: string, options: RequestInit) => Promise<T>;
  post: <T>(url: string, options: RequestInit, body?: object) => Promise<T>;
}

const initHttpClient = (): HttpClient => {
  const get = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    const response = await fetch(url, {
      headers: {
        ...options.headers
      },
      body: options.body
    });

    if (!response.ok) {
      throw new Error('Some error occurred.');
    }

    return (await response.json()) as T;
  };

  const post = async <T>(url: string, options: RequestInit = {}, body?: object): Promise<T> => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const jsonResponse = await response.json();

      throw new Error(jsonResponse);
    }

    return (await response.json()) as T;
  };

  return {
    get,
    post
  };
};

const httpClient = initHttpClient();

export default httpClient;
