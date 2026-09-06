# INCIDENT-RESPONSE — Resposta a incidentes de segurança

Runbook básico para o site institucional da Cellfie. Ajustar contatos (⚪)
e validar prazos com jurídico (⚖️).

## 1. Contatos

| Papel | Contato |
|--|--|
| Responsável técnico | ⚪ [NOME / TELEFONE A DEFINIR] |
| Responsável pela empresa | ⚪ [NOME A DEFINIR] · WhatsApp (41) 99805-4597 |
| Encarregado/DPO | ⚪ [SE APLICÁVEL] |
| Provedor de hospedagem | GitHub Support — https://support.github.com/ |
| Autoridade (LGPD) | ANPD — https://www.gov.br/anpd/ |

## 2. O que conta como incidente

- Alteração não autorizada do conteúdo do site ou do repositório.
- Comprometimento da conta GitHub `marciosouzadev` (owner do repositório).
- Vazamento de credencial/segredo (mesmo que não haja segredo no projeto hoje).
- Defacement, redirecionamento malicioso, injeção de script.
- Indisponibilidade prolongada por ataque.
- Qualquer acesso indevido a dados pessoais de atendimento (fora do site).

## 3. Fluxo de resposta

1. **Detecção e registro.** Anotar data/hora, quem detectou, o que foi
   observado, evidências (prints, logs, commit hash). Abrir uma entrada no
   §6 (log de incidentes).
2. **Contenção.**
   - Repositório/conta: trocar a senha da conta GitHub, revisar e
     **rotacionar** tokens/PAT, ativar/checar 2FA, revisar colaboradores e
     Deploy keys, revisar Actions e webhooks.
   - Site adulterado: reverter para o último commit íntegro
     (`git revert` / `git reset` + `git push`), ou despublicar o Pages
     (Settings → Pages) até a correção.
   - Se houver segredo exposto: invalidar **imediatamente** a credencial na
     origem; remover do histórico (`git filter-repo`) e forçar push;
     considerar o segredo comprometido para sempre.
3. **Erradicação.** Identificar o vetor (conta, dependência, engenharia
   social, config). Corrigir a causa raiz. Rodar os testes do §5.
4. **Recuperação.** Republicar; confirmar CSP, HTTPS e integridade das
   páginas e do `script.js`. Monitorar por 72h.
5. **Notificação (LGPD arts. 48/50).** Se o incidente envolver dados
   pessoais e puder acarretar risco/dano relevante aos titulares:
   comunicar a **ANPD** e os **titulares afetados** em prazo razoável.
   Conteúdo mínimo: natureza dos dados, titulares envolvidos, medidas
   técnicas usadas, riscos, medidas adotadas/recomendadas.
   **Prazo e gatilho exatos: ⚖️ validar com jurídico.**
6. **Pós-incidente.** Registrar lições aprendidas; atualizar este runbook,
   `COMPLIANCE.md` e, se preciso, as políticas.

## 4. Monitoramento disponível (custo zero)

- Histórico de commits e **Security log** da conta GitHub
  (`github.com/settings/security-log`).
- Alertas do **Dependabot** (mesmo sem dependências hoje, deixar ligado).
- Notificações de push/branch protection no repositório.
- Verificação periódica manual: abrir o site e conferir no DevTools →
  Network que **nenhuma** requisição sai para domínio de terceiro.
- (Opcional) checagem externa de headers/SSL: `securityheaders.com`,
  `ssllabs.com` — sem enviar dados de usuários.

## 5. Testes de regressão de segurança/privacidade

Rodar após qualquer mudança e como parte da recuperação:

- [ ] `git log -p` / `grep -riE 'api[_-]?key|secret|token|password'` — sem segredos.
- [ ] DevTools → Network: só requisições para o próprio domínio (HTML, CSS,
      JS, `logo.jpeg`, `/fonts/*.woff2`). Zero `google`, `gstatic`,
      `facebook`, `analytics`.
- [ ] DevTools → Application → Cookies: vazio. Storage: só `cellfie.consent`
      e **apenas** após interação com o aviso.
- [ ] Aviso de privacidade aparece na 1ª visita (sem registro) e some após
      "Entendi" / "Recusar".
- [ ] "Preferências de privacidade" (rodapé) abre o modal; "Apagar meu
      registro" limpa o `localStorage` e reexibe o aviso.
- [ ] Alterar `CONSENT_VERSION` reexibe o aviso mesmo com registro antigo.
- [ ] `/privacidade/`, `/cookies/`, `/termos-de-uso/`, `/404.html` carregam
      com CSS e sem erro de CSP no console.
- [ ] Navegação e menu mobile funcionam com e sem JavaScript.
- [ ] HTTPS forçado; `http://` redireciona para `https://`.
- [ ] `curl -I` no site: cabeçalhos do GitHub presentes
      (`x-content-type-options: nosniff`, HSTS no `github.io`).

## 6. Log de incidentes

| Data | Detectado por | Descrição | Dados pessoais? | Ações | ANPD/titulares notificados? | Status |
|--|--|--|--|--|--|--|
| — | — | (sem incidentes registrados) | — | — | — | — |
