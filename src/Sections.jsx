import { useEffect, useState } from "react";
import styles from "./Portfolio.module.css";
import { RevealWords } from "./Effects.jsx";
import { prefersReducedMotion } from "./motion.js";
import gvipImg from "./assets/projets/gvip.png";
import esaticImg from "./assets/projets/esatic.png";
import overflowLogo from "./assets/projets/overflow.png";
import gvipMobile from "./assets/interfaces/gvip-mobile.png";
import gvipDashboard from "./assets/interfaces/gvip-dashboard.png";
import esaticMobile from "./assets/interfaces/esatic-mobile.png";
import overflow3d from "./assets/interfaces/overflow-3d.png";
import overflowApp from "./assets/interfaces/overflow-app.png";
import starpoleWeb from "./assets/interfaces/starpole-web.png";
import starpoleAccueil from "./assets/interfaces/starpole-app-accueil.png";
import starpoleAlertes from "./assets/interfaces/starpole-app-alertes.png";
import starpoleMessagerie from "./assets/interfaces/starpole-app-messagerie.png";
import starpolePhone from "./assets/interfaces/starpole-phone.png";

const GH = "https://github.com/fresnel2006";

// ─── Vitrine des interfaces (pour les recruteurs) ────────────────────────────

const showcases = [
    {
        id: "gvip",
        name: "GVIP",
        type: "Plateforme web",
        url: "govip-web-site.vercel.app",
        live: "https://govip-web-site.vercel.app",
        mobile: gvipMobile,
        screens: [
            { src: gvipImg, caption: "Espace client : rechercher un départ et réserver un créneau." },
            { src: gvipDashboard, caption: "Tableau des risques : les communes sous surveillance, triées par niveau d'impact." },
        ],
    },
    {
        id: "overflow",
        name: "Overflow",
        type: "Appli mobile + 3D",
        url: "overflow · jumeau numérique 3D",
        live: `${GH}/overflow`,
        liveLabel: "Voir le code d'Overflow",
        screens: [
            { src: overflow3d, caption: "Jumeau numérique 3D : la montée des eaux autour d'une résidence de Cocody, selon le scénario de crue." },
            { src: overflowApp, app: true, label: "appli mobile · Flutter", caption: "L'appli : niveau d'eau en temps réel, vue 3D, carte des zones à risque et alerte inondation." },
        ],
    },
    {
        id: "starpole",
        name: "StarPole",
        type: "Appli mobile + web",
        url: "starpole-web.web.app",
        live: "https://starpole-web.web.app",
        mobile: starpolePhone,
        screens: [
            { src: starpoleWeb, caption: "Le site web : connexion et inscription par code e-mail ou avec Google." },
            { src: starpoleAccueil, app: true, label: "appli mobile · Flutter", caption: "Accueil de l'appli : alertes à proximité, types d'alerte et alerte en cours." },
            { src: starpoleAlertes, app: true, label: "appli mobile · Flutter", caption: "Carte des alertes, détail d'une alerte et publication d'une nouvelle alerte." },
            { src: starpoleMessagerie, app: true, label: "appli mobile · Flutter", caption: "Messagerie entre voisins, conversation et profil avec les aides apportées." },
        ],
    },
    {
        id: "esatic",
        name: "ESATIC Évaluations",
        type: "Plateforme d'examens",
        url: "esatic-nu.vercel.app",
        live: "https://esatic-nu.vercel.app",
        mobile: esaticMobile,
        screens: [
            { src: esaticImg, caption: "Connexion à la plateforme d'examens en ligne : étudiants, enseignants, surveillants et administration." },
        ],
    },
];

export function InterfacesShowcase() {
    const [active, setActive] = useState(0);
    const [screen, setScreen] = useState(0);
    const [paused, setPaused] = useState(false);
    const project = showcases[active];
    const current = project.screens[screen];

    // Défilement automatique : écrans du projet, puis projet suivant
    useEffect(() => {
        if (paused || prefersReducedMotion()) return;
        const id = setInterval(() => {
            if (screen < project.screens.length - 1) {
                setScreen(screen + 1);
            } else {
                setActive((active + 1) % showcases.length);
                setScreen(0);
            }
        }, 4500);
        return () => clearInterval(id);
    }, [active, screen, paused, project.screens.length]);

    const select = (i) => {
        setActive(i);
        setScreen(0);
    };

    return (
        <section id="interfaces" className={styles.sectionShowcase}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>Interfaces</span>
                <h2 className={styles.sectionTitle}>Mes projets en vrai</h2>
                <p className={styles.sectionSubtitle}>Captures des interfaces en ligne, sur ordinateur et sur mobile.</p>
            </div>

            <div className={styles.showcaseTabs} role="tablist">
                {showcases.map((s, i) => (
                    <button
                        key={s.id}
                        role="tab"
                        aria-selected={i === active}
                        className={`${styles.showcaseTab} ${i === active ? styles.showcaseTabActive : ""}`}
                        onClick={() => select(i)}
                    >
                        <strong>{s.name}</strong>
                        <span>{s.type}</span>
                    </button>
                ))}
            </div>

            <div
                className={styles.showcaseStage}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <div className={styles.showcaseLaptop}>
                    <div className={styles.browserBar}>
                        <span className={styles.browserDots}><i /><i /><i /></span>
                        <span className={styles.browserUrl}>
                            <i className={current.app ? "fa-solid fa-mobile-screen" : "fa-solid fa-lock"}></i> {current.label || project.url}
                        </span>
                    </div>
                    <div className={styles.showcaseScreen}>
                        {project.screens.map((s, i) => (
                            <img
                                key={s.src}
                                src={s.src}
                                alt={`${project.name} : ${s.caption}`}
                                className={`${s.app ? styles.showcaseImgApp : ""} ${i === screen ? styles.showcaseImgActive : ""}`}
                            />
                        ))}
                        <span key={`${active}-${screen}`} className={styles.showcaseScan} />
                    </div>
                </div>

                {project.mobile && !current.app && (
                    <div className={styles.showcasePhone} key={project.id}>
                        <span className={styles.phoneNotch} />
                        <img src={project.mobile} alt={`${project.name} sur mobile`} />
                    </div>
                )}
            </div>

            <div className={styles.showcaseFooter}>
                <p className={styles.showcaseCaption}>
                    <span>{String(screen + 1).padStart(2, "0")} / {String(project.screens.length).padStart(2, "0")}</span>
                    {current.caption}
                </p>
                <a href={project.live} target="_blank" rel="noreferrer" className={styles.btnSecondary}>
                    {project.liveLabel || `Ouvrir ${project.name}`} <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
            </div>
        </section>
    );
}

// ─── Projet phare n°2 : Overflow ─────────────────────────────────────────────

const overflowFeatures = [
    { icon: "fa-solid fa-water", title: "Niveau d'eau en temps réel", text: "Relevés des stations rafraîchis automatiquement." },
    { icon: "fa-solid fa-map-location-dot", title: "Carte des zones à risque", text: "Les quartiers exposés aux inondations, sur une carte." },
    { icon: "fa-solid fa-triangle-exclamation", title: "Alertes & signalements", text: "Notifications push et signalements des citoyens." },
    { icon: "fa-solid fa-robot", title: "Assistant IA", text: "Des conseils de prévention grâce à Gemini." },
    { icon: "fa-solid fa-cube", title: "Jumeau numérique 3D", text: "Simulation de la montée des eaux en 3D." },
    { icon: "fa-solid fa-cloud-rain", title: "Météo", text: "Prévisions intégrées pour anticiper les pluies." },
];

export function OverflowProject() {
    return (
        <section id="overflow" className={styles.sectionFeatured}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>Projet phare</span>
                <h2 className={styles.sectionTitle}>Overflow : prévenir les inondations</h2>
                <p className={styles.sectionSubtitle}>
                    Application citoyenne de prévention des inondations en Côte d'Ivoire.
                    Projet APP3 de l'ESATIC, équipe Overflow Minds.
                </p>
            </div>

            <div className={`${styles.featuredCard} ${styles.reveal}`}>
                {/* Visuel : la goutte Overflow au-dessus d'une eau qui ondule */}
                <div className={styles.waterVisual}>
                    <img src={overflowLogo} alt="Logo Overflow" className={styles.waterLogo} />
                    <svg className={`${styles.wave} ${styles.waveBack}`} viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M0 60 Q150 20 300 60 T600 60 T900 60 T1200 60 V120 H0 Z" />
                    </svg>
                    <svg className={`${styles.wave} ${styles.waveFront}`} viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M0 60 Q150 100 300 60 T600 60 T900 60 T1200 60 V120 H0 Z" />
                    </svg>
                    <span className={styles.waterBadge}><span className={styles.statusDot}></span>Flutter · iOS & Android</span>
                </div>

                <div className={styles.featuredBody}>
                    <div className={styles.featuredIntro}>
                        <h3>Le problème</h3>
                        <RevealWords text="À chaque saison des pluies, des quartiers d'Abidjan sont inondés sans prévenir. Overflow donne aux habitants le niveau de l'eau près de chez eux, les zones à risque et une alerte dès que le danger monte." />
                        <div className={styles.featuredActions}>
                            <a href={`${GH}/overflow`} target="_blank" rel="noreferrer" className={styles.btnPrimary}>
                                <i className="devicon-github-original"></i> Appli Flutter
                            </a>
                            <a href={`${GH}/APP-3`} target="_blank" rel="noreferrer" className={styles.btnSecondary}>
                                <i className="fa-solid fa-cube"></i> Jumeau 3D
                            </a>
                        </div>
                    </div>
                    <div className={styles.espacesGrid}>
                        {overflowFeatures.map(({ icon, title, text }) => (
                            <div key={title} className={styles.espaceItem}>
                                <i className={icon}></i>
                                <div>
                                    <h4>{title}</h4>
                                    <p>{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.archWrapper}>
                    <span className={styles.archLabel}>Stack</span>
                    <div className={styles.archFlow}>
                        {[
                            { label: "Flutter", sub: "Appli mobile", icon: "devicon-flutter-plain", cls: styles.textFlutter },
                            { label: "FastAPI", sub: "API des stations", icon: "devicon-fastapi-plain", cls: styles.textFastapi },
                            { label: "Firebase", sub: "Auth · Firestore · FCM", icon: "devicon-firebase-plain", cls: styles.textFirebase },
                            { label: "Gemini", sub: "Assistant IA", icon: "fa-solid fa-robot", cls: styles.textReact },
                            { label: "React Three Fiber", sub: "Jumeau numérique 3D", icon: "devicon-threejs-original", cls: styles.textCss },
                        ].map(({ label, sub, icon, cls }, idx, arr) => (
                            <div key={label} className={styles.archStep}>
                                <div className={styles.archNode}>
                                    <i className={`${icon} ${cls}`}></i>
                                    <div>
                                        <strong>{label}</strong>
                                        <span>{sub}</span>
                                    </div>
                                </div>
                                {idx < arr.length - 1 && <span className={styles.archArrow}>→</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Projet phare n°3 : StarPole ─────────────────────────────────────────────

const STARPOLE_URL = "https://starpole-web.web.app";

const starpoleFeatures = [
    { icon: "fa-solid fa-bell", title: "Alertes d'urgence", text: "Les voisins proches sont prévenus par notification push." },
    { icon: "fa-solid fa-hand-holding-heart", title: "Aides & dons", text: "Demander un coup de main ou donner ce qui ne sert plus." },
    { icon: "fa-solid fa-map-location-dot", title: "Carte des alertes", text: "Toutes les alertes du quartier sur une carte Mapbox." },
    { icon: "fa-solid fa-comments", title: "Messagerie & appels", text: "Discuter et s'appeler entre voisins, directement dans l'appli." },
    { icon: "fa-solid fa-star", title: "Note de confiance", text: "Chaque aidant est noté pour rassurer la communauté." },
    { icon: "fa-solid fa-gauge-high", title: "Console admin", text: "Tableau de bord, modération des alertes et export CSV." },
];

export function StarPoleProject() {
    return (
        <section id="starpole" className={styles.sectionFeatured}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>Projet phare</span>
                <h2 className={styles.sectionTitle}>StarPole : l'entraide de quartier</h2>
                <p className={styles.sectionSubtitle}>
                    Appli mobile, site web et console d'administration pour Abidjan :
                    alerter ses voisins, demander de l'aide, donner. Projet de l'ESATIC.
                </p>
            </div>

            <div className={`${styles.featuredCard} ${styles.reveal}`}>
                {/* Le site web dans une fenêtre de navigateur, l'appli dans un téléphone */}
                <div className={styles.featuredVisual}>
                    <a href={STARPOLE_URL} target="_blank" rel="noreferrer" className={styles.browserFrame} aria-label="Ouvrir le site StarPole">
                        <div className={styles.browserBar}>
                            <span className={styles.browserDots}><i /><i /><i /></span>
                            <span className={styles.browserUrl}>
                                <i className="fa-solid fa-lock"></i> starpole-web.web.app
                            </span>
                            <span className={styles.liveBadge}><span className={styles.statusDot}></span>En ligne</span>
                        </div>
                        <div className={styles.browserViewport}>
                            <img src={starpoleWeb} alt="Site web StarPole : connexion et inscription" className={styles.browserShot} />
                            <div className={styles.browserOverlay}>
                                <span>Ouvrir le site <i className="fa-solid fa-arrow-up-right-from-square"></i></span>
                            </div>
                        </div>
                    </a>
                    <div className={`${styles.showcasePhone} ${styles.featuredPhone}`}>
                        <span className={styles.phoneNotch} />
                        <img src={starpolePhone} alt="Appli StarPole : alertes à proximité" />
                    </div>
                </div>

                <div className={styles.featuredBody}>
                    <div className={styles.featuredIntro}>
                        <h3>Le problème</h3>
                        <RevealWords text="Quand quelqu'un fait un malaise ou a besoin d'un coup de main, l'information se perd dans des groupes WhatsApp débordés. StarPole prévient en un geste les voisins les plus proches, qui peuvent répondre « J'arrive »." />
                        <div className={styles.featuredActions}>
                            <a href={STARPOLE_URL} target="_blank" rel="noreferrer" className={styles.btnPrimary}>
                                Voir le site en direct
                                <svg className={styles.arrowIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </a>
                            <a href={`${GH}/Starpole`} target="_blank" rel="noreferrer" className={styles.btnSecondary}>
                                <i className="devicon-github-original"></i> Code source
                            </a>
                        </div>
                    </div>
                    <div className={styles.espacesGrid}>
                        {starpoleFeatures.map(({ icon, title, text }) => (
                            <div key={title} className={styles.espaceItem}>
                                <i className={icon}></i>
                                <div>
                                    <h4>{title}</h4>
                                    <p>{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.archWrapper}>
                    <span className={styles.archLabel}>Architecture</span>
                    <div className={styles.archFlow}>
                        {[
                            { label: "Flutter", sub: "Appli Android", icon: "devicon-flutter-plain", cls: styles.textFlutter },
                            { label: "React + Vite", sub: "Site web & console admin", icon: "devicon-react-original", cls: styles.textReact },
                            { label: "Firebase", sub: "Auth · Firestore · FCM", icon: "devicon-firebase-plain", cls: styles.textFirebase },
                            { label: "Mapbox", sub: "Cartes des alertes", icon: "fa-solid fa-map", cls: styles.textCss },
                        ].map(({ label, sub, icon, cls }, idx, arr) => (
                            <div key={label} className={styles.archStep}>
                                <div className={styles.archNode}>
                                    <i className={`${icon} ${cls}`}></i>
                                    <div>
                                        <strong>{label}</strong>
                                        <span>{sub}</span>
                                    </div>
                                </div>
                                {idx < arr.length - 1 && <span className={styles.archArrow}>→</span>}
                            </div>
                        ))}
                    </div>
                    <div className={styles.featuredStats}>
                        <div><strong>3</strong><span>interfaces : appli, site, admin</span></div>
                        <div><strong>6</strong><span>fonctionnalités clés</span></div>
                        <div><strong>Temps réel</strong><span>appli ⇄ site web</span></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Ce que je fais : lignes qui se remplissent au survol ────────────────────

const services = [
    {
        name: "Fullstack web",
        pitch: "Des applications web complètes, de l'interface à l'API.",
        text: "React, Vite, FastAPI, Spring Boot, PostgreSQL et Supabase. Authentification, rôles, tableaux de bord.",
        example: "GVIP · Gestion d'usine · ESATIC Évaluations",
    },
    {
        name: "Mobile",
        pitch: "Des applis Flutter utiles au quotidien.",
        text: "Flutter et Firebase, cartes interactives, géolocalisation et notifications push.",
        example: "Overflow · StarPole · Kiyotaka's Food",
    },
    {
        name: "Data",
        pitch: "Nettoyer, analyser et faire parler la donnée.",
        text: "SQL, PySpark, Pandas et DuckDB pour transformer des données brutes en indicateurs.",
        example: "Cacao & déforestation · Nettoyage de données",
    },
];

export function Services() {
    return (
        <section id="services" className={styles.sectionServices}>
            <div className={`${styles.sectionHeader} ${styles.sectionHeaderLeft}`}>
                <span className={styles.sectionTag}>Ce que je fais</span>
                <h2 className={styles.sectionTitle}>Trois terrains de jeu</h2>
            </div>
            <div className={styles.serviceList}>
                {services.map(({ name, pitch, text, example }, i) => (
                    <div key={name} className={styles.serviceRow} data-cursor>
                        <span className={styles.serviceNum}>{String(i + 1).padStart(2, "0")}</span>
                        <h3 className={styles.serviceName}>{name}</h3>
                        <div className={styles.serviceText}>
                            <strong>{pitch}</strong>
                            <p>{text}</p>
                            <span>{example}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
