import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTaskDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly description: string;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty()
    readonly status: boolean;
}

export class UpdateTaskDTO extends PartialType(CreateTaskDTO) {}