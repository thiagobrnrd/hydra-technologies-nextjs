"use client";
import { useEffect, useRef, useState } from "react";
import { PROJECT_TYPES, DEADLINES, BUDGETS, labelOf, waLink } from "@/lib/site";

const EMPTY_QUOTE = { name: "", email: "", phone: "", company: "", projectType: "", deadline: "", budget: "conversar", message: "" };
const EMPTY_CONTACT = { name: "", email: "", phone: "", message: "" };

function maskPhone(v) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function waSummary(kind, v) {
  if (kind === "quote") {
    return [
      `Olá! Sou ${v.name || "—"}${v.company ? `, da ${v.company}` : ""}.`,
      `Quero um orçamento de: ${labelOf(PROJECT_TYPES, v.projectType)}.`,
      v.deadline ? `Prazo: ${labelOf(DEADLINES, v.deadline)}.` : "",
      v.message ? `\n${v.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }
  return `Olá! Sou ${v.name || "—"}.\n${v.message || ""}`;
}

function Field({ id, label, optional, error, children, full }) {
  return (
    <div className={`field ${full ? "field--full" : ""} ${error ? "field--error" : ""}`}>
      <label htmlFor={id}>
        {label} {optional && <span className="field__opt">opcional</span>}
      </label>
      {children}
      <span className="field__error" role="alert" aria-live="polite">
        {error || ""}
      </span>
    </div>
  );
}

export default function ContactForms() {
  const [tab, setTab] = useState("quote");
  const [quote, setQuote] = useState(EMPTY_QUOTE);
  const [contact, setContact] = useState(EMPTY_CONTACT);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [serverMsg, setServerMsg] = useState("");
  const [sent, setSent] = useState(null);
  const startedAt = useRef(0);
  const honeypot = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    startedAt.current = Date.now();
    // Botões "Quero um site/sistema…" em qualquer lugar da página pré-selecionam o tipo de projeto
    const onClick = (e) => {
      const el = e.target.closest?.("[data-service]");
      if (!el) return;
      const type = el.dataset.service;
      setTab("quote");
      setStatus("idle");
      if (type) setQuote((q) => ({ ...q, projectType: type }));
    };
    document.addEventListener("click", onClick);
    const pre = new URLSearchParams(window.location.search).get("tipo");
    if (pre && PROJECT_TYPES.some((t) => t.id === pre)) setQuote((q) => ({ ...q, projectType: pre }));
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (status !== "success") return;
    const el = document.getElementById("form-anchor");
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.6) {
      if (window.__lenis) window.__lenis.scrollTo(el, { offset: -110 });
      else el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [status]);

  const values = tab === "quote" ? quote : contact;
  const setValues = tab === "quote" ? setQuote : setContact;

  function onChange(e) {
    const { name, value } = e.target;
    const v = name === "phone" ? maskPhone(value) : value;
    setValues((s) => ({ ...s, [name]: v }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  }

  function clientValidate(v) {
    const er = {};
    if (v.name.trim().length < 2) er.name = "Informe seu nome";
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.email.trim())) er.email = "E-mail inválido";
    const d = v.phone.replace(/\D/g, "");
    if (tab === "quote" && !d) er.phone = "Informe seu WhatsApp com DDD";
    else if (d && (d.length < 10 || d.length > 11)) er.phone = "Número inválido — use DDD + número";
    if (tab === "quote" && !v.projectType) er.projectType = "Escolha o tipo de projeto";
    if (v.message.trim().length < (tab === "quote" ? 10 : 5)) er.message = "Conte um pouco mais sobre o que você precisa";
    return er;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    const er = clientValidate(values);
    setErrors(er);
    if (Object.keys(er).length) {
      const first = formRef.current?.querySelector(`[name="${Object.keys(er)[0]}"]`);
      first?.focus();
      return;
    }
    setStatus("sending");
    setServerMsg("");
    try {
      const res = await fetch(tab === "quote" ? "/api/orcamento" : "/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot.current?.value || "", _t: startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setSent({ kind: tab, values });
        setStatus("success");
        tab === "quote" ? setQuote(EMPTY_QUOTE) : setContact(EMPTY_CONTACT);
        return;
      }
      if (res.status === 400 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }
      setServerMsg(data.message || "Não conseguimos enviar agora.");
      setStatus("error");
    } catch {
      setServerMsg("Sem conexão com o servidor. Verifique sua internet ou fale com a gente pelo WhatsApp.");
      setStatus("error");
    }
  }

  if (status === "success" && sent) {
    const first = sent.values.name.split(" ")[0];
    return (
      <div className="form-card form-done" role="status">
        <div className="form-done__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="30" height="30">
            <path fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="m5 12.5 4.2 4.2L19 7" />
          </svg>
        </div>
        <h3>Recebemos, {first}!</h3>
        <p>
          {sent.kind === "quote" ? "Sua solicitação de orçamento" : "Sua mensagem"} chegou para a nossa equipe. Respondemos em até{" "}
          <strong>1 dia útil</strong> por e-mail ou WhatsApp.
        </p>
        <div className="form-done__actions">
          <a className="btn btn--wa" href={waLink(waSummary(sent.kind, sent.values))} target="_blank" rel="noopener noreferrer">
            <WaIcon /> Adiantar pelo WhatsApp
          </a>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              setStatus("idle");
              setSent(null);
              startedAt.current = Date.now();
            }}
          >
            Enviar outra
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card">
      <div className="tabs" role="tablist" aria-label="Tipo de contato">
        {[
          ["quote", "Solicitar orçamento"],
          ["contact", "Mensagem rápida"],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            className={`tabs__btn ${tab === id ? "is-active" : ""}`}
            onClick={() => {
              setTab(id);
              setErrors({});
              setStatus("idle");
            }}
          >
            {label}
          </button>
        ))}
        <span className="tabs__ink" style={{ transform: `translateX(${tab === "quote" ? 0 : 100}%)` }} />
      </div>

      <form ref={formRef} className="form" noValidate onSubmit={onSubmit}>
        {/* honeypot anti-spam: invisível para pessoas */}
        <div className="hp" aria-hidden="true">
          <label htmlFor="website">Site</label>
          <input ref={honeypot} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {tab === "quote" && (
          <fieldset className="field field--full chips-field">
            <legend>O que você precisa?</legend>
            <div className="chips" role="radiogroup">
              {PROJECT_TYPES.map((t) => (
                <label key={t.id} className={`chip ${quote.projectType === t.id ? "is-on" : ""}`}>
                  <input
                    type="radio"
                    name="projectType"
                    value={t.id}
                    checked={quote.projectType === t.id}
                    onChange={onChange}
                  />
                  {t.label}
                  {t.id === "iot" && <span className="chip__soon">em breve</span>}
                </label>
              ))}
            </div>
            <span className="field__error" role="alert">
              {errors.projectType || ""}
            </span>
          </fieldset>
        )}

        <Field id="f-name" label="Nome" error={errors.name}>
          <input id="f-name" name="name" type="text" autoComplete="name" placeholder="Seu nome" value={values.name} onChange={onChange} maxLength={120} />
        </Field>
        <Field id="f-email" label="E-mail" error={errors.email}>
          <input id="f-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="voce@empresa.com" value={values.email} onChange={onChange} maxLength={160} />
        </Field>
        <Field id="f-phone" label={tab === "quote" ? "WhatsApp" : "Telefone"} optional={tab !== "quote"} error={errors.phone}>
          <input id="f-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="(11) 99999-9999" value={values.phone} onChange={onChange} />
        </Field>

        {tab === "quote" && (
          <>
            <Field id="f-company" label="Empresa / estabelecimento" optional error={errors.company}>
              <input id="f-company" name="company" type="text" autoComplete="organization" placeholder="Ex.: Barbearia Central" value={quote.company} onChange={onChange} maxLength={120} />
            </Field>
            <Field id="f-deadline" label="Prazo" optional error={errors.deadline}>
              <select id="f-deadline" name="deadline" value={quote.deadline} onChange={onChange}>
                <option value="">Selecione</option>
                {DEADLINES.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="f-budget" label="Investimento previsto" optional error={errors.budget}>
              <select id="f-budget" name="budget" value={quote.budget} onChange={onChange}>
                {BUDGETS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label}
                  </option>
                ))}
              </select>
            </Field>
          </>
        )}

        <Field id="f-message" label={tab === "quote" ? "Conte sobre o projeto" : "Mensagem"} error={errors.message} full>
          <textarea
            id="f-message"
            name="message"
            rows={tab === "quote" ? 4 : 5}
            placeholder={
              tab === "quote"
                ? "Ex.: tenho um salão e quero que as clientes agendem pelo link, com lembrete no WhatsApp…"
                : "Como podemos ajudar?"
            }
            value={values.message}
            onChange={onChange}
            maxLength={3000}
          />
        </Field>

        {status === "error" && (
          <div className="form-alert field--full" role="alert">
            <p>{serverMsg}</p>
            <a className="btn btn--wa btn--sm" href={waLink(waSummary(tab, values))} target="_blank" rel="noopener noreferrer">
              <WaIcon /> Enviar pelo WhatsApp
            </a>
          </div>
        )}

        <div className="form__foot field--full">
          <p className="form__legal">Seus dados são usados apenas para responder este contato (LGPD).</p>
          <button type="submit" className="btn btn--primary btn--lg" disabled={status === "sending"}>
            {status === "sending" ? (
              <>
                <span className="spinner" aria-hidden="true" /> Enviando…
              </>
            ) : tab === "quote" ? (
              "Solicitar orçamento"
            ) : (
              "Enviar mensagem"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export function WaIcon({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"
      />
    </svg>
  );
}
