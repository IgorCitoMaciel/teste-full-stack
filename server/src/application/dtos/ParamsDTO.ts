import { IsInt, Min } from "class-validator";
import { Transform } from "class-transformer";

export class ParamsDTO {
  @IsInt({ message: "ID must be an integer" })
  @Min(1, { message: "ID must be greater than 0" })
  @Transform(({ value }) => parseInt(value, 10))
  id!: number;
}
