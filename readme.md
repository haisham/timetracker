
# Time tracker application
using Angular6/PHP-Laravel 

Server requirement:
PHP 7
Laravel min. 5.3<br/>
Nodejs CLI <br/>
NPM CLI<br/>

<h1>Setup API Server:</h1>
Laravel PHP framework<br/>
<b>Installation instructions:</b><br/>
Clone directory "Laravel backend" onto the server, 
update config/database.php with database authentication info<br/>
Run following commands using artisan console<br/>
php artisan migrate (this will create tables required in db)<br/>
php artisan clear-compiled<br/> 
composer dump-autoload<br/>
php artisan optimize<br/>
<br/>


<h1>Frontend (Angular 6):</h1>
<b>Installation instructions:</b><br/>
in nodejs cli run: 
npm install<br/>
ng serve

Nodejs CLI version 6.5.0 or up
Angular CLI 


<h1>Backend structure</h1>
Routes are defined in routes/web.php<br/>
Controller is defined in app/Http/Controllers/EventController.php<br/>
CORS middlewere was added in app/Http/Middleware/Cors.php, For security reason remove this in production env.


<h2>API calls</h2>

get /api/projects : Retrieve all projects<br/>
post /api/add-project : Add new project<br/>
put /api/close-project/{projectid} : Close a particular project<br/>
put /api/open-project/{projectid} : Reopen a particular project<br/>
get /api/entries/{projectid}/ : Get all time registration entries for a project<br/>
post /api/add-entry : Add a new time registration entry for project<br/>
delete /api/entry/{entryid} : Delete an entry<br/>



<h1>Frontend app structure</h1>
App Component : app/public/frontend/src/app/app.component.ts<br/>
Services are added in Angular app/public/frontend/src/app/services/projects.service.ts<br/>
/<br/>


<a href="http://54.184.124.76/frontend/timetracker/" target=_blank><b>Live demo</b></a>
