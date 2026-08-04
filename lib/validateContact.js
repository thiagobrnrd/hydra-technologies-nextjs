/**
 * Validation ported 1:1 from com.hydra.technologies.model.ContactRequest
 * (Jakarta Bean Validation annotations -> plain JS checks, same messages).
 */
export function validateContact(data) {
  const errors = {};
  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const phone = (data.phone || "").trim();
  const message = (data.message || "").trim();

  // @NotBlank(message = "Informe seu nome") @Size(max = 120)
  if (!name) {
    errors.name = "Informe seu nome";
  } else if (name.length > 120) {
    errors.name = "Informe seu nome";
  }

  // @NotBlank(message = "Informe um e-mail válido") @Email @Size(max = 160)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.email = "Informe um e-mail válido";
  } else if (!emailRegex.test(email) || email.length > 160) {
    errors.email = "Informe um e-mail válido";
  }

  // @Size(max = 40) — optional
  if (phone.length > 40) {
    errors.phone = "Telefone inválido";
  }

  // @NotBlank(message = "Conte um pouco sobre o seu projeto") @Size(max = 2000)
  if (!message) {
    errors.message = "Conte um pouco sobre o seu projeto";
  } else if (message.length > 2000) {
    errors.message = "Conte um pouco sobre o seu projeto";
  }

  return { valid: Object.keys(errors).length === 0, errors, data: { name, email, phone, message } };
}
