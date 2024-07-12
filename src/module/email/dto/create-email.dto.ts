import { IsNotEmpty, IsString } from "class-validator";


export class CreateEmailDto {

        @IsString()
        @IsNotEmpty()
        readonly apikey: string;

        @IsString()
        @IsNotEmpty()
        readonly userId: string

        @IsString()
        @IsNotEmpty()
        readonly frequency: string;
        
        @IsString()
        @IsNotEmpty()
        readonly seniority: string;

        @IsString()
        @IsNotEmpty()
        readonly devLanguage: string;

        @IsString()
        @IsNotEmpty()
        readonly language: String;
      
}
