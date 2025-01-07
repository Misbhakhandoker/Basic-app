import mongoose, { Schema } from "mongoose";


const imageSchema = new Schema({
    url:{
        type:String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
    uploadedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}, {timestamps: true})

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema)

export default Image;