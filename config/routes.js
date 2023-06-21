/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'POST /users' : 'UsersController.create',

  //upload image
  'POST /UploadImage': 'UploadImageController.uploadImage',
  'GET /UploadImage': { view: 'pages/homepage' },



  // auth
  'POST /auth/login': 'AuthController.signIn',
  'POST /auth/signUp': 'AuthController.signUp',


  // film management
  'POST /filmManager/getDataBaseOnFilmId': 'FilmManagerController.getDataBaseOnFilmId',
  'POST /blue/filmManager': 'FilmManagerController.createNewDocFilmMamager',
  'DELETE /blue/filmManager/:id': 'FilmManagerController.deleteDocFilmManager',

  'GET /filmManager/getSeatDataBaseOnFilmManagerId/:filmManagerId': 'FilmManagerController.getSeatDataBaseOnFilmManagerId',


  // bill

  'POST /bills/createNewBills': 'BillsController.createNewBills',

  'POST /dashBoard/getDataForDashBoard' : 'DashBoardController.getDataForDashBoard' ,
  'GET /dashBoard/getDataforTicketManager' : 'DashBoardController.getDataforTicketManager' 





  
  



  


 
  
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
