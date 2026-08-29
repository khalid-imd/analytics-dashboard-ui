// import React from "react";

// export default function Conversion() {
//   return <div>Conversion</div>;
// }

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  DollarSign,
  Info,
  ArrowDownRight,
  ArrowUpRight,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// --- Dummy data, ganti dengan data dari API kamu ---
const STATS = [
  {
    title: "Conversion Rate",
    value: "4,8%",
    delta: 1.2,
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Total Conversions",
    value: "3.842",
    delta: 9.6,
    trend: "up",
    icon: Target,
  },
  {
    title: "Goal Completions",
    value: "2.150",
    delta: 4.3,
    trend: "up",
    icon: CheckCircle2,
  },
  {
    title: "Avg. Order Value",
    value: "Rp 187.500",
    delta: -1.8,
    trend: "down",
    icon: DollarSign,
  },
];

const CONVERSIONS_BY_CHANNEL = [
  { channel: "Organic", conversions: 1240 },
  { channel: "Paid Ads", conversions: 980 },
  { channel: "Referral", conversions: 640 },
  { channel: "Email", conversions: 520 },
  { channel: "Social", conversions: 462 },
];

const FUNNEL_STEPS = [
  { label: "Mengunjungi Situs", value: 100, count: 48210, drop: null },
  { label: "Melihat Produk", value: 62, count: 29890, drop: -38 },
  { label: "Menambah ke Keranjang", value: 34, count: 16390, drop: -45 },
  { label: "Checkout", value: 21, count: 10125, drop: -38 },
  { label: "Pembayaran Berhasil", value: 14, count: 6749, drop: -33 },
];

const AB_TESTS = [
  {
    id: "t1",
    name: "Checkout Button Color",
    status: "Completed",
    winner: "B",
    uplift: 28.1,
    variantA: { label: "Kontrol (Biru)", conversionRate: 3.2, sample: 12450 },
    variantB: { label: "Varian (Oranye)", conversionRate: 4.1, sample: 12380 },
  },
  {
    id: "t2",
    name: "Pricing Page Layout",
    status: "Running",
    winner: null,
    uplift: 9.3,
    variantA: { label: "Grid 3 kolom", conversionRate: 5.4, sample: 8210 },
    variantB: {
      label: "Grid 2 kolom + highlight",
      conversionRate: 5.9,
      sample: 8175,
    },
  },
  {
    id: "t3",
    name: "Onboarding Flow",
    status: "Completed",
    winner: "A",
    uplift: -11.6,
    variantA: { label: "4 langkah", conversionRate: 62.0, sample: 3020 },
    variantB: { label: "2 langkah", conversionRate: 54.8, sample: 3015 },
  },
];

const STATUS_STYLES = {
  Running: "bg-amber-500/10 text-amber-500",
  Completed: "bg-emerald-500/10 text-emerald-500",
};

export default function ConversionsPage() {
  const [onlySignificant, setOnlySignificant] = useState(false);

  const visibleTests = useMemo(() => {
    if (!onlySignificant) return AB_TESTS;
    return AB_TESTS.filter((test) => Math.abs(test.uplift) >= 10);
  }, [onlySignificant]);

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Conversions
            </h1>
            <p className="text-sm text-muted-foreground">
              Funnel, goal completion, dan hasil A/B testing
            </p>
          </div>
          <Select defaultValue="30d">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Rentang waktu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 hari terakhir</SelectItem>
              <SelectItem value="30d">30 hari terakhir</SelectItem>
              <SelectItem value="90d">90 hari terakhir</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* KPI cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <span className="flex size-8 items-center justify-center rounded-md bg-amber-400/15 text-amber-500">
                  <stat.icon className="size-4" />
                </span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold tracking-tight">
                  {stat.value}
                </div>
                <Badge
                  variant="secondary"
                  className={
                    "mt-2 gap-1 " +
                    (stat.trend === "up"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-red-500/10 text-red-500")
                  }
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="size-3" />
                  ) : (
                    <ArrowDownRight className="size-3" />
                  )}
                  {Math.abs(stat.delta)}% vs bulan lalu
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs: Ringkasan / Funnel / A/B Testing */}
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Ringkasan</TabsTrigger>
            <TabsTrigger value="funnel">Funnel</TabsTrigger>
            <TabsTrigger value="ab-testing">A/B Testing</TabsTrigger>
          </TabsList>

          {/* --- Tab: Ringkasan --- */}
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Conversions by Channel</CardTitle>
                <CardDescription>30 hari terakhir</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CONVERSIONS_BY_CHANNEL}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="channel"
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip />
                    <Bar
                      dataKey="conversions"
                      fill="#f59e0b"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- Tab: Funnel --- */}
          <TabsContent value="funnel">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-1.5">
                  <CardTitle>Funnel Konversi</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="size-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Persentase dihitung relatif terhadap jumlah pengunjung di
                      tahap pertama.
                    </TooltipContent>
                  </Tooltip>
                </div>
                <CardDescription>
                  Dari kunjungan situs hingga pembayaran berhasil
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                {FUNNEL_STEPS.map((step) => (
                  <div key={step.label} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{step.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          {step.count.toLocaleString("id-ID")} ({step.value}%)
                        </span>
                        {step.drop !== null && (
                          <Badge
                            variant="secondary"
                            className="gap-1 bg-red-500/10 text-red-500"
                          >
                            <TrendingDown className="size-3" />
                            {step.drop}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Progress value={step.value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- Tab: A/B Testing --- */}
          <TabsContent value="ab-testing">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Eksperimen A/B</CardTitle>
                  <CardDescription>
                    Perbandingan varian dan hasil signifikansi
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="only-significant"
                    checked={onlySignificant}
                    onCheckedChange={setOnlySignificant}
                  />
                  <Label htmlFor="only-significant" className="text-sm">
                    Hanya hasil signifikan
                  </Label>
                </div>
              </CardHeader>
              <CardContent>
                {visibleTests.length === 0 ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">
                    Tidak ada eksperimen dengan hasil signifikan saat ini.
                  </p>
                ) : (
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={visibleTests[0]?.id}
                  >
                    {visibleTests.map((test) => (
                      <AccordionItem key={test.id} value={test.id}>
                        <AccordionTrigger>
                          <div className="flex flex-1 items-center justify-between pr-4">
                            <span className="font-medium">{test.name}</span>
                            <div className="flex items-center gap-2">
                              {test.winner && (
                                <Badge
                                  variant="secondary"
                                  className="gap-1 bg-amber-400/15 text-amber-500"
                                >
                                  <Trophy className="size-3" />
                                  Varian {test.winner}
                                </Badge>
                              )}
                              <Badge
                                variant="secondary"
                                className={STATUS_STYLES[test.status]}
                              >
                                {test.status}
                              </Badge>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid gap-4 sm:grid-cols-2">
                            {[test.variantA, test.variantB].map(
                              (variant, i) => (
                                <div
                                  key={variant.label}
                                  className="rounded-lg border p-3"
                                >
                                  <div className="mb-2 flex items-center justify-between text-sm">
                                    <span className="font-medium">
                                      Varian {i === 0 ? "A" : "B"} —{" "}
                                      {variant.label}
                                    </span>
                                    <span className="text-muted-foreground">
                                      {variant.sample.toLocaleString("id-ID")}{" "}
                                      sampel
                                    </span>
                                  </div>
                                  <div className="mb-1.5 flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                      Conversion rate
                                    </span>
                                    <span className="font-semibold">
                                      {variant.conversionRate}%
                                    </span>
                                  </div>
                                  <Progress
                                    value={variant.conversionRate}
                                    className="h-1.5"
                                  />
                                </div>
                              ),
                            )}
                          </div>
                          <p className="mt-3 text-sm text-muted-foreground">
                            Uplift varian B terhadap A:{" "}
                            <span
                              className={
                                test.uplift >= 0
                                  ? "font-medium text-emerald-500"
                                  : "font-medium text-red-500"
                              }
                            >
                              {test.uplift >= 0 ? "+" : ""}
                              {test.uplift}%
                            </span>
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  );
}
