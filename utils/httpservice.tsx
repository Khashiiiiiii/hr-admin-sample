// utils/httpService.ts

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // Replace with your actual base URL

type RequestOptions = RequestInit & {
  headers?: HeadersInit;
};

const fetchWithTimeout = async (
  resource: string,
  options: RequestOptions = {},
  timeout: number = 8000
): Promise<Response> => {
  const url = `${BASE_URL}${resource}`; // Prepend BASE_URL to the resource path
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  let response: Response;

  if (options.body) {
    options = { ...options, body: JSON.stringify(options.body) };
  }

  response = await fetch(url, {
    ...options,
  });

  clearTimeout(id);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response;
};

async function fetchJSON<T>(
  resource: string,
  options: RequestOptions
): Promise<T> {
  try {
    const response = await fetchWithTimeout(resource, options);
    if (response.headers.get("Content-Type")?.includes("application/json")) {
      return (await response.json()) as T;
    } else {
      throw new Error("Response was not JSON");
    }
  } catch (error) {
    throw error;
  }
}

export async function get<T>(
  resource: string,
  token?: string,
  queryParams?: Record<string | number, string | number>,
  options: RequestOptions = {}
): Promise<T> {
  let finalOptions: RequestOptions;

  if (token) {
    finalOptions = {
      ...options,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    };
  } else {
    finalOptions = {
      ...options,
      method: "GET",
      headers: {
        ...options.headers,
      },
    };
  }

  if (queryParams) {
    const queryString = Object.entries(queryParams)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
    resource += `?${queryString}`;
  }

  return fetchJSON<T>(resource, finalOptions);
}

export async function post<T>(
  resource: string,
  data: any,
  token?: string,
  options: RequestOptions = {}
): Promise<T> {
  let finalOptions: RequestOptions;
  if (token) {
    finalOptions = {
      ...options,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
      body: data,
    };
  } else {
    finalOptions = {
      ...options,
      method: "POST",
      headers: {
        ...options.headers,
      },
      body: data,
    };
  }
  return fetchJSON<T>(resource, finalOptions);
}

export async function put<T>(
  resource: string,
  data: any,
  token?: string,
  options: RequestOptions = {}
): Promise<T> {
  let finalOptions: RequestOptions;
  if (token) {
    finalOptions = {
      ...options,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
      body: data,
    };
  } else {
    finalOptions = {
      ...options,
      method: "PUT",
      headers: {
        ...options.headers,
      },
      body: data,
    };
  }
  return fetchJSON<T>(resource, finalOptions);
}

export async function del<T>(
  resource: string,
  token?: string,
  options: RequestOptions = {}
): Promise<T> {
  let finalOptions: RequestOptions;

  if (token) {
    finalOptions = {
      ...options,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    };
  } else {
    finalOptions = {
      ...options,
      method: "DELETE",
      headers: {
        ...options.headers,
      },
    };
  }
  return fetchJSON<T>(resource, finalOptions);
}
