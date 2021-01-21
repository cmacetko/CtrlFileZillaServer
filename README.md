# CtrlFileZillaServer

>  CtrlFileZillaServer é um conjunto de funções para gerenciar o FileZilla Server

![Language](https://img.shields.io/badge/language-nodejs-orange)
![Platforms](https://img.shields.io/badge/platforms-Windows%2C%20macOS%20and%20Linux-blue)
![License](https://img.shields.io/github/license/cmacetko/ctrlfilezillaserver)
[![HitCount](http://hits.dwyl.com/cmacetko/ctrlfilezillaserver.svg)](http://hits.dwyl.com/cmacetko/ctrlfilezillaserver)

**FileZilla** é um dos melhores **servidores FTP gratuitos**, fácil de utilizar e muito estável, porem, não possui API.
Toda gestão é feita via interface gráfica, o que acaba dificultando um gerenciamento automático do servidor.
Para contornar isto, criei um repositório que gerencia as contas de FTP modificando o arquivo XML **FileZilla Server.xml** localiado na pasta do **FileZilla Server**.

**Você pode baixar o Filezilla server em:**
[https://filezilla-project.org/download.php?type=server](https://filezilla-project.org/download.php?type=server)

------------

## Instalando

```javascript
npm install ctrlfilezillaserver
```

## Carregando o repositório

```javascript
var FilezillaCtrl = require('ctrlfilezillaserver');
```

## Iniciando

Antes de executar alguma das funções precisamos definir o diretório onde o Filezilla Server se encontra.
Esta é uma função assíncrona e após sua conclusão é feito as chamadas as funções.

```javascript
FilezillaCtrl.init("C:\\Program Files (x86)\\FileZilla Server\\").then(function(){

	// Aqui você faz a chamada a função desejada

}).catch(function(err){

	console.log(err);

});
```

Normalmente o Filezila Server fica no diretório abaixo:
`C:\\Program Files (x86)\\FileZilla Server\\`

## Listando as Contas Disponíveis

Esta função ira retornar um array com todas as constas, com os dados abaixo:
- Usuário
- Diretório
- Permissões

### Chamando

```javascript
FilezillaCtrl.init("C:\\Program Files (x86)\\FileZilla Server\\").then(function(){

	FilezillaCtrl.contas_listar().then(function(DadRet){

		console.log(JSON.stringify(DadRet));

	}).catch(function(err){

		console.log(err);

	});

}).catch(function(err){

	console.log(err);

});
```

### Retorno

```json
[
  {
    "Nome": "teste1",
    "Diretorio": "C:\\pasta1",
    "Permissoes": {
      "FileRead": true,
      "FileWrite": true,
      "FileDelete": true,
      "DirCreate": true,
      "DirDelete": true,
      "DirList": true,
      "DirSubdirs": true
    }
  }
  }
]
```

## Altera uma conta existe

### Chamando

```javascript
FilezillaCtrl.init("C:\\Program Files (x86)\\FileZilla Server\\").then(function(){

    var InfDad =    {   
                    Senha: "aaabbb", 
                    Diretorio: "C:\\PastaTeste1", 
                    Permissoes: {
                    "FileRead": true,
                    "FileWrite": true,
                    "FileDelete": true,
                    "FileAppend": true,
                    "DirCreate": true,
                    "DirDelete": true,
                    "DirList": true,
                    "DirSubdirs": true,
                    "IsHome": true,
                    "AutoCreate": false
                    } 
                    };

    FilezillaCtrl.contas_alterar("teste1", InfDad).then(function(){

        console.log("OK");
    
    }).catch(function(err){

        console.log(err);

    });

}).catch(function(err){

	console.log(err);

});
```

## Altera a Senha de uma Conta

### Chamando

```javascript
FilezillaCtrl.init("C:\\Program Files (x86)\\FileZilla Server\\").then(function(){

    FilezillaCtrl.contas_alterar_senha("teste1", "aaabbb").then(function(){

        console.log("OK");

    }).catch(function(err){

        console.log(err);

    });

}).catch(function(err){

	console.log(err);

});
```

## Altera o Diretório de uma Conta

### Chamando

```javascript
FilezillaCtrl.init("C:\\Program Files (x86)\\FileZilla Server\\").then(function(){

    FilezillaCtrl.contas_alterar_diretorio("teste1", "C:\\PastaTeste1").then(function(){

        console.log("OK");

    }).catch(function(err){

        console.log(err);

    });

}).catch(function(err){

	console.log(err);

});
```

## Altera as Permissões de uma Conta

### Chamando

```javascript
FilezillaCtrl.init("C:\\Program Files (x86)\\FileZilla Server\\").then(function(){

    var InfDad =    {
                    "FileRead": true,
                    "FileWrite": true,
                    "FileDelete": true,
                    "FileAppend": true,
                    "DirCreate": true,
                    "DirDelete": true,
                    "DirList": true,
                    "DirSubdirs": true,
                    "IsHome": true,
                    "AutoCreate": false
                    } ;

    FilezillaCtrl.contas_alterar_permissoes("teste1", InfDad).then(function(){

        console.log("OK");

    }).catch(function(err){

        console.log(err);

    });

}).catch(function(err){

	console.log(err);

});
```

## Verifica se uma Conta Existe

### Chamando

```javascript
FilezillaCtrl.init("C:\\Program Files (x86)\\FileZilla Server\\").then(function(){

    FilezillaCtrl.contas_existe("teste1").then(function(DadRet){

        console.log(JSON.stringify(DadRet));

    }).catch(function(err){

        console.log(err);

    });

}).catch(function(err){

	console.log(err);

});
```

### Retorno

- **true:** Conta existe
- **false:** Conta não existe

## Deleta uma Conta

### Chamando

```javascript
FilezillaCtrl.init("C:\\Program Files (x86)\\FileZilla Server\\").then(function(){

    FilezillaCtrl.contas_deletar("teste1").then(function(){

        console.log("OK");

    }).catch(function(err){

        console.log(err);

    });

}).catch(function(err){

	console.log(err);

});
```

## Criar uma nova Conta

### Chamando

```javascript
FilezillaCtrl.init("C:\\Program Files (x86)\\FileZilla Server\\").then(function(){

    var InfDad =    {   
                    Senha: "aaabbb", 
                    Diretorio: "C:\\PastaTeste1", 
                    Permissoes: {
                    "FileRead": true,
                    "FileWrite": true,
                    "FileDelete": true,
                    "FileAppend": true,
                    "DirCreate": true,
                    "DirDelete": true,
                    "DirList": true,
                    "DirSubdirs": true,
                    "IsHome": true,
                    "AutoCreate": false
                    } 
                    };

    FilezillaCtrl.contas_criar("teste1", InfDad).then(function(){

        console.log("OK");

    }).catch(function(err){

        console.log(err);

    });

}).catch(function(err){

	console.log(err);

});
```

## Referências

### Permissões

O nó de permissões possui as permissões abaixo:
- **FileRead:** Ler Arquivos
- **FileWrite:** Criar/Editar Arquivos
- **FileDelete:** Deletar Arquivos
- **DirCreate:** Criar Diretório
- **DirDelete:** Deletar Diretório
- **DirList:** Listar Diretórios
- **DirSubdirs:** Exibir Sub Diretórios

Os valores das variaveis é sempre um **boolean**, onde:
- **true:** Tem permissão
- **false:** Não tem permissão

## Sucesso/Erro

Em todas funções temos o retorno controlado em **then** e **catch** *(Padrão para funções Promises)*.
Na função **catch** esta presente um parâmetro que retorna um objeto **Error** indiando a causa do erro.

### Exemplo de Erro

#### Chamada

```javascript
FilezillaCtrl.init("C:\\Program Files (x86)\\FileZilla Server\\").then(function(){

    FilezillaCtrl.contas_deletar("XXXXXXXXXXX").then(function(){

        console.log("OK");

    }).catch(function(err){

        console.log(err);

    });

}).catch(function(err){

    console.log(err);

});
```

#### Retorno

```shell
Error: Error: Error: Conta nao localizada
    at Promise (C:\index.js:535:19)
    at new Promise (<anonymous>)
    at Object.contas_criar (G:\index.js:362:12)
    at G:\tests.js:7:19
```

# Contato

**Paloma Macetko**
- cmacetko@gmail.com
- https://github.com/cmacetko/
- https://www.npmjs.com/~cmacetko
- https://cmacetko.medium.com
- https://www.facebook.com/cmacetko
- https://www.instagram.com/cmacetko/
- https://twitter.com/cmacetko
- [Skype: cmacetko](skype:cmacetko "cmacetko")
- [Whatsapp: 47-91277858](https://wa.me/554791277858 "Whatsapp: 47-91277858")