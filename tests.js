var FilezillaCtrl = require('./lib');

FilezillaCtrl.init("C:\\Program Files (x86)\\FileZilla Server\\").then(function(){

    FilezillaCtrl.contas_listar().then(function(DadRet){

        console.log(JSON.stringify(DadRet));
    
    }).catch(function(err){

        console.log(err);

    });
   
    var InfDad = { Senha: "aaabbb", Diretorio: "C:\\PastaTeste1", Permissoes: {"FileRead": true,"FileWrite": true,"FileDelete": true,"FileAppend": true,"DirCreate": true,"DirDelete": true,"DirList": true,"DirSubdirs": true,"IsHome": true,"AutoCreate": false} };

    FilezillaCtrl.contas_alterar("teste1", InfDad).then(function(){

        console.log("OK");
    
    }).catch(function(err){

        console.log(err);

    });

    FilezillaCtrl.contas_alterar_senha("teste1", "aaabbb").then(function(){

        console.log("OK");

    }).catch(function(err){

        console.log(err);

    });

    FilezillaCtrl.contas_alterar_diretorio("teste1", "C:\\PastaTeste1").then(function(){

        console.log("OK");

    }).catch(function(err){

        console.log(err);

    });

    FilezillaCtrl.contas_alterar_permissoes("teste1", {"FileRead": true,"FileWrite": true,"FileDelete": true,"FileAppend": true,"DirCreate": true,"DirDelete": true,"DirList": true,"DirSubdirs": true,"IsHome": true,"AutoCreate": false}).then(function(){

        console.log("OK");

    }).catch(function(err){

        console.log(err);

    });
    
    FilezillaCtrl.contas_existe("teste1").then(function(DadRet){

        console.log(JSON.stringify(DadRet));

    }).catch(function(err){

        console.log(err);

    });

    FilezillaCtrl.contas_deletar("teste1").then(function(){

        console.log("OK");

    }).catch(function(err){

        console.log(err);

    });

    var InfDad = { Senha: "aaabbb", Diretorio: "C:\\PastaTeste1", Permissoes: {"FileRead": true,"FileWrite": true,"FileDelete": true,"FileAppend": true,"DirCreate": true,"DirDelete": true,"DirList": true,"DirSubdirs": true,"IsHome": true,"AutoCreate": false} };

    FilezillaCtrl.contas_criar("teste1", InfDad).then(function(){

        console.log("OK");

    }).catch(function(err){

        console.log(err);

    });

}).catch(function(err){

    console.log(err);

});