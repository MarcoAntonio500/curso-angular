import { pipe } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

export function filterResponse<T>() {
  return pipe(
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    map((event: HttpEvent<T>) => {
      if (event instanceof HttpResponse) {
        return event.body;
      }
  
      throw new Error('Unexpected event type');
    })
  );
}

export function uploadProgress<T>(cb: (progress: number) => void) {
  return tap((event: HttpEvent<T>) => {
    if (event.type === HttpEventType.UploadProgress && event.total !== undefined) {
      cb(Math.round((event.loaded * 100) / event.total));
    }
  });
}