import bcrypt from 'bcrypt'
import User from "../../models/userModel";
import { IUser } from "../entities/IAuth";
import { Avatar, ResetPassword } from "../entities/IUser";


export class UserRepository {

    async changeAvatar({ image, id }: Avatar) {
        try {

            console.log(image, id)

            const update = await User.updateOne(
                { _id: id },
                { $set: { avatar: image } },
                { new: true }
            );

            if (update.modifiedCount > 0) {
                return { success: true }
            }
            return { success: false }
        } catch (error) {
            console.error('Error updating user avatar:', error);
            throw new Error('An error occurred while updating the user avatar. Please try again later.');
        }
    }

    async updateProfile(data: IUser) {
        try {
            console.log(data);
            const updated = await User.updateOne({ email: data.email }, { $set: { username: data.name, phone: data.phone, bio: data.bio } }, { upsert: true })
            console.log(updated, '----');
            if (updated.modifiedCount > 1) {
                return { success: true }
            }
            return { success: false }
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw new Error('An error occurred while updating the user profile. Please try again later.');
        }
    }

    async resetPassword(data: ResetPassword, email: string) {
        try {
            const hashedPassword = await bcrypt.hash(data.newPassword, 10)
            const result = await User.updateOne({ email: email }, { $set: { password: hashedPassword } });
            if (result.modifiedCount == 1) {
                return { success: true, message: 'Password Reset Successfull' }
            } else {
                return { success: false, message: 'Unable to Reset Password. Please try again later.' }
            }
        } catch (error) {
            console.error('Error updating resetPassword:', error);
            throw new Error('An error occurred while updating the resetPassword. Please try again later.');
        }
    }



}