import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ip: Object;
  myip: Object;
  searchForm: FormGroup;

  // When we want to access data, refer it to data
  constructor(private data: DataService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      input: ['', Validators.required],
    })
  }


  searchIp(query : string) {
    return this.data.searchIp(query).subscribe(data => {
      this.ip = data
      console.log(this.ip)
    });
  }

  // checkIp() {
  //   return this.data.getIp().subscribe(data => {
  //     this.myip = data
  //     console.log(this.myip)
  //   });
  // }

  // Angular Lifecycle Hook; execute when page renders
  ngOnInit() {
    this.data.getIp().subscribe(data => {
      this.ip = data
      this.myip = data
      console.log(this.ip)
    })
  }

}
