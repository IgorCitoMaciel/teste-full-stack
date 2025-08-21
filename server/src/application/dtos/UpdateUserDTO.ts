import {
  IsString,
  IsEmail,
  IsOptional,
  IsDate,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
} from "class-validator";
import { Transform } from "class-transformer";

export class UpdateUserDTO {
  @IsOptional()
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name cannot be empty" })
  @MinLength(2, { message: "Name must be at least 2 characters long" })
  @MaxLength(100, { message: "Name must not exceed 100 characters" })
  @Matches(/^[a-zA-ZÀ-ÿ\s]*$/, {
    message: "Name can only contain letters and spaces",
  })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email cannot be empty" })
  @MaxLength(255, { message: "Email must not exceed 255 characters" })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: "Invalid email format",
  })
  email?: string;

  @IsOptional()
  @IsString({ message: "Address must be a string" })
  @MaxLength(200, { message: "Address must not exceed 200 characters" })
  @Matches(/^[a-zA-Z0-9\s,.-]*$/, {
    message:
      "Address can only contain letters, numbers, spaces, commas, dots, and hyphens",
  })
  address?: string;

  @IsOptional()
  @IsDate({ message: "Invalid date format" })
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  birthdate?: Date;
}
