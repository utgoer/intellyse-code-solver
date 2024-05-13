import { SolveRequest } from "./types"


const apiBase = process.env.NEXT_PUBLIC_API_HOST + ":" + process.env.NEXT_PUBLIC_API_PORT

export async function solve(request: SolveRequest): Promise<Response> {
  return fetch(`${apiBase}/api/solve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
}