import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  ip: Object;
  myip: Object;
  searchForm: FormGroup;
  country: string;
  countryData: Object;

  // When we want to access data, refer it to data
  constructor(private data: DataService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      input: ['', Validators.required],
    })
  }

  // Custom method to search form
  searchIp(query : string) {
    return (
      this.data.searchIp(query).subscribe(data => {
      this.ip = data
      console.log(this.ip);
      // this.country = this.ip.country
      // console.log(this.country);

      this.data.searchCountry(this.ip.country).subscribe(data => {
        this.countryData = data;
        console.log(data);
      })

      }));
  }

  // Method to search to search data based on country
  searchCountry() {
    return(
    this.data.getCountry().subscribe(data => {
      this.countryData = data;
      console.log(data);
    })
    );
  }

  

  ngOnInit() {
    this.data.getIp().subscribe(data => {
      this.ip = data
      this.myip = data
      console.log(this.ip)
      this.data.searchCountry(this.ip.country).subscribe(data => {
        this.countryData = data;
        console.log(this.countryData);
      });
    })


  }

}
