const express = require("express");
const pool = require("./../database");
const bodyParser = require ('body-parser');

const app = express();
const router = express.Router();
router.use (bodyParser.json ());


// api/reviews - Returns all reviews
router.get("/", (request, response) => {
    // api/reviews?mealsId={id} - GET - Return reviews for a specific meals_id
    const { mealsId } = request.query;
    if (mealsId) {
      const num = parseInt(mealsId.trim());
      if (Object.is(num, NaN)) {
        response.status(400);
        response.send(`Bad request, ${mealsId} is not a number`);
        return;
      }
      pool.query(`SELECT * FROM reviews WHERE meals_id = ${mealsId}`, function (error,results,fields) {
        if (error) {
          return response.send(error);
        }
        if (results.length === 0) {
          response.status(404);
          response.send(`There is no reservations for the meal with id ${mealsId}`);
        } else {
          response.json(results);
        }
      });
    } else { 
      pool.query("SELECT * FROM reviews", function(error, results, fields) {
        // error will be an Error if one occurred during the query
        if (error) {
            return response.send(error);
        }
        // results will contain the results of the query
        response.json(results);
    // fields will contain information about the returned results fields (if any)
    });
  }
});

// api/reviews/	- POST - Adds a new review	
router.post("/", (request, response) => {
    const review = request.body;
    pool.query("INSERT INTO reviews SET ?", review, function (error, results, fields) {
        if (error) {
          return response.send(error);
        }
        response.send("Review added to DB");
      });
});

// api/reviews/{id}	- GET - Returns review by id	
router.get("/:id", (request, response) => {
    const { id } = request.params;
    if (!parseInt(id)) {
      response.status(400);
      response.send(`Bad request, ${id} is not a number`);
      return;
    }
    pool.query(`SELECT * FROM reviews WHERE id = ${id}`, function (error,results,fields) {
      if (error) {
        return response.send(error);
      }
      if (results.length === 0) {
        response.status(404);
        response.send("Review with the corresponding id is not found");
      } else {
        response.json(results);
      }
    });
  });

// api/reviews/{id}	- PUT - Updates the review by id
router.put("/:id", (request, response) => {
    const { id } = request.params;
    if (!parseInt(id)) {
      response.status(400);
      response.send(`Bad request, ${id} is not a number`);
      return;
    }
    pool.query(
      `UPDATE reviews SET title = ?, description = ?, meals_id = ?, stars = ?, created_by = ? WHERE id = ?`,
      [
        request.body.title,
        request.body.description,
        request.body.meals_id,
        request.body.stars,
        request.body.created_by,
        parseInt(id)
      ],
      function (error, results, fields) {
        if (error) {
          return response.send(error);
        }
        if (results.length === 0) {
          response.status(404);
          response.send("Review with the corresponding id is not found");
        } else {
          response.send ('Review has been updated.');
        }
      }
    );
  });

// api/reviews/{id}	- DELETE - Deletes the review by id	
router.delete("/:id", (request, response) => {
    const { id } = request.params;
    if (!parseInt(id)) {
      response.status(400);
      response.send(`Bad request, ${id} is not a number`);
      return;
    }
    pool.query(`DELETE FROM reviews WHERE id = ${id}`, function (error,results,fields) {
      if (error) {
        return response.send(error);
      }
      if (results.length === 0) {
        response.status(404);
        response.send("Review with the corresponding id is not found");
      } else {
        response.send(`Review with id ${id} has been deleted!`);
      }
    });
  });

module.exports = router;