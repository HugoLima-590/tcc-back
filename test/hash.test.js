import { expect } from 'chai';
import crypto from 'crypto';
import fs from 'fs';

// Função para calcular o hash
const calculateHash = (filePath) => {
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(fileBuffer).digest('hex');
};

describe('Hash Calculation', () => {
    it('should return the correct hash for a given file', () => {
        const filePath = 'C://Users//hugol//Documents//Grupo.txt';
        const expectedHash = 'dd3e23b738ba2269a6901e868ec91c8efef72934ae77245424746bee15b52fe6';
        expect(hash).to.equal(expectedHash);
    });
});
