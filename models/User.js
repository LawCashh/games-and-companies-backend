import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema( {
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    role: {
        type: String,
        enum: ['OWNER', 'ADMIN', 'USER'],
        default: 'USER'
    }
});

userSchema.pre('save', async function () {
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
})

const userModel =  mongoose.model('User', userSchema);
export default userModel;