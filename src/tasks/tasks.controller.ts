import {
    Controller,
    Get,
    Param,
    Body,
    Post,
    Put,
    Delete,
    ParseIntPipe,
    HttpStatus,
    HttpCode,
    Inject
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

import { CreateTaskDTO, UpdateTaskDTO } from './dto/tasks.dto';
import { TaskService } from './task.service';
import { TaskEntity } from './entity/task.entity';
import config from 'src/config';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
    constructor(
        private tasksService: TaskService,
        @Inject(config.KEY) private configService: ConfigType<typeof config>,
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll() {
        console.log(this.configService.secretKey)
        return {
            success: true,
            tasks: this.tasksService.findAll(),
        }
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findone(@Param('id', ParseIntPipe) id: number) {
        return {
            success: true,
            task: this.tasksService.findOne(id),
            message: 'Task found successfully'
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() data: CreateTaskDTO) {
        return {
            success: true,
            task: this.tasksService.create(data),
            message: 'Task created successfully.'
        }
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id', ParseIntPipe) id:number, data: UpdateTaskDTO) {
        this.tasksService.update(id, data);
        return {
            success: true,
            message: 'Task updated successfully.'
        };
    }

    @Delete()
    @HttpCode(HttpStatus.OK)
    delete(@Body() id: number) {
        this.tasksService.remove(id);
        return {
            success: true,
            message: 'Task removed successfully.'
        }
    }
}
