import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  userUrl: string;
  urldata;
  longUrl: string;

  constructor(@Inject(DOCUMENT) private document: Document, private httpclient: HttpClient) { }

  ngOnInit() {
    this.cardrender();
  }
  cardrender() {
    this.httpclient.get("/display").subscribe(data => {
      console.log("all url", data["result"]);
      this.urldata = data["result"];
      console.log(this.urldata);
    });
  }

  getUrl(userUrl) {
    console.log(userUrl)
    this.httpclient
      .post("/create", { userUrl })
      .subscribe(data => {
        console.log(data);
        this.cardrender();
      });
  }

  redirect(url) {
    this.httpclient
      .get(`/redirect/${url}`)
      .subscribe(result => {
        console.log(result["data"]["longUrl"]);
        this.longUrl = result["data"]["longUrl"];
        window.open(this.longUrl, "_blank");
        this.cardrender();
      });
  }

  remove(id) {
    this.httpclient
      .get(`/delete/${id}`)
      .subscribe(data => {
        //console.log(data);
        this.cardrender();
      });
    console.log(id);
  }

}
