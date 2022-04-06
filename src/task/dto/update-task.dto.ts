import { IsEnum } from "class-validator";
import { TaskStatus } from "../task-status";

export class UpdatetaskDto {
    @IsEnum(TaskStatus)
    status: TaskStatus
}