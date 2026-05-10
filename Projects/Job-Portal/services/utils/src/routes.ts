import express from "express"
import cloudinary from "cloudinary";
const router = express.Router();

router.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Utils service is healthy"
    })
})

router.post("/upload", async (req, res) => {
    try {
        const { buffer, public_id } = req.body;

        if (public_id) {
            await cloudinary.v2.uploader.destroy(public_id);
        }

        const cloud = await cloudinary.v2.uploader.upload(buffer);
        res.json({
            url: cloud.secure_url,
            public_id: cloud.public_id
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Error uploading file"
        })
    }
}
)






export default router;