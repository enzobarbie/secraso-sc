# Secraso-SC

Refatoração completa do site oficial do [Secraso-SC](https://secraso-sc.org.br/) utilizando tecnologias modernas HTML5, CSS3 e JavaScript.

## 📋 Sobre o Projeto

O Secraso-SC é o site institucional do Sindicato dos Empregados em Empresas de Asseio e Conservação de Santa Catarina. Este projeto visa modernizar e otimizar a experiência dos usuários através de uma refatoração completa da plataforma.

## 🎯 Objetivos da Refatoração

- Modernizar a interface e experiência do usuário
- Otimizar performance e responsividade
- Implementar funcionalidades administrativas
- Melhorar acessibilidade e SEO

## 🚀 Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Responsividade**: CSS Grid, Flexbox
- **Otimização**: Minificação de assets, lazy loading

## ⚙️ Funcionalidades

### 🏠 Página Principal (Home)

#### **Header - Navegação**
- **Sindicato** (menu dropdown)
  - **Apresentação**: Informações institucionais do Secraso-SC
  - **Diretoria**: Perfis do Presidente, Vice-presidente e Tesoureiro
  - **Palavra do Presidente**: Mensagem institucional e valores
- **Convenções**: Área de downloads de documentos PDF
- **Contribuições**: Informações sobre a Contribuição Assistencial Patronal
- **Contato**: Formulário com campos: Nome completo, E-mail, Mensagem

#### **Seção Principal**
Três módulos principais de interação:

- **💬 Fale Conosco**
  - Formulário com campos: Nome completo, E-mail, Mensagem
  - Envio automático para: secrasosc@gmail.com
  
- **📋 Enquadramento Sindical**
  - Conteúdo informativo (em desenvolvimento)
  
- **🤝 Secraso te Representa**
  - Conteúdo institucional (em desenvolvimento)

#### **Footer**
- Informações de contato rápido
- Endereço completo da sede
- Logo e link para FeserviSul

### 🔧 Funcionalidades Administrativas (Planejadas)

- **Sistema de Upload**: Ferramenta para secretário adicionar documentos PDF
- **Gerenciamento de Conteúdo**: Interface para atualização de textos e informações

## 📁 Estrutura do Projeto
secraso-sc/
├── index.html
├── components/
│   ├── header.html
│   └── footer.html
├── pages/
│   ├── sindicato/
│   │   ├── apresentacao.html
│   │   ├── diretoria.html
│   │   └── palavra-presidente.html
│   ├── contato.html
│   └── convencoes.html
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   ├── components.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── main.js
│   │   ├── components.js
│   │   └── form-handler.js
│   └── images/
└── README.md