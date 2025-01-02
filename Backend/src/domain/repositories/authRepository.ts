import bcrypt from 'bcrypt'
import TempUserModel from "../../models/tempUserModel";
import User from "../../models/userModel";
import { IUser } from "../entities/IAuth";

export class AuthRepository {

    // while registering checking if an email is present or not
    async findByEmail(email: string) {
        try {
            const result = await User.findOne({ email: email });
            return result;
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw new Error('An error occurred while searching for the user. Please try again later.');
        }
    }

    // checking the email verification through temp users
    async verifyEmail(email: string) {
        try {
            const result = await TempUserModel.findOne({ email: email });
            return result
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw new Error('An error occurred while searching for the user. Please try again later.');
        }
    }

    // creating a new temp user
    async createTempUser(data: IUser) {
        try {
            const tempUserFound = await TempUserModel.findOne({ email: data.email });
            if (tempUserFound) {
                return false;
            }
            const result = await TempUserModel.create(data);
            return result;
        } catch (error) {
            console.error('Error creating temporary user:', error);
            throw new Error('An error occurred while creating the temporary user. Please try again later.');
        }
    }

    // creating a new user, ie; an new user is added to the application.
    async createNewUser(data: IUser) {
        try {
            const result = await User.create(data);
            return result
        } catch (error) {
            console.error('Error creating new user:', error);
            throw new Error('An error occurred while creating the temporary user. Please try again later.');
        }
    }

    // deleting the temp user after email verification.
    async deleteTempUser(email: string) {
        try {
            const result = await TempUserModel.findOneAndDelete({ email: email });

            if (result) {
                return { success: true, message: 'Temporary user deleted successfully.' };
            } else {
                return { success: false, message: 'No temporary user found with the given email.' };
            }
        } catch (error) {
            console.error('Error in deleteTempUser:', error);
            throw new Error('An error occurred while deleting the temporary user.');
        }
    }

    async resetPassword(password: string, email: string) {
        try {
            const result = await User.updateOne({ email: email }, { $set: { password: password } });
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