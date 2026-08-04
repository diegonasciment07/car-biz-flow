import type { AnchorHTMLAttributes, MouseEvent } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Dispara o evento de conversão antes de abrir o link externo. */
export function trackConversion(event: string, params: Record<string, unknown> = {}) {
  try {
    window.dataLayer?.push({ event, ...params });
    window.gtag?.("event", event, params);
  } catch {
    /* noop */
  }
}

/** Abre a URL sempre fora do preview/iframe, em nova aba. */
export function openExternal(url: string) {
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (win) {
    win.opener = null;
    return;
  }
  // Popup bloqueado: escapa do iframe navegando a janela de topo.
  try {
    if (window.top && window.top !== window.self) {
      window.top.location.href = url;
      return;
    }
  } catch {
    /* cross-origin: cai no fallback abaixo */
  }
  window.location.href = url;
}

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  event?: string;
  eventParams?: Record<string, unknown>;
};

export function ExternalLink({ href, event, eventParams, onClick, children, ...rest }: Props) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;
    e.preventDefault();
    if (event) trackConversion(event, { link_url: href, ...eventParams });
    openExternal(href);
  }

  return (
    <a {...rest} href={href} target="_blank" rel="noopener noreferrer external" onClick={handleClick}>
      {children}
    </a>
  );
}
