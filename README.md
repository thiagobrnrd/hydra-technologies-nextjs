# Hydra Technologies — site 3D (v2)

Site institucional da Hydra Technologies com experiência 3D guiada pelo scroll
e backend próprio para **Solicitar orçamento** e **Mensagem rápida**.

- **Front:** Next.js 16 (App Router) · React 19 · Three.js / React Three Fiber · Lenis
- **Back:** API Routes do Next.js (rodam como funções serverless na Vercel)
  - `POST /api/orcamento` — formulário de orçamento
  - `POST /api/contato` — mensagem rápida
  - `GET  /api/orcamento` — status (`{"email":"configured"}` quando o e-mail está ok)

## Estrutura

```
app/
  layout.js            → fontes, SEO, palco 3D, navegação, rodapé
  page.js              → home (hero + capítulos 3D + case + processo + contato)
  contato/page.js      → página só do formulário
  api/orcamento        → backend do orçamento
  api/contato          → backend da mensagem rápida
components/
  scene/               → cena 3D (núcleo Hydra, site explodido, dashboard, IoT, notebook, portal)
  ScrollEngine.js      → scroll suave + progresso de cada capítulo para o 3D
  ContactForms.js      → formulários (validação, máscara de telefone, fallback WhatsApp)
lib/
  validation.js        → validação no servidor
  mailer.js            → envio por Gmail SMTP ou Resend
  emailTemplates.js    → e-mail do lead para a Hydra + resposta automática ao cliente
  handleLead.js        → fluxo: anti-spam → validação → limite por IP → envio
```

## Como o backend funciona

1. O cliente envia o formulário.
2. O servidor valida tudo de novo, bloqueia bots (campo invisível + tempo mínimo)
   e limita 5 envios a cada 10 min por IP.
3. Chega um e-mail em `CONTACT_TO_EMAIL` com todos os dados e botões
   **Responder por e-mail** e **Chamar no WhatsApp** (o "Responder" do Gmail já vai para o cliente).
4. O cliente recebe uma resposta automática ("Recebemos seu contato…").
5. Se o e-mail falhar ou não estiver configurado, o formulário mostra um botão
   **Enviar pelo WhatsApp** já com a mensagem preenchida. O lead nunca se perde.

## Variáveis de ambiente (obrigatório para os formulários)

Na Vercel: **Project → Settings → Environment Variables** (marque Production, Preview e Development):

| Nome | Valor |
|---|---|
| `SMTP_USER` | `contato.techhydra@gmail.com` |
| `SMTP_PASS` | senha de app do Google (16 letras) |
| `CONTACT_TO_EMAIL` | `contato.techhydra@gmail.com` (opcional, já é o padrão) |

**Como gerar a senha de app do Gmail:**
1. Entre em <https://myaccount.google.com/security> com a conta `contato.techhydra@gmail.com`
   e ative a **Verificação em duas etapas**.
2. Abra <https://myaccount.google.com/apppasswords>, crie uma senha chamada "Site Hydra".
3. Copie os 16 caracteres para `SMTP_PASS` (pode colar com espaços).
4. Depois de salvar as variáveis, faça **Redeploy** na Vercel.
5. Teste: abra `https://hydratechnologies.com.br/api/orcamento`. Deve aparecer `"email":"configured"`.

Alternativa com Resend: defina `RESEND_API_KEY` (e `RESEND_FROM` com domínio verificado).
Se `SMTP_USER/SMTP_PASS` existirem, o Gmail tem prioridade.

## Rodar localmente

```bash
npm install
cp .env.example .env.local   # e preencha SMTP_PASS
npm run dev                  # http://localhost:3000
```

## Publicar na Vercel

- **Via GitHub (recomendado):** substitua o conteúdo do repositório por esta pasta,
  faça commit e push na branch `main`. A Vercel publica sozinha.
- **Via CLI:** `npx vercel --prod` dentro da pasta.

> A Vercel detecta Next.js automaticamente. Node 18.18+ (recomendado 20 ou 22).

## Editar textos e contatos

- Telefone, e-mail e cidade: `lib/site.js`
- Textos da home: `app/page.js`
- Imagens do portfólio: `public/images/portfolio/`
