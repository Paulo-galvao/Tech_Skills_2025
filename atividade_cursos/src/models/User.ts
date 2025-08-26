import conn from "../config/conn";
import bcrypt from "bcrypt";

interface Iuser {
    name: string,
    email: string,
    password: string
}

const userSchema = new conn.Schema<Iuser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    }
    
},{
    timestamps: true
});

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

const User = conn.model<Iuser>("User", userSchema);

export default User;