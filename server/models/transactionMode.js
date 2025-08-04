import mangoose from "mongoose";
const transactionModeSchema = mangoose.Schema({
   userId: {type: String, required: true},
   plan: {type: String, required: true},
   credits: {type: Number, required: true},
   amount: {type: Number, required: true},
   payment: {type: Boolean, default: false},
   date: {type: Date, default: Date.now},
});

const TransactionModel = mangoose.models.transaction || mangoose.model("Transaction", transactionModeSchema);
export default TransactionModel;
