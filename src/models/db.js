/**
 * Sequelize will setup a connection pool
 * on initialization so you should ideally
 * only ever create one instance per database.
 *
 * if you are reading this sean is awesome...that is all
 */

module.exports = function() {
  var Sequelize = require('sequelize');
  var mysql = require('mysql');

  // Dot Env File Loader
  if (!process.env.PORT) dotenv = require('dotenv').load();

  var _sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_SCHEMA,
    port: process.env.DB_PORT,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    logging: false
  });

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    User
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

  /**
   *   to define mapping between a model and table use
   *   ".define" Sequelize will then automatically add the
   *   attributes createdAt and updatedAt to it in DB.
   *
   */

  var _user = _sequelize.define('user', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    dispName: {

    //.STRING sets the datatype to a string
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },

    //added ability for user to set gender in DB on registration to generate recommendations based on gender
    gender: {
      type: Sequelize.STRING
    },

    //added ability for user to set age in DB on registration to generate recommendations based on age
    age: {

      //.INTEGER sets the datatype to a INTEGER
      type: Sequelize.INTEGER
    },

    //added ability for user to set hobbys in DB on registration to generate recommendations based on degree
    hobby: {
      type: Sequelize.STRING
    }
  }, {
    paranoid: true
  });

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    genre
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _genre = _sequelize.define('genre', {
    title: {
      type: Sequelize.STRING
    }
  }, {
    paranoid: true
  });

   // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    degree
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _degree = _sequelize.define('degree', {
    title: {
      type: Sequelize.STRING
    }
  }, {
    paranoid: true
  });

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    Roles
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _role = _sequelize.define('role', {
    title: {
      type: Sequelize.STRING
    }
  }, {
    paranoid: true
  });

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    Social Accounts
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _socialAccount = _sequelize.define('socialAccount', {
    socialID: {
      type: Sequelize.INTEGER
    },
    publicLink: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.ENUM,
      values: ['google', 'twitter', 'facebook']
    }
  }, {
    paranoid: true
  });

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    Voting
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _voting = _sequelize.define('voting', {
    type: {
      type: Sequelize.ENUM,
      values: ['image', 'YouTube', 'other']
    },
    link: {
      type: Sequelize.STRING
    }
  }, {
    paranoid: true
  });

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    Apps
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _app = _sequelize.define('app', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    age: {
      type: Sequelize.STRING
    },
    readme: {
      type: Sequelize.TEXT
    },
    sourceLink: {
      type: Sequelize.STRING
    },
    exeLink: {
      type: Sequelize.STRING
    },
    iOSAppStoreLink: {
      type: Sequelize.STRING
    },
    releaseDate: {
      type: Sequelize.DATE
    }
  }, {
    paranoid: true
  });

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    Review
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

  // This is making the table in SQL with 3 fields for now: name, post, & star rating.
  var _review = _sequelize.define('review', {
    name: {
      type: Sequelize.STRING
    },
    post: {
      type: Sequelize.TEXT
    },
    star: {
      type: Sequelize.INTEGER
    }
  }, {
    paranoid: true
  });

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    App Assets
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _appAsset = _sequelize.define('appAsset', {
    type: {
      type: Sequelize.ENUM,
      values: ['image', 'YouTube', 'other']
    },
    link: {
      type: Sequelize.STRING
    }
  }, {
    paranoid: true
  });

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    Lists
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _list = _sequelize.define('list', {
    title: {
      type: Sequelize.STRING
    },
    releaseDate: {
      type: Sequelize.DATE
    }
  }, {
    paranoid: true
  });

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    History
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _history = _sequelize.define('history', {
    rawRoute: {
      type: Sequelize.STRING
    },
    model: {
      type: Sequelize.STRING
    },
    action: {
      type: Sequelize.STRING
    },
    target: {
      type: Sequelize.STRING
    }
  }, {
    paranoid: true
  });

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    Listed Apps - table joins
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _listedApp = _sequelize.define('listedApp', {}, {
    paranoid: false
  });

    //belongsTo - adds a foreign key and singular association mixins to the _role source.
  _user.belongsTo(_role, {
    foreignKey: 'role_id'
  });

    //hasOne - adds a foreign key to the target "app" and singular association mixins to the source.
  _genre.hasOne(_app, {
    foreignKey: 'genre_id'
  });
  _degree.hasOne(_user, {
    foreignKey: 'degree_id'
  });

  //hasMany - adds a foreign key to target _socialAccount and plural association mixins to the source user_id.
  _user.hasMany(_socialAccount, {
    foreignKey: 'user_id'
  });

  //This is what tracks the user so when they log in it will track them here.
  _user.hasMany(_review, {
    foreignKey: 'user_id'
  });
  _user.hasMany(_app, {
    foreignKey: 'user_id'
  });
  _app.hasMany(_appAsset, {
    foreignKey: 'app_id'
  });
  _user.hasMany(_list, {
    foreignKey: 'user_id'
  });

  //belongsToMany - creates an N:M association with a join table and adds plural association mixins to the source. The junction table is created with sourceId and targetId.
  _app.belongsToMany(_list, {
    through: 'listedApp'
  });

  _sequelize.sync();

  return {
    connection: _sequelize,
    user: _user,
    app: _app,
    histories: _history,
    review: _review, //np sean I got you <3
    voting: _voting,
    appAsset: _appAsset,
    list: _list,
    listedApp: _listedApp,
    role: _role,
  };
}();
