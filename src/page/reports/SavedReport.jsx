import { useMemo, useState } from "react";
import {
  BarChart3,
  Copy,
  FileText,
  LayoutGrid,
  List,
  MoreVertical,
  Plus,
  Search,
  Star,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

// --- Dummy data, ganti dengan data dari API kamu ---
const TYPE_STYLES = {
  Traffic: { badge: "bg-blue-500/10 text-blue-500", icon: BarChart3 },
  Revenue: { badge: "bg-emerald-500/10 text-emerald-500", icon: TrendingUp },
  Conversions: { badge: "bg-amber-500/10 text-amber-500", icon: Users },
  Custom: { badge: "bg-violet-500/10 text-violet-500", icon: FileText },
};

const INITIAL_REPORTS = [
  {
    id: "r1",
    name: "Ringkasan Trafik Mingguan",
    type: "Traffic",
    owner: "Salsabila Putri",
    updatedAt: "2 hari lalu",
  },
  {
    id: "r2",
    name: "Revenue vs Target Q3",
    type: "Revenue",
    owner: "Budi Santoso",
    updatedAt: "5 hari lalu",
  },
  {
    id: "r3",
    name: "Funnel Checkout — Agustus",
    type: "Conversions",
    owner: "Anisa Rahma",
    updatedAt: "1 minggu lalu",
  },
  {
    id: "r4",
    name: "Laporan Campaign Ramadan",
    type: "Custom",
    owner: "Fajar Nugraha",
    updatedAt: "2 minggu lalu",
  },
  {
    id: "r5",
    name: "Sumber Trafik per Channel",
    type: "Traffic",
    owner: "Salsabila Putri",
    updatedAt: "3 minggu lalu",
  },
  {
    id: "r6",
    name: "MRR & Churn Overview",
    type: "Revenue",
    owner: "Dewi Lestari",
    updatedAt: "1 bulan lalu",
  },
];

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

export default function SavedReport() {
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [query, setQuery] = useState("");
  const [view, setView] = useState("grid");
  const [favorites, setFavorites] = useState(new Set());
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);

  const filteredReports = useMemo(() => {
    if (!query.trim()) return reports;
    return reports.filter((r) =>
      r.name.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }, [reports, query]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const confirmDelete = () => {
    setReports((prev) => prev.filter((r) => r.id !== deleteTarget?.id));
    setDeleteTarget(null);
  };

  const duplicateReport = (report) => {
    setReports((prev) => [
      {
        ...report,
        id: `${report.id}-copy-${Date.now()}`,
        name: `${report.name} (Copy)`,
        updatedAt: "Baru saja",
      },
      ...prev,
    ]);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Saved Reports
          </h1>
          <p className="text-sm text-muted-foreground">
            Laporan yang sudah kamu simpan dan bagikan ke tim
          </p>
        </div>

        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <div className="relative">
            <DialogTrigger asChild>
              <div>
                <Button>
                  <Plus className="size-4" />
                  Buat Laporan
                </Button>
              </div>
            </DialogTrigger>
          </div>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Buat Laporan Baru</DialogTitle>
              <DialogDescription>
                Laporan akan tersimpan di daftar dan bisa dibagikan ke tim.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="report-name">Nama Laporan</Label>
                <Input
                  id="report-name"
                  placeholder="Mis. Ringkasan Trafik Mingguan"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="report-type">Tipe</Label>
                <Select defaultValue="Traffic">
                  <SelectTrigger id="report-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Traffic">Traffic</SelectItem>
                    <SelectItem value="Revenue">Revenue</SelectItem>
                    <SelectItem value="Conversions">Conversions</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="report-desc">Deskripsi (opsional)</Label>
                <Textarea
                  id="report-desc"
                  placeholder="Catatan singkat tentang isi laporan ini"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateOpen(false)}>
                Batal
              </Button>
              <Button onClick={() => setCreateOpen(false)}>
                Simpan Laporan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search + view toggle */}
      <div className="flex flex-wrap items-center gap-3 relative">
        <div className="relative w-full flex-1 sm:w-auto sm:max-w-xs">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari laporan..."
            className="pl-8"
          />
        </div>
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(v) => setView(v[0])}
          className="ml-auto"
        >
          <ToggleGroupItem value="grid" aria-label="Tampilan grid">
            <LayoutGrid className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="Tampilan list">
            <List className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {filteredReports.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-12 text-center">
            <FileText className="size-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Tidak ada laporan yang cocok dengan pencarian "{query}".
            </p>
          </CardContent>
        </Card>
      ) : view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredReports.map((report) => {
            const style = TYPE_STYLES[report.type];
            const isFavorite = favorites.has(report.id);
            return (
              <Card key={report.id}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <span
                    className={`flex size-9 items-center justify-center rounded-md ${style.badge}`}
                  >
                    <style.icon className="size-4" />
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => toggleFavorite(report.id)}
                    >
                      <Star
                        className={`size-4 ${isFavorite ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                      />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => duplicateReport(report)}
                        >
                          <Copy className="size-4" />
                          Duplikat
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-500 focus:text-red-500"
                          onClick={() => setDeleteTarget(report)}
                        >
                          <Trash2 className="size-4" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-base">{report.name}</CardTitle>
                  <CardDescription className="mt-1">
                    <Badge variant="secondary" className={style.badge}>
                      {report.type}
                    </Badge>
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarFallback className="text-[10px]">
                        {initials(report.owner)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">
                      {report.owner}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {report.updatedAt}
                  </span>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            {filteredReports.map((report, i) => {
              const style = TYPE_STYLES[report.type];
              const isFavorite = favorites.has(report.id);
              return (
                <div key={report.id}>
                  <div className="flex items-center gap-2 px-4 py-3 sm:gap-4">
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-md ${style.badge}`}
                    >
                      <style.icon className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {report.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {report.owner} · {report.updatedAt}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`hidden sm:inline-flex ${style.badge}`}
                    >
                      {report.type}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => toggleFavorite(report.id)}
                    >
                      <Star
                        className={`size-4 ${isFavorite ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                      />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => duplicateReport(report)}
                        >
                          <Copy className="size-4" />
                          Duplikat
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-500 focus:text-red-500"
                          onClick={() => setDeleteTarget(report)}
                        >
                          <Trash2 className="size-4" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {i < filteredReports.length - 1 && <Separator />}
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus laporan ini?</AlertDialogTitle>
            <AlertDialogDescription>
              "{deleteTarget?.name}" akan dihapus permanen dan tidak bisa
              dikembalikan.
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
