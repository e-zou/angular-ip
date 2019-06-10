import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myip: Object;
  

  // When we want to access data, refer it to data
  constructor(private data: DataService) {

  }

  // Angular Lifecycle Hook; execute when page renders
  ngOnInit() {
    this.data.getIp().subscribe(data => {
      this.myip = data
    })
  }

}
