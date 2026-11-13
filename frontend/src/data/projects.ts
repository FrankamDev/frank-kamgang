import type { Project } from "../types/project";

export const projects: Project[] = [
    {
        id: 1,
        title: "Obryl Platform",
        slug: "obryl-platform",

        category: "plateformes",
        categoryLabel: "PLATEFORME SAAS",

        status: "Client",

        shortDescription:
            "Écosystème digital tout-en-un pour réservations, hébergements, véhicules et circuits touristiques.",

        description:
            "Écosystème Digital & Marketplace Multi-Services",

        presentation:
            "Architecture moderne complète combinant marketplace de locations d'hébergements, gestion de flottes de véhicules et circuits touristiques sécurisés par paiements séquestrés avec GeniusPay.",

        architecture: {
            frontend: [
                "Next.js",
                "Vue.js",
                "TypeScript",
                "Tailwind CSS",
            ],

            backend: [
                "Laravel",
                "PostgreSQL",
                "Docker",
            ],
        },

        modules: [
            {
                title: "Réservations d'Hébergements",
                description:
                    "Gestion dynamique des disponibilités, calendrier interactif, tarification saisonnière et messagerie intégrée.",
            },
            {
                title: "Location de Véhicules & Chauffeurs",
                description:
                    "Flotte géolocalisée, réservation avec ou sans chauffeur, vérification des permis et caution automatisée.",
            },
        ],

        modules: [
            {
                title: "Réservations d'Hébergements",
                description:
                    "Gestion dynamique des disponibilités, calendrier interactif, tarification saisonnière et messagerie intégrée hôte-voyageur.",
            },

            {
                title: "Location de Véhicules & Chauffeurs",
                description:
                    "Flotte géolocalisée, réservation avec ou sans chauffeur, vérification des permis et caution automatisée.",
            },

            {
                title: "Circuits Touristiques & Guides",
                description:
                    "Réservation d'expériences guidées, itinéraires cartographiques et gestion des créneaux horaires.",
            },

            {
                title: "Paiements Sécurisés & Séquestre GeniusPay",
                description:
                    "Paiement en ligne par cartes bancaires et Mobile Money avec déblocage des fonds à la validation du séjour.",
            },
        ],

        technologies: [
            "Nuxt",
            "Vue.js",
            "TypeScript",
            "Tailwind CSS",
            "Laravel",
            "PHP",
            "PostgreSQL",
            "Docker",
        ],

        demoUrl: "#",
        featured: true,
    },

    {
        id: 2,
        title: "ESCa Gestion",
        slug: "esca-gestion",

        category: "web",
        categoryLabel: "ERP ACADÉMIQUE",

        status: "Privé (Interne)",

        shortDescription:
            "Système intégré de gestion académique, pédagogique et financière pour l'école.",

        description:
            "Système Intégré de Gestion Académique, Pédagogique & Financière",

        presentation:
            "Plateforme de gestion destinée à centraliser les opérations académiques, pédagogiques et administratives d'un établissement.",

        architecture: {
            frontend: [
                "Livewire",
                "Tailwind CSS",
                "Vite",
            ],

            backend: [
                "Laravel",
                "PHP",
                "PostgreSQL",
            ],
        },

        modules: [
            {
                title: "Gestion des étudiants",
                description:
                    "Gestion des dossiers étudiants et des informations académiques.",
            },

            {
                title: "Gestion pédagogique",
                description:
                    "Organisation des formations, matières et informations pédagogiques.",
            },

            {
                title: "Gestion administrative",
                description:
                    "Centralisation des opérations administratives et financières.",
            },
        ],

        technologies: [
            "Laravel",
            "Livewire",
            "Tailwind CSS",
            "PHP",
            "PostgreSQL",
            "Vite",
        ],

        demoUrl: "#",
        featured: true,
    },

    {
        id: 3,
        title: "Obryl App Mobile",
        slug: "obryl-app-mobile",

        category: "mobile",
        categoryLabel: "MOBILE IOS/ANDROID",

        status: "Client",

        shortDescription:
            "Application mobile native multi-plateforme iOS & Android pour voyageurs et hôtes.",

        description:
            "Application mobile native multi-plateforme iOS & Android",

        presentation:
            "Application mobile pensée pour permettre aux voyageurs et aux hôtes d'accéder aux fonctionnalités principales de l'écosystème Obryl depuis leurs appareils mobiles.",

        architecture: {
            frontend: [
                "Flutter",
                "Dart",
            ],

            backend: [
                "Laravel",
            ],
        },

        modules: [
            {
                title: "Réservation",
                description:
                    "Consultation et réservation des services depuis l'application mobile.",
            },

            {
                title: "Géolocalisation",
                description:
                    "Localisation des services et fonctionnalités liées aux déplacements.",
            },

            {
                title: "Paiements",
                description:
                    "Intégration des mécanismes de paiement de la plateforme.",
            },
        ],

        technologies: [
            "Flutter",
            "Dart",
            "Laravel",
        ],

        demoUrl: "#",
        featured: true,
    },
];