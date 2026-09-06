# COOKIE-INVENTORY — Inventário de cookies e armazenamento

Levantado a partir do código real em 2026-09-05
(`grep` por `document.cookie`, `localStorage`, `sessionStorage`,
`indexedDB`, `gtag`, `fbq`, `dataLayer`, pixels e scripts externos).

## Resultado

**O site não define nenhum cookie.** Não há cookies primários nem de
terceiros. Não há `sessionStorage`, IndexedDB, nem pixels/tags.

| Cookie/tecnologia | Categoria | Finalidade | Fornecedor | Duração | Consentimento |
|--|--|--|--|--|--|
| `cellfie.consent` (localStorage) | Necessário | Registrar categorias autorizadas + data/hora + versão da política, para respeitar e comprovar a escolha do usuário | Cellfie (primário; sem terceiros) | Persistente até o usuário apagar ou até mudança de versão da política | Dispensado (tecnologia estritamente necessária) |

## Terceiros verificados e **não** presentes

Google Analytics · Google Tag Manager · Google AdSense/Ads · Meta (Facebook)
Pixel · TikTok Pixel · LinkedIn Insight · Hotjar · Microsoft Clarity ·
Crazy Egg · reCAPTCHA · hCaptcha · YouTube/Vimeo embed · Google Maps embed ·
Google Fonts (removido — agora auto-hospedado) · Font Awesome / CDNs ·
jQuery/CDN · Cloudflare Insights · Disqus · Intercom/Zendesk/Tawk.to /
qualquer chat · AddThis/ShareThis · Typeform/Google Forms.

## Links de saída (não carregam nada até o clique)

| Destino | Onde aparece | Efeito |
|--|--|--|
| `https://wa.me/5541998054597` | Botões "WhatsApp" | Abre o WhatsApp; cookies/políticas da Meta passam a valer |
| `https://instagram.com/celfie_barreirinha` | Rodapé | Abre o Instagram; políticas da Meta |
| `https://www.google.com/maps/search/?api=1&query=...` | Botões "Como chegar / Abrir no mapa" | Abre o Google Maps; políticas do Google |
| `https://www.gov.br/anpd/` | Política de Privacidade | Site da ANPD |

Todos com `target="_blank" rel="noopener noreferrer"`.

## Regra para novas tecnologias

Qualquer cookie/script novo:
1. entra nesta tabela e na página `/cookies/`;
2. recebe uma categoria (Preferências / Estatísticas / Marketing);
3. é carregado **apenas** dentro de `applyConsent()` em `script.js`,
   condicionado a `record.categories[<categoria>] === true`;
4. o `<input data-cat="...">` correspondente no `<dialog>` deixa de ser
   `disabled`;
5. `CONSENT_VERSION` é incrementado para reexibir o aviso.
