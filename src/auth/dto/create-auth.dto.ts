import { Matches, IsEmail, IsString, MaxLength, MinLength, isEmail } from "class-validator";


export class CreateAuthDto {
    @IsString()
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(12)
    @MaxLength(50)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'password too weak' })
    password: string;
    @IsString()
    @MinLength(1)
    fullName: string;
    @IsString()
    @MinLength(3)
    country: string;
}
