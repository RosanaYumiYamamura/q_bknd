import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';


@Module({
  imports: [ TodoModule ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class AppModule {}