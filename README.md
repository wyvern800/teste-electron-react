### test-eletron-react
Criar um Aplicativo com Electron (opcional) e ReactJS da vaga do Infinity Login

### tl;dr
Escolhi o electron forge com o template typescript + vite pois ele facilita o processo de build e distribuição de apps Electron, reunindo em uma única ferramenta tudo o que você precisa para criar instaladores e distribuir seu app. Diferente do Electron normal, onde você precisa configurar várias ferramentas separadamente, o Forge automatiza essa parte com pouca configuração. Além disso, ele permite personalizar o processo com plugins e outras opções avançadas, tornando tudo mais rápido e prático para qualquer desenvolvedor.

## O que foi adotado no projeto:
- Conceitos SOLID para deixar o projeto mais coeso, reaproveitável e torna a sua manutenção mais simples, também foi separado todo o core da aplicação electron da parte do react.
- Foi implementado um serviço de Logger geral.
- Clean code para obter uma maior legibilidade na manutenabilidade.
- Foi criado uma instância base axios para ser extendida no repositório das requests da PokeAPI.
- Foi implementado jest para os tests unitários, porém consiste em um teste simples, e um teste mais extenso.
- Foi criado um contexto geral para lidar com states globais como dados dos pokemons, paginação, dark mode e etc. Porém existem outros "component states" que não foram acrescentados ao state por questão de abstração e necessidade.
- Para estilização utilizei styled-components, react-icons, @emotion. Porém gosto bastante de MUI, chakra-ui pois são maravilhosos de usar e poupam tempo.
- Conheço design patterns, gosto bastante do Composite Pattern porem não quis aplicar pois na mesma forma que é bonito e organizado, é mais complexo conforme o projeto vai escalando.

## Como rodar?
- Rodar os testes unitários: ``npm run test ou yarn test``
- Rodar o projeto no modo dev: 
```shell
1- npm install ou yarn install
2- npm run start ou yarn start
```
- Buildar: ``npm run make ou yarn make``

Adorei ter participado do projeto seletivo. Espero que gostem, fiz com mt carinho ;)