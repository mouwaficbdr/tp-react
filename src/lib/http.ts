export type HttpError = {
  status: number;
  message: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export async function http<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(input, {
    headers: {
      Accept: 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!res.ok) {
    let message = `HTTP ${res.status}`;

    try {
      const data: unknown = await res.json();
      if (isRecord(data) && typeof data['message'] === 'string') {
        message = data['message'];
      }
    } catch {
      return Promise.reject({
        status: res.status,
        message,
      } satisfies HttpError);
    }

    const err: HttpError = { status: res.status, message };
    throw err;
  }

  return (await res.json()) as T;
}
