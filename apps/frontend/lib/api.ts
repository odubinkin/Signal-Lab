export const scenarioTypes = ["success", "validation_error", "system_error", "slow_request", "teapot"] as const;

export type ScenarioType = (typeof scenarioTypes)[number];

export type HealthResponse = {
  status: "ok";
  timestamp: string;
};

export type ScenarioRunResult = {
  id: string;
  type: ScenarioType | string;
  status: string;
  duration: number;
};

export type ScenarioRunHistoryItem = {
  id: string;
  type: ScenarioType | string;
  status: string;
  duration: number | null;
  createdAt: string;
};

export type RunScenarioInput = {
  type: ScenarioType;
  name?: string;
};

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly payload: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001/api";

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  const payload = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) {
    throw new ApiError(resolveErrorMessage(payload, response.statusText), response.status, payload);
  }

  return payload as T;
}

function resolveErrorMessage(payload: unknown, fallback: string): string {
  if (payload && typeof payload === "object" && "message" in payload) {
    const message = (payload as { message: unknown }).message;
    return Array.isArray(message) ? message.join(", ") : String(message);
  }

  return fallback || "Request failed";
}

export function getHealth(): Promise<HealthResponse> {
  return requestJson<HealthResponse>("/health");
}

export function getScenarioRuns(): Promise<ScenarioRunHistoryItem[]> {
  return requestJson<ScenarioRunHistoryItem[]>("/scenarios/runs");
}

export function runScenario(input: RunScenarioInput): Promise<ScenarioRunResult> {
  const body = {
    type: input.type,
    ...(input.name ? { name: input.name } : {}),
    metadata: { source: "frontend" },
  };

  return requestJson<ScenarioRunResult>("/scenarios/run", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
