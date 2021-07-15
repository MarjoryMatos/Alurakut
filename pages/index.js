import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakurtCommons';
import { ProfileRelationsBoxWrapper } from '../src/profileRelations'

function ProfileSidebar(propriedades) {

  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={`http://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>

  )

}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>

      <ul>
        {/*seguidores.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a a href={`https://github.com/${itemAtual}.png`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })*/}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}


export default function Home() {
  const githubUser = "MarjoryMatos";
  const [comunidades, setComunidades] = React.useState([
    {
    id: '12802378123789378912789789123896123',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'

  },
  {
    id: 2,
    title: 'Não fui eu, foi meu Eu lírico',
    image:
      'https://img10.orkut.br.com/community/5e4d5320754f378e9168d5028ba98728.jpg',
  },
]);

  
  console.log('Nosso teste');

  const amigos = [
    'Yhuri-Gross',
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev']


  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(function () {
    fetch(`https://api.github.com/users/peas/followers`)
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function (respostaCompleta) {
        setSeguidores(respostaCompleta);
      })


// API GraphQL
fetch('https://graphql.datocms.com/', {
  method: 'POST',
  headers: {
    'Authorization': '6d3046af24ff8696a6f4b0896b154b',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({ "query": `query {
    allCommunities {
      id 
      title
      imageUrl
      
    }
  }` })
})
.then((response) => response.json()) // Pega o retorno do response.json() e já retorna
.then((respostaCompleta) => {
  const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
  console.log(comunidadesVindasDoDato)
  setComunidades(comunidadesVindasDoDato)
})
// .then(function (response) {
//   return response.json()
// })

}, [])

console.log('seguidores antes do return', seguidores);




return (
  <>
    <AlurakutMenu />
    <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfileSidebar githubUser={githubUser} />
      </div>

      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">
            Bem vindo(a)
          </h1>
          <OrkutNostalgicIconSet recados={10} sexy={3} legal={1} confiável={2} />
        </Box>

        <Box>
          <h2 className="subTitle">O que você deseja fazer?</h2>
          <form onSubmit={function handleCriarComunidade(e) {
            e.preventDefault();
            const dadosDoForm = new FormData(e.target);

            console.log('Campo: ', dadosDoForm.get('title'));
            console.log('Campo: ', dadosDoForm.get('image'));

            const comunidade = {
              id: new Date().toISOString(),
              title: dadosDoForm.get('title'),
              image: dadosDoForm.get('image'),
              imageUrl: dadosDoForm.get('image'),
              
            }
            const comunidadesAtualizadas = [...comunidades, comunidade];
            setComunidades(comunidadesAtualizadas)
            
            fetch('/api/comunidades', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(comunidade)
            })
            .then(async (response) => {
              const dados = await response.json();
              console.log(dados.registroCriado);
              const comunidade = dados.registroCriado;
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)
            })

          }}>
            <div>
              <input
                placeholder="Qual vai ser o nome da sua comunidade?"
                name="title"
                arial-label="Qual vai ser o nome da sua comunidade?"
                type="text"
              />
            </div>
            <div>
              <input
                placeholder="Coloque uma url para usarmos de capa"
                name="image"
                arial-label="Coloque uma url para usarmos de capa"
              />
            </div>

            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
      </div>

      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBox title="Seguidores" items={seguidores} />
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Comunidades ({comunidades.length})
          </h2>
          <ul>
            {comunidades.map((itemAtual) => {
              return (
                <li key={itemAtual.id}>
                  <a href={`/communites/${itemAtual.title}`}>
                    <img src={itemAtual.imageUrl} />
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Amigos ({amigos.length})
          </h2>

          <ul>
            {amigos.map((itemAtual) => {
              return (
                <li key={itemAtual}>
                  <a href={`/users/${itemAtual}`}>
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>

      </div>
    </MainGrid>
  </>
)
          } 
