import { IUser } from '../../domain/entities/IAuth';
import { EditAvatarData, ResetPassword } from '../../domain/entities/IUser';
import { AuthRepository } from '../../domain/repositories/authRepository';
import { UserRepository } from '../../domain/repositories/userRepository'
import uploadImage from '../../utils/upload';
import bcrypt from 'bcrypt'
export class UserService {

    private userRepo: UserRepository
    private authRepo: AuthRepository
    constructor() {
        this.userRepo = new UserRepository();
        this.authRepo = new AuthRepository();
    }

    async editAvatar(data: EditAvatarData) {
        try {
            const upload = await uploadImage(data.file);

            if (!upload) {
                return { success: false, message: 'Image upload failed. Please try again.' };
            }

            const saveChanges = await this.userRepo.changeAvatar({ image: upload, id: data.id });

            if (saveChanges) {
                return { success: true, message: 'Image uploaded successfully', imageURL: upload };
            } else {
                return { success: false, message: 'Unable to update avatar in the database.' };
            }
        } catch (error) {
            console.error('Error in editAvatar:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

    async updateProfile(data: IUser) {
        try {
            const result = await this.userRepo.updateProfile(data);
            if (result) {
                return { success: true, message: 'Profile updated successfull.' }
            } else {
                return { success: false, message: 'Unable to update the profile.' };
            }
        } catch (error) {
            console.error('Error in updateProfile:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

    async resetPassword(data: ResetPassword, userId: string) {
        try {
            const result = await this.authRepo.findByEmail(userId);
            if (result) {
                const passwordMatch = await bcrypt.compare(data.currentPassword, result.password);
                if (!passwordMatch) {
                    return { success: false, message: 'Current Password does not match' }
                } else {
                    const passworUpdate = await this.userRepo.resetPassword(data, userId);
                    if (passworUpdate.success) {
                        return { success: true, message: passworUpdate.message }
                    } else {
                        return { success: false, message: passworUpdate.message }
                    }
                }
            }
            return { success: false, message: 'Something went worng' }
        } catch (error) {
            console.error('Error in resetPassword:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

}