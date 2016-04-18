[ ![Codeship Status for reactivepixel/appStore](https://codeship.com/projects/455421c0-e26c-0133-d1a4-0229a9d1976f/status?branch=master)](https://codeship.com/projects/145610)

# Gravity App Store

## Installation

### Package Dependencies

​
Install the dependencies defined in the package.json file.

```
npm install dependencyName --save --save-exact
```

For dev dependencies

```
npm install dependencyName --save-dev --save-exact
```

### jsdoc Installation

Globally install jsdoc

```
npm install -g jsdoc
```

### gulp Installation

Install dev dependencies for gulp

```
npm install --save-dev gulp gulp-nodemon gulp-shell gulp-clean
```

### [GER](https://github.com/grahamjenson/ger) usage

#### Good Enough recommendations(GER) - collaborative filtering

* used for recommendation algorithm
* dependent on data from: *game voting, game genres, user degree, user download and viewing histories*

GER can generate recommendations for a person, e.g. *what would alice like?*

```
ger.recommendations_for_person('movies', 'alice', {actions: {likes: 1}
```

also recommendations for a thing, e.g. *what would a person who likes xmen like?*

```
ger.recommendations_for_thing('movies', 'xmen', {actions: {likes: 1}})
```

#### important details
* The first result is the most recommended followed by the next result and etc.
* confidence - variable that quantifies what 'thing' to first recommend.
* neighbourhood - variable that quantifies the amount of users who 'like' the same 'thing' (or in this case, game);


### fs usage

fs is native to node. no installation needed.
fs needs to be required.

```
var fs=require('fs');
```
fs will read and write to file systems.
Use fs to write to your views.

create your views in the public folder.

## Run Server

#### To run the server now in terminal...

```
gulp
```

##### Out Folder

When you gulp or jsdoc filepath/To/jsfile.js you'll get an out folder.
The out folder is the documentation.

### ENV File

Create your .env file in `.env` and it should contain the following information with user and password adjustments to match your dev environment.

```
DB_HOST=localhost
DB_SCHEMA=mysql
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=appStore
```

### MySQL

Install MySQL with Brew

```
brew install mysql
```

Create a database called `appStore`.

Load the SQL from the sequel dump in `seed/appStore_2016-04-12.sql`


## Development

Start Your MySQL Server

```
mysql.server start
```

Run your Development Server.

```
nodemon src/server.js
```

The default port is 3000 and should run on [http://localhost:3000](http://localhost:3000)


## Unit Testing

`./test/__app.js` requires that a user exist in the system with id of `3341f2aa-c8dd-465c-b6c8-a793d4426db9`. TODO: refactor this unit test to be more dynamic.


## Outline

A Game and Application Store for exclusive use by Full Sail Students and Alumni. This outline serves as a roadmap for features to be developed.

## Roles

* **Super Admin** - Can make / remove admins

* **Admin** - Direct Code Contributors to the store and other key staff. Can make / remove mods.

* **Moderator** - A community volunteer willing to work closely with the admins to better organize and support the community.

* **Developer** - Has additional privileges to add content to the store. Can define authorized  access to their content.

Access to a fullsail.edu or .com email required for initial authentication.

* **User** - Can consume content and access authorized items for download.

## Features

#### Developer Profiles

Devs can curate and maintain their information with links out to their source code (Github), social sites(Twitter), professional sites (Linkedin) and other methods of contact.

#### Developer Feeds

The public feeds from the specified connected sites will also aggregate into the Developer Profile to show fresh content / activity even though the associated developer may not have been directly active recently.

#### Developer Uploads

Devs can host their APKs or other executable app files. Details regarding installation, the game play, and other various points of information can be collected and presented to users. Devs can control the date of release for their game file to manage a future release.

#### Application Updates

This will require additional research and at best may only be able to notify the application, while used, of a needed update. A developer should be able to upload an update to the store. This system will provide an API endpoint for applications and games to use for testing if the app has been updated in the store.

#### User Groups

Users can self organize into publicly open groups or be added to a restricted access group. Devs and Mods can send private invites only to which groups they have access. Admins can invite and access any group.

> Example: Willing beta testers and class specific or limited access Groups.

#### Moderator Lists

Moderators have the ability to create curated lists of apps within the system to showcase. Observing analytics of these lists will help to identify effective lists for further promotion in various areas of the store.

#### Moderator Disable

Moderators can disable various pieces of content for fast action in hiding content that does not comply with the community standards.

#### New, Featured, & Top Apps

An automatic list showcasing the new and most downloaded/viewed/reviewed applications. A featured list will be automatically generated based upon staff(mods, and admin) activity and other directly selected apps. All of these lists will have a decay built into their algorithms to rotate the content within to represent a fresh sample week to week and month to month.

## Definitions

#### Community Standards

In addition to a Terms of Service for Users, Developers and Admins will need to consent to and abide by a set of principles to help guide conduct between users, devs, and admins. If viruses or other malicious code is found in any application or game it will be immediately removed, the developer account will be suspended, pending review and possible further action in addition to the users that have previously installed may be contacted if able to warn of the threat.

## Tech Stack

|Considerations| |

|---|---|

| Web Server | Node.js Server running an API built on Express |

| Front End | Either AngularJS or ReactJS (further internal debate will determine) front end will consume the API. |

| Database| MySql will provide the Data Relations to tie everything together.|

|Hosting| Heroku will provide the initial platform to host. The application will be built in such a way that it can easily be migrated to a VPS hosted solution once it out-scales the constraints of Heroku’s free hosting options.|

|Unit Tests| Mocha will be used to provide the stability over time this project will need.|

|Automated QA| Codeship will be our build and test runner tool to not encumber our production environment.|

|Various Notables for Inclusion| CodeClimate, Sequelizejs, Gulp, Papertrailsapp, Github Workflow, PassportJS, JSON Web Tokens (JWT), SemVer |
