import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  MousePointerClick,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
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
    title: "Total Visitors",
    value: "24,582",
    delta: 12.4,
    trend: "up",
    icon: Users,
  },
  {
    title: "Revenue",
    value: "Rp 84,2jt",
    delta: 8.1,
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Conversion Rate",
    value: "3,42%",
    delta: -2.3,
    trend: "down",
    icon: TrendingUp,
  },
  {
    title: "Avg. Click Rate",
    value: "18,7%",
    delta: 4.6,
    trend: "up",
    icon: MousePointerClick,
  },
];

const TRAFFIC_DATA = [
  { month: "Jan", visitors: 3200 },
  { month: "Feb", visitors: 4100 },
  { month: "Mar", visitors: 3800 },
  { month: "Apr", visitors: 5200 },
  { month: "Mei", visitors: 6100 },
  { month: "Jun", visitors: 5800 },
  { month: "Jul", visitors: 7200 },
];

const SOURCE_DATA = [
  { name: "Organic Search", value: 42 },
  { name: "Direct", value: 27 },
  { name: "Social Media", value: 18 },
  { name: "Referral", value: 13 },
];

const SOURCE_COLORS = ["#fbbf24", "#2dd4bf", "#60a5fa", "#a78bfa"];

const RECENT_ACTIVITY = [
  {
    user: "Salsabila Putri",
    action: "Upgrade ke Pro plan",
    time: "2 menit lalu",
    amount: "Rp 299.000",
  },
  {
    user: "Budi Santoso",
    action: "Membuat laporan baru",
    time: "18 menit lalu",
    amount: "-",
  },
  {
    user: "Anisa Rahma",
    action: "Menambah data source",
    time: "1 jam lalu",
    amount: "-",
  },
  {
    user: "Fajar Nugraha",
    action: "Upgrade ke Team plan",
    time: "3 jam lalu",
    amount: "Rp 899.000",
  },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header + filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Ringkasan performa analitik kamu bulan ini
          </p>
        </div>
        <div className="relative">
          <Select defaultValue="30d">
            <SelectTrigger className="w-[160px]">
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

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>
              Jumlah pengunjung 7 bulan terakhir
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TRAFFIC_DATA}>
                <defs>
                  <linearGradient id="visitorsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#f59e0b"
                  fill="url(#visitorsFill)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Distribusi sumber pengunjung</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SOURCE_DATA}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                >
                  {SOURCE_DATA.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={SOURCE_COLORS[index % SOURCE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              {SOURCE_DATA.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1.5">
                  <span
                    className="size-2 rounded-full"
                    style={{
                      backgroundColor:
                        SOURCE_COLORS[index % SOURCE_COLORS.length],
                    }}
                  />
                  <span className="text-muted-foreground">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity table */}
      <Card className="w-full">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg">
            Aktivitas Terbaru
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Aktivitas user 24 jam terakhir
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0 sm:px-6">
          {/* Desktop / Tablet */}
          <div className="hidden sm:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Aksi</TableHead>
                  <TableHead>Waktu</TableHead>
                  <TableHead className="text-right">Nominal</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {RECENT_ACTIVITY.map((row) => (
                  <TableRow key={row.user + row.time}>
                    <TableCell className="font-medium">{row.user}</TableCell>

                    <TableCell className="text-muted-foreground">
                      {row.action}
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {row.time}
                    </TableCell>

                    <TableCell className="text-right font-medium">
                      {row.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile */}
          <div className="divide-y sm:hidden">
            {RECENT_ACTIVITY.map((row) => (
              <div
                key={row.user + row.time}
                className="flex items-center justify-between gap-4 px-4 py-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{row.user}</div>

                  <div className="mt-1 truncate text-xs text-muted-foreground">
                    {row.action}
                  </div>

                  <div className="mt-1 text-xs text-muted-foreground">
                    {row.time}
                  </div>
                </div>

                <div className="shrink-0 text-right text-sm font-semibold">
                  {row.amount}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
