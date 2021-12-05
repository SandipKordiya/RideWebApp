export class User {
  uid: string;
  firstname: string;
  email: string;
  phone: string;
  status: string;
  url: string;
  imagename: string;
  file?: File;

  constructor(file: File) {
    this.file = file;
  }
  }
