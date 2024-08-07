import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
    Nombre: {type: String, required: true},
    Hora: {type: String},
    Costo: {type: String},
    Fecha_limite: {type: String },
    Tiempo_entrega: {type: String },
    Medio_entrega: {type: String},
    Lugar: {type: String},
    Item: {type: Boolean},
    Comment: {type: Boolean},
    Contador: {type: Number},
    Contador_fecha: {type: Number}
});

export default mongoose.models.settings || mongoose.model('settings', settingSchema);