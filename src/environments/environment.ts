// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  stripePublicKey: 'pk_test_51KHxNTGf328Tr82UzhidaxYks5pT209YuibM2DaUqUUuzjpO7eSsczhoDK6Wv4RAIRAQzuNWfvosuZRkR2lchGl800nbwvzgvb',//PUT YOUR STRIPE PUBLIC KEY HERE
  urlFile: 'http://localhost:8081/',
  url: 'http://localhost:8081/api/training/',
  //url: 'http://51.222.110.5:8081/api/training/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
