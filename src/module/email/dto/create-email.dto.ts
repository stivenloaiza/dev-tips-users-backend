import { IsNotEmpty, IsString } from "class-validator";


export class CreateEmailDto {

        @IsString()
        @IsNotEmpty()
        apikey: string;

        @IsString()
        @IsNotEmpty()
        frequency: string;
        
        @IsString()
        @IsNotEmpty()
        seniority: string;

        @IsString()
        @IsNotEmpty()
        devLanguage: string;

        @IsString()
        @IsNotEmpty()
        language: String;
      
}
