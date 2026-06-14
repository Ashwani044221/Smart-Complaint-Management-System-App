import mongoose from "mongoose";

const Complaintschema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId,ref:"user"},
    category: {type: String, required: true},
    subject:{type: String, required: true},
    severity:{type:String,required:true},
    status:{type: String,default:"Pending" ,required: true},
    name:{type: String, required: true},
    roomno:{type: Number, required: true},
    date: {type: Date, default: Date.now},
    
}, {timestamps: true});

const complaintData = mongoose.model("complaintData", Complaintschema);

export default complaintData;