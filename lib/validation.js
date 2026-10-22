import { PROJECT_TYPES, DEADLINES, BUDGETS } from "./site";

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

/** Trim, remove control chars (keeps line breaks in multiline fields) and cap length. */
function clean(value, { multiline = false, max = 500 } = {}) {
  if (typeof value !== "string") return "";
  let v = value.replace(multiline ? /[\u0000-\u0009\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, "");
  v = multiline ? v.replace(/\r\n?/g, "\n").replace(/\n{4,}/g, "\n\n\n") : v.replace(/\s+/g, " ");
  return v.trim().slice(0, max + 1);
}

const digits = (v) => v.replace(/\D/g, "");

function checkName(name, errors) {
  if (name.length < 2) errors.name = "Informe seu nome";
  else if (name.length > 120) errors.name = "Nome muito longo";
}

function checkEmail(email, errors) {
  if (!email) errors.email = "Informe seu e-mail";
  else if (email.length > 160 || !EMAIL_RE.test(email)) errors.email = "E-mail inválido";
}

function checkPhone(phone, errors, required) {
  const d = digits(phone);
  if (!d) {
    if (required) errors.phone = "Informe seu WhatsApp com DDD";
    return;
  }
  if (d.length < 10 || d.length > 13) errors.phone = "Número inválido — use DDD + número";
}

function checkMessage(message, errors, min) {
  if (message.length < min) errors.message = "Conte um pouco mais sobre o que você precisa";
  else if (message.length > 3000) errors.message = "Mensagem muito longa (máx. 3000 caracteres)";
}

/** Formulário "Solicitar orçamento" */
export function validateQuote(body = {}) {
  const data = {
    name: clean(body.name, { max: 120 }),
    email: clean(body.email, { max: 160 }).toLowerCase(),
    phone: clean(body.phone, { max: 30 }),
    company: clean(body.company, { max: 120 }),
    projectType: clean(body.projectType, { max: 20 }),
    deadline: clean(body.deadline, { max: 20 }),
    budget: clean(body.budget, { max: 20 }),
    message: clean(body.message, { multiline: true, max: 3000 }),
  };
  const errors = {};
  checkName(data.name, errors);
  checkEmail(data.email, errors);
  checkPhone(data.phone, errors, true);
  if (data.company.length > 120) errors.company = "Nome muito longo";
  if (!PROJECT_TYPES.some((t) => t.id === data.projectType)) errors.projectType = "Escolha o tipo de projeto";
  if (data.deadline && !DEADLINES.some((t) => t.id === data.deadline)) errors.deadline = "Prazo inválido";
  if (data.budget && !BUDGETS.some((t) => t.id === data.budget)) errors.budget = "Faixa inválida";
  checkMessage(data.message, errors, 10);
  return { valid: Object.keys(errors).length === 0, errors, data };
}

/** Formulário "Mensagem rápida" */
export function validateContact(body = {}) {
  const data = {
    name: clean(body.name, { max: 120 }),
    email: clean(body.email, { max: 160 }).toLowerCase(),
    phone: clean(body.phone, { max: 30 }),
    message: clean(body.message, { multiline: true, max: 3000 }),
  };
  const errors = {};
  checkName(data.name, errors);
  checkEmail(data.email, errors);
  checkPhone(data.phone, errors, false);
  checkMessage(data.message, errors, 5);
  return { valid: Object.keys(errors).length === 0, errors, data };
}

export { digits };
