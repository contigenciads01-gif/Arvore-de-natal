# 🎄 Landing Page - Árvore de Natal Vermelha Decorada

Landing page de alta conversão, responsiva e mobile-first, desenvolvida para venda da **Árvore de Natal Vermelha Decorada**, com tema natalino luxuoso (vermelho borgonha, dourado metálico e detalhes refinados), contador regressivo de antecipação, efeito suave de neve natalina, acordeão de dúvidas e pop-up inteligente de retenção/saída (exit intent).

---

## ⚙️ Configuração Rápida (Como Editar os Links e Preços)

Você pode editar os links e valores diretamente no topo do arquivo [`index.html`](file:///c:/Users/thiag/Documents/Arvore%20de%20Natal/index.html) ou em [`js/script.js`](file:///c:/Users/thiag/Documents/Arvore%20de%20Natal/js/script.js):

```javascript
const LINK_ARVORE = "COLE_AQUI_O_LINK";
const LINK_ARVORE_PAPAIS = "COLE_AQUI_O_LINK";
const LINK_KIT_COMPLETO = "COLE_AQUI_O_LINK";
const LINK_OFERTA_POPUP = "COLE_AQUI_O_LINK"; // Kit completo por R$ 127,90
const WHATSAPP = "55DDDNUMERO";               // Apenas números com DDD (ex: 5511999999999)
const PRECO_KIT_COMPLETO = "R$ 219,90";       // Valor que aparecerá no Card 3
```

---

## 📁 Estrutura de Arquivos

```text
Arvore de Natal/
├── index.html                 # Página de vendas completa (HTML5 semântico)
├── css/
│   └── style.css              # Estilos visuais premium, variáveis, animações e responsividade
├── js/
│   └── script.js              # Lógica dos contadores, exit intent, acordeão, lightbox e eventos
└── assets/                    # Fotos de catálogo fotorealistas em alta definição
    ├── arvore-com-papais.jpg  # Árvore decorada com o trio de 3 Papais Noéis
    ├── arvore-sozinha.jpg     # Árvore decorada clássica
    ├── pisca-pisca-vermelho.jpg# Micro-LEDs vermelhos aconchegantes
    └── kit-completo.jpg       # Foto profissional de catálogo do Kit Completo
```

---

## 🚀 Como Abrir e Testar

Basta dar dois cliques no arquivo [`index.html`](file:///c:/Users/thiag/Documents/Arvore%20de%20Natal/index.html) para abrir diretamente em qualquer navegador (Google Chrome, Edge, Safari, Firefox), ou subir todos os arquivos para a sua hospedagem (Vercel, Netlify, Hostgator, Shopify, Nuvemshop ou VPS).

---

## 🛡️ Recursos Implementados

1. **Barra de Urgência Fixa no Topo:** Contador regressivo de 15 minutos (reinicia a cada visita) informando que o preço sobe em dezembro.
2. **Hero de Alto Impacto:** Título forte com destaques dourados, halo mágico de luz ao redor da imagem e botão com rolagem suave até as ofertas.
3. **3 Cards de Oferta Independentes:**
   - **Card 1:** Só a Árvore (R$ 149,96)
   - **Card 2:** Árvore + Trio de Papais Noéis (R$ 187,74) - Selo Mais Vendido
   - **Card 3:** Kit Completo (com borda dourada reluzente, maior destaque e selo Melhor Custo-Benefício)
   - Todos com indicação de unidades limitadas e botões independentes em nova aba.
4. **Benefícios:** 4 cards com ícones sobre facilidade, elegância, presentes e economia antecipada.
5. **Prova Social:** Contador de mais de 1.850 árvores vendidas e 3 depoimentos autênticos com 5 estrelas.
6. **Galeria Interativa:** Grade com lightbox para visualização em alta resolução ao clicar.
7. **FAQ Acordeão:** Sanfona rápida respondendo prazos, formas de pagamento, medidas, itens e compra.
8. **CTA Final & Botão Flutuante:** Botões de WhatsApp com tooltip e animações pulsantes.
9. **Pop-up de Saída (Exit Intent Multidisparo):**
   - Disparo por cursor saindo por cima no desktop.
   - Disparo por botão voltar no celular (`popstate`).
   - Disparo por rolagem rápida para cima no celular.
   - Disparo por troca de aba (`visibilitychange`).
   - Disparo por 40 segundos de inatividade.
   - Disparo por tentativa de fechar (`beforeunload`).
   - Limite configurado para no máximo 2 aparições por sessão e travamento automático quando o usuário clica em comprar ou no WhatsApp.
10. **Analytics:** Preparado com a função `trackEvent` que envia para o console e integra automaticamente com o Meta Pixel (`fbq`) e Google Analytics (`gtag`).
