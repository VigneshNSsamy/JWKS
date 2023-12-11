const express = require('express')
const jwt = require('jsonwebtoken')
const { generateKeyPairSync } = require('crypto')
const { log, error } = require('console')
const app = express()
const port = 8080


function generateJWKS(){
    const keyPair = generateRSAKeyPair()
    const kid = 'key-id1'

    const jwks = {
        keys: [
            {
                kty: 'RSA',
                kid,
                use: 'sig',
                alg: 'RS256',
                e: 'AQAB',
                n: keyPair.publicKey,
            },
        ],
    };
    return jwks;
}




app.get('./', (req,res) =>{
    const jwks = generateJWKS();
    res.json(jwks)
    if(jwks != null){
        console.log('Key Pair Generated.,');
    }else{
        console.log(error);
    }
})


app.listen(port, () =>{
    console.log("JWKS Server Runnong in PORT 8080");
})