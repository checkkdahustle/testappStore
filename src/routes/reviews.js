
// Function to GET user listing from database

 /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
   LIST REVIEWS
 =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
/* Displays all of the reviews in the database
Required for READ part of CRUD */

exports.list = function(req, res){

  // Get connection to our database
  req.getConnection(function(err,connection){

        // Select everything in the "reviews" database in order to be displayed
        var query = connection.query('SELECT * FROM reviews',function(err,rows)
        {

// If there is an error, display this message:
            if(err)
                console.log("Error Selecting : %s ",err );

            // Show the page title
            res.render('reviews',{page_title:"Comment Area",data:rows});

         });

         //console.log(query.sql); Test to get raw query

    });
};

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  ADD REVIEWS
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
/* Code to add your review / comment
Required for CREATE part of CRUD */

exports.add = function(req, res){

 // Show the page title
  res.render('add_review',{page_title:"Add Comment"});
};


/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  EDIT REVIEWS
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
/* Edit your review
Required for UPDATE part of CRUD */

exports.edit = function(req, res){
    var id = req.params.id;

    // Get the connection to the database:
    req.getConnection(function(err,connection){

        // Select the review from the "reviews" database with the ID of the selected review
        var query = connection.query('SELECT * FROM reviews WHERE id = ?',[id],function(err,rows)
        {

// If there is an error, display this message:
            if(err)
                console.log("Error Selecting : %s ",err );
            // page title.
            res.render('edit_review',{page_title:"Edit Comment",data:rows});
         });
         //console.log(query.sql);
    });
};


/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  SAVE REVIEWS
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
/* Save the customer information in the database.
We are only keeping this name until a login is created. */

exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));

    // Get the connection to the database:
    req.getConnection(function (err, connection) {

        // Variable for inputs of the name, review post, and star rating
        var data = {
            name    : input.name,
            post : input.post,
            star   : input.star
        };

        // Insert this information into the "reviews" database
        var query = connection.query("INSERT INTO reviews set ? ",data, function(err, rows)
        {

// If there is an error, display this message:
              console.log("Error inserting : %s ",err );

          // Once submitted, redirect the user back to the main reviews page.
          res.redirect('/reviews');
        });

       // console.log(query.sql); Test to get raw query
    });
};

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  SAVE EDITED REVIEWS
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
/* Save any edits made to your review
Required for UPDATE part of CRUD */

       // console.log(query.sql); Test to get raw query

    });
};

exports.save_edit = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    // Get the connection to the database:
    req.getConnection(function (err, connection) {

        // Variable for inputs of the name, review post, and star rating
        var data = {
            name    : input.name,
            post : input.post,
            star   : input.star
        };

        // Update the selected review in the "reviews" database
        connection.query("UPDATE review set ? WHERE id = ? ",[data,id], function(err, rows)
        {

// If there is an error, display this message:
          if (err)
              console.log("Error Updating : %s ",err );

          // Once submitted, redirect the user back to the main reviews page.
          res.redirect('/reviews');
        });
    });
};

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  DELETE REVIEWS
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
/* Code to Delete your Review
Required for DELETE part of CRUD */

exports.delete_review = function(req,res){
     var id = req.params.id;

     // Get the connection to the database:
     req.getConnection(function (err, connection) {

        // Delete the selected review in the "reviews" database
        connection.query("DELETE FROM reviews  WHERE id = ? ",[id], function(err, rows)
        {

// If there is an error, display this message:
             if(err)
                 console.log("Error deleting : %s ",err );

             // Once submitted, redirect the user back to the main reviews page.
             res.redirect('/reviews');
        });
     });
};
