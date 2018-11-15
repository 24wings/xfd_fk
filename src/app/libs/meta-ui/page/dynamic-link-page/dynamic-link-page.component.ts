import { Component } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { getMetaEntity } from "../../util/meta/MetaEntity";
import { MetaCom } from "../../util/meta/MetaCom";
import { C, U, D, Q } from "../../util/meta/Power";

@Component({
    selector: 'dynamic-link-page',
    templateUrl: './dynamic-link-page.html',
    styleUrls: ['./dynamic-link-page.css']
})
export class DynamicLinkPageComponent {
    power: number = C | U | Q | D;
    metaCom: MetaCom;
    constructor(private route: ActivatedRoute, private router: Router) {
        this.router.events.forEach(event => {
            if (event instanceof NavigationEnd)
                if (this.route.snapshot.data) {
                    let metaCom = this.route.snapshot.data.metaCom;
                    if (metaCom)
                        this.metaCom = getMetaEntity(this.route.snapshot.data)
                }
        })
    }

}