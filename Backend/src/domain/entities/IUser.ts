export interface userPayload {
    id: string,
    email: string
}

export interface Avatar {
    image: string,
    id: string
}

export interface EditAvatarData {
    file: Express.Multer.File;
    id: string;
}

export interface ResetPassword {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}