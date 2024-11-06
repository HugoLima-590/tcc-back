import mongoose from 'mongoose';

const mongoDBURL = 'mongodb://localhost:27017/documentDB';

// Conexão com o MongoDB
await mongoose.connect(mongoDBURL)
    .then(() => console.log('Conexão com o MongoDB estabelecida com sucesso!'))
    .catch(err => console.error('Erro de conexão com o MongoDB:', err));

// Definindo o esquema e o modelo
const documentSchema = new mongoose.Schema({
    documentHash: { type: String, required: true, unique: true },
    timestamp: { type: Date, default: Date.now }
});

export const Document = mongoose.model('Document', documentSchema);

// Função para verificar se o documento já foi enviado
export async function documentExists(documentHash) {
    // Verifica primeiro no MongoDB
    console.log(documentHash)
    const documentInDB = await Document.findOne({ documentHash: documentHash });
    console.log(JSON.stringify(documentInDB))
    if (documentInDB) {
        console.log("Documento encontrado no MongoDB.");
        return true;
    }
    console.log("Documento não encontrado em MongoDB.");
    return false;
}

// Função para salvar o documento no banco de dados
export async function saveDocument(documentHash) {
    const document = new Document({ documentHash });
    await document.save();
    console.log("Documento salvo no banco de dados com hash:", documentHash); // Log após salvar
}
