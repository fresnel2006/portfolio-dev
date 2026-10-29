import { useState, useEffect } from "react";
import styles from "./Portfolio.module.css";
import photo from './assets/ma photo.jpg';
import Avatar from "./Avatar.jsx";
import gvipImg from "./assets/projets/gvip.png";
import starpoleImg from "./assets/projets/starpole.png";
import kiyotakaImg from "./assets/projets/kiyotaka.png";
import ecosmartImg from "./assets/projets/ecosmart.png";
import traducteurImg from "./assets/projets/traducteur.png";
import allonsbaraImg from "./assets/projets/allonsbara.png";
// ─── Données ────────────────────────────────────────────────────────────────

const orgLogos = {
    Coursera: (
        <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#0056D2" />
            <path d="M16 8a8 8 0 100 16A8 8 0 0016 8zm0 2.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 2a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" fill="#fff" />
        </svg>
    ),
    IBM: (
        <svg width="18" height="18" viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#1F70C1" /><text x="4" y="22" fontFamily="Arial" fontWeight="900" fontSize="14" fill="white">IBM</text></svg>
    ),
    Google: (
        <svg width="18" height="18" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#fff" /><path d="M28 16.18c0-.63-.06-1.25-.16-1.84H16v3.48h6.72a5.74 5.74 0 01-2.49 3.77v3.13h4.03C26.6 22.63 28 19.65 28 16.18z" fill="#4285F4" /><path d="M16 28c3.38 0 6.22-1.12 8.29-3.04l-4.03-3.13c-1.12.75-2.55 1.19-4.26 1.19-3.27 0-6.04-2.21-7.03-5.18H4.84v3.23A12.98 12.98 0 0016 28z" fill="#34A853" /><path d="M8.97 17.84A7.8 7.8 0 018.56 16c0-.64.11-1.26.41-1.84V10.9H4.84A13 13 0 004 16c0 2.09.5 4.07 1.38 5.84l4.59-4z" fill="#FBBC05" /><path d="M16 10.02c1.84 0 3.5.63 4.8 1.87l3.6-3.6A12.96 12.96 0 0016 4 12.98 12.98 0 004.84 10.9l4.13 3.26C9.97 11.2 12.73 10.02 16 10.02z" fill="#EA4335" /></svg>
    ),
    Microsoft: (
        <svg width="18" height="18" viewBox="0 0 32 32"><rect width="15" height="15" x="1" y="1" fill="#F25022" /><rect width="15" height="15" x="17" y="1" fill="#7FBA00" /><rect width="15" height="15" x="1" y="17" fill="#00A4EF" /><rect width="15" height="15" x="17" y="17" fill="#FFB900" /></svg>
    ),
    Meta: (
        <svg width="18" height="18" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#0866FF" /><path d="M7 20c0 2.2 1.1 3.5 2.9 3.5 1.4 0 2.2-.7 3.4-2.6l1.1-1.8.6 1c1.1 1.9 1.9 2.7 3.3 2.7 1.8 0 2.9-1.3 2.9-3.5 0-1.5-.7-2.7-2-3.6l-.7-.4.7-.5c1-.8 1.6-1.8 1.6-3 0-2.1-1.3-3.3-3.2-3.3-1.2 0-2 .5-3 2L16 12l-.6-1c-.9-1.5-1.8-2-3-2-1.9 0-3.2 1.2-3.2 3.3 0 1.2.6 2.2 1.6 3l.7.5-.7.4C9.5 17.2 7 18.3 7 20z" fill="white" /></svg>
    ),
    LearnQuest: (
        <svg width="18" height="18" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#FF6B35" /><text x="5" y="21" fontFamily="Arial" fontWeight="700" fontSize="11" fill="white">LQ</text></svg>
    ),
    Edureka: (
        <svg width="18" height="18" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#29A8E0" /><text x="4" y="21" fontFamily="Arial" fontWeight="700" fontSize="10" fill="white">edu</text></svg>
    ),
    EDUCBA: (
        <svg width="18" height="18" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#1E3A5F" /><text x="3" y="20" fontFamily="Arial" fontWeight="700" fontSize="9" fill="#F5A623">EDU</text></svg>
    ),
    SkillUp: (
        <svg width="18" height="18" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#6C3AC7" /><text x="3" y="21" fontFamily="Arial" fontWeight="700" fontSize="10" fill="white">SU</text></svg>
    ),
    Packt: (
        <svg width="18" height="18" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#EB7035" /><text x="3" y="21" fontFamily="Arial" fontWeight="700" fontSize="9" fill="white">PKT</text></svg>
    ),
    "Johns Hopkins": (
        <svg width="18" height="18" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#002D72" /><text x="5" y="21" fontFamily="Arial" fontWeight="700" fontSize="11" fill="#9E8A40">JH</text></svg>
    ),
    "Duke University": (
        <svg width="18" height="18" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#003087" /><text x="3" y="21" fontFamily="Arial" fontWeight="700" fontSize="10" fill="#C84B12">Duke</text></svg>
    ),
};

const defaultLogo = (
    <svg width="18" height="18" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#222" /><text x="5" y="21" fontFamily="Arial" fontWeight="700" fontSize="11" fill="#aaa">?</text></svg>
);

// ─── Certifications : DEV en premier, DATA & CLOUD après ────────────────────
const certifications = [
    // Flutter (Dev)
    { title: "Flutter et Dart : iOS, Android & Mobile", org: "IBM", date: "Nov 2025", category: "flutter", badge: "Mobile", url: "https://www.coursera.org/account/accomplishments/records/YSMCFTL77M6W" },
    { title: "Notifications et publication d'applications", org: "SkillUp", date: "Nov 2025", category: "flutter", badge: "Mobile", url: "https://www.coursera.org/account/accomplishments/records/7KOK2KN2BYX4" },
    { title: "Gestion avancée de l'UI et de l'état", org: "Packt", date: "Nov 2025", category: "flutter", badge: "Flutter", url: "https://www.coursera.org/account/accomplishments/records/QUF2Z3C3U23U" },
    // Web (Dev)
    { title: "Principes de conception UX", org: "Google", date: "Nov 2025", category: "web", badge: "UX/UI", url: "https://www.coursera.org/account/accomplishments/records/2KIF87JJK4S2" },
    { title: "Conception d'interfaces UI/UX", org: "IBM", date: "Nov 2025", category: "web", badge: "Design", url: "https://www.coursera.org/account/accomplishments/records/91FAMH0J96G7" },
    { title: "Introduction au développement web", org: "Microsoft", date: "Nov 2025", category: "web", badge: "Web", url: "https://www.coursera.org/account/accomplishments/records/EQ6K7AJ8RCYZ" },
    { title: "Introduction à FastAPI", org: "Duke University", date: "Nov 2025", category: "web", badge: "Backend", url: "https://www.coursera.org/account/accomplishments/records/6HZ5OE8E7OAV" },
    { title: "Introduction à CSS3", org: "Johns Hopkins", date: "Nov 2025", category: "web", badge: "Frontend", url: "https://www.coursera.org/account/accomplishments/records/3DK1ZKHBPO43" },
    // Java (Dev)
    { title: "Spring Framework pour Java", org: "SkillUp", date: "Nov 2025", category: "java", badge: "Backend", url: "https://www.coursera.org/account/accomplishments/records/C8ZAICLR4OP7" },
    { title: "Spring MVC, Spring Boot et REST", org: "LearnQuest", date: "Nov 2025", category: "java", badge: "Java", url: "https://www.coursera.org/account/accomplishments/records/57DQ2Y13GZEZ" },
    // SQL (Data)
    { title: "Joints SQL", org: "Coursera", date: "Apr 2026", category: "sql", badge: "SQL", url: "https://www.coursera.org/account/accomplishments/records/L3F7102BB09G" },
    { title: "Bases de données et SQL pour la science des données", org: "IBM", date: "Apr 2026", category: "sql", badge: "SQL", url: "https://www.coursera.org/account/accomplishments/records/O67Q78EDCJ6L" },
    { title: "Comprendre la syntaxe SQL de base", org: "Coursera", date: "Apr 2026", category: "sql", badge: "SQL", url: "https://www.coursera.org/account/accomplishments/records/ISGDE4U9RNQQ" },
    { title: "Analyse de données avec SQL", org: "Coursera", date: "Apr 2026", category: "sql", badge: "SQL", url: "https://www.coursera.org/account/accomplishments/records/MKKZXZJ9WFNT" },
    { title: "Fondations SQL", org: "Microsoft", date: "Nov 2025", category: "sql", badge: "SQL", url: "https://www.coursera.org/account/accomplishments/records/O37T7NBNHQG9" },
    // PySpark (Data)
    { title: "Analyse de données avec PySpark", org: "Coursera", date: "Apr 2026", category: "pyspark", badge: "PySpark", url: "https://www.coursera.org/account/accomplishments/records/Q8CG52OJ6KRJ" },
    { title: "Introduction à PySpark", org: "Edureka", date: "Apr 2026", category: "pyspark", badge: "PySpark", url: "https://www.coursera.org/account/accomplishments/records/MQREA033HWI3" },
    { title: "Prédiction de l'admission avec PySpark ML", org: "Coursera", date: "Feb 2026", category: "pyspark", badge: "ML", url: "https://www.coursera.org/account/accomplishments/records/Q4M9M3HVR5YU" },
    { title: "PySpark & Python : Guide pratique", org: "EDUCBA", date: "Feb 2026", category: "pyspark", badge: "PySpark", url: "https://www.coursera.org/account/accomplishments/records/9KUQA9QYH7FS" },
    { title: "Fondations PySpark", org: "Coursera", date: "Feb 2026", category: "pyspark", badge: "Data", url: "https://www.coursera.org/account/accomplishments/records/1G8YM43NJCAO" },
    // Cloud & Data Infra
    { title: "Fondements de la base de données Oracle", org: "LearnQuest", date: "Apr 2026", category: "cloud", badge: "Database", url: "https://www.coursera.org/account/accomplishments/records/SIF9HZJYXQJK" },
    { title: "Microsoft Azure SQL", org: "Microsoft", date: "Apr 2026", category: "cloud", badge: "Cloud", url: "https://www.coursera.org/account/accomplishments/records/7GJA7ZOMXM0I" },
    { title: "Introduction au génie logiciel", org: "IBM", date: "Nov 2025", category: "cloud", badge: "Software", url: "https://www.coursera.org/account/accomplishments/records/NNGWRYNINLR3" },
    { title: "Créez votre premier programme Python", org: "Coursera", date: "Nov 2025", category: "cloud", badge: "Python", url: "https://www.coursera.org/account/accomplishments/records/L080KBTRNY2X" },
    { title: "Introduction au développement Android", org: "Meta", date: "Nov 2025", category: "cloud", badge: "Mobile", url: "https://www.coursera.org/account/accomplishments/records/7UB2GXHKMNEA" },
];

const filterTabs = [
    { label: "Tout (25)", value: "all" },
    { label: "Flutter (3)", value: "flutter" },
    { label: "Développement Web (5)", value: "web" },
    { label: "Java (2)", value: "java" },
    { label: "SQL (5)", value: "sql" },
    { label: "PySpark (5)", value: "pyspark" },
    { label: "Cloud (5)", value: "cloud" },
];

// ─── SVG inline réutilisables ────────────────────────────────────────────────

const PySparkSvg = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.5 2 6 4 6 4S3 3.5 2 6c1 0 2 .5 2.5 1.5C3.5 8.5 3 10 3 11c0 3.5 2.5 5.5 5 6.5L6 21h12l-2-3.5c2.5-1 5-3 5-6.5 0-1-.5-2.5-1.5-3.5C20 6.5 21 6 22 6c-1-2.5-4-2-4-2S15.5 2 12 2z" fill="#E25A1B" />
        <circle cx="9" cy="11" r="1.5" fill="white" opacity="0.9" />
        <circle cx="15" cy="11" r="1.5" fill="white" opacity="0.9" />
    </svg>
);

// Logo Pandas — logo officiel chargé directement depuis le SVG source de devicon
const PandasSvg = ({ className }) => (
    <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.18.0/icons/pandas/pandas-original.svg"
        alt="Pandas"
        className={className}
    />
);

// Devicon n'a pas de "supabase-plain" (icône carrée seule), uniquement un wordmark.
// On utilise donc un SVG inline (logo éclair Supabase) pour garantir l'affichage.
const SupabaseSvg = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 2 4 14.5h7.2L10.5 22 20 9.5h-7.2L13.5 2z" fill="#3ECF8E" />
    </svg>
);

// ─── Composant Navbar ────────────────────────────────────────────────────────

function Navbar() {
    return (
        <header className={styles.navbar}>
            <div className={styles.navContainer}>
                <div className={styles.navLogo}>
                    <div className={styles.avatarPlaceholder}>TA</div>
                    <span className={styles.logoText}>Traore Ange Fresnel</span>
                </div>
                <nav className={styles.navLinks}>
                    <a href="#about" className={styles.navLinkHidden}>À propos</a>
                    <a href="#skills" className={styles.navLinkHidden}>Compétences</a>
                    <a href="#featured" className={styles.navLinkHidden}>Projets</a>
                    <a href="#certifications" className={styles.navLinkHidden}>Certifications</a>
                    <a href="#experience" className={styles.navLinkHidden}>Expérience</a>
                    <a href="https://github.com/fresnel2006" target="_blank" rel="noreferrer" className={styles.btnGithub}>
                        <i className="devicon-github-original"></i> GitHub
                    </a>
                    <a href="#contact" className={styles.btnPrimarySm}>Me contacter</a>
                </nav>
            </div>
        </header>
    );
}

// ─── Composant Hero ──────────────────────────────────────────────────────────

function Hero() {
    // Chaque icône a maintenant un label utilisé pour l'info-bulle au survol
    const devIcons = [
        { label: "Flutter", cls: styles.textFlutter, icon: "devicon-flutter-plain" },
        { label: "React", cls: styles.textReact, icon: "devicon-react-original" },
        { label: "HTML5", cls: styles.textHtml, icon: "devicon-html5-plain" },
        { label: "CSS3", cls: styles.textCss, icon: "devicon-css3-plain" },
        { label: "Spring Boot", cls: styles.textSpring, icon: "devicon-spring-plain" },
        { label: "FastAPI", cls: styles.textFastapi, icon: "devicon-fastapi-plain" },
        { label: "Java", cls: styles.textJava, icon: "devicon-java-plain" },
        { label: "Laravel", cls: styles.textLaravel, icon: "devicon-laravel-original" },
        { label: "PHP", cls: styles.textPhp, icon: "devicon-php-plain" },
        { label: "Git", cls: styles.textGit, icon: "devicon-git-plain" },
    ];

    const dataIcons = [
        { label: "PostgreSQL", cls: styles.textSql, icon: "devicon-postgresql-plain" },
        { label: "Firebase", cls: styles.textFirebase, icon: "devicon-firebase-plain" },
        { label: "Python", cls: styles.textPython, icon: "devicon-python-plain" },
    ];

    return (
        <section id="about" className={styles.heroSection}>
            <div className={styles.heroContainer}>
                <div className={styles.heroInfo}>
                    <div className={styles.heroBadges}>
                        <div className={styles.badgeStatus}>
                            <span className={styles.statusDot}></span>
                            Disponible pour stages & projets
                        </div>
                        <a href="#featured" className={styles.badgeNew}>
                            <span>Nouveau</span> GVIP est en ligne →
                        </a>
                    </div>
                    <h1 className={styles.heroTitle}>Développeur Fullstack</h1>
                    <p className={styles.heroDescription}>
                        Passionné par le développement, je suis en formation en informatique et je
                        construis des applications web et mobiles complètes des interfaces
                        soignées avec React et Flutter jusqu'aux API robustes avec Spring Boot
                        et FastAPI.<br /><br />
                        Je connecte ces applications à des bases de données et services cloud
                        (Firebase, Supabase, PostgreSQL) pour livrer des produits fonctionnels
                        de bout en bout, et j'aime aussi structurer et exploiter la donnée
                        quand un projet le demande (SQL, PySpark, Pandas).<br /><br />
                        Curieux, rigoureux et motivé, je continue d'apprendre chaque jour
                        pour maîtriser web, mobile et backend, et construire des solutions
                        qui servent vraiment les gens.
                    </p>
                    <div className={styles.heroActions}>
                        <a href="#featured" className={styles.btnSecondary}>Voir mes projets</a>
                        <a href="https://github.com/fresnel2006" target="_blank" rel="noreferrer" className={styles.btnPrimary}>
                            Voir GitHub
                            <svg className={styles.arrowIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </a>
                    </div>
                    {/* Tech shelf : DEV en premier, DATA & CLOUD après — survol = info-bulle avec le nom */}
                    <div className={styles.miniTechShelf}>
                        {devIcons.map(({ cls, icon, label }) => (
                            <div key={icon} className={`${styles.shelfIcon} ${cls}`} data-tooltip={label} title={label}>
                                <i className={icon}></i>
                            </div>
                        ))}
                        <div className={`${styles.shelfIcon} ${styles.textPyspark}`} data-tooltip="PySpark" title="PySpark">
                            <PySparkSvg className={styles.shelfSvgIcon} />
                        </div>
                        <div className={`${styles.shelfIcon} ${styles.textPandas}`} data-tooltip="Pandas" title="Pandas">
                            <PandasSvg className={styles.shelfSvgIcon} />
                        </div>
                        <div className={`${styles.shelfIcon} ${styles.textSupabase}`} data-tooltip="Supabase" title="Supabase">
                            <SupabaseSvg className={styles.shelfSvgIcon} />
                        </div>
                        {dataIcons.map(({ cls, icon, label }) => (
                            <div key={icon} className={`${styles.shelfIcon} ${cls}`} data-tooltip={label} title={label}>
                                <i className={icon}></i>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.heroImageWrapper}>
                    {/* Portrait pop art : la vraie photo apparaît au survol */}
                    <Avatar photo={photo} />
                    <span className={styles.flipHint}>
                        <i className="fa-solid fa-wand-magic-sparkles"></i>
                        Passe la souris pour voir la vraie photo
                    </span>
                </div>
            </div>
        </section>
    );
}

// ─── Composant Skills ────────────────────────────────────────────────────────

function Skills() {
    // ── Bloc DÉVELOPPEMENT ──
    const devSkills = [
        { label: "Flutter", iconCls: "devicon-flutter-plain", colorCls: styles.textFlutter, level: "80%" },
        { label: "HTML5", iconCls: "devicon-html5-plain", colorCls: styles.textHtml, level: "70%" },
        { label: "CSS3", iconCls: "devicon-css3-plain", colorCls: styles.textCss, level: "70%" },
        { label: "React", iconCls: "devicon-react-original", colorCls: styles.textReact, level: "60%" },
        { label: "Spring Boot", iconCls: "devicon-spring-plain", colorCls: styles.textSpring, level: "60%" },
        { label: "FastAPI", iconCls: "devicon-fastapi-plain", colorCls: styles.textFastapi, level: "30%" },
    ];
    const devTools = [
        { label: "Laravel", iconCls: "devicon-laravel-original", colorCls: styles.textLaravel },
        { label: "JEE", iconCls: "devicon-java-plain", colorCls: styles.textJava },
        { label: "PHP", iconCls: "devicon-php-plain", colorCls: styles.textPhp },
    ];

    // ── Bloc DATA & CLOUD ──
    const dataSkills = [
        { label: "SQL", iconCls: "devicon-postgresql-plain", colorCls: styles.textSql, level: "70%" },
    ];
    const dataTools = [
        { label: "Firebase", iconCls: "devicon-firebase-plain", colorCls: styles.textFirebase },
        { label: "Git", iconCls: "devicon-git-plain", colorCls: styles.textGit },
    ];

    return (
        <section id="skills" className={styles.sectionTech}>
            <div className={`${styles.sectionHeader}`}>
                <span className={styles.sectionTag}>Expertise</span>
                <h2 className={styles.sectionTitle}>Compétences & Technologies</h2>
                <p className={styles.sectionSubtitle}>Niveau de maîtrise théorique et pratique basé sur mes projets.</p>
            </div>
            <div className={styles.skillsWrapper}>

                {/* ═══ BLOC DÉVELOPPEMENT ═══ */}
                <div className={styles.skillsCategory}>
                    <h3>Développement</h3>
                    <div className={styles.badgeGrid}>
                        {devSkills.map(({ label, iconCls, colorCls, level }) => (
                            <div key={label} className={styles.techBadgePro}>
                                <div className={styles.badgeMain}>
                                    <i className={`${iconCls} ${colorCls}`}></i>
                                    {label}
                                </div>
                                <span className={`${styles.techLevel} ${colorCls}`}>{level}</span>
                            </div>
                        ))}
                    </div>
                    <div className={`${styles.badgeGridSimple} ${styles.mt12}`}>
                        {devTools.map(({ label, iconCls, colorCls }) => (
                            <div key={label} className={styles.techBadgeSimple}>
                                <i className={`${iconCls} ${colorCls}`}></i>
                                {label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ═══ BLOC DATA & CLOUD ═══ */}
                <div className={`${styles.skillsCategory} ${styles.mt12}`}>
                    <h3>Data & Cloud</h3>
                    <div className={styles.badgeGrid}>
                        <div className={styles.techBadgePro}>
                            <div className={styles.badgeMain}>
                                <PySparkSvg className={styles.techSvgIcon} />
                                PySpark
                            </div>
                            <span className={`${styles.techLevel} ${styles.textPyspark}`}>70%</span>
                        </div>
                        <div className={styles.techBadgePro}>
                            <div className={styles.badgeMain}>
                                <PandasSvg className={styles.techSvgIcon} />
                                Pandas
                            </div>
                            <span className={`${styles.techLevel} ${styles.textPandas}`}>70%</span>
                        </div>
                        {dataSkills.map(({ label, iconCls, colorCls, level }) => (
                            <div key={label} className={styles.techBadgePro}>
                                <div className={styles.badgeMain}>
                                    <i className={`${iconCls} ${colorCls}`}></i>
                                    {label}
                                </div>
                                <span className={`${styles.techLevel} ${colorCls}`}>{level}</span>
                            </div>
                        ))}
                    </div>
                    <div className={`${styles.badgeGridSimple} ${styles.mt12}`}>
                        <div className={styles.techBadgeSimple}>
                            <SupabaseSvg className={styles.techSvgIcon} />
                            Supabase
                        </div>
                        {dataTools.map(({ label, iconCls, colorCls }) => (
                            <div key={label} className={styles.techBadgeSimple}>
                                <i className={`${iconCls} ${colorCls}`}></i>
                                {label}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

// ─── Composant FeaturedProject (projet récent : GVIP) ────────────────────────

const GVIP_URL = "https://govip-web-site.vercel.app";
const GVIP_REPO = "https://github.com/fresnel2006/govip-web-site";

function FeaturedProject() {
    const espaces = [
        { icon: "fa-solid fa-calendar-check", title: "Espace client", text: "Réservation d'un créneau de dépôt ou de retrait, suivi et modification du rendez-vous." },
        { icon: "fa-solid fa-truck-fast", title: "Espace partenaire", text: "Les compagnies de transport gèrent leurs rendez-vous et leur activité." },
        { icon: "fa-solid fa-user-shield", title: "Espace administrateur", text: "Gestion des compagnies partenaires et suivi global de l'activité." },
        { icon: "fa-solid fa-chart-line", title: "Tableau des risques", text: "Dashboard alimenté par une API FastAPI externe pour anticiper les incidents." },
    ];

    const architecture = [
        { label: "React + Vite", sub: "Interface", icon: "devicon-react-original", cls: styles.textReact },
        { label: "Firebase", sub: "Auth · Realtime DB · Storage", icon: "devicon-firebase-plain", cls: styles.textFirebase },
        { label: "Cloud Functions", sub: "E-mails de notification", icon: "fa-solid fa-envelope", cls: styles.textGit },
        { label: "FastAPI", sub: "Analyse des risques", icon: "devicon-fastapi-plain", cls: styles.textFastapi },
    ];

    return (
        <section id="featured" className={styles.sectionFeatured}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>Projet récent</span>
                <h2 className={styles.sectionTitle}>GVIP : rendez-vous colis Côte d'Ivoire ⇄ France</h2>
                <p className={styles.sectionSubtitle}>
                    Une plateforme web complète, en production, qui organise le dépôt et la
                    récupération de colis entre Abidjan et la France.
                </p>
            </div>

            <div className={`${styles.featuredCard} ${styles.reveal}`}>
                {/* Aperçu en direct du site dans une fenêtre de navigateur */}
                <a href={GVIP_URL} target="_blank" rel="noreferrer" className={styles.browserFrame} aria-label="Ouvrir GVIP en direct">
                    <div className={styles.browserBar}>
                        <span className={styles.browserDots}><i /><i /><i /></span>
                        <span className={styles.browserUrl}>
                            <i className="fa-solid fa-lock"></i> govip-web-site.vercel.app
                        </span>
                        <span className={styles.liveBadge}><span className={styles.statusDot}></span>En ligne</span>
                    </div>
                    <div className={styles.browserViewport} style={{ backgroundImage: `url(${gvipImg})` }}>
                        <iframe
                            src={GVIP_URL}
                            title="Aperçu de GVIP"
                            loading="lazy"
                            tabIndex={-1}
                            sandbox="allow-scripts allow-same-origin"
                            referrerPolicy="no-referrer"
                        />
                        <div className={styles.browserOverlay}>
                            <span>Ouvrir le site <i className="fa-solid fa-arrow-up-right-from-square"></i></span>
                        </div>
                    </div>
                </a>

                <div className={styles.featuredBody}>
                    <div className={styles.featuredIntro}>
                        <h3>Le problème</h3>
                        <p>
                            Envoyer un colis entre la Côte d'Ivoire et la France, c'est souvent des
                            files d'attente, des appels et des messages WhatsApp pour savoir quand
                            passer. GVIP remplace tout ça par une prise de rendez-vous en ligne,
                            avec des notifications par e-mail à chaque étape.
                        </p>
                        <div className={styles.featuredActions}>
                            <a href={GVIP_URL} target="_blank" rel="noreferrer" className={styles.btnPrimary}>
                                Voir le site en direct
                                <svg className={styles.arrowIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </a>
                            <a href={GVIP_REPO} target="_blank" rel="noreferrer" className={styles.btnSecondary}>
                                <i className="devicon-github-original"></i> Code source
                            </a>
                        </div>
                    </div>

                    <div className={styles.espacesGrid}>
                        {espaces.map(({ icon, title, text }) => (
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

                {/* Architecture technique */}
                <div className={styles.archWrapper}>
                    <span className={styles.archLabel}>Architecture</span>
                    <div className={styles.archFlow}>
                        {architecture.map(({ label, sub, icon, cls }, idx) => (
                            <div key={label} className={styles.archStep}>
                                <div className={styles.archNode}>
                                    <i className={`${icon} ${cls}`}></i>
                                    <div>
                                        <strong>{label}</strong>
                                        <span>{sub}</span>
                                    </div>
                                </div>
                                {idx < architecture.length - 1 && <span className={styles.archArrow}>→</span>}
                            </div>
                        ))}
                    </div>
                    <div className={styles.featuredStats}>
                        <div><strong>4</strong><span>espaces utilisateurs</span></div>
                        <div><strong>2</strong><span>pays reliés</span></div>
                        <div><strong>100%</strong><span>déployé sur Vercel</span></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Composant Projects ──────────────────────────────────────────────────────

const GH = "https://github.com/fresnel2006";

const projects = [
    {
        title: "Gestion de production industrielle",
        category: "web",
        badge: "Fullstack",
        text: "Application de gestion d'usine : ateliers, lignes et lots de production, opérateurs et équipes, machines, maintenances, incidents, stock de pièces et fournisseurs. Accès par rôles et tableau de bord.",
        tags: ["React", "FastAPI", "SQLAlchemy", "PostgreSQL"],
        links: [
            { label: "Frontend", url: `${GH}/usine_frontend` },
            { label: "Backend", url: `${GH}/usine_backend` },
        ],
        icon: "fa-solid fa-industry",
        visual: styles.visualUsine,
    },
    {
        title: "StarPole : entraide de quartier",
        category: "mobile",
        badge: "Projet ESATIC",
        text: "Application mobile pour Abidjan : alertes d'urgence aux voisins, carte, messagerie, appels et notation des aidants. Connexion par code e-mail, notifications push via une API FastAPI et console d'administration web.",
        tags: ["Flutter", "Firebase", "FastAPI", "React"],
        links: [
            { label: "Appli", url: `${GH}/Starpole` },
            { label: "API", url: `${GH}/starpole_backend` },
            { label: "Console admin", url: `${GH}/starpole_frontend` },
        ],
        img: starpoleImg,
        bg: "#fdf3f3",
    },
    {
        title: "Kiyotaka's Food",
        category: "mobile",
        badge: "Écosystème complet",
        text: "Commande de repas pour les étudiants de mon école, sans file d'attente. Une appli étudiants, un gestionnaire de commandes en temps réel pour la cuisine et une API FastAPI.",
        tags: ["Flutter", "Supabase", "FastAPI", "MySQL"],
        links: [
            { label: "Appli", url: `${GH}/kiyotaka-s-food` },
            { label: "Gestionnaire", url: `${GH}/gestionnaire-des-commandes-kiyotaka-s-food` },
            { label: "API", url: `${GH}/kiyotaka_s_food_api` },
        ],
        img: kiyotakaImg,
        cover: true,
        bg: "#ffffff",
    },
    {
        title: "EcoSmart : gestion des déchets",
        category: "mobile",
        badge: "Hackathon 2026",
        text: "Les citoyens d'Abidjan signalent les déchets sur une carte Mapbox, avec des zones classées par urgence et des badges. Une seconde appli guide les conducteurs de collecte.",
        tags: ["Flutter", "Mapbox", "FastAPI", "MySQL"],
        links: [
            { label: "Citoyens", url: `${GH}/gestion_dechets_utilisateurs` },
            { label: "Conducteurs", url: `${GH}/gestion_dechets_conducteur` },
            { label: "API", url: `${GH}/api_gestion_dechets` },
        ],
        img: ecosmartImg,
        cover: true,
        bg: "#3f8f3c",
    },
    {
        title: "Traducteur Français → Baoulé",
        category: "mobile",
        badge: "Langue ivoirienne",
        text: "Application mobile qui traduit des mots et expressions du français vers le baoulé, une langue parlée en Côte d'Ivoire.",
        tags: ["Flutter", "Supabase", "Dart"],
        links: [{ label: "GitHub", url: `${GH}/traducteur-de-langue` }],
        img: traducteurImg,
        bg: "#eef2fb",
    },
    {
        title: "AllonsBara : trouver un répétiteur",
        category: "mobile",
        badge: "Géolocalisation",
        text: "Mise en relation avec des répétiteurs près de chez soi : profils, recherche, carte Mapbox avec géolocalisation et messagerie.",
        tags: ["Flutter", "Mapbox", "Geolocator"],
        links: [{ label: "GitHub", url: `${GH}/AllonsBara` }],
        img: allonsbaraImg,
        bg: "#f4f7fa",
    },
    {
        title: "Cacao ivoirien & déforestation",
        category: "data",
        badge: "Analyse",
        text: "Analyse du dataset Trase (38 Mo) sur les exportations de cacao : départements, coopératives, exportateurs et déforestation liée. Requêtes SQL directement sur le CSV avec DuckDB.",
        tags: ["Python", "DuckDB", "Pandas", "SQL"],
        links: [{ label: "GitHub", url: `${GH}/analyse-cacao-cote-divoire` }],
        icon: "fa-solid fa-seedling",
        visual: styles.visualCacao,
    },
    {
        title: "Nettoyage de données réelles",
        category: "data",
        badge: "Data cleaning",
        text: "Série de pipelines de nettoyage : ventes Nike et StockX, dépenses finance et données RH, consoles de jeux vidéo. Normalisation, dédoublonnage, typage et requêtes SQL.",
        tags: ["Pandas", "PySpark", "DuckDB"],
        links: [
            { label: "Finance & RH", url: `${GH}/nettoyage-finance-rh` },
            { label: "Nike", url: `${GH}/nettoyage-ventes-nike` },
            { label: "StockX", url: `${GH}/nettoyage-donnees-stockx` },
        ],
        icon: "fa-solid fa-broom",
        visual: styles.visualData,
    },
];

const projectTabs = [
    { label: "Tout", value: "all" },
    { label: "Web", value: "web" },
    { label: "Mobile", value: "mobile" },
    { label: "Data", value: "data" },
];

function Projects() {
    const [filter, setFilter] = useState("all");
    const shown = filter === "all" ? projects : projects.filter((p) => p.category === filter);

    return (
        <section id="projects" className={styles.sectionProjects}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>Portfolio</span>
                <h2 className={styles.sectionTitle}>Autres projets</h2>
                <p className={styles.sectionSubtitle}>Applications web, mobiles et projets data, tous disponibles sur GitHub.</p>
            </div>

            <div className={styles.certFilters}>
                {projectTabs.map(({ label, value }) => {
                    const count = value === "all" ? projects.length : projects.filter((p) => p.category === value).length;
                    return (
                        <button
                            key={value}
                            className={`${styles.certFilterBtn} ${filter === value ? styles.certFilterBtnActive : ""}`}
                            onClick={() => setFilter(value)}
                        >
                            {label} ({count})
                        </button>
                    );
                })}
            </div>

            <div className={styles.projectsGrid}>
                {shown.map(({ title, badge, text, tags, links, img, cover, bg, icon, visual }, idx) => (
                    <article key={title} className={`${styles.projectCard} ${styles.projectAppear}`} style={{ animationDelay: `${idx * 0.06}s` }}>
                        {img ? (
                            <div className={styles.projectImage} style={{ backgroundColor: bg }}>
                                <img src={img} alt={title} className={cover ? styles.imgCover : styles.imgContain} />
                            </div>
                        ) : (
                            <div className={`${styles.projectVisual} ${visual}`}>
                                <i className={icon}></i>
                            </div>
                        )}
                        <div className={styles.projectContent}>
                            <span className={styles.projectBadge}>{badge}</span>
                            <h3>{title}</h3>
                            <p>{text}</p>
                            <div className={styles.projectTags}>{tags.map((t) => <span key={t}>{t}</span>)}</div>
                            <div className={styles.projectLinks}>
                                {links.map(({ label, url }) => (
                                    <a key={url} href={url} target="_blank" rel="noreferrer">
                                        <i className="devicon-github-original"></i> {label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

// ─── Composant Certifications ────────────────────────────────────────────────

function Certifications() {
    const [activeFilter, setActiveFilter] = useState("all");

    const filtered = activeFilter === "all"
        ? certifications
        : certifications.filter((c) => c.category === activeFilter);

    return (
        <section id="certifications" className={styles.sectionCertifications}>

            <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>Validations</span>
                <h2 className={styles.sectionTitle}>Certifications Professionnelles</h2>
                <p className={styles.sectionSubtitle}>25 certifications obtenues en Data Engineering, Web, Mobile & Cloud</p>
            </div>

            <div className={styles.certFilters}>
                {filterTabs.map(({ label, value }) => (
                    <button
                        key={value}
                        className={`${styles.certFilterBtn} ${activeFilter === value ? styles.certFilterBtnActive : ""}`}
                        onClick={() => setActiveFilter(value)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className={styles.certsGrid}>
                {filtered.map((cert, idx) => (
                    <a
                        key={idx}
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.certItem}
                        style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                        <div className={styles.certItemHeader}>
                            <div className={styles.certOrg}>
                                <span className={styles.certOrgLogo}>{orgLogos[cert.org] || defaultLogo}</span>
                                {cert.org}
                            </div>
                            <div className={styles.certDate}>{cert.date}</div>
                        </div>
                        <h3 className={styles.certTitle}>{cert.title}</h3>
                        <div className={styles.certItemFooter}>
                            <div className={styles.certBadgeItem}>{cert.badge}</div>
                            <span className={styles.certVerifyLink}>
                                Vérifier{" "}
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M7 17L17 7M7 7h10v10" />
                                </svg>
                            </span>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}

// ─── Composant Experience ────────────────────────────────────────────────────

function Experience() {
    return (
        <section id="experience" className={styles.sectionExperience}>
            <div className={styles.gridTwoColumns}>
                <div>
                    <div className={`${styles.sectionHeader} ${styles.sectionHeaderLeft}`}>
                        <span className={styles.sectionTag}>Parcours</span>
                        <h2 className={styles.sectionTitle}>Expérience</h2>
                    </div>
                    <div className={styles.timeline}>
                        <div className={styles.timelineItem}>
                            <div className={styles.timePeriod}>2026 - Présent</div>
                            <div className={styles.timelineContent}>
                                <h3>Développeur Fullstack & Data</h3>
                                <p>Conception et livraison de modules logiciels répondant à des besoins métiers réels. Intégration de pipelines de données et interfaces adaptées.</p>
                            </div>
                        </div>
                        <div className={styles.timelineItem}>
                            <div className={styles.timePeriod}>2025 - 2026</div>
                            <div className={styles.timelineContent}>
                                <h3>Créateur Indépendant</h3>
                                <p>Déploiement d'applications mobiles (Flutter) et d'architectures backend (Spring Boot, Frameworks Web) disponibles sur GitHub.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className={`${styles.sectionHeader} ${styles.sectionHeaderLeft}`}>
                        <span className={styles.sectionTag}>Réalisations</span>
                        <h2 className={styles.sectionTitle}>Certifications</h2>
                    </div>
                    <div className={styles.certsSummary}>
                        <div className={styles.certSummaryCard}>
                            <div className={styles.certCount}>8</div>
                            <div className={styles.certLabel}>Web & Mobile</div>
                        </div>
                        <div className={styles.certSummaryCard}>
                            <div className={styles.certCount}>10</div>
                            <div className={styles.certLabel}>Ingénierie des données</div>
                        </div>
                        <div className={styles.certSummaryCard}>
                            <div className={styles.certCount}>7</div>
                            <div className={styles.certLabel}>Cloud & Infrastructure</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Composant Footer ────────────────────────────────────────────────────────

function Footer() {
    return (
        <footer id="contact" className={styles.mainFooter}>
            <div className={styles.footerContent}>
                <h2>Construisons quelque chose d'exceptionnel.</h2>
                <p>Ouvert aux collaborations techniques, opportunités de stage et projets stimulants.</p>
                <a href="mailto:traoreangefresnel@gmail.com" className={styles.emailLink}>Me contacter</a>
            </div>
            <div className={styles.footerBottom}>
                <p>© 2026 Traore Ange Fresnel. Tous droits réservés.</p>
                <div className={styles.footerSocials}>
                    <a href="https://github.com/fresnel2006" target="_blank" rel="noreferrer">GitHub</a>
                    <a href="https://linkedin.com/in/traore-ange-fresnel-a8324535b" target="_blank" rel="noreferrer">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
}

// ─── Composant racine ────────────────────────────────────────────────────────

export default function Portfolio() {
    // Les polices et icônes sont chargées dans index.html (versions figées + SRI)
    useEffect(() => {
        // Styles globaux body/html
        document.body.style.fontFamily = "'Inter', sans-serif";
        document.body.style.backgroundColor = "#0b0b0b";
        document.body.style.color = "#a3a3a3";
        document.body.style.lineHeight = "1.6";
        document.documentElement.style.scrollBehavior = "smooth";

        // Apparition des cartes au défilement
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.revealVisible);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        document.querySelectorAll(`.${styles.reveal}`).forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Navbar />
            <Hero />
            <FeaturedProject />
            <Skills />
            <Projects />
            <Certifications />
            <Experience />
            <Footer />
        </>
    );
}