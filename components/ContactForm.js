"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || {});
        return;
      }

      setErrors({});
      setSubmitted(true);
      setValues({ name: "", email: "", phone: "", message: "" });
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="form-success" role="status">
        <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
          <path fill="currentColor" d="m9.5 16.6-4-4L7 11.2l2.5 2.5L17.5 6l1.5 1.5Z" />
        </svg>
        <div>
          <h3>Recebemos sua mensagem</h3>
          <p>Nosso time vai analisar seu projeto e retornar em breve.</p>
          
            href="https://wa.me/5511999101739?text=Ol%C3%A1%2C%20acabei%20de%20enviar%20uma%20solicita%C3%A7%C3%A3o%20de%20or%C3%A7amento%20pelo%20site"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline form-success__whatsapp"
          >
            <svg width="18" height="18" aria-hidden="true">
              <use href="#icon-whatsapp" />
            </svg>
            <span className="btn__label">Continuar no WhatsApp</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Seu nome completo"
          autoComplete="name"
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="voce@empresa.com"
          autoComplete="email"
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="phone">
          Telefone <span className="form-field__optional">(opcional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          placeholder="(11) 99999-9999"
          autoComplete="tel"
        />
      </div>

      <div className="form-field">
        <label htmlFor="message">Conte sobre o seu projeto</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          placeholder="Objetivo, prazo, orçamento estimado..."
        ></textarea>
        {errors.message && <span className="form-error">{errors.message}</span>}
      </div>

      <button type="submit" className="btn btn--primary btn--lg btn--magnetic form-submit" data-magnetic disabled={submitting}>
        <span className="btn__label">Enviar solicitação</span>
      </button>
    </form>
  );
}
