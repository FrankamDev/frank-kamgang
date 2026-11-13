import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

import Navbar from "../components/Navbar";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const whatsappNumber = "237690461830";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `
Bonjour Frank,

Nom : ${form.name}
Email : ${form.email}
Sujet : ${form.subject}

Message :
${form.message}
    `.trim();

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");

    setSent(true);

    setTimeout(() => {
      setSent(false);
    }, 5000);
  };

  const contactInfo = [
    {
      icon: FiMail,
      label: "Email",
      value: "contact@frankkamgang.com",
      href: "mailto:contact@frankkamgang.com",
    },
    {
      icon: FiMapPin,
      label: "Localisation",
      value: "Yaoundé, Cameroun",
      href: "#",
    },
    {
      icon: FiClock,
      label: "Disponibilité",
      value: "Lun — Sam · 08h — 18h",
      href: "#",
    },
  ];

  const socials = [
    {
      icon: FaLinkedinIn,
      label: "LinkedIn",
      href: "https://linkedin.com",
    },
    {
      icon: FaGithub,
      label: "GitHub",
      href: "https://github.com",
    },
    {
      icon: FaFacebookF,
      label: "Facebook",
      href: "https://facebook.com",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-4 pb-16 pt-24 text-slate-900 dark:bg-[#080d17] dark:text-white sm:px-6 sm:pt-28 lg:px-8">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

        <div
          className="
            absolute inset-0 opacity-[0.035]
            [background-image:linear-gradient(#64748b_1px,transparent_1px),linear-gradient(90deg,#64748b_1px,transparent_1px)]
            [background-size:40px_40px]
          "
        />
      </div>

      <Navbar />

      <div className="relative mx-auto max-w-7xl">
        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"
        >
          <div
            className="
              mb-4 inline-flex items-center gap-2
              rounded-full border border-emerald-500/20
              bg-emerald-500/10
              px-3 py-1.5
              text-[10px] font-bold uppercase tracking-[0.18em]
              text-emerald-600
              dark:text-emerald-400
              sm:px-4 sm:py-2 sm:text-xs
            "
          >
            <FiMessageCircle size={13} />
            Parlons de votre projet
          </div>

          <h1
            className="
              text-3xl font-black tracking-tight
              sm:text-5xl
              lg:text-6xl
          "
          >
            Construisons quelque chose{" "}
            <span className="text-emerald-500">d’utile.</span>
          </h1>

          <p
            className="
              mx-auto mt-4 max-w-2xl
              text-sm leading-6 text-slate-600
              dark:text-slate-400
              sm:mt-6 sm:text-base sm:leading-7
            "
          >
            Une idée, un projet web ou une collaboration ?
            Décrivez-moi votre besoin et voyons ensemble comment
            lui donner vie.
          </p>
        </motion.section>

        {/* CONTENT */}
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            {/* WHATSAPP */}
            <div
              className="
                rounded-2xl border border-slate-200
                bg-white/80 p-5 shadow-sm
                backdrop-blur-xl
                dark:border-white/10
                dark:bg-white/[0.03]
                sm:rounded-3xl sm:p-7
              "
            >
              <div
                className="
                  mb-5 flex h-11 w-11 items-center justify-center
                  rounded-xl bg-emerald-500/10
                  text-emerald-500
                  sm:h-14 sm:w-14 sm:rounded-2xl
                "
              >
                <FaWhatsapp size={21} />
              </div>

              <h2 className="text-xl font-bold sm:text-2xl">
                Discutons sur WhatsApp
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Pour une réponse rapide, vous pouvez directement
                me contacter sur WhatsApp.
              </p>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-5 flex items-center justify-between
                  rounded-xl border border-emerald-500/20
                  bg-emerald-500/5
                  px-4 py-3
                  transition-all duration-300
                  hover:border-emerald-500/40
                  hover:bg-emerald-500/10
                  sm:rounded-2xl sm:px-5 sm:py-4
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex h-9 w-9 items-center justify-center
                      rounded-full bg-emerald-500
                      text-white
                    "
                  >
                    <FaWhatsapp size={16} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      +237 690 461 830
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Disponible sur WhatsApp
                    </p>
                  </div>
                </div>

                <FiArrowUpRight
                  size={18}
                  className="text-emerald-500"
                />
              </a>
            </div>

            {/* CONTACT INFO */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.15 + index * 0.05,
                    }}
                    className="
                      group flex items-center gap-4
                      rounded-xl border border-slate-200
                      bg-white/70 p-4
                      transition-all duration-300
                      hover:-translate-y-0.5
                      hover:border-emerald-500/30
                      dark:border-white/10
                      dark:bg-white/[0.03]
                    "
                  >
                    <div
                      className="
                        flex h-10 w-10 shrink-0 items-center justify-center
                        rounded-xl bg-slate-100
                        text-slate-600
                        transition-colors
                        group-hover:bg-emerald-500/10
                        group-hover:text-emerald-500
                        dark:bg-white/5
                        dark:text-slate-400
                      "
                    >
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {item.label}
                      </p>

                      <p className="mt-1 truncate text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {item.value}
                      </p>
                    </div>

                    {item.href !== "#" && (
                      <FiArrowUpRight
                        size={15}
                        className="
                          ml-auto text-slate-300
                          transition-all
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                          group-hover:text-emerald-500
                        "
                      />
                    )}
                  </motion.a>
                );
              })}
            </div>

            {/* SOCIALS */}
            <div
              className="
                rounded-2xl border border-slate-200
                bg-white/70 p-4
                dark:border-white/10
                dark:bg-white/[0.03]
              "
            >
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Me retrouver
              </p>

              <div className="grid grid-cols-3 gap-2">
                {socials.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex items-center justify-center
                        gap-2 rounded-xl
                        border border-slate-200
                        bg-slate-50
                        py-2.5
                        text-slate-500
                        transition-all
                        hover:border-emerald-500/30
                        hover:bg-emerald-500/5
                        hover:text-emerald-500
                        dark:border-white/10
                        dark:bg-white/[0.03]
                        dark:text-slate-400
                      "
                    >
                      <Icon size={14} />
                      <span className="hidden text-[10px] font-bold sm:inline">
                        {social.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="
              rounded-2xl border border-slate-200
              bg-white/80 p-5
              shadow-sm
              backdrop-blur-xl
              dark:border-white/10
              dark:bg-white/[0.03]
              sm:rounded-3xl sm:p-7
              lg:p-9
            "
          >
            <div className="mb-6 flex items-start gap-3 sm:mb-8 sm:gap-4">
              <div
                className="
                  flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-xl bg-emerald-500/10
                  text-emerald-500
                  sm:h-12 sm:w-12 sm:rounded-2xl
                "
              >
                <FiSend size={18} />
              </div>

              <div>
                <h2 className="text-xl font-bold sm:text-2xl">
                  Envoyer un message
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Décrivez votre projet en quelques lignes.
                </p>
              </div>
            </div>

            {sent && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                  mb-5 flex items-start gap-3
                  rounded-xl border border-emerald-500/20
                  bg-emerald-500/10
                  p-3.5
                "
              >
                <FiCheckCircle
                  className="mt-0.5 shrink-0 text-emerald-500"
                  size={17}
                />

                <div>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    Message prêt à être envoyé
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">
                    WhatsApp vient de s’ouvrir avec votre message.
                  </p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* NAME + EMAIL */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500"
                  >
                    Nom
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    className="
                      w-full rounded-xl
                      border border-slate-200
                      bg-slate-50
                      px-3.5 py-3
                      text-xs text-slate-900
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:border-emerald-500
                      focus:ring-2
                      focus:ring-emerald-500/10
                      dark:border-white/10
                      dark:bg-white/[0.03]
                      dark:text-white
                    "
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="vous@email.com"
                    className="
                      w-full rounded-xl
                      border border-slate-200
                      bg-slate-50
                      px-3.5 py-3
                      text-xs text-slate-900
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:border-emerald-500
                      focus:ring-2
                      focus:ring-emerald-500/10
                      dark:border-white/10
                      dark:bg-white/[0.03]
                      dark:text-white
                    "
                  />
                </div>
              </div>

              {/* SUBJECT */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500"
                >
                  Sujet
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Création d'un site web..."
                  className="
                    w-full rounded-xl
                    border border-slate-200
                    bg-slate-50
                    px-3.5 py-3
                    text-xs text-slate-900
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-emerald-500
                    focus:ring-2
                    focus:ring-emerald-500/10
                    dark:border-white/10
                    dark:bg-white/[0.03]
                    dark:text-white
                  "
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Parlez-moi de votre projet..."
                  className="
                    w-full resize-none rounded-xl
                    border border-slate-200
                    bg-slate-50
                    px-3.5 py-3
                    text-xs leading-5
                    text-slate-900
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-emerald-500
                    focus:ring-2
                    focus:ring-emerald-500/10
                    dark:border-white/10
                    dark:bg-white/[0.03]
                    dark:text-white
                  "
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="
                  group flex w-full items-center
                  justify-center gap-2
                  rounded-xl
                  bg-emerald-500
                  px-5 py-3
                  text-xs font-black
                  text-[#03100a]
                  transition-all duration-300
                  hover:bg-emerald-400
                  hover:shadow-lg
                  hover:shadow-emerald-500/20
                  active:scale-[0.98]
                "
              >
                Envoyer le message

                <FiArrowUpRight
                  size={16}
                  className="
                    transition-transform
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </button>

              <p className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                <FiGlobe size={12} />
                Réponse généralement sous 24h
              </p>
            </form>
          </motion.div>
        </div>

        {/* BOTTOM CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="
            mt-6 overflow-hidden
            rounded-2xl border border-emerald-500/10
            bg-emerald-500/[0.06]
            p-6
            text-center
            sm:mt-8 sm:rounded-3xl sm:p-10
          "
        >
          <FiPhone
            className="mx-auto mb-3 text-emerald-500"
            size={22}
          />

          <h2 className="text-xl font-black sm:text-2xl">
            Vous avez une idée ?
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-slate-500 dark:text-slate-400 sm:text-sm">
            Même si votre projet n’est pas encore parfaitement défini,
            vous pouvez me contacter. Nous pouvons commencer par en
            discuter.
          </p>

          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-5 inline-flex items-center gap-2
              rounded-xl
              bg-slate-900
              px-5 py-3
              text-xs font-bold text-white
              transition
              hover:bg-emerald-500
              hover:text-[#03100a]
              dark:bg-white
              dark:text-slate-900
              dark:hover:bg-emerald-500
            "
          >
            <FaWhatsapp size={15} />
            Démarrer une discussion
          </a>
        </motion.section>
      </div>
    </main>
  );
}