import { useRef } from "react";
import styles from "./Portfolio.module.css";

// Portrait façon pop art (aplats verts + trame) qui révèle la vraie photo au survol.
// La carte s'incline en 3D en suivant la souris.

export default function Avatar({ photo }) {
    const cardRef = useRef(null);

    const onMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        card.style.setProperty("--rx", `${(0.5 - y) * 14}deg`);
        card.style.setProperty("--ry", `${(x - 0.5) * 14}deg`);
        card.style.setProperty("--gx", `${x * 100}%`);
        card.style.setProperty("--gy", `${y * 100}%`);
    };

    const onLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
    };

    return (
        <div className={styles.portraitScene}>
            <svg width="0" height="0" className={styles.srOnly} aria-hidden="true">
                <filter id="popArt" colorInterpolationFilters="sRGB">
                    <feColorMatrix type="saturate" values="0" />
                    <feComponentTransfer>
                        <feFuncR type="discrete" tableValues="0 .25 .5 .75 1" />
                        <feFuncG type="discrete" tableValues="0 .25 .5 .75 1" />
                        <feFuncB type="discrete" tableValues="0 .25 .5 .75 1" />
                    </feComponentTransfer>
                    <feComponentTransfer>
                        <feFuncR type="table" tableValues="0.03 0.08 0.4 0.9" />
                        <feFuncG type="table" tableValues="0.04 0.45 0.85 1" />
                        <feFuncB type="table" tableValues="0.05 0.35 0.65 0.95" />
                    </feComponentTransfer>
                </filter>
            </svg>

            <div ref={cardRef} className={styles.portraitCard} onMouseMove={onMove} onMouseLeave={onLeave}>
                <img src={photo} alt="" aria-hidden="true" className={styles.portraitPop} />
                <img src={photo} alt="Traore Ange Fresnel" className={styles.portraitReal} />
                <span className={styles.portraitHalftone} />
                <span className={styles.portraitVignette} />
                <span className={styles.portraitGlare} />
                <span className={styles.portraitName}>
                    <strong>Ange Fresnel Traoré</strong>
                    <span>Fullstack · Mobile · Data</span>
                </span>
            </div>
        </div>
    );
}
