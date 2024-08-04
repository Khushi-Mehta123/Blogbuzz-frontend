// import { Component } from '@angular/core';
// import { userQueries } from '../../Models/contactQueries';
// import { ContactusService } from '../../AppServices/contactus.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-admincontactus',
//   templateUrl: './admincontactus.component.html',
//   styleUrl: './admincontactus.component.css'
// })
// export class AdmincontactusComponent {

//   allQueries : userQueries[] = []

//   replyform!: FormGroup;

//   showModal:boolean = false;
//   editMode:boolean = false;

//   queryid = ''

//   constructor(private _userqueries : ContactusService,
//     private fb: FormBuilder ){}

//   ngOnInit(): void {

//     this.getQueries()
//     this.replyform = this.fb.group({
//       reply : ['']
//     })

//   }
//   getQueries() {
//     this._userqueries.getQueries().subscribe(
//       (value) => {
//         this.allQueries=value
//         console.log(value);
//       },
//       (err) => console.log(err)

//     )
//   }


//   onGetId(data : userQueries){

//     console.log(data);

//     this._userqueries.updateQueries(data).subscribe(
//       (value) => console.log(value),
//       (err) => console.log(err)
//     )
//      this.showModal = true;
//     this.editMode=true

//   }

//   onReply(){

//     // if(this.replyform.valid){
//     //   console.log(this.replyform.value);

//     //   const formData = {
//     //     id: this.queryid, // Ensure ID is included
//     //     reply: this.replyform.value.reply
//     //   };

//     //   this._userqueries.updateQueries(formData).subscribe(
//     //     (value) => console.log(value),
//     //     (err) => console.log(err)
//     //   )
//     // }


//     this.showModal = true;
//     this.editMode=true
//   }


//   onCloseModal(){
//     this.showModal = false;
//     this.editMode=false
//     this.replyform.reset()
//   }
// }




import { Component } from '@angular/core';
import { userQueries } from '../../Models/contactQueries';
import { ContactusService } from '../../AppServices/contactus.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admincontactus',
  templateUrl: './admincontactus.component.html',
  styleUrl: './admincontactus.component.css'
})
export class AdmincontactusComponent {

  allQueries : userQueries[] = []

  replyform!: FormGroup;

  userQuery !: userQueries

  showModal:boolean = false;
  queryid = ''

  constructor(private _userqueries : ContactusService,
    private fb: FormBuilder ){}

  ngOnInit(): void {

    this.getQueries()
    this.replyform = this.fb.group({
      reply : ['']
    })

  }
  getQueries() {
    this._userqueries.getQueries().subscribe(
      (value) => {
        this.allQueries=value
        console.log(value);
      },
      (err) => console.log(err)

    )
  }


  onGetdata(data : userQueries){

    this.userQuery = data
    this.showModal = true;
  }

  onDeleteReply(item : userQueries){
    console.log(item._id);
    this._userqueries.deleteQueries(item._id).subscribe(
      (value) =>{
        console.log(value)
        this.getQueries()
      },
      (err) => console.log(err)
    )
  }

  onReply(){

    this.userQuery.reply = this.replyform.value.reply

    this._userqueries.updateQueries(this.userQuery).subscribe(
      (value) =>
         console.log(value),
      (err) => console.log(err)
    )

    this.showModal = false;
  }


  onCloseModal(){
    this.showModal = false;
    this.replyform.reset()
  }
}
