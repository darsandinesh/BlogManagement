import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthService } from '../../app/useCases/auth';
import config from '../../infrastructure/config/config';

class AuthController {

    private authService: AuthService;
    constructor() {
        this.authService = new AuthService()
    }

    // verify no user exist, creatinga temp user and sending an email for verification. 
    registerUser = async (req: Request, res: Response) => {
        try {
            const user = req.body
            console.log(user);

            const result = await this.authService.register(user);

            if (result.success) {
                res.status(200).json({ success: true, message: result.message })
            } else {
                res.json({ success: false, message: result.message })
            }

        } catch (error) {
            console.log('error in the controller', error);
            res.status(500).json({
                message: 'An unexpected error occurred. Please try again later.',
            });
        }
    }

    // verifing the temp user, creating new user and deleting the temp user
    verifyEmail = async (req: Request, res: Response) => {
        try {
            console.log('req.body', req.body.email);
            const email = req.body.email
            const result = await this.authService.verifyEmail(email)

            if (result.success) {
                res.status(200).json({ success: true, message: result.message })
            } else {
                res.json({ success: false, message: result.message })
            }
        } catch (error) {
            console.log('error in the controller', error);
            res.status(500).json({
                message: 'An unexpected error occurred. Please try again later.',
            });
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const result = await this.authService.login(data)
            if (result.success) {
                res.status(200).json({ success: result.success, message: result.message, token: result.token, data: result.userData });
            } else {
                res.json({ success: result.success, message: result.message });
            }

        } catch (error) {
            console.log('error in the controller', error);
            res.status(500).json({
                message: 'An unexpected error occurred. Please try again later.',
            });
        }
    }

    forgetPassword = async (req: Request, res: Response) => {
        try {
            const email = req.body.email;
            const result = await this.authService.forgetPassword(email);
            if (result.success) {
                res.status(200).json({ success: result.success, message: result.message });
            } else {
                res.json({ success: result.success, message: result.message })
            }
        } catch (error) {
            console.log('error in the controller', error);
            res.status(500).json({
                message: 'An unexpected error occurred. Please try again later.',
            });
        }
    }

    setFortgotPassword = async (req: Request, res: Response) => {
        try {
            const password = req.body.password;
            const email = req.params.id
            const result = await this.authService.setFortgotPassword(password, email);
            console.log(result)
            if (result.success) {
                res.status(200).json({ success: result.success, message: result.message });
            } else {
                res.json({ success: result.success, message: result.message })
            }
        } catch (error) {
            console.log('error in the controller', error);
            res.status(500).json({
                message: 'An unexpected error occurred. Please try again later.',
            });
        }
    }

    refreshToken = async (req: Request, res: Response) => {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                res.status(403).json({ message: 'Refresh token not valid' });
                return
            }

            jwt.verify(refreshToken, config.JWT_KEY || '', (err: any, user: any) => {
                if (err) {
                    res.status(403).json({ message: 'Forbidden' });
                    return
                }

                console.log(err, '-----------', user)
                console.log('refresh token')
                const accessToken = jwt.sign({ id: user.id, email: user.email }, config?.JWT_KEY || '', { expiresIn: '15m' });

                res.json({ accessToken });
            });
        } catch (error) {

        }
    }
}

export const authController = new AuthController()