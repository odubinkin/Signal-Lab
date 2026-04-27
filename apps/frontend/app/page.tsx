"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Activity, Clock3, ExternalLink, Play, RefreshCw, Server } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ApiError, getHealth, getScenarioRuns, runScenario, scenarioTypes, type RunScenarioInput } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const scenarioLabels: Record<RunScenarioInput["type"], string> = {
  success: "Success",
  validation_error: "Validation error",
  system_error: "System error",
  slow_request: "Slow request",
  teapot: "Teapot",
};

const observabilityLinks = [
  { label: "Grafana Dashboard", value: "http://localhost:3100", href: "http://localhost:3100" },
  { label: "Backend Metrics", value: "http://localhost:3001/metrics", href: "http://localhost:3001/metrics" },
  { label: "Loki Query", value: '{app="signal-lab"}' },
  { label: "Sentry", value: "check project dashboard" },
];

export default function Home() {
  const queryClient = useQueryClient();
  const form = useForm<RunScenarioInput>({
    defaultValues: {
      type: "success",
      name: "",
    },
  });

  const healthQuery = useQuery({
    queryKey: ["health"],
    queryFn: getHealth,
    refetchInterval: 15000,
  });

  const runsQuery = useQuery({
    queryKey: ["scenario-runs"],
    queryFn: getScenarioRuns,
    refetchInterval: 5000,
  });

  const runMutation = useMutation({
    mutationFn: runScenario,
    onSuccess: (result) => {
      toast.success("Scenario completed", {
        description: `${result.type} finished with status ${result.status} in ${result.duration}ms.`,
      });
      void queryClient.invalidateQueries({ queryKey: ["scenario-runs"] });
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Scenario failed";
      const status = error instanceof ApiError ? `HTTP ${error.status}` : "Request failed";
      toast.error(status, { description: message });
      void queryClient.invalidateQueries({ queryKey: ["scenario-runs"] });
    },
  });

  const onSubmit = (values: RunScenarioInput) => {
    runMutation.mutate({
      type: values.type,
      name: values.name?.trim() || undefined,
    });
  };
  const runs = runsQuery.data ?? [];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-cyan-700">Signal Lab</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-normal text-slate-950">Scenario Runs</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Run backend scenarios and watch the resulting logs, metrics, traces, and captured errors.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={healthQuery.data?.status === "ok" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}>
              <Server className="size-3" />
              API {healthQuery.data?.status ?? (healthQuery.isLoading ? "checking" : "offline")}
            </Badge>
            <Button variant="outline" size="sm" onClick={() => void healthQuery.refetch()}>
              <RefreshCw className="size-4" />
              Refresh
            </Button>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(340px,420px)_1fr]">
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Run Scenario</CardTitle>
              <CardDescription>Choose a scenario type and send one request to the backend.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700" htmlFor="scenario-type">
                    Scenario type
                  </label>
                  <Controller
                    control={form.control}
                    name="type"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="scenario-type" className="h-10 w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {scenarioTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {scenarioLabels[type]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700" htmlFor="scenario-name">
                    Name
                  </label>
                  <Input
                    id="scenario-name"
                    placeholder="Optional label"
                    maxLength={120}
                    {...form.register("name", { maxLength: 120 })}
                  />
                </div>

                <Button className="w-full" type="submit" disabled={runMutation.isPending}>
                  {runMutation.isPending ? <RefreshCw className="size-4 animate-spin" /> : <Play className="size-4" />}
                  {runMutation.isPending ? "Running" : "Run Scenario"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="rounded-lg">
            <CardHeader>
              <div>
                <CardTitle>Run History</CardTitle>
                <CardDescription>Latest 20 persisted scenario runs, refreshed every 5 seconds.</CardDescription>
              </div>
              <CardAction>
                <Button variant="outline" size="sm" onClick={() => void runsQuery.refetch()}>
                  <RefreshCw className="size-4" />
                  Refresh
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              {runsQuery.isLoading ? (
                <div className="flex h-48 items-center justify-center text-sm text-slate-500">Loading runs...</div>
              ) : runsQuery.isError ? (
                <div className="flex h-48 items-center justify-center text-sm text-rose-700">Run history is unavailable.</div>
              ) : runs.length === 0 ? (
                <div className="flex h-48 items-center justify-center text-sm text-slate-500">No scenario runs yet.</div>
              ) : (
                <div className="overflow-hidden rounded-lg border border-slate-200">
                  <div className="grid grid-cols-[1.2fr_1fr_0.8fr_1fr] bg-slate-100 px-3 py-2 text-xs font-medium uppercase text-slate-500">
                    <span>Type</span>
                    <span>Status</span>
                    <span>Duration</span>
                    <span>Timestamp</span>
                  </div>
                  <div className="divide-y divide-slate-200">
                    {runs.map((run) => (
                      <div key={run.id} className="grid grid-cols-[1.2fr_1fr_0.8fr_1fr] items-center gap-3 px-3 py-3 text-sm">
                        <span className="font-medium text-slate-800">{scenarioLabels[run.type as RunScenarioInput["type"]] ?? run.type}</span>
                        <StatusBadge status={run.status} />
                        <span className="flex items-center gap-1 text-slate-600">
                          <Clock3 className="size-3.5" />
                          {run.duration ?? "-"}ms
                        </span>
                        <span className="text-slate-600">{formatTimestamp(run.createdAt)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Observability Links</CardTitle>
            <CardDescription>Open these surfaces after running success and error scenarios.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {observabilityLinks.map((link) => (
              <div key={link.label} className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Activity className="size-4 text-cyan-700" />
                  {link.label}
                </div>
                {link.href ? (
                  <a className="mt-2 flex items-center gap-2 break-all text-sm text-cyan-700 hover:text-cyan-900" href={link.href} target="_blank" rel="noreferrer">
                    {link.value}
                    <ExternalLink className="size-3.5 shrink-0" />
                  </a>
                ) : (
                  <p className="mt-2 break-all text-sm text-slate-600">{link.value}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "success" || status === "completed") {
    return <Badge className="w-fit bg-emerald-100 text-emerald-800">{status}</Badge>;
  }

  if (status === "slow_warning" || status === "validation_error" || status === "teapot") {
    return <Badge className="w-fit bg-amber-100 text-amber-800">{status}</Badge>;
  }

  return <Badge className="w-fit bg-rose-100 text-rose-800">{status}</Badge>;
}

function formatTimestamp(value: string) {
  return new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}
