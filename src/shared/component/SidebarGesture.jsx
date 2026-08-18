import { useSidebar } from "@/components/ui/sidebar";
import { useRef } from "react";

export default function SidebarGesture() {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();

  const startX = useRef(0);

  const handlePointerDown = (e) => {
    // Hanya aktif di mobile
    if (!isMobile) {
      return;
    }

    startX.current = e.clientX;
  };

  const handlePointerUp = (e) => {
    if (!isMobile) {
      return;
    }

    const endX = e.clientX;
    const distance = endX - startX.current;

    // Swipe kanan → buka
    if (distance > 80 && !openMobile) {
      setOpenMobile(true);
    }

    // Swipe kiri → tutup
    if (distance < -80 && openMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-0 touch-pan-y md:hidden"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    />
  );
}
