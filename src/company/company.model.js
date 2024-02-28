import mongoose from "mongoose";

const CompanySchema = mongoose.Schema({
    
    nombre: {
        type: String,
        required: [true, "The name is required"]
    },
    
    categoriaEmpresarial: {
        type: String,
        required: [true, "The business category is required"]
    },
    
    nivelImpacto: {
        type: String,
        required: [true, "The impact level is required"]
    },
    
    añosTrayectoria: {
        type: Number,
        required: [true, "Years of trajectory is required"]
    },
    
    datosClaves: {
        type: String,
        required: [true, "Key data is required"]
    },
    
    correo: {
        type: String,
        required: [true, "Email is mandatory"],
        unique: true,
    },

    role: {
        type: String,
        required: true,
        enum: ["COMP_ROLE"],
    },
    
    estado: {
        type: Boolean,
        default: true,
    },
});

CompanySchema.methods.toJSON = function () {
    const { __v, password, _id, ...company } = this.toObject();
    company.uid = _id;
    return company;
};

export default mongoose.model('Company', CompanySchema);
