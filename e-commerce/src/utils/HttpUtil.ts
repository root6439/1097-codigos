export class HttpClient {
  get = async <T>(url: string) => {
    const resp = await fetch(url, {
      method: "GET",
    });

    return (await resp.json()) as T;
  };

  delete = async <T>(url: string) => {
    const resp = await fetch(url, {
      method: "DELETE",
    });

    return (await resp.json()) as T;
  };

  put = async <T>(url: string, body: any) => {
    const resp = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return (await resp.json()) as T;
  };
  
  post = async <T>(url: string, body: any) => {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return (await resp.json()) as T;
  };
}
