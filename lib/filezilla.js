var fs = require('fs');
var util = require('./util');

var ListPermissoes = ["FileRead", "FileWrite", "FileDelete", "DirCreate", "DirDelete", "DirList", "DirSubdirs"];

module.exports = {

    contas_dados: function(ObjConta) 
    {

        try 
        {
            
            var RetInf                  = {};

            RetInf["Nome"]              = ObjConta._attributes.Name;
            RetInf["Diretorio"]         = ObjConta.Permissions.Permission._attributes.Dir;
            RetInf["Permissoes"]        = {};

            util.forEach(ObjConta.Permissions.Permission.Option, function (Ret2Obj, Ret2Index) {
        
                if( ListPermissoes.includes(Ret2Obj._attributes.Name) == true )
                {

                    if( Ret2Obj._text == "1" )
                    {

                        RetInf["Permissoes"][Ret2Obj._attributes.Name]      = true;

                    }else{

                        RetInf["Permissoes"][Ret2Obj._attributes.Name]      = false;

                    }

                }
    
            });

            return RetInf;

        } catch(err) {
            
            throw new Error(err);

        }

    },

    contas_alterar_senha: function(ObjConta, Conta, Senha) 
    {

        try {
            
            if( ObjConta._attributes.Name == Conta )
            {

                util.forEach(ObjConta.Option, function (Ret2Obj, Ret2Index) {
                
                    var ObjSenha = util.hashPassword(Senha);

                    if( Ret2Obj._attributes.Name == "Pass" )
                    {

                        Ret2Obj._text = ObjSenha.hash;

                    }

                    if( Ret2Obj._attributes.Name == "Salt" )
                    {

                        Ret2Obj._text = ObjSenha.salt;

                    }

                    if( Ret2Obj._attributes.Name == "Comments" )
                    {

                        Ret2Obj._text = "Editado em " + new Date();

                    }

                });

            }

        } catch(err) {
            
            throw new Error(err);

        }

    },

    contas_alterar_diretorio: function(ObjConta, Conta, Diretorio) 
    {

        try {

            if( ObjConta._attributes.Name == Conta )
            {

                ObjConta.Permissions.Permission._attributes.Dir = Diretorio;

            }

        } catch(err) {
            
            throw new Error(err);

        }

    },

    contas_alterar_permissoes: function(ObjConta, Conta, Permissoes) 
    {

        try {

            util.forEach(ObjConta.Permissions.Permission.Option, function (Ret2Obj, Ret2Index) {
        
                if( Permissoes[Ret2Obj._attributes.Name] == true )
                {
    
                    Ret2Obj._text        = 1;

                }else{

                    Ret2Obj._text        = 0;

                }
    
            });

        } catch(err) {
            
            throw new Error(err);

        }

    },

    contas_existe: function(ObjConta, Conta) 
    {

        var ListRet = false;

        try {

            if( util.isArray(ObjConta.FileZillaServer.Users.User) == true )
            {

                util.forEach(ObjConta.FileZillaServer.Users.User, function (Ret1Obj, Ret1Index) {
                    
                    if( Ret1Obj._attributes.Name == Conta )
                    {

                        ListRet     = true;

                    }

                });

            }else{

                if( ObjConta.FileZillaServer.Users.User._attributes.Name == Conta )
                {

                    ListRet     = true;

                }

            }

        } catch(err) {
            
            //

        }

        return ListRet;

    },

    contas_deletar: function(ObjConta, Conta) 
    {

        var ListRet = false;

        try {

            if( util.isArray(ObjConta.FileZillaServer.Users.User) == true )
            {

                util.forEach(ObjConta.FileZillaServer.Users.User, function (Ret1Obj, Ret1Index) {
                    
                    if( Ret1Obj._attributes.Name == Conta )
                    {

                        ObjConta.FileZillaServer.Users.User.splice(Ret1Index, 1);

                    }

                });

            }else{

                if( ObjConta.FileZillaServer.Users.User._attributes.Name == Conta )
                {

                    ObjConta.FileZillaServer.Users.User.splice(0, 1);

                }

            }

        } catch(err) {
            
            //

        }

        return ListRet;

    },

    validacao_contas_alterar: function(ObjXML, Conta, NDados) 
    {
        
        try {

            if( Conta == "" )
            {

                throw new Error("Preencha a Conta");

            }

            if( this.contas_existe(ObjXML, Conta) == false )
            {

                throw new Error("Conta nao localizada");

            }
            
            if( NDados.hasOwnProperty("Senha") == false )
            {

                throw new Error("Preencha a Senha");

            }

            if( NDados.Senha == "" )
            {

                throw new Error("Preencha a Senha");

            }

            if( NDados.hasOwnProperty("Diretorio") == false )
            {

                throw new Error("Preencha a Senha");

            }

            if( NDados.Diretorio == "" )
            {

                throw new Error("Preencha o Diretorio");

            }

            if( !fs.existsSync(NDados.Diretorio) )
            {

                throw new Error("Diretorio nao localizado");

            }

            if( NDados.hasOwnProperty("Permissoes") == false )
            {

                throw new Error("Preencha as Permissoes");

            }

            util.forEach(ListPermissoes, function (RetPermNome, RetPermIndex) {

                if( NDados.Permissoes.hasOwnProperty(RetPermNome) == false )
                {

                    throw new Error("Preencha a Permissao " + RetPermNome);

                }
                
                if( typeof(NDados.Permissoes[RetPermNome]) !== "boolean" )
                {

                    throw new Error("Preencha a Permissao " + RetPermNome + " com um valor boolean");

                }

            });

        } catch(err) {
            
            throw new Error(err);

        }

    },

    validacao_contas_alterar_pre: function(ObjXML, Conta) 
    {

        try {

            if( Conta == "" )
            {

                throw new Error("Preencha a Conta");

            }

            if( this.contas_existe(ObjXML, Conta) == false )
            {

                throw new Error("Conta nao localizada");

            }

        } catch(err) {
            
            throw new Error(err);

        }

    },
    
    validacao_contas_alterar_senha: function(ObjXML, Conta, NDados) 
    {

        try {

            if( NDados == "" )
            {

                throw new Error("Preencha a Senha");

            }

        } catch(err) {
            
            throw new Error(err);

        }

    },

    validacao_contas_alterar_diretorio: function(ObjXML, Conta, NDados) 
    {

        try {

            if( NDados == "" )
            {

                throw new Error("Preencha o Diretorio");

            }

            if( !fs.existsSync(NDados) )
            {

                throw new Error("Diretorio nao localizado");

            }

        } catch(err) {
            
            throw new Error(err);

        }

    },

    validacao_contas_alterar_permissoes: function(ObjXML, Conta, NDados) 
    {

        try {

            util.forEach(ListPermissoes, function (RetPermNome, RetPermIndex) {

                if( NDados.hasOwnProperty(RetPermNome) == false )
                {

                    throw new Error("Preencha a Permissao " + RetPermNome);

                }
                
                if( typeof(NDados[RetPermNome]) !== "boolean" )
                {

                    throw new Error("Preencha a Permissao " + RetPermNome + " com um valor boolean");

                }

            });

        } catch(err) {
            
            throw new Error(err);

        }

    },

    validacao_contas_existe: function(ObjXML, Conta) 
    {

        try {

            if( Conta == "" )
            {

                throw new Error("Preencha a Conta");

            }

        } catch(err) {
            
            throw new Error(err);

        }

    },

    validacao_contas_deletar: function(ObjXML, Conta) 
    {

        try {

            if( Conta == "" )
            {

                throw new Error("Preencha a Conta");

            }

            if( this.contas_existe(ObjXML, Conta) == false )
            {

                throw new Error("Conta nao localizada");

            }

        } catch(err) {
            
            throw new Error(err);

        }

    },

    validacao_contas_criar: function(ObjXML, Conta, NDados) 
    {

        try {

            if( Conta == "" )
            {

                throw new Error("Preencha a Conta");

            }

            if( this.contas_existe(ObjXML, Conta) == true )
            {

                throw new Error("Conta ja localizada");

            }
            
            if( NDados.hasOwnProperty("Senha") == false )
            {

                throw new Error("Preencha a Senha");

            }

            if( NDados.Senha == "" )
            {

                throw new Error("Preencha a Senha");

            }

            if( NDados.hasOwnProperty("Diretorio") == false )
            {

                throw new Error("Preencha a Senha");

            }

            if( NDados.Diretorio == "" )
            {

                throw new Error("Preencha o Diretorio");

            }

            if( !fs.existsSync(NDados.Diretorio) )
            {

                throw new Error("Diretorio nao localizado");

            }

            if( NDados.hasOwnProperty("Permissoes") == false )
            {

                throw new Error("Preencha as Permissoes");

            }

            util.forEach(ListPermissoes, function (RetPermNome, RetPermIndex) {

                if( NDados.Permissoes.hasOwnProperty(RetPermNome) == false )
                {

                    throw new Error("Preencha a Permissao " + RetPermNome);

                }
                
                if( typeof(NDados.Permissoes[RetPermNome]) !== "boolean" )
                {

                    throw new Error("Preencha a Permissao " + RetPermNome + " com um valor boolean");

                }

            });

        } catch(err) {
            
            throw new Error(err);

        }

    }

}