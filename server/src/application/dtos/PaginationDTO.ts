import { IsInt, Min, Max, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class PaginationDTO {
  @IsOptional()
  @IsInt({ message: "Page must be an integer" })
  @Min(1, { message: "Page must be greater than 0" })
  @Transform(({ value }) => (value ? parseInt(value, 10) : 1))
  page?: number;

  @IsOptional()
  @IsInt({ message: "Limit must be an integer" })
  @Min(1, { message: "Limit must be greater than 0" })
  @Max(100, { message: "Limit must not exceed 100" })
  @Transform(({ value }) => (value ? parseInt(value, 10) : 30))
  limit?: number;
}
