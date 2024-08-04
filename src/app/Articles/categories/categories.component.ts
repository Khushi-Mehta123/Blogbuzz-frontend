import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  @Output() categorySelected = new EventEmitter<string>();

  // categories = ['Web Development', 'Mobile Development', 'Software Engineering',
  //   'Data Science', 'AI', 'Cyber Security', 'Cloud Computing', 'Blockchain',
  //   'Tech machines', 'Gadgest', 'Others'];

  categories = [
      'Web Development', 'Mobile Development', 'Software Engineering',
      'Data Science', 'AI', 'Cyber Security', 'Cloud Computing', 'Blockchain',
      'Tech Machines', 'Gadgets',
      'Politics', 'Economics', 'Health', 'Lifestyle', 'Travel',
      'Education', 'Entertainment', 'Sports', 'Business', 'Environment',
      'Science', 'History', 'Culture', 'Art', 'Literature',
      'Finance', 'Gaming', 'Food & Drink', 'Social Issues', 'Philosophy','Others'
  ];


  selectCategory(category: string) {
    this.categorySelected.emit(category);
  }
}
