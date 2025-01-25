import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const entrySchema = new Schema({
  usedAt: {type: Date, default: Date.now()},
  medication: {type: mongoose.Types.ObjectId, ref: "medication", require:true}
}) 

const Entry = mongoose.model('entry', entrySchema);

export default Entry;