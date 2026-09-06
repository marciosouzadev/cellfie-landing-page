Fontes auto-hospedadas
======================

Estes arquivos .woff2 são servidos pelo próprio site para evitar
requisições a terceiros (Google Fonts) e o consequente envio do IP do
visitante para servidores externos — medida de privacy by design e
adequação à LGPD (transparência e transferência internacional).

Famílias e licença
------------------
- Chakra Petch  — (c) Cadson Demak. SIL Open Font License 1.1.
- IBM Plex Sans  — (c) IBM Corp. SIL Open Font License 1.1.

A SIL OFL 1.1 permite uso, incorporação e redistribuição, inclusive
auto-hospedagem em sites. Texto da licença:
https://openfontlicense.org/

Arquivos
--------
chakra-petch-600-latin.woff2
chakra-petch-600-latin-ext.woff2
chakra-petch-700-latin.woff2
chakra-petch-700-latin-ext.woff2
ibm-plex-sans-latin.woff2
ibm-plex-sans-latin-ext.woff2

Subconjuntos: latin + latin-ext (cobrem o português). Os intervalos
unicode-range correspondentes estão declarados em ../styles.css.

Como atualizar
--------------
Baixar novamente do Google Fonts (css2 API) com User-Agent de navegador
moderno, salvar os .woff2 aqui e conferir os unicode-range no styles.css.
