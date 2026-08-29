import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  Eye,
  Search,
  Timer,
  Users,
} from "lucide-react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// --- Dummy data, ganti dengan data dari API kamu ---
const STATS = [
  { title: "Sessions", value: "152.340", delta: 9.2, trend: "up", icon: Users },
  { title: "Pageviews", value: "412.980", delta: 14.7, trend: "up", icon: Eye },
  {
    title: "Avg. Session Duration",
    value: "3m 42s",
    delta: 5.4,
    trend: "up",
    icon: Timer,
  },
  {
    title: "Bounce Rate",
    value: "38,6%",
    delta: -3.1,
    trend: "down",
    icon: ArrowDownRight,
  },
];

const SESSIONS_TREND = [
  { day: "Sen", desktop: 4200, mobile: 3100, tablet: 800 },
  { day: "Sel", desktop: 4800, mobile: 3400, tablet: 750 },
  { day: "Rab", desktop: 4500, mobile: 3800, tablet: 900 },
  { day: "Kam", desktop: 5100, mobile: 4200, tablet: 850 },
  { day: "Jum", desktop: 5600, mobile: 4600, tablet: 1000 },
  { day: "Sab", desktop: 3900, mobile: 5200, tablet: 1200 },
  { day: "Min", desktop: 3600, mobile: 5400, tablet: 1300 },
];

const DEVICE_DATA = [
  { name: "Desktop", value: 54 },
  { name: "Mobile", value: 38 },
  { name: "Tablet", value: 8 },
];

const DEVICE_COLORS = ["#f59e0b", "#2dd4bf", "#60a5fa"];

const TOP_PAGES = [
  { path: "/dashboard", views: 48210, avgTime: "2m 18s", bounceRate: "31,2%" },
  {
    path: "/analytics/traffic",
    views: 32950,
    avgTime: "3m 05s",
    bounceRate: "28,9%",
  },
  { path: "/pricing", views: 27840, avgTime: "1m 42s", bounceRate: "44,6%" },
  {
    path: "/blog/growth-tips",
    views: 21430,
    avgTime: "4m 12s",
    bounceRate: "22,1%",
  },
  {
    path: "/integrations",
    views: 15680,
    avgTime: "2m 50s",
    bounceRate: "36,7%",
  },
  {
    path: "/settings/billing",
    views: 9320,
    avgTime: "1m 05s",
    bounceRate: "51,3%",
  },
];

export default function TrafficPage() {
  const [query, setQuery] = useState("");

  const filteredPages = useMemo(() => {
    if (!query.trim()) return TOP_PAGES;
    return TOP_PAGES.filter((page) =>
      page.path.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }, [query]);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Traffic</h1>
        <p className="text-sm text-muted-foreground">
          Detail pengunjung, perangkat, dan halaman terpopuler
        </p>
      </div>
      {/* Filter bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative">
          <Select defaultValue="30d">
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="Rentang waktu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 hari terakhir</SelectItem>
              <SelectItem value="30d">30 hari terakhir</SelectItem>
              <SelectItem value="90d">90 hari terakhir</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="Perangkat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua perangkat</SelectItem>
              <SelectItem value="desktop">Desktop</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
              <SelectItem value="tablet">Tablet</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari halaman..."
            className="pl-8"
          />
        </div>

        <Button variant="outline" className="sm:ml-auto">
          <Download className="size-4" />
          Export
        </Button>
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
                {Math.abs(stat.delta)}% vs minggu lalu
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sessions per Perangkat</CardTitle>
            <CardDescription>7 hari terakhir</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={SESSIONS_TREND}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="desktop"
                  name="Desktop"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="mobile"
                  name="Mobile"
                  stroke="#2dd4bf"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="tablet"
                  name="Tablet"
                  stroke="#60a5fa"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
            <CardDescription>Proporsi sesi per perangkat</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DEVICE_DATA}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                >
                  {DEVICE_DATA.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={DEVICE_COLORS[index % DEVICE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
              {DEVICE_DATA.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1.5">
                  <span
                    className="size-2 rounded-full"
                    style={{
                      backgroundColor:
                        DEVICE_COLORS[index % DEVICE_COLORS.length],
                    }}
                  />
                  <span className="text-muted-foreground">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Top pages table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">
            Halaman Terpopuler
          </CardTitle>

          <CardDescription className="text-xs sm:text-sm">
            {query
              ? `Hasil pencarian untuk "${query}"`
              : "Berdasarkan jumlah pageviews"}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0 sm:px-6">
          {/* ================= DESKTOP ================= */}
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Halaman</TableHead>
                    <TableHead className="text-right">Pageviews</TableHead>
                    <TableHead className="text-right">Avg. Time</TableHead>
                    <TableHead className="text-right">Bounce Rate</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredPages.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="h-24 text-center text-muted-foreground"
                      >
                        Tidak ada halaman yang cocok.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPages.map((page) => (
                      <TableRow key={page.path}>
                        <TableCell className="max-w-[400px] font-medium">
                          <div className="truncate" title={page.path}>
                            {page.path}
                          </div>
                        </TableCell>

                        <TableCell className="text-right font-medium">
                          {page.views.toLocaleString("id-ID")}
                        </TableCell>

                        <TableCell className="text-right text-muted-foreground">
                          {page.avgTime}
                        </TableCell>

                        <TableCell className="text-right text-muted-foreground">
                          {page.bounceRate}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* ================= MOBILE ================= */}
          <div className="block md:hidden">
            {filteredPages.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm text-muted-foreground">
                Tidak ada halaman yang cocok.
              </div>
            ) : (
              <div className="divide-y">
                {filteredPages.map((page) => (
                  <div key={page.path} className="space-y-4 px-4 py-4 sm:px-6">
                    {/* Page */}
                    <div className="min-w-0">
                      <p className="mb-1 text-xs text-muted-foreground">
                        Halaman
                      </p>

                      <p
                        className="truncate text-sm font-medium"
                        title={page.path}
                      >
                        {page.path}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                          Pageviews
                        </p>
                        <p className="mt-1 truncate text-sm font-medium">
                          {page.views.toLocaleString("id-ID")}
                        </p>
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                          Avg. Time
                        </p>
                        <p className="mt-1 truncate text-sm font-medium">
                          {page.avgTime}
                        </p>
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                          Bounce Rate
                        </p>
                        <p className="mt-1 truncate text-sm font-medium">
                          {page.bounceRate}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
