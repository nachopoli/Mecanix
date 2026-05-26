import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString("es-AR")}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatDateLong(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export const statusLabels: Record<string, string> = {
  pendiente: "Pendiente",
  programada: "Programada",
  "en-curso": "En curso",
  pausada: "Pausada",
  finalizada: "Finalizada",
  entregada: "Entregada",
  cancelada: "Cancelada",
  borrador: "Borrador",
  enviado: "Enviado",
  aprobado: "Aprobado",
  rechazado: "Rechazado",
  vencido: "Vencido",
  confirmado: "Confirmado",
  disponible: "Disponible",
};

export const statusBadgeClass: Record<string, string> = {
  pendiente: "badge-pendiente",
  programada: "badge-programada",
  "en-curso": "badge-en-curso",
  pausada: "badge-pendiente",
  finalizada: "badge-finalizada",
  entregada: "badge-entregada",
  cancelada: "badge-cancelada",
  borrador: "badge-borrador",
  enviado: "badge-enviado",
  aprobado: "badge-aprobado",
  rechazado: "badge-rechazado",
  vencido: "badge-vencido",
};
