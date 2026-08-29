import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Download,
  Percent,
  Search,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
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
  {
    title: "Total Revenue",
    value: "Rp 412,8jt",
    delta: 11.3,
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "MRR",
    value: "Rp 38,2jt",
    delta: 6.8,
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "New Subscriptions",
    value: "284",
    delta: 18.4,
    trend: "up",
    icon: UserPlus,
  },
  {
    title: "Churn Rate",
    value: "2,1%",
    delta: -0.6,
    trend: "down",
    icon: Percent,
  },
];

const REVENUE_TREND = [
  { month: "Jan", revenue: 28.4 },
  { month: "Feb", revenue: 31.2 },
  { month: "Mar", revenue: 29.8 },
  { month: "Apr", revenue: 35.6 },
  { month: "Mei", revenue: 41.3 },
  { month: "Jun", revenue: 38.9 },
  { month: "Jul", revenue: 47.1 },
];

const REVENUE_BY_PLAN = [
  { plan: "Basic", revenue: 82.4 },
  { plan: "Pro", revenue: 168.7 },
  { plan: "Team", revenue: 121.3 },
  { plan: "Enterprise", revenue: 41.8 },
];

const STATUS_STYLES = {
  Paid: "bg-emerald-500/10 text-emerald-500",
  Pending: "bg-amber-500/10 text-amber-500",
  Failed: "bg-red-500/10 text-red-500",
};

const TRANSACTIONS = [
  {
    customer: "Salsabila Putri",
    plan: "Pro",
    amount: "Rp 299.000",
    status: "Paid",
    date: "28 Agu 2026",
  },
  {
    customer: "Budi Santoso",
    plan: "Team",
    amount: "Rp 899.000",
    status: "Paid",
    date: "27 Agu 2026",
  },
  {
    customer: "Anisa Rahma",
    plan: "Basic",
    amount: "Rp 99.000",
    status: "Pending",
    date: "27 Agu 2026",
  },
  {
    customer: "Fajar Nugraha",
    plan: "Enterprise",
    amount: "Rp 2.499.000",
    status: "Paid",
    date: "26 Agu 2026",
  },
  {
    customer: "Dewi Lestari",
    plan: "Pro",
    amount: "Rp 299.000",
    status: "Failed",
    date: "25 Agu 2026",
  },
  {
    customer: "Rizky Ramadhan",
    plan: "Team",
    amount: "Rp 899.000",
    status: "Paid",
    date: "24 Agu 2026",
  },
];

export default function RevenuePage() {
  const [query, setQuery] = useState("");

  const filteredTransactions = useMemo(() => {
    if (!query.trim()) return TRANSACTIONS;
    return TRANSACTIONS.filter((row) =>
      row.customer.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }, [query]);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Revenue</h1>
        <p className="text-sm text-muted-foreground">
          Pendapatan, langganan, dan riwayat transaksi
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
              <SelectItem value="12m">12 bulan terakhir</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari customer..."
            className="pl-8"
          />
        </div>

        <Button variant="outline" className="sm:ml-auto">
          <Download className="size-4" />
          Export
        </Button>
      </div>
      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {STATS.map((stat) => (
          <Card key={stat.title} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="truncate pr-2 text-xs font-medium text-muted-foreground sm:text-sm">
                {stat.title}
              </CardTitle>

              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-amber-400/15 text-amber-500">
                <stat.icon className="size-4" />
              </span>
            </CardHeader>

            <CardContent>
              <div className="text-xl font-semibold tracking-tight sm:text-2xl">
                {stat.value}
              </div>

              <Badge
                variant="secondary"
                className={
                  "mt-2 gap-1 text-xs " +
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
      {/* =========================================================
    CHARTS
========================================================= */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Revenue Trend */}
        <Card className="min-w-0 lg:col-span-2">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg">
              Revenue Trend
            </CardTitle>

            <CardDescription className="text-xs sm:text-sm">
              Pendapatan (dalam jutaan rupiah) 7 bulan terakhir
            </CardDescription>
          </CardHeader>

          <CardContent className="h-[240px] px-2 sm:h-[280px] sm:px-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={REVENUE_TREND}
                margin={{
                  top: 5,
                  right: 5,
                  left: -20,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  width={45}
                />

                <Tooltip formatter={(value) => [`Rp ${value}jt`, "Revenue"]} />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#f59e0b"
                  fill="url(#revenueFill)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue by Plan */}
        <Card className="min-w-0">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg">
              Revenue by Plan
            </CardTitle>

            <CardDescription className="text-xs sm:text-sm">
              Dalam jutaan rupiah
            </CardDescription>
          </CardHeader>

          <CardContent className="h-[240px] px-2 sm:h-[280px] sm:px-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={REVENUE_BY_PLAN}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 10,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />

                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                />

                <YAxis
                  dataKey="plan"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  width={60}
                  fontSize={12}
                />

                <Tooltip formatter={(value) => [`Rp ${value}jt`, "Revenue"]} />

                <Bar dataKey="revenue" fill="#f59e0b" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      {/* =========================================================
    TRANSACTIONS
========================================================= */}
      <Card className="overflow-hidden">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg">
            Transaksi Terbaru
          </CardTitle>

          <CardDescription className="text-xs sm:text-sm">
            {query
              ? `Hasil pencarian untuk "${query}"`
              : "Riwayat pembayaran customer"}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0 sm:px-6">
          {/* -----------------------------------------------------
        DESKTOP TABLE
    ----------------------------------------------------- */}
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead className="text-right">Nominal</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Tanggal</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredTransactions.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="h-24 text-center text-sm text-muted-foreground"
                      >
                        Tidak ada transaksi yang cocok.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTransactions.map((row, i) => (
                      <TableRow key={row.customer + i}>
                        <TableCell className="font-medium">
                          {row.customer}
                        </TableCell>

                        <TableCell className="text-muted-foreground">
                          {row.plan}
                        </TableCell>

                        <TableCell className="text-right font-medium">
                          {row.amount}
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={STATUS_STYLES[row.status]}
                          >
                            {row.status}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-right text-muted-foreground">
                          {row.date}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* ----------------------- Mobile ----------------------- */}
          <div className="block md:hidden">
            {filteredTransactions.length === 0 ? (
              <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                Tidak ada transaksi yang cocok.
              </div>
            ) : (
              <div className="divide-y">
                {filteredTransactions.map((row, i) => (
                  <div key={row.customer + i} className="space-y-4 px-4 py-4">
                    {/* Customer + Status */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {row.customer}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {row.plan}
                        </p>
                      </div>

                      <Badge
                        variant="secondary"
                        className={
                          "shrink-0 text-xs " + STATUS_STYLES[row.status]
                        }
                      >
                        {row.status}
                      </Badge>
                    </div>

                    {/* Amount + Date */}
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Nominal</p>

                        <p className="mt-1 text-sm font-semibold">
                          {row.amount}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Tanggal</p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {row.date}
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
