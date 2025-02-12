import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getStorage, ref,uploadBytes  } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor() {}

  upload(file: any, nomeProjeto: string) {
    const storage = getStorage();
    const mountainsRef = ref(storage, nomeProjeto);
    uploadBytes(mountainsRef, file)
  }
}