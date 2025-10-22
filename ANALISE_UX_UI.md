# Análise Visual e Funcional da Interface

## Problemas Identificados

### 1. Tipografia e Hierarquia

- **Falta de hierarquia visual clara** entre os elementos
- **Título da disciplina** poderia ter maior destaque através de tamanho de fonte ou peso
- **Espaçamento inconsistente** entre seções

### 2. Alinhamento e Espaçamento

- **Alinhamento à esquerda muito rígido** em todos os elementos
- **Falta de respiração** entre "Disciplina/Participantes/Notas/Banco de questões"
- **Margens laterais** poderiam ser otimizadas

### 3. Elementos Interativos

- **Falta de feedback visual** para os itens clicáveis
- **Ausência de estados hover/active** para melhor UX
- **Links não diferenciados** visualmente do texto comum

## Propostas de Melhoria

### 1. Melhorias de Hierarquia Visual

- Aumentar o tamanho da fonte do título da disciplina para `24px` e aplicar um peso de fonte mais forte.
- Utilizar cores contrastantes para diferenciar seções importantes.

### 2. Ajustes de Espaçamento

- Adicionar `margin-bottom: 24px` após o título principal
- Aplicar `padding: 16px` nos elementos de navegação
- Criar `gap: 12px` entre os itens do menu

### 3. Elementos Decorativos e Funcionais

- **Adicionar ícones** antes de cada item do menu (📚, 👥, 📊, ❓)
- **Implementar hover states** com transição suave
- **Adicionar divisor sutil** entre "Percurso 1" e o conteúdo anterior
- **Criar cards com sombra sutil** para os elementos principais

### 4. Melhoria de UX

- **Feedback visual imediato** ao interagir com elementos
- **Estados de foco** para acessibilidade
- **Transições suaves** entre estados
- **Agrupamento visual** dos elementos relacionados
