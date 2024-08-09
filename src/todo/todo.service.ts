import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {


private todos: Todo [] = [

  { id: 1, description: 'Shampoo Sedal', done: false}, 
  { id: 2, description: 'Detergente líquido Ariel', done: false },
  { id: 3, description: 'Leche entera La Serenísima', done: false },
  { id: 4, description: 'Pan lactal Bimbo', done: false },
  { id: 5, description: 'Aceite de girasol Natura', done: false },
  { id: 6, description: 'Arroz Gallo Oro', done: false },
  { id: 7, description: 'Galletitas Oreo', done: false },
  { id: 8, description: 'Fideos Matarazzo', done: false },
  { id: 9, description: 'Queso rallado Sancor', done: false },
  { id: 10, description: 'Jugos Tang de naranja', done: false },
  { id: 11, description: 'Café instantáneo Nescafé', done: false },
  { id: 12, description: 'Papel higiénico Elite', done: false },
  { id: 13, description: 'Gaseosa Coca-Cola', done: false },
  { id: 14, description: 'Huevos Doña Gallina', done: false },
  { id: 15, description: 'Manteca La Serenísima', done: false },
  { id: 16, description: 'Atún en lata La Campagnola', done: false },
  { id: 17, description: 'Jabón de tocador Dove', done: false },
  { id: 18, description: 'Cereal Kelloggs Corn Flakes', done: false },
  { id: 19, description: 'Sal fina Dos Anclas', done: false },
  { id: 20, description: 'Yogur descremado Ser', done: false },
  { id: 21, description: 'Mermelada de durazno Arcor', done: false },
  { id: 22, description: 'Harina de trigo Blancaflor', done: false },
  { id: 23, description: 'Jugo de naranja Cepita', done: false },
  { id: 24, description: 'Cerveza Quilmes', done: false },
  { id: 25, description: 'Queso untar Casancrem', done: false },
  { id: 26, description: 'Mayonesa Hellmanns', done: false },
  { id: 27, description: 'Tomates perita en lata CICA', done: false },
  { id: 28, description: 'Helado de crema Grido', done: false },
  { id: 29, description: 'Lentejas Arcor', done: false },
  { id: 30, description: 'Cacao en polvo Nesquik', done: false },
  { id: 31, description: 'Galletitas dulces Chocolinas', done: true },
];


async create({ description }: CreateTodoDto): Promise<Todo> {
  const todo = new Todo();
  todo.id = Math.max(...this.todos.map(todo => todo.id), 0) + 1;
  todo.description = description;
  todo.done = false;

  this.todos.push(todo);
  return todo;
}


findAll(): Todo[] {
  return this.todos;
}

findOne(id: number): Todo {
  const todo = this.todos.find( todo => todo.id === id );
  if ( !todo ) throw new NotFoundException(`TODO with #${ id } not found`);

  return todo;
}

update(id: number, updateTodoDto: UpdateTodoDto): Todo {
  
  const { done, description } = updateTodoDto;

  const todo = this.findOne( id );

  if ( done !== undefined ) todo.done = done;
  if ( description ) todo.description = description;
  
  this.todos = this.todos.map( dbTodo => {
    if( dbTodo.id === id ) return todo;
    return dbTodo;
  })

  return todo;
}

remove(id: number) {
  
  this.findOne( id );

  this.todos = this.todos.filter( todo => todo.id !== id );
}
}