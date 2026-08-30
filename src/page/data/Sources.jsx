import { useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  CreditCard,
  Database,
  FileSpreadsheet,
  Info,
  Mail,
  Megaphone,
  MoreVertical,
  Plus,
  RefreshCw,
  Settings2,
  ShoppingBag,
  Trash2,
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
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
const STATUS_META = {
  connected: {
    label: "Terhubung",
    icon: CheckCircle2,
    badge: "bg-emerald-500/10 text-emerald-500",
  },
  error: {
    label: "Butuh Re-auth",
    icon: AlertTriangle,
    badge: "bg-red-500/10 text-red-500",
  },
  syncing: {
    label: "Sinkronisasi...",
    icon: RefreshCw,
    badge: "bg-amber-500/10 text-amber-500",
  },
};

const INITIAL_SOURCES = [
  {
    id: "src1",
    name: "Google Analytics 4",
    type: "Analytics",
    icon: BarChart3,
    status: "connected",
    lastSync: "5 menit lalu",
    records: 128400,
    enabled: true,
    syncProgress: 100,
  },
  {
    id: "src2",
    name: "Google Ads",
    type: "Advertising",
    icon: Megaphone,
    status: "error",
    lastSync: "2 hari lalu",
    records: 42100,
    enabled: true,
    syncProgress: 100,
  },
  {
    id: "src3",
    name: "Meta Ads",
    type: "Advertising",
    icon: Megaphone,
    status: "connected",
    lastSync: "12 menit lalu",
    records: 38900,
    enabled: true,
    syncProgress: 100,
  },
];

const AVAILABLE_CONNECTORS = [
  {
    id: "shopify",
    name: "Shopify",
    desc: "Sinkronkan data pesanan dan produk",
    icon: ShoppingBag,
    type: "E-commerce",
  },
  {
    id: "stripe",
    name: "Stripe",
    desc: "Data transaksi dan langganan",
    icon: CreditCard,
    type: "Payment",
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    desc: "Data campaign email dan subscriber",
    icon: Mail,
    type: "Email",
  },
  {
    id: "csv",
    name: "CSV Upload",
    desc: "Upload data manual dari file CSV",
    icon: FileSpreadsheet,
    type: "Manual",
  },
];

export default function Sources() {
  const [sources, setSources] = useState(INITIAL_SOURCES);
  const [activeTab, setActiveTab] = useState("connected");
  const [disconnectTarget, setDisconnectTarget] = useState(null);

  const hasError = sources.some((s) => s.status === "error");

  const toggleEnabled = (id) => {
    setSources((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    );
  };

  const confirmDisconnect = () => {
    setSources((prev) => prev.filter((s) => s.id !== disconnectTarget?.id));
    setDisconnectTarget(null);
  };

  const connectSource = (connector) => {
    const id = `${connector.id}-${Date.now()}`;
    setSources((prev) => [
      {
        id,
        name: connector.name,
        type: connector.type,
        icon: connector.icon,
        status: "syncing",
        lastSync: "Baru saja",
        records: 0,
        enabled: true,
        syncProgress: 0,
      },
      ...prev,
    ]);
    setActiveTab("connected");

    // simulasikan proses sinkronisasi awal
    let progress = 0;
    const interval = setInterval(() => {
      progress += 34;
      setSources((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                syncProgress: Math.min(progress, 100),
                ...(progress >= 100
                  ? {
                      status: "connected",
                      records: Math.floor(Math.random() * 50000) + 5000,
                    }
                  : {}),
              }
            : s,
        ),
      );
      if (progress >= 100) clearInterval(interval);
    }, 600);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">
            Data Sources
          </h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-6 text-muted-foreground"
              >
                <Info className="size-3.5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 text-sm">
              <p className="font-medium">Apa itu Data Source?</p>
              <p className="mt-1 text-muted-foreground">
                Koneksi ke platform eksternal (analytics, iklan, payment, dll)
                yang datanya ditarik secara berkala untuk ditampilkan di
                dashboard.
              </p>
            </PopoverContent>
          </Popover>
        </div>
        <p className="text-sm text-muted-foreground sm:hidden">
          Kelola koneksi sumber data untuk dashboard kamu
        </p>
      </div>
      <p className="-mt-4 hidden text-sm text-muted-foreground sm:block">
        Kelola koneksi sumber data untuk dashboard kamu
      </p>

      {/* Alert kalau ada error */}
      {hasError && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Ada koneksi yang butuh perhatian</AlertTitle>
          <AlertDescription>
            Google Ads kehilangan akses token dan berhenti sinkronisasi sejak 2
            hari lalu. Sambungkan ulang agar data tetap akurat.
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="connected">
            Terhubung
            <Badge variant="secondary" className="ml-1.5 px-1.5">
              {sources.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="available">Tersedia</TabsTrigger>
        </TabsList>

        {/* --- Tab: Terhubung --- */}
        <TabsContent value="connected">
          <Card>
            <CardContent className="px-0 pt-6 sm:px-6">
              {/* Mobile: card list */}
              <div className="flex flex-col gap-3 px-4 sm:hidden">
                {sources.map((source) => {
                  const meta = STATUS_META[source.status];
                  return (
                    <div key={source.id} className="rounded-lg border p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-amber-400/15 text-amber-500">
                            <source.icon className="size-4" />
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                              {source.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {source.type}
                            </p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <div className="relative">
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 shrink-0"
                              >
                                <MoreVertical className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                          </div>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <RefreshCw className="size-4" />
                              Sync sekarang
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings2 className="size-4" />
                              Konfigurasi
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-500 focus:text-red-500"
                              onClick={() => setDisconnectTarget(source)}
                            >
                              <Trash2 className="size-4" />
                              Putuskan
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="mt-2 flex items-center gap-1.5">
                        <Badge
                          variant="secondary"
                          className={`gap-1 ${meta.badge}`}
                        >
                          <meta.icon
                            className={`size-3 ${source.status === "syncing" ? "animate-spin" : ""}`}
                          />
                          {meta.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {source.lastSync}
                        </span>
                      </div>

                      {source.status === "syncing" ? (
                        <Progress
                          value={source.syncProgress}
                          className="mt-3 h-1.5"
                        />
                      ) : (
                        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                          <span>
                            {source.records.toLocaleString("id-ID")} records
                          </span>
                          <Switch
                            checked={source.enabled}
                            onCheckedChange={() => toggleEnabled(source.id)}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Desktop / tablet: table */}
              <div className="hidden overflow-x-auto sm:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sumber</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Terakhir Sync</TableHead>
                      <TableHead className="text-right">Records</TableHead>
                      <TableHead>Aktif</TableHead>
                      <TableHead className="w-10" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sources.map((source) => {
                      const meta = STATUS_META[source.status];
                      return (
                        <TableRow key={source.id}>
                          <TableCell>
                            <div className="flex items-center gap-2.5">
                              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-amber-400/15 text-amber-500">
                                <source.icon className="size-4" />
                              </span>
                              <div>
                                <p className="font-medium">{source.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {source.type}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={`gap-1 ${meta.badge}`}
                            >
                              <meta.icon
                                className={`size-3 ${source.status === "syncing" ? "animate-spin" : ""}`}
                              />
                              {meta.label}
                            </Badge>
                            {source.status === "syncing" && (
                              <Progress
                                value={source.syncProgress}
                                className="mt-1.5 h-1.5 w-28"
                              />
                            )}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {source.lastSync}
                          </TableCell>
                          <TableCell className="text-right">
                            {source.status === "syncing" ? (
                              <Skeleton className="ml-auto h-4 w-16" />
                            ) : (
                              source.records.toLocaleString("id-ID")
                            )}
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={source.enabled}
                              onCheckedChange={() => toggleEnabled(source.id)}
                              disabled={source.status === "syncing"}
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
                                  <RefreshCw className="size-4" />
                                  Sync sekarang
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Settings2 className="size-4" />
                                  Konfigurasi
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-500 focus:text-red-500"
                                  onClick={() => setDisconnectTarget(source)}
                                >
                                  <Trash2 className="size-4" />
                                  Putuskan
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Tab: Tersedia --- */}
        <TabsContent value="available">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AVAILABLE_CONNECTORS.map((connector) => (
              <Card key={connector.id}>
                <CardHeader>
                  <span className="flex size-10 items-center justify-center rounded-md bg-muted">
                    <connector.icon className="size-5" />
                  </span>
                  <CardTitle className="pt-2 text-base">
                    {connector.name}
                  </CardTitle>
                  <CardDescription>{connector.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => connectSource(connector)}
                  >
                    <Plus className="size-4" />
                    Hubungkan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Disconnect confirmation */}
      <AlertDialog
        open={!!disconnectTarget}
        onOpenChange={(open) => !open && setDisconnectTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Putuskan koneksi ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Data dari "{disconnectTarget?.name}" akan berhenti disinkronkan.
              Data historis yang sudah tersimpan tidak akan terhapus.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={confirmDisconnect}
            >
              Putuskan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
