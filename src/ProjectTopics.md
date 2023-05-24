

# Dicas importantes sobre NPM
A partir do npm 5.0.0 a opção `--save` é o comportamento padrão, portanto não precisa incluí-la, ela simplesmente cria a dependencia dentro do arquivo `package.json`. Esse arquivo é usado pelo gerenciador de pacotes para controlar e gerenciar as dependências do seu projeto.


# Dicas: REACTSTRAP
`opacity-80` definir a opacidade da <color> como 80%
`p-*` ajusta o padding do elemento
`my-*` adiciona espaçamento vertical ao componente
`mx-*` para adicionar espaçamento horizontal ao componente


As classes são nomeadas usando o formato `{property}{sides}-{size}` for xse `{property}{sides}-{breakpoint}-{size}` for `sm, md, lg, xl` e `xxl`.

Onde a propriedade é uma das seguintes:

`m`- para classes que define *margin*
`p`- para classes que define *padding*
Onde os lados são um dos seguintes:

`t`- para classes que definem `margin-top` ou `padding-top`
`b`- para classes que definem `margin-bottom` ou `padding-bottom`
`s`- (start) para classes que definem `margin-left` ou `padding-left` em LTR, `margin-right` ou `padding-right` em RTL
`e`- (end) para classes que definem `margin-right` ou `padding-right` em LTR, `margin-left` ou `padding-left` em RTL
`x`- para classes que definem tanto `*-left` e `*-right`
`y`- para classes que definem tanto `*-top` e `*-bottom`
blank - para classes que definem um `margin` ou `padding` em todos os 4 lados do elemento
Onde o tamanho é um dos seguintes:

`0`- para classes que eliminam o `margin` ou padding definindo-o para0
`1`- (por padrão) para classes que definem o `margin` ou `padding` para `$spacer * .25`
`2`- (por padrão) para classes que definem o `margin` ou `padding` para `$spacer * .5`
`3`- (por padrão) para classes que definem o `margin` ou `padding` para `$spacer`
`4`- (por padrão) para classes que definem o `margin` ou `padding` para `$spacer * 1.5`
`5`- (por padrão) para classes que definem o `margin` ou `padding` para `$spacer * 3`
auto- para classes que definem o `margin` para automático


## Color
"primary"
"secondary"
"danger"
"warning"
"info"
"light"
"dark"