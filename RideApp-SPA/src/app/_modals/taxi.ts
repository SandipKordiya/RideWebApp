export class Taxi {
    $key: string;
    model: string;
    number: string;
    driver: string;
    status: string;
    url: string;
    name: string;
    file: File;

    constructor(file: File) {
        this.file = file;
      }
}
