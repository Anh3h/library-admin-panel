export class User {
    activated: boolean;
    address: string;
    roles: any;
    city: string;
    //postalCode: number;
    coordinates: {
      latitude: number,
      longitude: number
    };
    createdBy: string;
    createdDate: string
    defaultRadius: string;
    display: string;
    email: string;
    firstName: string;
    id: number;
    imageUrl: string;
    langKey: string;
    lastModifiedBy: string;
    lastModifiedDate: string;
    lastName: string;
    phoneNumber: string;
    userName: string;
    uuid: string;

    constructor() {
        this.activated = true;
        this.address= "";
        this.roles= [
            "ROLE_USER", "ROLE_ADMIN"
            ];

        //this.postalCode = 0;
        this.city = "";
        this.coordinates = {
                latitude: 0,
                longitude: 0
            };
        this.createdBy = "";
        this.createdDate = ""
        this.defaultRadius = "";
        this.display = "";
        this.email = "";
        this.firstName = "";
        this.id = 0;
        this.imageUrl = "";
        this.langKey = "";
        this.lastModifiedBy = "";
        this.lastModifiedDate = "";
        this.lastName = "";
        this.phoneNumber = "";
        this.userName = "";
        this.uuid = "";
    }

    static getLoggedUser(): any {
        return JSON.parse(localStorage.getItem('user'));
    }

}