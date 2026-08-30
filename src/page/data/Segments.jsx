import { useMemo, useState } from "react";
import { Copy, Info, MoreVertical, Plus, Trash2, Users, X } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TOTAL_USERS = 84200;

const FIELD_OPTIONS = [
  "Total Spend",
  "Last Purchase",
  "Signup Date",
  "Country",
  "Device",
];
const OPERATOR_OPTIONS = [
  "lebih dari",
  "kurang dari",
  "sama dengan",
  "mengandung",
];

// --- Dummy data, ganti dengan data dari API kamu ---
const INITIAL_SEGMENTS = [
  {
    id: "seg1",
    name: "High-Value Customers",
    description: "Pelanggan dengan total belanja tinggi 90 hari terakhir",
    users: 6840,
    rules: [
      "Total Spend lebih dari Rp2jt",
      "Last Purchase kurang dari 30 hari",
    ],
  },
  {
    id: "seg2",
    name: "Churn Risk",
    description: "Pelanggan aktif yang mulai jarang bertransaksi",
    users: 3120,
    rules: [
      "Last Purchase lebih dari 60 hari",
      "Total Spend lebih dari Rp500rb",
    ],
  },
  {
    id: "seg3",
    name: "New Users",
    description: "Pengguna yang mendaftar dalam 14 hari terakhir",
    users: 9450,
    rules: ["Signup Date kurang dari 14 hari"],
  },
  {
    id: "seg4",
    name: "Mobile-First Users",
    description: "Pengguna yang mayoritas mengakses lewat perangkat mobile",
    users: 15680,
    rules: ["Device sama dengan Mobile"],
  },
];

function initialRule() {
  return {
    id: crypto.randomUUID(),
    field: FIELD_OPTIONS[0],
    operator: OPERATOR_OPTIONS[0],
    value: "",
  };
}

export default function Segments() {
  const [segments, setSegments] = useState(INITIAL_SEGMENTS);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [rules, setRules] = useState([initialRule()]);
  const [matchType, setMatchType] = useState("all");

  const chartData = useMemo(
    () => segments.map((s) => ({ name: s.name, users: s.users })),
    [segments],
  );

  const addRule = () => setRules((prev) => [...prev, initialRule()]);
  const removeRule = (id) =>
    setRules((prev) => prev.filter((r) => r.id !== id));
  const updateRule = (id, patch) =>
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const confirmDelete = () => {
    setSegments((prev) => prev.filter((s) => s.id !== deleteTarget?.id));
    setDeleteTarget(null);
  };

  const duplicateSegment = (segment) => {
    setSegments((prev) => [
      {
        ...segment,
        id: `${segment.id}-copy-${Date.now()}`,
        name: `${segment.name} (Copy)`,
      },
      ...prev,
    ]);
  };

  const resetAndCloseCreate = () => {
    setRules([initialRule()]);
    setMatchType("all");
    setCreateOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Segments</h1>
          <p className="text-sm text-muted-foreground">
            Kelompokkan user berdasarkan perilaku dan atribut
          </p>
        </div>

        <Sheet
          open={createOpen}
          onOpenChange={(open) =>
            open ? setCreateOpen(true) : resetAndCloseCreate()
          }
        >
          <SheetTrigger className="relative" asChild>
            <Button>
              <Plus className="size-4" />
              Buat Segmen
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full overflow-y-auto sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Buat Segmen Baru</SheetTitle>
              <SheetDescription>
                Tentukan aturan untuk mengelompokkan user secara otomatis.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-5 px-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="segment-name">Nama Segmen</Label>
                <Input
                  id="segment-name"
                  placeholder="Mis. High-Value Customers"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="segment-desc">Deskripsi</Label>
                <Textarea
                  id="segment-desc"
                  placeholder="Jelaskan siapa segmen ini secara singkat"
                />
              </div>

              <Separator2 />

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Label>Aturan</Label>
                  <ToggleGroup
                    type="single"
                    size="sm"
                    value={matchType}
                    onValueChange={(v) => v && setMatchType(v)}
                  >
                    <ToggleGroupItem value="all">Semua (AND)</ToggleGroupItem>
                    <ToggleGroupItem value="any">
                      Salah satu (OR)
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                {rules.map((rule, index) => (
                  <div
                    key={rule.id}
                    className="flex flex-col gap-2 rounded-lg border p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">
                        Aturan {index + 1}
                      </span>
                      {rules.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-6"
                          onClick={() => removeRule(rule.id)}
                        >
                          <X className="size-3.5" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      <Select
                        value={rule.field}
                        onValueChange={(v) => updateRule(rule.id, { field: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {FIELD_OPTIONS.map((f) => (
                            <SelectItem key={f} value={f}>
                              {f}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={rule.operator}
                        onValueChange={(v) =>
                          updateRule(rule.id, { operator: v })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {OPERATOR_OPTIONS.map((op) => (
                            <SelectItem key={op} value={op}>
                              {op}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Nilai"
                        value={rule.value}
                        onChange={(e) =>
                          updateRule(rule.id, { value: e.target.value })
                        }
                      />
                    </div>
                  </div>
                ))}

                <Button variant="outline" size="sm" onClick={addRule}>
                  <Plus className="size-3.5" />
                  Tambah Aturan
                </Button>
              </div>
            </div>
            <SheetFooter>
              <Button variant="outline" onClick={resetAndCloseCreate}>
                Batal
              </Button>
              <Button onClick={resetAndCloseCreate}>Simpan Segmen</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Segmen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight">
              {segments.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total User Tercakup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight">
              {segments
                .reduce((sum, s) => sum + s.users, 0)
                .toLocaleString("id-ID")}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Segmen Terbesar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="truncate text-2xl font-semibold tracking-tight">
              {segments.reduce(
                (a, b) => (b.users > a.users ? b : a),
                segments[0],
              )?.name ?? "-"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart perbandingan ukuran segmen */}
      <Card>
        <CardHeader>
          <CardTitle>Perbandingan Ukuran Segmen</CardTitle>
          <CardDescription>Jumlah user per segmen</CardDescription>
        </CardHeader>
        <CardContent className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tickLine={false} axisLine={false} />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
                width={130}
              />
              <ChartTooltip />
              <Bar dataKey="users" fill="#f59e0b" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Segment cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {segments.map((segment) => {
          const percentage = Math.round((segment.users / TOTAL_USERS) * 100);
          return (
            <Card key={segment.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">{segment.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {segment.description}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="relative" asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 shrink-0"
                    >
                      <MoreVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => duplicateSegment(segment)}>
                      <Copy className="size-4" />
                      Duplikat
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-500 focus:text-red-500"
                      onClick={() => setDeleteTarget(segment)}
                    >
                      <Trash2 className="size-4" />
                      Hapus
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Users className="size-3.5 text-muted-foreground" />
                    {segment.users.toLocaleString("id-ID")} user
                  </span>
                  <span className="text-muted-foreground">
                    {percentage}% dari total
                  </span>
                </div>
                <Progress value={percentage} className="mt-2 h-1.5" />

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <button className="mt-3 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                      <Info className="size-3" />
                      {segment.rules.length} aturan diterapkan
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-72">
                    <p className="mb-2 text-xs font-medium text-muted-foreground">
                      Aturan segmen
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {segment.rules.map((rule) => (
                        <Badge
                          key={rule}
                          variant="secondary"
                          className="font-normal"
                        >
                          {rule}
                        </Badge>
                      ))}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus segmen ini?</AlertDialogTitle>
            <AlertDialogDescription>
              "{deleteTarget?.name}" akan dihapus dan tidak lagi digunakan di
              laporan mana pun.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={confirmDelete}
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Separator kecil khusus dipakai di form Sheet (menghindari nama bentrok dgn import Separator lain kalau ada)
function Separator2() {
  return <div className="h-px w-full bg-border" />;
}
