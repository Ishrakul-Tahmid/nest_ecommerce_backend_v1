import { IsEmail, IsNotEmpty } from "class-validator";

export class userDTO{
    @IsNotEmpty()
    userid: string;

    @IsEmail()
    email: string;
}