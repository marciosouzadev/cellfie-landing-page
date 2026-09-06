# COMPLIANCE — Cellfie (site institucional)

Documento técnico de acompanhamento de conformidade. **Não é parecer
jurídico** e não afirma conformidade plena com a LGPD. Cobre a adequação
técnica e documental possível para um site estático.

- **Projeto:** landing page institucional (HTML/CSS/JS estático)
- **Hospedagem atual:** GitHub Pages (`marciosouzadev.github.io/cellfie-landing-page`)
- **Backend / banco de dados / API / autenticação / formulários:** não existem
- **Última auditoria:** 2026-09-05
- **Versão de política/consentimento:** `2026-09-05`

## Legenda

| Símbolo | Significado |
|--|--|
| 🟢 | OK |
| 🟡 | Atenção / melhoria recomendada |
| 🔴 | Problema a corrigir |
| ⚪ | Requer informação do proprietário |
| ⚖️ | Requer validação jurídica |

## Status geral

| Área | Situação | Observação |
|--|--|--|
| LGPD — princípios | 🟡 | Adequação técnica feita; bases legais e retenção dependem de jurídico (⚖️) |
| Privacidade (Privacy by Design) | 🟢 | Sem coleta ativa, sem terceiros, sem cookies, fontes auto-hospedadas |
| Cookies / rastreadores | 🟢 | Nenhum cookie; nenhum pixel/analytics; só `localStorage` necessário |
| Consentimento | 🟢 | Aviso + central de preferências + registro versionado; nada opcional em uso |
| Política de Privacidade | 🟢 | Publicada em `/privacidade/` com placeholders ⚪ e marcações ⚖️ |
| Política de Cookies | 🟢 | Publicada em `/cookies/` a partir de inventário real |
| Termos de Uso | 🟢 | Publicados em `/termos-de-uso/` (foro ⚪/⚖️) |
| Direitos do titular (art. 18) | 🟡 | Fluxo por e-mail/WhatsApp documentado; e-mail de privacidade ⚪ |
| Segurança — cabeçalhos | 🟡 | CSP/referrer via `<meta>`; HSTS/Permissions-Policy exigem host com headers (`_headers` pronto) |
| Segredos / credenciais | 🟢 | Nenhum no código ou no histórico Git |
| Vulnerabilidades de app | 🟢 | Sem superfície para XSS/CSRF/SQLi/IDOR (sem entrada de usuário, sem backend) |
| Dependências | 🟢 | Zero dependências de runtime; zero `node_modules`; sem CDN |
| Resposta a incidentes | 🟢 | Runbook em `INCIDENT-RESPONSE.md` |
| Transferência internacional | ⚖️ | Logs de conexão no GitHub (EUA) |

## Tabela de itens

| Item | Situação | Risco | Solução aplicada | Arquivo |
|--|--|--|--|--|
| Google Fonts carregava de `fonts.gstatic.com` (IP do visitante → EUA) | 🟢 corrigido | Médio | Fontes baixadas e auto-hospedadas; `@font-face` local | `fonts/`, `styles.css` |
| CSP permitia domínios do Google | 🟢 corrigido | Baixo | CSP reduzida a `'self'` em `style-src`/`font-src`; sem terceiros | `index.html` e páginas legais |
| Sem Política de Privacidade | 🟢 corrigido | Alto | Página `/privacidade/` | `privacidade/index.html` |
| Sem Política de Cookies | 🟢 corrigido | Alto | Página `/cookies/` | `cookies/index.html` |
| Sem Termos de Uso | 🟢 corrigido | Médio | Página `/termos-de-uso/` | `termos-de-uso/index.html` |
| Sem aviso/gestão de consentimento | 🟢 corrigido | Médio | Banner + `<dialog>` de preferências + registro versionado em `localStorage` | `index.html`, `script.js`, `styles.css` |
| Sem canal para direitos do titular | 🟡 parcial | Médio | Seção "Como exercer seus direitos" na política; **falta e-mail** ⚪ | `privacidade/index.html` |
| Sem `robots.txt` / `sitemap.xml` / `canonical` | 🟢 corrigido | Baixo | Criados; `<link rel="canonical">` nas páginas | `robots.txt`, `sitemap.xml` |
| Sem dados estruturados | 🟢 corrigido | Baixo | JSON-LD `MobilePhoneStore` (só dados já públicos) | `index.html` |
| Sem `security.txt` / política de vulnerabilidade | 🟢 corrigido | Baixo | `/.well-known/security.txt` + `SECURITY.md` | `.well-known/security.txt`, `SECURITY.md` |
| Cabeçalhos HSTS / X-Frame-Options / Permissions-Policy ausentes | 🟡 limitado | Baixo | `frame-ancestors 'none'` via CSP; `_headers` pronto para Netlify/Cloudflare | `_headers` |
| Sem fallback sem-JS | 🟢 corrigido | Baixo | `class="no-js"` + regras CSS de fallback | `index.html`, `styles.css` |
| Sem página 404 própria | 🟢 corrigido | Baixo | `404.html` na identidade do site | `404.html` |
| Horário de funcionamento / CEP não confirmados | ⚪ | Baixo | Placeholder + flag nas políticas e no JSON-LD | `index.html`, políticas |
| Identificação do controlador (razão social, CNPJ, endereço, e-mail, DPO) | ⚪ | Alto | Placeholders `[INFORMAÇÃO A DEFINIR PELO RESPONSÁVEL]` | `privacidade/index.html` |
| Bases legais de cada tratamento | ⚖️ | Alto | Hipóteses sinalizadas; **não definidas** | `privacidade/index.html`, `DATA-INVENTORY.md` |
| Prazos de retenção legal (fiscal/consumerista) | ⚖️ | Médio | Sinalizado | `privacidade/index.html`, `DATA-INVENTORY.md` |
| Transferência internacional (arts. 33–36) | ⚖️ | Médio | Sinalizado | `privacidade/index.html` |
| Necessidade de DPO / RIPD | ⚖️ | Médio | Sinalizado | `privacidade/index.html` |

## Pendências do proprietário (⚪)

1. Razão social + CNPJ (ou CPF) do responsável.
2. Endereço oficial da empresa (se diferente do endereço da loja).
3. E-mail dedicado a privacidade (ex.: `privacidade@dominio`).
4. Encarregado/DPO: existe? nome e contato.
5. Horário de funcionamento real e CEP correto (atualizar `index.html`,
   políticas e JSON-LD).
6. Comarca do foro nos Termos de Uso.
7. Intenção de usar analytics/marketing no futuro (hoje: não usa).
8. Canais ativos de e-mail marketing / listas de WhatsApp (hoje: não há).

## Pendências jurídicas (⚖️)

- Definição das bases legais (LGPD art. 7º / art. 10).
- Enquadramento controlador × operador com GitHub e (futuramente) Google.
- Prazos de retenção obrigatória e conflito com pedidos de eliminação.
- Transferência internacional e garantias contratuais.
- Necessidade de DPO (art. 41) e de RIPD.
- Redação jurídica final das três políticas e do foro.

## Como manter

- Ao mudar tecnologias/terceiros: atualizar `COOKIE-INVENTORY.md`,
  `DATA-INVENTORY.md`, a página `/cookies/` e **incrementar** `CONSENT_VERSION`
  em `script.js` (formato `AAAA-MM-DD`) — isso reexibe o aviso.
- Qualquer script opcional novo deve ser ligado **somente** dentro de
  `applyConsent()` em `script.js`, condicionado à categoria autorizada.
- Rodar a verificação de regressão descrita em `INCIDENT-RESPONSE.md` §Testes.
