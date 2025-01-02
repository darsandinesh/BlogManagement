import { Request, Response } from "express";
import { UserService } from "../../app/useCases/user";

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    editAvatar = async (req: Request, res: Response) => {
        try {

            const { id } = req.body;
            if (!id) {
                res.json({ success: false, message: 'User ID is required.' });
            }
            if (req.file) {
                const result = await this.userService.editAvatar({ file: req.file, id });

                if (result.success) {
                    res.status(200).json({ success: true, message: result.message, imageURL: result.imageURL, });
                } else {
                    res.json({ success: false, message: result.message });
                }
            } else {
                res.json({ success: false, message: 'No image uploaded. Please try again.' });
            }


        } catch (error) {
            console.error('Error in editAvatar:', error);
            res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
        }
    };

    updateProfile = async (req: Request, res: Response) => {
        try {
            const data = req.body
            console.log(req.body, '-------body in updateProfile')
            const result = await this.userService.updateProfile(data)
            if (result.success) {
                res.status(200).json({ success: true, message: result.message });
            } else {
                res.json({ success: false, message: result.message });
            }
        } catch (error) {
            console.error('Error in updateProfile:', error);
            res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
        }
    }

    resetPassword = async (req: Request, res: Response) => {
        try {
            console.log(req.body);
            const password = req.body;
            const userId = req.params.userId
            const result = await this.userService.resetPassword(password, userId);
            if (result?.success) {
                res.status(200).json({ success: result.success, message: result.message })
            } else {
                res.json({ success: false, message: result.message });
            }
        } catch (error) {
            console.error('Error in resetPassword:', error);
            res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
        }
    }


}

export const userController = new UserController();