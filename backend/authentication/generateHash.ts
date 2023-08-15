import crypto from 'crypto';

interface verify_obj {
    password: string,
    salt: string,
    hash: string
}

// Generate salt

export function createSalt():string{
    return crypto.randomBytes(16).toString('hex');
}

// Generate hash

export function createHash(password:string , salt: string){
    return crypto.pbkdf2Sync(password, salt, 1000,64, 'sha512').toString('hex');
}

//verify hash

export function verifyHash(obj: verify_obj):boolean{
    const hash = createHash(obj.password, obj.salt);
    return hash === obj.hash;
}