var fs = require('fs');
var convert = require('xml-js');
var spawn = require('await-spawn')

var util = require('./util');
var filezilla = require('./filezilla');

var PathFileZilla = "";
var ObjXML;

async function SalvarXML()
{

    return new Promise((resolve, reject) => {

        try {

            var RetXml = convert.js2xml(ObjXML, {compact: true, spaces: 4});

            fs.writeFile(PathFileZilla + "FileZilla Server.xml", RetXml, function(err) {
                
                if(err)
                {

                    throw new Error(err);

                }else{

                    ReiniciarFilezilla().then(function(){

                        resolve();
        
                    });

                }

            });

            resolve();

        } catch(err) {
            
            throw new Error(err);

        }

    });

}

async function ReiniciarFilezilla()
{

    try {

        var ObjProc = await spawn(PathFileZilla + "FileZilla Server.exe", ['/reload-config'])

    } catch(err) {
        
        throw new Error(err);

    }

}

async function init(_PathFileZilla) {

    return new Promise((resolve, reject) => {
        
        try {

            PathFileZilla = _PathFileZilla;

            if(!fs.existsSync(PathFileZilla)){

                 throw new Error("Diretorio nao localizado");

            }else if(!fs.existsSync(PathFileZilla + "FileZilla Server.xml")){

                 throw new Error("Arquivo 'FileZilla Server.xml' nao foi localizado");

            }else if(!fs.existsSync(PathFileZilla + "FileZilla Server.exe")){

                throw new Error("Arquivo 'FileZilla Server.exe' nao foi localizado");

            }

            fs.readFile(PathFileZilla + "FileZilla Server.xml", function(err, data) {
        
                if(err)
                {

                    throw new Error(err);

                }else{
        
                    ObjXML = convert.xml2js(data, {compact: true, spaces: 4});

                    resolve();

                }

            });

        } catch(err) {
        
            throw new Error(err);

        }
        
    });

}

async function contas_listar() {

    return new Promise((resolve, reject) => {
        
        try {

            var ListRet = [];

            if( util.isArray(ObjXML.FileZillaServer.Users.User) == true )
            {

                util.forEach(ObjXML.FileZillaServer.Users.User, function (Ret1Obj, Ret1Index) {
                    
                    ListRet.push(filezilla.contas_dados(Ret1Obj));

                });

            }else{

                ListRet.push(filezilla.contas_dados(ObjXML.FileZillaServer.Users.User));

            }

            resolve(ListRet);

        } catch(err) {
            
            throw new Error(err);

        }
        
    });

}

async function contas_alterar(Conta, NDados) {

    return new Promise((resolve, reject) => {
        
        try {

            filezilla.validacao_contas_alterar(ObjXML, Conta, NDados);

            if( util.isArray(ObjXML.FileZillaServer.Users.User) == true )
            {

                util.forEach(ObjXML.FileZillaServer.Users.User, function (Ret1Obj, Ret1Index) {
                    
                    filezilla.contas_alterar_senha(Ret1Obj, Conta, NDados.Senha);
                    filezilla.contas_alterar_diretorio(Ret1Obj, Conta, NDados.Diretorio);
                    filezilla.contas_alterar_permissoes(Ret1Obj, Conta, NDados.Permissoes);

                });

            }else{

                filezilla.contas_alterar_senha(ObjXML.FileZillaServer.Users.User, Conta, NDados.Senha);
                filezilla.contas_alterar_diretorio(ObjXML.FileZillaServer.Users.User, Conta, NDados.Diretorio);
                filezilla.contas_alterar_permissoes(ObjXML.FileZillaServer.Users.User, Conta, NDados.Permissoes);

            }

            SalvarXML().then(function(){

                resolve();

            });

        } catch(err) {
            
            throw new Error(err);

        }
        
    });

}

async function contas_alterar_senha(Conta, NDados) {

    return new Promise((resolve, reject) => {
        
        try {

            filezilla.validacao_contas_alterar_pre(ObjXML, Conta);
            filezilla.validacao_contas_alterar_senha(ObjXML, Conta, NDados);

            if( util.isArray(ObjXML.FileZillaServer.Users.User) == true )
            {

                util.forEach(ObjXML.FileZillaServer.Users.User, function (Ret1Obj, Ret1Index) {
                    
                    filezilla.contas_alterar_senha(Ret1Obj, Conta, NDados);

                });

            }else{

                filezilla.contas_alterar_senha(ObjXML.FileZillaServer.Users.User, Conta, NDados);

            }

            SalvarXML().then(function(){

                resolve();

            });

        } catch(err) {
            
            throw new Error(err);

        }
        
    });

}

async function contas_alterar_diretorio(Conta, NDados) {

    return new Promise((resolve, reject) => {
        
        try {

            filezilla.validacao_contas_alterar_pre(ObjXML, Conta);
            filezilla.validacao_contas_alterar_diretorio(ObjXML, Conta, NDados);

            if( util.isArray(ObjXML.FileZillaServer.Users.User) == true )
            {

                util.forEach(ObjXML.FileZillaServer.Users.User, function (Ret1Obj, Ret1Index) {
                    
                    filezilla.contas_alterar_diretorio(Ret1Obj, Conta, NDados);

                });

            }else{

                filezilla.contas_alterar_diretorio(ObjXML.FileZillaServer.Users.User, Conta, NDados);

            }

            SalvarXML().then(function(){

                resolve();

            });

        } catch(err) {
            
            throw new Error(err);

        }
        
    });

}

async function contas_alterar_permissoes(Conta, NDados) {

    return new Promise((resolve, reject) => {
        
        try {

            filezilla.validacao_contas_alterar_pre(ObjXML, Conta);
            filezilla.validacao_contas_alterar_permissoes(ObjXML, Conta, NDados);

            if( util.isArray(ObjXML.FileZillaServer.Users.User) == true )
            {

                util.forEach(ObjXML.FileZillaServer.Users.User, function (Ret1Obj, Ret1Index) {
                    
                    filezilla.contas_alterar_permissoes(Ret1Obj, Conta, NDados);

                });

            }else{

                filezilla.contas_alterar_permissoes(ObjXML.FileZillaServer.Users.User, Conta, NDados);

            }

            SalvarXML().then(function(){

                resolve();

            });

        } catch(err) {
            
            throw new Error(err);

        }
        
    });

}

async function contas_existe(Conta) {

    return new Promise((resolve, reject) => {
        
        try {

            filezilla.validacao_contas_existe(ObjXML, Conta);

            resolve(filezilla.contas_existe(ObjXML, Conta));

        } catch(err) {
            
            throw new Error(err);

        }
        
    });

}

async function contas_deletar(Conta) {

    return new Promise((resolve, reject) => {
        
        try {

            filezilla.validacao_contas_deletar(ObjXML, Conta);

            filezilla.contas_deletar(ObjXML, Conta);

            SalvarXML().then(function(){

                resolve();

            });

        } catch(err) {
            
            throw new Error(err);

        }
        
    });

}

async function contas_criar(Conta, NDados) {

    return new Promise((resolve, reject) => {
        
        try {

            filezilla.validacao_contas_criar(ObjXML, Conta, NDados);

            var ObjSenha = util.hashPassword(NDados.Senha);
            var NConta = {
            "_attributes": {
                "Name":  Conta
            },
            "Option": [
                {
                "_attributes": {
                    "Name": "Pass"
                },
                "_text": ObjSenha.hash
                },
                {
                "_attributes": {
                    "Name": "Salt"
                },
                "_text": ObjSenha.salt
                },
                {
                "_attributes": {
                    "Name": "Group"
                }
                },
                {
                "_attributes": {
                    "Name": "Bypass server userlimit"
                },
                "_text": "0"
                },
                {
                "_attributes": {
                    "Name": "User Limit"
                },
                "_text": "0"
                },
                {
                "_attributes": {
                    "Name": "IP Limit"
                },
                "_text": "0"
                },
                {
                "_attributes": {
                    "Name": "Enabled"
                },
                "_text": "1"
                },
                {
                "_attributes": {
                    "Name": "Comments"
                }
                },
                {
                "_attributes": {
                    "Name": "ForceSsl"
                },
                "_text": "0"
                }
            ],
            "IpFilter": {
                "Disallowed": {},
                "Allowed": {}
            },
            "Permissions": {
                "Permission": {
                "_attributes": {
                    "Dir": NDados.Diretorio
                },
                "Option": [
                    {
                    "_attributes": {
                        "Name": "FileRead"
                    },
                    "_text": (( NDados.Permissoes.FileRead == true ) ? "1" : "2" )
                    },
                    {
                    "_attributes": {
                        "Name": "FileWrite"
                    },
                    "_text": (( NDados.Permissoes.FileWrite == true ) ? "1" : "2" )
                    },
                    {
                    "_attributes": {
                        "Name": "FileDelete"
                    },
                    "_text": (( NDados.Permissoes.FileDelete == true ) ? "1" : "2" )
                    },
                    {
                    "_attributes": {
                        "Name": "FileAppend"
                    },
                    "_text": (( NDados.Permissoes.FileAppend == true ) ? "1" : "2" )
                    },
                    {
                    "_attributes": {
                        "Name": "DirCreate"
                    },
                    "_text": (( NDados.Permissoes.DirCreate == true ) ? "1" : "2" )
                    },
                    {
                    "_attributes": {
                        "Name": "DirDelete"
                    },
                    "_text": (( NDados.Permissoes.DirDelete == true ) ? "1" : "2" )
                    },
                    {
                    "_attributes": {
                        "Name": "DirList"
                    },
                    "_text": (( NDados.Permissoes.DirList == true ) ? "1" : "2" )
                    },
                    {
                    "_attributes": {
                        "Name": "DirSubdirs"
                    },
                    "_text": (( NDados.Permissoes.DirSubdirs == true ) ? "1" : "2" )
                    },
                    {
                    "_attributes": {
                        "Name": "IsHome"
                    },
                    "_text": (( NDados.Permissoes.IsHome == true ) ? "1" : "2" )
                    },
                    {
                    "_attributes": {
                        "Name": "AutoCreate"
                    },
                    "_text": (( NDados.Permissoes.AutoCreate == true ) ? "1" : "2" )
                    }
                ]
                }
            },
            "SpeedLimits": {
                "_attributes": {
                "DlType": "0",
                "DlLimit": "10",
                "ServerDlLimitBypass": "0",
                "UlType": "0",
                "UlLimit": "10",
                "ServerUlLimitBypass": "0"
                },
                "Download": {},
                "Upload": {}
            }
            };

            if( util.isArray(ObjXML.FileZillaServer.Users.User) == true )
            {

                ObjXML.FileZillaServer.Users.User.push(NConta);

            }else{

                ObjXML.FileZillaServer.Users.User           = util.valuesToArray(ObjXML.FileZillaServer.Users);
                ObjXML.FileZillaServer.Users.User.push(NConta);

                
            }

            SalvarXML().then(function(){

                resolve();

            });

        } catch(err) {
            
            throw new Error(err);

        }
        
    });

}

module.exports.init = init;
module.exports.contas_listar = contas_listar;
module.exports.contas_alterar = contas_alterar;
module.exports.contas_alterar_senha = contas_alterar_senha;
module.exports.contas_alterar_diretorio = contas_alterar_diretorio;
module.exports.contas_alterar_permissoes = contas_alterar_permissoes;
module.exports.contas_existe = contas_existe;
module.exports.contas_deletar = contas_deletar;
module.exports.contas_criar = contas_criar;