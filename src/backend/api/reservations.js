const express = require("express");
const pool = require("./../database");
const bodyParser = require ('body-parser');

const app = express();
const router = express.Router();
router.use (bodyParser.json ());

// api/reservations/ - Returns all reservations
router.get("/", (request, response) => {
  // api/reservations?mealsId={id} - GET - Returns reservation for a specific meals_id	
   const { mealsId } = request.query;
   const num = parseInt(mealsId.trim());
   if (mealsId) {
     if (Object.is(num, NaN)) {
       response.status(400);
       response.send(`Bad request, ${mealsId} is not a number`);
       return;
     }
     pool.query(`SELECT * FROM reservations WHERE meals_id = ${mealsId}`, function (error,results,fields) {
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
      pool.query("SELECT * FROM reservations", function(error, results, fields) {
            if (error) {
                return response.send(error);
            }
            response.json(results);
      });
   }
  
});

// api/reservations/ - POST	- Adds a new reservation
router.post("/", (request, response) => {
    const reservation = request.body;
    pool.query("INSERT INTO reservations SET ?", reservation, function (error, results, fields) {
        if (error) {
          return response.send(error);
        }
        response.send("Reservation added to DB");
      });
});

// api/reservations/{id} - GET - Returns reservation by id	
router.get("/:id", (request, response) => {
    const { id } = request.params;
    if (!parseInt(id)) {
      response.status(400);
      response.send(`Bad request, ${id} is not a number`);
      return;
    }
    pool.query(`SELECT * FROM reservations WHERE id = ${id}`, function (error,results,fields) {
      if (error) {
        return response.send(error);
      }
      if (results.length === 0) {
        response.status(404);
        response.send("Reservation with the corresponding id is not found");
      } else {
        response.json(results);
      }
    });
  });



// api/reservations/{id} - PUT - Updates the reservation by id	
router.put("/:id", (request, response) => {
    const { id } = request.params;
    if (!parseInt(id)) {
      response.status(400);
      response.send(`Bad request, ${id} is not a number`);
      return;
    }
    pool.query(
      `UPDATE reservations SET number_of_guests = ?, email = ?, meals_id = ?, created_at = ? WHERE id = ?`,
      [
        request.body.number_of_guests,
        request.body.email,
        request.body.meals_id,
        request.body.created_at,
        parseInt(id)
      ],
      function (error, results, fields) {
        if (error) {
          return response.send(error);
        }
        if (results.length === 0) {
          response.status(404);
          response.send("Reservation with the corresponding id is not found");
        } else {
          response.send ('Reservation has been updated.');
        }
      }
    );
  });
  
// api/reservations/{id} - DELETE - Deletes the reservation by id
router.delete("/:id", (request, response) => {
    const { id } = request.params;
    if (!parseInt(id)) {
      response.status(400);
      response.send(`Bad request, ${id} is not a number`);
      return;
    }
    pool.query(`DELETE FROM reservations WHERE id = ${id}`, function (error,results,fields) {
      if (error) {
        return response.send(error);
      }
      if (results.length === 0) {
        response.status(404);
        response.send("Reservation with the corresponding id is not found");
      } else {
        response.send(`Reservation with id ${id} has been deleted!`);
      }
    });
  });

module.exports = router;