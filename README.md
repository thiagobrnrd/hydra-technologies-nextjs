# Hydra Technologies — versão Next.js

Este projeto é a conversão 1:1 do site original em **Spring Boot + Thymeleaf**
para **Next.js (React)**, que tem suporte nativo na Vercel.

Nada do conteúdo, textos, classes CSS, imagens, scripts (GSAP, Lenis, AOS,
cursor customizado, partículas, animações) ou estilos foi alterado — apenas a
"casca" que renderiza o HTML mudou, de templates Thymeleaf para componentes
React.

## O que foi portado, e como

| Original (Spring Boot)                          | Aqui (Next.js)                                   |
|---------------------------------------------------|---------------------------------------------------|
| `templates/index.html`                            | `app/page.js` (rota `/`)                           |
| `templates/services.html`                          | `app/servicos/page.js` (rota `/servicos`)           |
| `templates/about.html`                              | `app/sobre/page.js` (rota `/sobre`)                 |
| `templates/contact.html`                            | `app/contato/page.js` + `components/ContactForm.js` |
| `templates/fragments/navbar.html`                   | `components/Navbar.js`                             |
| `templates/fragments/footer.html`                   | `components/Footer.js`                             |
| `templates/fragments/head.html`                     | `app/layout.js` (tags de fonte, favicon, CSS)       |
| `templates/fragments/scripts.html`                  | `components/Scripts.js`                            |
| `ContentService.java` (listas de serviços, produtos, diferenciais, stats, processo) | `lib/content.js` (mesmos textos e valores) |
| `ContactRequest.java` (validação Bean Validation)   | `lib/validateContact.js` (mesmas regras e mensagens) |
| `ContactController.java` (`POST /contato`)          | `app/api/contato/route.js` (mesma lógica e log)     |
| `static/css/main.css`                               | `public/css/main.css` (copiado sem nenhuma alteração) |
| `static/js/*.js` (cursor, particles, animations, main) | `public/js/*.js` (copiados sem nenhuma alteração) |
| `static/images/*`                                    | `public/images/*` (copiadas sem nenhuma alteração)  |

### Por que os links usam `<a href>` em vez de `<Link>` do Next.js

Os scripts originais (`main.js`, `animations.js`, `cursor.js`, `particles.js`)
escutam o evento `DOMContentLoaded` e fazem `querySelectorAll` uma única vez.
Para o comportamento ficar **idêntico** ao site original — onde cada página é
carregada do zero pelo servidor — a navegação entre páginas usa links `<a>`
normais (recarregamento completo), garantindo que todos os scripts rodem de
novo em cada navegação, exatamente como no Spring Boot/Thymeleaf.

### O formulário de contato

O back-end original (`ContactController`) apenas valida os campos, loga a
solicitação no console e reexibe a página com a mensagem de sucesso — não
envia e-mail de verdade. Isso foi replicado com uma API Route
(`app/api/contato/route.js`) que valida com as mesmas regras/mensagens do
`ContactRequest.java` e faz `console.log` da mesma forma. Se quiser que o
formulário envie e-mails de verdade (Resend, SendGrid, etc.), é só me pedir.

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Como colocar no ar na Vercel

**Opção 1 — via GitHub (recomendado)**
1. Suba esta pasta para um repositório no GitHub.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório.
3. A Vercel detecta automaticamente que é um projeto Next.js — não precisa
   configurar nada, clique em "Deploy".

**Opção 2 — via CLI**
```bash
npm install -g vercel
vercel
```
Siga as instruções no terminal.

Não é necessária nenhuma variável de ambiente para este projeto funcionar.
