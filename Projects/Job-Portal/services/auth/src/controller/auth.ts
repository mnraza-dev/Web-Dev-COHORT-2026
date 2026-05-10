import axios from "axios";
import getBuffer from "../utils/buffer.js";
import { sql } from "../utils/db.js";
import Errorhandler from "../utils/ErrorHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { TryCatch } from "../utils/TryCatch.js";
import bcrypt from "bcrypt";

export const registerUser = TryCatch(async (req, res, next) => {
    const { name, email, password, phone_number, role, bio } = req.body;
    if (!name || !email || !password || !phone_number || !role) {
        throw new ErrorHandler(400, "All fields are required");
    }
    const existinguser = await sql`SELECT user_id FROM users WHERE email = ${email}`;
    if (existinguser.length > 0) {
        throw new ErrorHandler(200, "User with this Email id already exists")
    }
    const hashPassword = await bcrypt.hash(password, 10);
    let registeredUser;
    if (role === 'recruiter') {
        const [user] =
            await sql`
                INSERT INTO users (name, email, hashPassword, phone_number, role ) 
                VALUES (${name},${email},${hashPassword}, ${phone_number}, ${role})
                RETURNING user_id,name, email, phone_number, created_at `;
        registeredUser = user;
    }
    else if (role === 'jobseeker') {
        const file = req.file;
        if (!file) {
            throw new ErrorHandler(400, "Resume file is required for job seekers");
        }
        const fileBuffer = getBuffer(file);
        if (!fileBuffer || !fileBuffer.content) {
            throw new ErrorHandler(500, "failed to generate buffer from the uploaded file");
        }

        const { data } = await axios.post(`${process.env.UPLOAD_SERVICE}/api/utils/upload`, {
            buffer: fileBuffer.content,
        });

        const [user] =
            await sql`
                INSERT INTO users (name, email, hashPassword, phone_number, role , bio, resume, resume_public_id) 
                VALUES (${name},${email},${hashPassword}, ${phone_number}, ${role}, ${bio}, ${data.url}, ${data.public_id})
                RETURNING user_id,name, email, phone_number,role, bio, resume, created_at `;
        registeredUser = user;
    }
});

export const loginUser = TryCatch(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Errorhandler(400, "Email and password are required");
    }
    const [user] = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (!user) {
        throw new Errorhandler(404, "User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Errorhandler(400, "Invalid credentials");
    }
    res.status(200).json({
        success: true,
        user
    });
})

