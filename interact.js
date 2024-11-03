import Web3 from 'web3';
import { documentExists, saveDocument } from './server/db.js';
import fs from 'fs';
import path from 'path';

// Carregar o arquivo JSON do contrato
const contractPath = path.resolve('build', 'contracts', 'DocumentStore.json');
const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));

// Configuração do Web3
const web3 = new Web3('http://127.0.0.1:7545');

// Função de verificação de conexão
async function checkConnection() {
    try {
        const isListening = await web3.eth.net.isListening();
        if (isListening) {
            console.log('Web3 está conectado ao Ganache');
        }
    } catch (error) {
        console.error('Erro de conexão com Ganache:', error);
    }
}

// Endereço do contrato
const contractAddress = '0x6bdAA297B3e7E271b9793C6d20d5C7083A678b14';
const contractABI = contract.abi;

const documentStore = new web3.eth.Contract(contractABI, contractAddress);

// Função para adicionar um documento (hash)
async function addDocument(documentHash) {
    const accounts = await web3.eth.getAccounts();
    try {
        const receipt = await documentStore.methods.addDocument(documentHash).send({ from: accounts[0], gas: 6721975 });
        console.log('Documento adicionado com sucesso:', receipt);
    } catch (error) {
        console.error('Erro ao adicionar documento:', error);
    }
}

// Função para verificar se o documento existe
async function verifyDocument(documentHash) {
    try {
        const result = await documentStore.methods.verifyDocument(documentHash).call();
        if (result[0]) {
            console.log('Documento verificado. Timestamp:', result[1]);
        } else {
            console.log('Documento não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao verificar documento:', error);
    }
}

// Função principal
(async () => {
    await checkConnection();

    // Caminho do documento
    const filePath = 'C://Users//hugol//Documents//Grupo.txt';

    // Calcule o hash do documento
    const documentHash = web3.utils.sha3(fs.readFileSync(filePath, 'utf8'));

    // Verifique se o documento já foi enviado
    const exists = await documentExists(documentHash);
    if (exists) {
        console.log('Este documento já foi enviado ao blockchain. Processo abortado.');
        return; // Abortando o envio se o documento já existir
    }

    // Adiciona o documento
    await addDocument(documentHash);
    
    // Salva o documento no banco de dados
    await saveDocument(documentHash);
    
    // Verifica o documento
    await verifyDocument(documentHash);
})();
