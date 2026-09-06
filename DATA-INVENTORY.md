# DATA-INVENTORY — Inventário de dados pessoais

Levantado a partir do código real em 2026-09-05. O site é estático, sem
backend, banco de dados, formulários, cadastro ou autenticação.

> Bases legais marcadas ⚖️ são **hipóteses** e precisam de validação jurídica.
> Não foram "escolhidas" bases legais definitivas.

| Dado | Origem | Finalidade | Base legal (hipótese) | Armazenamento | Compartilhamento | Retenção |
|--|--|--|--|--|--|--|
| Endereço IP, User-Agent, data/hora, URL, referer (registros de conexão) | Coleta automática pelo **provedor de hospedagem** ao servir a página | Entregar o site; disponibilidade; segurança; prevenção a abuso/fraude | Legítimo interesse (art. 7º, IX) e/ou obrigação legal do provedor (Marco Civil da Internet, art. 15) ⚖️ | Infraestrutura do **GitHub Pages** (GitHub Inc./Microsoft), EUA. A Cellfie **não** mantém servidor/log próprio | GitHub Inc.; autoridades mediante requisição legal | Conforme prática do GitHub e prazo legal (Marco Civil cita 6 meses p/ registros de acesso a aplicação) ⚖️ |
| Registro de escolha de privacidade: categorias autorizadas + timestamp ISO + versão da política | Gerado no navegador quando o usuário interage com o aviso | Respeitar e comprovar a decisão do titular sobre tecnologias | Necessário / exercício regular de direitos; dado **não pessoal** (não identifica o titular) | `localStorage` chave `cellfie.consent`, **somente no dispositivo do usuário**; não trafega | Nenhum | Até o usuário apagar (botão "Apagar meu registro", limpeza do navegador) ou mudança de `CONSENT_VERSION` |
| Número de telefone, nome e conteúdo da mensagem | Enviados **voluntariamente pelo usuário** após clicar em "Falar no WhatsApp" (ocorre fora do site) | Responder dúvida, orçar, prestar o serviço | Procedimentos preliminares / execução de contrato (art. 7º, V) ⚖️ | Fora do escopo do site: app WhatsApp (Meta) e registros de atendimento da loja | Meta Platforms (operadora do WhatsApp); ninguém além disso pela Cellfie | Tempo do atendimento + prazos legais (CDC, fiscal) ⚖️ |
| Interações em `@celfie_barreirinha` (Instagram) | Usuário abre o perfil por link | Relacionamento/divulgação | Legítimo interesse ⚖️ | Plataforma Instagram (Meta) | Meta Platforms | Política da Meta |

## Dados que o site **NÃO** trata

- Não há cookies próprios ou de terceiros.
- Não há `sessionStorage`, IndexedDB, Web SQL, cache manual de dados pessoais.
- Não há campos de formulário, upload, login, senha, token de sessão.
- Não há dados sensíveis (art. 11), dados de crianças coletados intencionalmente,
  geolocalização, biometria, pagamento.
- Não há analytics, pixels, fingerprinting, A/B testing, heatmap.
- Não há e-mail transacional ou de marketing disparado pelo site.

## Terceiros e transferências

| Terceiro | Papel | Dados | País | Aciona automaticamente? |
|--|--|--|--|--|
| GitHub Inc. / Microsoft | Hospedagem (operador de infraestrutura) | Registros de conexão | EUA | Sim (ao carregar o site) |
| Meta Platforms (WhatsApp) | Canal de atendimento | Telefone, mensagens | EUA/global | Não — só se o usuário clicar |
| Meta Platforms (Instagram) | Rede social | Conforme perfil | EUA/global | Não — só se o usuário clicar |
| Google LLC (Maps) | "Como chegar" (link externo) | IP/consulta ao abrir o Maps | EUA/global | Não — só se o usuário clicar |

Nenhum recurso de terceiro é **carregado** pela página. As fontes tipográficas
são auto-hospedadas em `/fonts`.

## Mecanismos de atendimento aos direitos do titular

| Direito (art. 18) | Como é atendido hoje |
|--|--|
| Confirmação / acesso | Pedido por e-mail (⚪) ou WhatsApp; para registros de conexão, encaminhar ao GitHub |
| Correção | Não aplicável a dados do site (não há cadastro); via atendimento p/ dados de contato |
| Anonimização / bloqueio / eliminação | "Apagar meu registro" (consentimento local); para dados de atendimento, solicitação ao responsável |
| Portabilidade | Não aplicável (site não armazena dados estruturados do titular) |
| Informação sobre compartilhamento | Esta tabela + Política de Privacidade §7 |
| Revogação de consentimento | Central "Preferências de privacidade" (rodapé) |
| Revisão de decisão automatizada | Não aplicável (não há decisão automatizada) |
