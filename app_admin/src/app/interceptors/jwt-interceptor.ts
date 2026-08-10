import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { StorageService } from '../services/storage';

export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
  const isAuthRequest = /\/api\/(login|register)$/.test(request.url);
  const isProtectedTripWrite = /\/api\/trips(?:\/[^/]+)?$/.test(request.url)
    && request.method !== 'GET';
  const token = inject(StorageService).get();

  if (!isAuthRequest && isProtectedTripWrite && token) {
    return next(request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    }));
  }
  return next(request);
};
