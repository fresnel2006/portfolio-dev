import { useEffect, useRef, useState } from "react";
import styles from "./Portfolio.module.css";
import { clamp, prefersReducedMotion } from "./motion.js";

// Effets visuels du portfolio : écran de chargement, curseur, bandeau défilant,
// titres animés lettre par lettre, texte révélé au défilement et cartes empilées.
// Tout est fait maison (aucun script externe) pour garder une CSP stricte.



// ─── Écran de chargement ─────────────────────────────────────────────────────

const LOADER_STEPS = [
    { at: 0, text: "$ npm run portfolio" },
    { at: 30, text: "› compilation des projets…" },
    { at: 65, text: "› connexion à github.com/fresnel2006…" },
    { at: 100, text: "✓ prêt" },
];

export function Loader({ onDone }) {
    const [count, setCount] = useState(0);
    const [leaving, setLeaving] = useState(false);

    useEffect(() => {
        const start = performance.now();
        const duration = 1500;
        let raf = 0;
        let timer = 0;
        const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
            if (p < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                setLeaving(true);
                timer = setTimeout(onDone, 650);
            }
        };
        raf = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(timer);
        };
    }, [onDone]);

    const lines = LOADER_STEPS.filter((s) => count >= s.at);

    return (
        <div className={`${styles.loader} ${leaving ? styles.loaderLeave : ""}`} role="status" aria-label="Chargement du portfolio">
            <div className={styles.loaderLines}>
                {lines.map((l) => <span key={l.text}>{l.text}</span>)}
            </div>
            <div className={styles.loaderCount}>{count}<small>%</small></div>
            <div className={styles.loaderBar}><span style={{ transform: `scaleX(${count / 100})` }} /></div>
        </div>
    );
}

// ─── Curseur personnalisé (souris uniquement) ────────────────────────────────

export function Cursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        if (!window.matchMedia("(pointer: fine)").matches || prefersReducedMotion()) return;
        const dot = dotRef.current;
        const ring = ringRef.current;
        let x = -100, y = -100, rx = -100, ry = -100, raf = 0;

        const onMove = (e) => {
            x = e.clientX;
            y = e.clientY;
            dot.style.transform = `translate(${x}px, ${y}px)`;
            const interactive = e.target.closest?.("a, button, [data-cursor]");
            ring.classList.toggle(styles.cursorHover, Boolean(interactive));
            dot.classList.add(styles.cursorVisible);
            ring.classList.add(styles.cursorVisible);
        };
        const onLeave = () => {
            dot.classList.remove(styles.cursorVisible);
            ring.classList.remove(styles.cursorVisible);
        };
        // L'anneau suit le point avec un léger retard
        const loop = () => {
            rx += (x - rx) * 0.16;
            ry += (y - ry) * 0.16;
            ring.style.transform = `translate(${rx}px, ${ry}px)`;
            raf = requestAnimationFrame(loop);
        };

        window.addEventListener("mousemove", onMove);
        document.addEventListener("mouseleave", onLeave);
        raf = requestAnimationFrame(loop);
        return () => {
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseleave", onLeave);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <>
            <div ref={ringRef} className={styles.cursorRing} aria-hidden="true" />
            <div ref={dotRef} className={styles.cursorDot} aria-hidden="true" />
        </>
    );
}

// ─── Bandeau de mots qui défile ──────────────────────────────────────────────

export function Marquee({ words }) {
    const renderRow = (prefix) =>
        words.map((w, i) => (
            <span key={`${prefix}-${w}`} className={styles.marqueeItem}>
                <span className={i % 2 ? styles.marqueeOutline : styles.marqueeFill}>{w}</span>
                <span className={styles.marqueeStar}>✦</span>
            </span>
        ));

    return (
        <div className={styles.marquee} aria-hidden="true">
            <div className={styles.marqueeTrack}>
                {renderRow("a")}
                {renderRow("b")}
            </div>
        </div>
    );
}

// ─── Titre animé lettre par lettre ───────────────────────────────────────────
// Chaque mot reste insécable : un titre ne se coupe jamais au milieu d'un mot.

export function SplitText({ text, delay = 0, step = 0.035 }) {
    let index = 0;
    return (
        <span className={styles.split} aria-label={text}>
            {text.split(" ").map((word, w) => (
                <span key={w} className={styles.splitWord} aria-hidden="true">
                    {[...word].map((ch, c) => {
                        const d = delay + index++ * step;
                        return <span key={c} className={styles.splitLetter} style={{ animationDelay: `${d}s` }}>{ch}</span>;
                    })}
                    {w < text.split(" ").length - 1 && " "}
                </span>
            ))}
        </span>
    );
}

// ─── Texte révélé mot par mot pendant le défilement ──────────────────────────

export function RevealWords({ text, className = "" }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const words = el.querySelectorAll("span");
        if (prefersReducedMotion()) {
            words.forEach((w) => w.classList.add(styles.wordOn));
            return;
        }
        let raf = 0;
        const update = () => {
            raf = 0;
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight;
            const p = clamp((vh * 0.9 - rect.top) / (rect.height + vh * 0.4), 0, 1);
            const lit = Math.round(p * words.length);
            words.forEach((w, i) => w.classList.toggle(styles.wordOn, i < lit));
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
    }, [text]);

    return (
        <p ref={ref} className={`${styles.revealWords} ${className}`}>
            {text.split(" ").map((w, i) => <span key={i}>{w} </span>)}
        </p>
    );
}
