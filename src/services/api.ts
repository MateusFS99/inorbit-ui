const baseUrl = "http://localhost:3333";

export async function get(url: string) {
  return await fetch(`${baseUrl}/${url}`);
}

export async function post(url: string, { ...params }) {
  return await fetch(`${baseUrl}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
}

export async function remove(url: string, { ...params }) {
  return await fetch(`${baseUrl}/${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
}