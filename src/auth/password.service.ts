import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt"

@Injectable()
export class PasswordService{

    hashPassword = (password: string): Promise<string> => {
        return bcrypt.hash(password, 12)
    }

    comparePassword = (passwordInput: string, passwordUser: string) => {
        return bcrypt.compare(passwordInput, passwordUser)
    }

}