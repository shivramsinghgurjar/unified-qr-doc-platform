const Document = require("../models/Document")

// Create Document
const createDocument = async (req,res)=>{
try{

const { title, templateType, formData } = req.body

const document = await Document.create({
title,
templateType,
formData,
createdBy:req.user._id
})

res.status(201).json(document)

}catch(error){
res.status(500).json({message:error.message})
}
}


// Get User Documents
const getUserDocuments = async(req,res)=>{
try{

const documents = await Document.find({
createdBy:req.user._id
}).sort({createdAt:-1})

res.json(documents)

}catch(error){
res.status(500).json({message:error.message})
}
}


// Delete Document
const deleteDocument = async(req,res)=>{
try{

const document = await Document.findById(req.params.id)

if(!document){
return res.status(404).json({message:"Document not found"})
}

await document.deleteOne()

res.json({message:"Document deleted"})

}catch(error){
res.status(500).json({message:error.message})
}
}

module.exports = {
createDocument,
getUserDocuments,
deleteDocument
}