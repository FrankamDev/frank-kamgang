import { useState } from "react";
import { motion } from "framer-motion";

import {
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaUser,
  FaExternalLinkAlt,
  
} from "react-icons/fa";

import {
  HiSparkles,
  HiOutlineClock,
  HiCheckCircle,
} from "react-icons/hi";
import Navbar from "../components/Navbar";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const socialLinks = [
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    href: "https://linkedin.com",
    description: "Professionnel & réseau",
  },
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com",
    description: "Mes projets & code",
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const whatsappMessage = `
Bonjour Frank,

Nom : ${form.name}
Email : ${form.email}
Sujet : ${form.subject}

${form.message}
    `.trim();

    const whatsappUrl = `https://wa.me/237690461830?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappUrl, "_blank");

    setSent(true);

    setTimeout(() => {
      setSent(false);
    }, 5000);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-4 pb-24 pt-28 text-slate-900 dark:bg-[#080d17] dark:text-white sm:px-6 lg:px-8">

      {/* =========================
          BACKGROUND
      ========================= */}
<Navbar/>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, 50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]"
        />

        <motion.div
          animate={{
            x: [0, -70, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-150px] top-40 h-96 w-96 rounded-full bg-violet-500/10 blur-[120px]"
        />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]" />

      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* =========================
            HERO
        ========================= */}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mx-auto mb-16 max-w-3xl text-center"
        >

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
          >
            <HiSparkles className="h-4 w-4 text-blue-500" />

            <span>Une idée ? Parlons-en.</span>
          </motion.div>

          <h1 className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            Construisons quelque chose

            <span className="block bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 bg-clip-text text-transparent">
              d'exception.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
            Tu as un projet web, une idée de SaaS, un besoin en design ou
            simplement une question ? Écris-moi et discutons de ce que nous
            pouvons créer ensemble.
          </p>

        </motion.div>

        {/* =========================
            MAIN CONTENT
        ========================= */}

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">

          {/* =========================
              LEFT SIDE
          ========================= */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={fadeUp}
            className="space-y-6"
          >

            {/* WHATSAPP CARD */}

            <motion.div
              whileHover={{
                y: -5,
              }}
              transition={{
                duration: 0.3,
              }}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-7 shadow-xl shadow-slate-200/30 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none"
            >

              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl transition-all duration-500 group-hover:bg-blue-500/20" />

              <div className="relative">

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
                  <FaWhatsapp className="h-6 w-6" />
                </div>

                <h2 className="text-2xl font-bold">
                  Parlons de ton projet
                </h2>

                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                  Le moyen le plus simple pour me contacter reste WhatsApp.
                  Je peux rapidement comprendre ton besoin et te répondre.
                </p>

                <a
                  href="https://wa.me/237690461830"
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-7 flex items-center justify-between rounded-2xl border border-green-500/20 bg-green-500/5 px-5 py-4 transition duration-300 hover:border-green-500/40 hover:bg-green-500/10"
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                      <FaWhatsapp className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-semibold">
                        WhatsApp
                      </p>

                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Réponse rapide
                      </p>
                    </div>

                  </div>

                 <FaExternalLinkAlt className="h-4 w-4 text-green-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />

                </a>

              </div>

            </motion.div>

            {/* CONTACT INFOS */}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">

              <InfoCard
                icon={FaEnvelope}
                title="Email"
                value="contact@frankkamgang.com"
              />

              <InfoCard
                icon={FaMapMarkerAlt}
                title="Localisation"
                value="Yaoundé, Cameroun"
              />

              <InfoCard
                icon={HiOutlineClock}
                title="Disponibilité"
                value="Lun — Sam · 08h — 18h"
              />

            </div>

            {/* SOCIALS */}

            <div className="flex gap-4">

              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{
                      y: -5,
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur-xl transition hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/20"
                  >

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/10">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        {social.name}
                      </p>

                      <p className="text-xs text-slate-500">
                        {social.description}
                      </p>
                    </div>

                  </motion.a>
                );
              })}

            </div>

          </motion.div>

          {/* =========================
              FORM
          ========================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-2xl shadow-slate-200/40 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none sm:p-8 lg:p-10"
          >

            {/* GLOW */}

            <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative">

              <div className="mb-8">

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/20">
                  <FaPaperPlane className="h-5 w-5" />
                </div>

                <h2 className="text-2xl font-bold sm:text-3xl">
                  Envoyer un message
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Décris-moi ton projet. Plus tu me donnes de détails, plus
                  je pourrai te répondre précisément.
                </p>

              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* NAME / EMAIL */}

                <div className="grid gap-5 sm:grid-cols-2">

                  <Input
                    label="Nom"
                    name="name"
                    placeholder="Ton nom"
                    value={form.name}
                    onChange={handleChange}
                    icon={<FaUser />}
                  />

                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="ton@email.com"
                    value={form.email}
                    onChange={handleChange}
                    icon={<FaEnvelope />}
                  />

                </div>

                {/* SUBJECT */}

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Sujet
                  </label>

                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.05]"
                  >

                    <option value="">
                      Choisir un sujet
                    </option>

                    <option value="Création de site web">
                      Création de site web
                    </option>

                    <option value="Application / SaaS">
                      Application / SaaS
                    </option>

                    <option value="E-commerce">
                      E-commerce
                    </option>

                    <option value="Design graphique">
                      Design graphique
                    </option>

                    <option value="Collaboration">
                      Collaboration
                    </option>

                    <option value="Autre">
                      Autre
                    </option>

                  </select>

                </div>

                {/* MESSAGE */}

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Message
                  </label>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={7}
                    placeholder="Explique-moi ton projet..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.05] dark:placeholder:text-slate-600"
                  />

                </div>

                {/* SUCCESS */}

                {sent && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-600 dark:text-green-400"
                  >
                    <HiCheckCircle className="h-5 w-5 shrink-0" />

                    Message préparé. WhatsApp vient de s'ouvrir.
                  </motion.div>
                )}

                {/* BUTTON */}

                <motion.button
                  type="submit"
                  whileHover={{
                    scale: 1.01,
                    boxShadow:
                      "0 15px 40px rgba(59,130,246,0.25)",
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-[length:200%_100%] px-6 py-4 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-500 hover:bg-[position:100%_0]"
                >

                  <span>
                    Envoyer le message
                  </span>

                  <FaPaperPlane className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />

                </motion.button>

                <p className="text-center text-xs text-slate-500 dark:text-slate-600">
                  Ton message sera transmis directement via WhatsApp.
                </p>

              </form>

            </div>

          </motion.div>

        </div>

        {/* =========================
            BOTTOM CTA
        ========================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="relative mt-10 overflow-hidden rounded-3xl border border-blue-500/10 bg-gradient-to-br from-blue-500/10 via-violet-500/5 to-transparent p-8 text-center sm:p-12"
        >

          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -right-20 -top-20 h-40 w-40 rounded-full border border-blue-500/10"
          />

          <h3 className="relative text-2xl font-bold sm:text-3xl">
            Un projet en tête ?
          </h3>

          <p className="relative mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Même si ton idée n'est encore qu'au stade de concept, tu peux
            m'en parler.
          </p>

          <a
            href="https://wa.me/237690461830"
            target="_blank"
            rel="noreferrer"
            className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:shadow-xl dark:bg-white dark:text-slate-900"
          >
            <FaWhatsapp className="h-4 w-4" />

            Démarrer une discussion
          </a>

        </motion.div>

      </div>
    </main>
  );
}

/* =================================
   INPUT
================================= */

function Input({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  icon?: React.ReactNode;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold">
        {label}
      </label>

      <div className="relative">

        {icon && (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className={`w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.05] dark:placeholder:text-slate-600 ${
            icon ? "pl-11 pr-4" : "px-4"
          }`}
        />

      </div>

    </div>
  );
}

/* =================================
   INFO CARD
================================= */

function InfoCard({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{
        x: 5,
      }}
      className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]"
    >

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300">
        <Icon className="h-5 w-5" />
      </div>

      <div>

        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          {title}
        </p>

        <p className="mt-1 text-sm font-semibold">
          {value}
        </p>

      </div>

    </motion.div>
  );
}