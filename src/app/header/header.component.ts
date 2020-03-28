import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private httpclient: HttpClient
  ) { }

  ngOnInit() {

  }

  cardrender() {

  }


}
