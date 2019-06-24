import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class SearchHistory {
  private scope: string = 'user';
  private resourcePath: string = 'ui/history';

  private resourceName: string;
  private uri: string;

  constructor(private basePlugin: ZLUX.Plugin, private type: string, private http: Http) {
    this.resourceName = `${type}Search.json`;
    this.uri = ZoweZLUX.uriBroker.pluginConfigForScopeUri(basePlugin, this.scope, this.resourcePath, this.resourceName);
  }

  public getData(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .get(this.uri, options)
      .map(res => res.json())
      .catch((err => {
          let type = this.type;
          console.log(err);
          console.log(`${type} search history file does not exist. Creating one now...`);
          return null;
      }));
  }


  public saveData(history: String[]): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let params = {
        "history": history
    };

    return this.http
      .put(this.uri, params, options)
      .catch((err => {
          let type = this.type;
          console.log(`save${type}SearchHistory error`, err);
          return null
      }));
  }
}