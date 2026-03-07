import mongoose from "mongoose";

const DisputeSchema = new mongoose.Schema({

  order:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Order"
  },

  buyer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  seller:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  reason:String,

  status:{
    type:String,
    enum:["open","reviewing","resolved"],
    default:"open"
  }

},{timestamps:true});

export default mongoose.models.Dispute || mongoose.model("Dispute",DisputeSchema);