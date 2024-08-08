import mongoose from 'mongoose';
import { Neucha } from 'next/font/google';

const settingSchema = new mongoose.Schema({
    Nombre: {type: String, required: true},
    Hora: {type: String},
    Costo: {type: String},
    Fecha_limite: {type: String },
    Tiempo_entrega: {type: String },
    Medio_entrega: {type: String},
    Lugar: {type: String},
    Contador: { type: Number, default: 0 },
    Contador_fecha: { type: Number, default: 0 },
    Item: {type: Boolean},
    Comment: {type: Boolean}
});

export default mongoose.models.settings || mongoose.model('settings', settingSchema);