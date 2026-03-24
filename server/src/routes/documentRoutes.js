const express = require("express")
const router = express.Router()

const authMiddleware = require("../middleware/authMiddleware")

const {
createDocument,
getUserDocuments,
deleteDocument
} = require("../controllers/documentController")

router.post("/",authMiddleware,createDocument)

router.get("/",authMiddleware,getUserDocuments)

router.delete("/:id",authMiddleware,deleteDocument)

module.exports = router