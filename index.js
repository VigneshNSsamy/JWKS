const express = require('express')
const JWT = require('jsonwebtoken')
const { generateKeyPairSync } = require('crypto')
const crypto = require('crypto')
const { log, error } = require('console')
const fs = require('fs')
const app = express()
const port = 8080



const privateKey = crypto.generateKeyPairSync('rsa', {
    modulusLength:2048,
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: 'hello jwt private'
    },
});
console.log(privateKey);


fs.writeFileSync('private-key.pem', privateKey.privateKey);

const publicKey = fs.readFileSync('./public-key.pem', 'utf8');
const payload = {message: 'Hai from Private..'};
const pvtKey = `-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIFLTBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQISk1r+mKB4JACAggA
MAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBCQpZ5fJZzHfPi1ch9mXvjfBIIE
0LtqumiAhFm/uAr4d0KBMs7QQVnmrcb5YkmgTePHrm9HDJdli5HbFpcK9QYEFV7P
xdeHRaPtotV6pCk+Dw04+lHoD/VDnKccZOHPDBwoSCBGDEeKkQERdPZNADVrfxbX
BRZiFolEotsG379EAIGhyo8GUttJu0aeo8tk7aLoL1t6T7NJ8KgtcEeOi6NgM32Q
Wiue0sYBzprh1RfiO4IArWRtvjRSw12N4H7U4kRSq0Ge3gEcIlYw5cG7MoxNoEax
4vLL5zr90dQ9a7xZFVEf9CNeYYM1KzbeGFuufDhjor1Wv1Y/s4t66gIcEWDOGyTk
Zlit4ugqBoTfU5e2p3DNr7gxbIaQXzMKpBxXpP1bnHmwi+EdEUj6qVDcDV4a6/hC
olx7QhbBRc1gbUhWvyJfT3YeYQme8ryhFo0l3qQ6CI9DD0voShGPKROUu4Bji2dP
wC7iwoqD9HBpCBZmdWtGqz+Aw99q/2+t6I1wqowBsTDIWPSryglqTprnh1rk8MxI
Yk/q2ehWynidrp/0LQi1WO32fPDPpCRl+r/deuel9tmOOjv5T6JvJK+EhaPSvsF4
kBYo6VdrWWCNFhgPAjDH4o8ExB3JkQPr5ySxx9OTrbMPK516su+ODZpQPkMSxIcg
J1Ow1n3bEBwSi/jALtNZ0KHVj3EUl7DFN7YiSNx9Olo7E1dDpjKJwlL1KApSWfzf
YztVBSl+CyP8MPmsl6IAq7x8uz0LpgrcJ9w9bWGPoF6FVf/bg75Y/UetcLaNlakL
QDjrA5nVzkcWW2TbKDqsCAK0HiTggegB5+AMcH0DADcL/XhBfM6DVs6mNEGj6XJn
ECtaJ2gSEvo2aCWeTIo60+cB4wbtpAgagz18jpux3e36DeCbdcTiA1uD/fl16jwZ
FMhMTlJyVfQAW0/FfEqb24/qY8/Rz8eLwCa7a40pCNgiZGB0rxCDtevJo4+3lPtz
obU0Z5PDYZAZAcZ8UoSTChCTOH7fCZl/S1cxA6Kui6BTXwbxanPs/Z4bMr9QfTHw
JLCCvSQ+rWXCsAb6cgWETxI7BZR55CUjwOmn9NIn4EQVm19Ex9ZX+QaKpZd6fa6u
HR23zieEeWSKnBZPrzXpbicVkITfh0ScPiB00AWDIf91dYvq/E9crbjLS1pOzRhh
AMWS0ckKH5PuoFt2gjgKLTGJeevgdSDEExFtfB9AdHLmnaesQyk0qxOxtvOojHIb
oSMLhHYu5I2hdS5BtAHme/q/I6S73AvKeE3ZSM153gCQYAG1gcqpJgnBVVD9GSjd
PBfbDoou3z118grRALvbsR8f0oS/qjIVqox5IHtI9aKKu1D2tDbzah4HaO6EpGyI
jDrdSorp6GejrFDFDPtmLzHa/Hx44eRzoCnt9a1qDi5B2X5UlRIPh4QM5NiX3HEm
XOd/QeFsNh6Iy97utfXmEMpWSs2kGNXWwnLCZejCKEUBnro/iD9A8IWPacdybuYD
C83ho+cPtuXQ6aCcNAdBb1QWcmLffM55tTTLpMZxJl70hXJ/TlnRwkSGs7zM/Nq7
LT7L+ExhBnTAsCK19JKJgFUGfF1Xbc3gLsTkxE2RhNGWujzQcVyX/ChlWGx9Nzbn
0OTwnRM3CasVb+r23WMyxi1ujb+OQSCBKCzbbwO+u9wU
-----END ENCRYPTED PRIVATE KEY-----`
const getin = JWT.sign(payload, pvtKey, {
    algorithm: 'RS256',
    expiresIn: '1h'
})
console.log(getin);

const decode = JWT.verify(getin, publicKey,{
    algorithm: 'RS256'
});
console.log(decode);



function generateJWKS(){
    const keyPair = generateKeyPairSync()
    const kid = 'key-id1'
    const expiryTimestamp = Math.floor(Date.now() / 1000)+ 3600;

    const jwks = {
        keys: [
            {
                kty: 'RSA',
                kid,
                use: 'sig',
                alg: 'RS256',
                nbf: Math.floor(Date.now() / 1000),
                exp: expiryTimestamp,
                e: 'AQAB',
                n: keyPair.publicKey,
            },
        ],
    };
    return jwks;
}





app.get('/', (req,res) =>{
    const jwks = generateJWKS()
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