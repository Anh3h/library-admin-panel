export class Page {
    public first: boolean;
    public last: boolean;
    public number: number;
    public numberOfElements: number;
    public size: number;
    public sort;
    public totalElements: number;
    public totalPages: number;

    constructor() {
        this.first = false;
        this.last = false;
        this.number = 0;
        this.numberOfElements = 0;
        this.size = 0;
        this.totalElements = 0;
        this.totalPages = 0;
    }

}