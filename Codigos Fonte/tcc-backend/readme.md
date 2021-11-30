# Instalando Backend do projeto cbcPortaria

npm install --save

# Banco de Dados

Na sua interface crie o banco A2mi

# DB Connect:

No arquivo ormconfig.json<br />
Insira as informações de acordo com o banco instalado na maquina

```
  {
    "type": "tipo do banco",
    "host": "localhost",
    "port": porta_do_banco,
    "username": "usuário_do_banco",
    "password": "senha_do_banco"",
    ...
  },
  {
    "name": "seeds",
    "type": "tipo do banco",
    "host": "localhost",
    "port": porta_do_banco,
    "username": "usuário_do_banco",
    "password": "senha_do_banco"",
    ...
  }
  ...
}
```

# Inicializando Banco

npm run typeorm migrations:run<br />
npm run seed:run<br /> 
<br />
ou
<br /><br />
yarn typeorm migrations:run<br />
yarn seed:run

# Scripts
npm run dev:server => inicia a api no ambiente de desenvolvimento<br />
<br />
ou 
<br /><br />
yarn dev:server => inicia a api no ambiente de desenvolvimento<br />