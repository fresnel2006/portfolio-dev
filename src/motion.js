import { useEffect } from "react";
import styles from "./Portfolio.module.css";

// Utilitaires d'animation partagés par les composants.

export const prefersReducedMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

// ─── Cartes empilées : la carte recouverte rétrécit et s'assombrit ───────────

export function useStackCards(containerRef, deps) {
    useEffect(() => {
        const container = containerRef.current;
        if (!container || prefersReducedMotion()) return;
        const desktop = window.matchMedia("(min-width: 900px)");
        let raf = 0;

        const update = () => {
            raf = 0;
            const cards = container.querySelectorAll(`.${styles.stackCard}`);
            cards.forEach((card, i) => {
                const inner = card.firstElementChild;
                const next = cards[i + 1];
                if (!desktop.matches || !next) {
                    inner.style.transform = "";
                    inner.style.filter = "";
                    return;
                }
                const gap = next.getBoundingClientRect().top - card.getBoundingClientRect().top;
                const p = clamp(1 - gap / card.offsetHeight, 0, 1);
                inner.style.transform = `scale(${1 - p * 0.07})`;
                inner.style.filter = `brightness(${1 - p * 0.55})`;
            });
        };
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            cancelAnimationFrame(raf);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
