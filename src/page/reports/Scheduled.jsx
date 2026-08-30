import { useState } from "react";
import {
  CalendarClock,
  CheckCircle2,
  MoreVertical,
  Pencil,
  Plus,
  Trash2,
  XCircle,
} from "lucide-react";

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
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- Dummy data, ganti dengan data dari API kamu ---
const FREQUENCY_STYLES = {
  Harian: "bg-blue-500/10 text-blue-500",
  Mingguan: "bg-amber-500/10 text-amber-500",
  Bulanan: "bg-violet-500/10 text-violet-500",
};

const INITIAL_SCHEDULES = [
  {
    id: "s1",
    reportName: "Ringkasan Trafik Mingguan",
    frequency: "Mingguan",
    nextRun: "Sen, 1 Sep 2026 · 08:00",
    recipients: ["Salsabila Putri", "Budi Santoso"],
    enabled: true,
  },
  {
    id: "s2",
    reportName: "Revenue vs Target Q3",
    frequency: "Bulanan",
    nextRun: "1 Okt 2026 · 09:00",
    recipients: ["Fajar Nugraha"],
    enabled: true,
  },
  {
    id: "s3",
    reportName: "Funnel Checkout — Agustus",
    frequency: "Harian",
    nextRun: "31 Agu 2026 · 07:00",
    recipients: ["Anisa Rahma", "Dewi Lestari", "Rizky Ramadhan"],
    enabled: false,
  },
];

const DELIVERY_LOG = [
  {
    report: "Ringkasan Trafik Mingguan",
    time: "25 Agu 2026 · 08:00",
    status: "success",
  },
  {
    report: "Revenue vs Target Q3",
    time: "1 Agu 2026 · 09:00",
    status: "success",
  },
  {
    report: "Funnel Checkout — Agustus",
    time: "30 Agu 2026 · 07:00",
    status: "failed",
  },
];

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

export default function Scheduled() {
  const [schedules, setSchedules] = useState(INITIAL_SCHEDULES);
  const [addOpen, setAddOpen] = useState(false);

  const toggleEnabled = (id) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    );
  };

  const removeSchedule = (id) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Scheduled Reports
          </h1>
          <p className="text-sm text-muted-foreground">
            Kelola pengiriman otomatis laporan ke tim kamu
          </p>
        </div>

        <Sheet open={addOpen} onOpenChange={setAddOpen}>
          <SheetTrigger asChild>
            <div>
              <Button className="relative">
                <Plus className="size-4" />
                Tambah Jadwal
              </Button>
            </div>
          </SheetTrigger>
          <SheetContent className="w-full overflow-y-auto sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Tambah Jadwal Laporan</SheetTitle>
              <SheetDescription>
                Atur laporan mana yang dikirim otomatis, seberapa sering, dan ke
                siapa.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-5 px-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="schedule-report">Laporan</Label>
                <Select defaultValue="r1">
                  <SelectTrigger className="w-full" id="schedule-report">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ringkasan Trafik Mingguan">
                      Ringkasan Trafik Mingguan
                    </SelectItem>
                    <SelectItem value="Revenue vs Target Q3">
                      Revenue vs Target Q3
                    </SelectItem>
                    <SelectItem value="Funnel Checkout — Agustus">
                      Funnel Checkout — Agustus
                    </SelectItem>
                    <SelectItem value="Laporan Campaign Ramadan">
                      Laporan Campaign Ramadan
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Frekuensi</Label>
                <RadioGroup defaultValue="Mingguan" className="flex gap-4">
                  {["Harian", "Mingguan", "Bulanan"].map((freq) => (
                    <div key={freq} className="flex items-center gap-2">
                      <RadioGroupItem value={freq} id={`freq-${freq}`} />
                      <Label htmlFor={`freq-${freq}`} className="font-normal">
                        {freq}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="schedule-time">Jam Pengiriman</Label>
                <Input id="schedule-time" type="time" defaultValue="08:00" />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="schedule-recipients">Penerima</Label>
                <Input
                  id="schedule-recipients"
                  placeholder="nama@perusahaan.com, pisahkan dengan koma"
                />
              </div>
            </div>
            <SheetFooter>
              <Button variant="outline" onClick={() => setAddOpen(false)}>
                Batal
              </Button>
              <Button onClick={() => setAddOpen(false)}>Simpan Jadwal</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Schedules table */}
      <Card>
        <CardHeader>
          <CardTitle>Jadwal Aktif</CardTitle>
          <CardDescription>
            {schedules.length} laporan terjadwal
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0 sm:px-6">
          {/* Mobile: card list */}
          <div className="flex flex-col gap-3 px-4 sm:hidden">
            {schedules.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                Belum ada jadwal laporan.
              </p>
            ) : (
              schedules.map((s) => (
                <div key={s.id} className="rounded-lg border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {s.reportName}
                      </p>
                      <Badge
                        variant="secondary"
                        className={`mt-1 ${FREQUENCY_STYLES[s.frequency]}`}
                      >
                        {s.frequency}
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 shrink-0"
                        >
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="size-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-500 focus:text-red-500"
                          onClick={() => removeSchedule(s.id)}
                        >
                          <Trash2 className="size-4" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarClock className="size-3.5 shrink-0" />
                    {s.nextRun}
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {s.recipients.slice(0, 3).map((name) => (
                        <Avatar
                          key={name}
                          className="size-6 border-2 border-background"
                        >
                          <AvatarFallback className="text-[10px]">
                            {initials(name)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {s.recipients.length > 3 && (
                        <span className="flex size-6 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] text-muted-foreground">
                          +{s.recipients.length - 3}
                        </span>
                      )}
                    </div>
                    <Switch
                      checked={s.enabled}
                      onCheckedChange={() => toggleEnabled(s.id)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop / tablet: table */}
          <div className="hidden overflow-x-auto sm:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Laporan</TableHead>
                  <TableHead>Frekuensi</TableHead>
                  <TableHead>Pengiriman Berikutnya</TableHead>
                  <TableHead>Penerima</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-muted-foreground"
                    >
                      Belum ada jadwal laporan.
                    </TableCell>
                  </TableRow>
                ) : (
                  schedules.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">
                        {s.reportName}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={FREQUENCY_STYLES[s.frequency]}
                        >
                          {s.frequency}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <CalendarClock className="size-3.5" />
                          {s.nextRun}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex -space-x-2">
                          {s.recipients.slice(0, 3).map((name) => (
                            <Avatar
                              key={name}
                              className="size-6 border-2 border-background"
                            >
                              <AvatarFallback className="text-[10px]">
                                {initials(name)}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {s.recipients.length > 3 && (
                            <span className="flex size-6 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] text-muted-foreground">
                              +{s.recipients.length - 3}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={s.enabled}
                          onCheckedChange={() => toggleEnabled(s.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                            >
                              <MoreVertical className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Pencil className="size-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-500 focus:text-red-500"
                              onClick={() => removeSchedule(s.id)}
                            >
                              <Trash2 className="size-4" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delivery history */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Pengiriman Terakhir</CardTitle>
          <CardDescription>3 pengiriman terbaru</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          {DELIVERY_LOG.map((log, i) => (
            <div key={log.report + log.time}>
              <div className="flex items-center gap-3 py-2.5">
                {log.status === "success" ? (
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                ) : (
                  <XCircle className="size-4 shrink-0 text-red-500" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{log.report}</p>
                  <p className="text-xs text-muted-foreground">{log.time}</p>
                </div>
                <Badge
                  variant="secondary"
                  className={
                    log.status === "success"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-red-500/10 text-red-500"
                  }
                >
                  {log.status === "success" ? "Berhasil" : "Gagal"}
                </Badge>
              </div>
              {i < DELIVERY_LOG.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
