import jwt from "jsonwebtoken";
import "dotenv/config";
const hash = process.env.HASH_JWT as string;

function generateToken(id:string) {
    return jwt.sign(
        {id: id},
        hash,
        {expiresIn: 86400}
    )
}

export default generateToken;