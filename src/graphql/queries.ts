export const GET_USERS = `
  query {
    users {
      id
      email
    }
  }
`;

export const CREATE_USER = `
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      email
      id
      token
    }
  }
`;

export const LOGIN_USER = `
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        id
        email
        token
      }
    }
`;

export const VALIDATE_TOKEN = `
    mutation ValidateToken($token: String!) {
      validateToken(token: $token) {
        token
        id
        email
      }
    }
`;

export const AVANCARMAPA = `
    mutation AvancarMapa($userId: ID!) {
    avancarMapa(userId: $userId) {
    nome
    posicaoAtual
    locaisVisitados {
      nome
      posicoes {
        nome
        disponivel
      }
    }
  }
}
`;

export const MINHACAMPANHA = `
    query MinhaCampanha($userId: ID!) {
  minhaCampanha(userId: $userId) {
    mapa {
      nome
      posicaoAtual
      locaisVisitados {
        nome
        posicoes {
          nome
          disponivel
        }
      }
    }
    vida
    fome
    sede
    dia
    inimigoAtual {
      nome
      descricao
      vida
      dano
    }
    armaEquipada {
      nome
      dano
      tipo
    }
    inventario {
      nome
      tipo
      dano
      fome
      sede
      quantidade
    }
  }
}
`;

export const PROCURARLOOT = `
    mutation ProcurarItemNoMapa($userId: ID!) {
  procurarItemNoMapa(userId: $userId) {
    nome
    tipo
    dano
    fome
    sede
    quantidade
  }
}
`;

export const ATACARINIMIGO = `
    mutation AtacarInimigo($userId: ID!, $dano: Int!) {
  atacarInimigo(userId: $userId, dano: $dano) {
    nome
    descricao
    vida
    dano
  }
}
`;

export const CONSUMIRCOMIDA = `
mutation ConsumirComida($userId: ID!, $itemNome: String!) {
  consumirComida(userId: $userId, itemNome: $itemNome) {
    inventario {
      nome
      tipo
      dano
      fome
      sede
      quantidade
    }
  }
}
`;

export const ATUALIZARCAMPANHA = `
  mutation AtualizarCampanha($userId: ID!, $adicionarItem: InventarioItemInput, $tomarDano: Int, $perderFome: Int, $perderSede: Int, $pularDia: Boolean) {
  atualizarCampanha(userId: $userId, adicionarItem: $adicionarItem, tomarDano: $tomarDano, perderFome: $perderFome, perderSede: $perderSede, pularDia: $pularDia) {
    inventario {
      nome
      tipo
      dano
      fome
      sede
      quantidade
    }
    vida
    fome
    sede
    dia
    mapa {
      nome
      posicaoAtual
      locaisVisitados {
        nome
        posicoes {
          nome
          disponivel
        }
      }
    }
    inimigoAtual {
      nome
      descricao
      vida
      dano
    }
    armaEquipada {
      nome
      dano
      tipo
    }
  }
}
`;