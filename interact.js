import Web3 from 'web3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { saveDocument } from './server/db.js'; // Assegure-se de que o caminho está correto

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Iniciando o script integrado com o sistema...");

// Carregar o arquivo JSON do contrato
const contractPath = path.resolve(__dirname, 'build', 'contracts', 'DocumentStore.json');
const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));

// Configuração do Web3
const web3 = new Web3('http://192.168.1.110:7545');
const contractAddress = '0xee57dA7317E3eF4EA367a7C0A0077440994bb479'; 
const contractABI = contract.abi;
const documentStore = new web3.eth.Contract(contractABI, contractAddress);

// Função para verificar se o documento já existe
async function verifyDocument(documentHash) {
    try {
        const result = await documentStore.methods.verifyDocument(documentHash).call();
        if (result[0] === true) {
            console.log('Documento verificado. Timestamp:', result[1]);
            return true;
        } else {
            console.log('Documento não encontrado.');
            return false;
        }
    } catch (error) {
        console.error('Erro ao verificar documento:', error);
        return false;
    }
}

// Função para adicionar um documento (hash)
async function addDocument(documentHash) {
    console.log("Tentando adicionar documento...");
    const accounts = await web3.eth.getAccounts();
    try {
        const receipt = await documentStore.methods.addDocument(documentHash).send({ from: accounts[0], gas: 6721975 });
        console.log('Documento adicionado com sucesso:', receipt);
    } catch (error) {
        console.error('Erro ao adicionar documento:', error.message);
        throw new Error('Falha ao adicionar o documento no blockchain.'); // Repassar o erro
    }
}

// Receber o hash do argumento
const documentHash = process.argv[2];

(async () => {
    // Verifica se o documento já foi enviado
    const exists = await verifyDocument(documentHash);
    if (exists) {
        console.log('Este documento já foi enviado ao blockchain. Processo abortado.');
        return; 
    }

    // Adiciona o documento no blockchain (se necessário) e no MongoDB
    await addDocument(documentHash);
    console.log("Adicionando documento com hash:", documentHash);

    // Salva o documento no banco de dados
    await saveDocument(documentHash);
    console.log("Documento salvo no banco de dados com hash:", documentHash);
})();
