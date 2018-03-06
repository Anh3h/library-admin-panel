export class Resource {

    uuid: string;
    city: string;
    email: string;
    address: string;
    //postalCode: number;
    contactPerson: string;
    phoneNumber: string;
    coordinates: {
        longitude: number,
        latitude: number
    };
    name: string;
    description: string;
    photo: string;
    type: string;

    constructor( type: string) {
        this.uuid= "";
        this.city= "";
        this.email= "";
        this.address= "";
        //this.postalCode= 0;
        this.contactPerson = "";
        this.phoneNumber = "";
        this.coordinates = {
            longitude: 0,
            latitude: 0
        };
        this.name = "";
        this.description = "";
        this.photo = "";
        this.type = type;
    }
}