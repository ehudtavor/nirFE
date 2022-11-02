import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http-service';
import { TodoEntity } from './structures/todo-entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'todoFE';
  todos: TodoEntity[] = [];
  content: string = '';

  constructor(
    private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.doGetTotoList();
  }

  saveTodo() {
    this.httpService.todoSave({"content":this.content, "date": "20200101"}).subscribe(res => this.doGetTotoList())
  }

  doGetTotoList() {
    this.httpService.todoList().subscribe(res => this.todos = res)
  }
}
