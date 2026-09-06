# Política de Segurança

## Reportar uma vulnerabilidade

Encontrou um problema de segurança neste site ou neste repositório?

- WhatsApp: (41) 99805-4597 — https://wa.me/5541998054597
- E-mail de segurança: ⚪ `[A DEFINIR PELO RESPONSÁVEL]`
- Consulte também `/.well-known/security.txt`

Por favor:

- **não** explore a falha além do necessário para demonstrá-la;
- **não** acesse, altere ou divulgue dados de terceiros;
- **não** torne o problema público antes da correção;
- descreva os passos para reproduzir e o impacto estimado.

Faremos o possível para responder rapidamente, corrigir e dar retorno.

## Escopo

- `index.html`, `styles.css`, `script.js`, páginas em `/privacidade`,
  `/cookies`, `/termos-de-uso`, `/404.html`, arquivos em `/fonts`.
- Hospedagem: GitHub Pages.

## Fora de escopo

- Serviços de terceiros acessados por link (WhatsApp, Instagram, Google Maps).
- Ataques que exijam acesso físico ao dispositivo da vítima ou engenharia
  social contra funcionários.
- Ausência de cabeçalhos que o GitHub Pages não permite configurar
  (documentado em `COMPLIANCE.md`).

## Medidas já adotadas

- HTTPS obrigatório; sem conteúdo misto (`upgrade-insecure-requests`).
- Content-Security-Policy restritiva (`default-src 'self'`), sem terceiros,
  sem `'unsafe-inline'`, sem `'unsafe-eval'`.
- Proteção contra clickjacking (`frame-ancestors 'none'`).
- `Referrer-Policy: strict-origin-when-cross-origin`.
- Sem cookies, sem backend, sem banco de dados, sem autenticação,
  sem formulários — superfície de ataque mínima.
- Sem segredos/credenciais no código ou no histórico Git.
- Zero dependências de runtime; fontes auto-hospedadas.
- `_headers` pronto com HSTS/Permissions-Policy/COOP para hospedagem que
  suporte cabeçalhos personalizados.
