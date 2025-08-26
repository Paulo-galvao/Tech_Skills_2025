import conn from "../config/conn";

interface Iuser {
    name: string,
    email: string,
    isActive: boolean
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
    isActive: {
        type: Boolean,
        required: true
    },
    
},{
    timestamps: true
});

const User = conn.model<Iuser>("User", userSchema);

export default User;