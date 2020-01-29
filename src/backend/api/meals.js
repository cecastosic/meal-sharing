const express = require("express");
const pool = require("./../database");
const bodyParser = require ('body-parser');

const app = express();
const router = express.Router();
router.use (bodyParser.json ());

// api/meals/ - Returns all meals
router.get("/", (request, response) => {
  // GET api/meals/ query parameters
  // maxPrice - Get meals that has a price smaller than maxPrice - /meals?maxPrice=90
  // availableReservations - Get meals that still has available reservations - /meals?availableReservations=true
  // title - Get meals that partially match a title. Rød grød med will match the meal with the title Rød grød med fløde - /meals?title="Indian platter"
  // createdAfter - Get meals that has been created after the date - /meals?createdAfter=2019-04-05
  // limit - Only specific number of meals - /meals?limit=4

  const { maxPrice } = request.query;
  const { title } = request.query;
  const { availableReservations } = request.query;
  const { createdAfter } = request.query;
  const { limit } = request.query;

  if (maxPrice) {
    const price = parseInt(maxPrice);
    if (Object.is(price, NaN)) {
      response.status(400);
      response.send(`Bad request, ${maxPrice} is not a number`);
      return;
    }
    pool.query(`SELECT * FROM meals WHERE price <= ${price}`, function(
      error,
      results,
      fields
    ) {
      if (error) {
        return response.send(error);
      }
      if (results.length === 0) {
        response.status(404);
        response.send(`No meals in the price range`);
        return;
      } else {
        response.json(results);
      }
    });
  } else if (title) {
    const titleTrim = title.trim().replace(/[^\w\s]/gi, "");
    pool.query(
      `SELECT * FROM meals WHERE title LIKE '%${titleTrim}%'`,
      function(error, results, fields) {
        if (error) {
          return response.send(error);
        }
        if (results.length === 0) {
          response.status(404);
          response.send(`No meal matched with the word ${titleTrim}`);
          return;
        } else {
          response.json(results);
        }
      }
    );
  } else if (availableReservations) {
    pool.query(
      `SELECT meals.id, meals.title, COALESCE(SUM(reservations.number_of_guests), 0) as number_of_guests, meals.max_guests
      FROM meals
      LEFT JOIN reservations ON reservations.meals_id = meals.id
      WHERE when_date >= CURRENT_TIMESTAMP
      GROUP BY meals.id
      HAVING COALESCE(SUM(reservations.number_of_guests), 0) < meals.max_guests`,
      function(error, results, fields) {
        if (error) {
          return response.send(error);
        }
        if (results.length === 0) {
          response.status(404);
          response.send(`No meal with available reservation`);
          return;
        } else {
          response.json(results);
        }
      }
    );
  } else if (createdAfter) {
    pool.query(
      `SELECT * FROM meals WHERE created_at >= '${createdAfter}'`,
      function (error, results, fields) {
        if (error) {
          return response.send(error);
        }
        if (results.length === 0) {
          response.status(404);
          response.send(`No meal that has been created after ${createdAfter}`);
          return;
        } else {
          response.json(results);
        }
      }
    );
  } else if (limit) {
    const num = parseInt(limit.trim());
    if (Object.is(num, NaN)) {
      response.status(400);
      response.send(`Bad request, ${limit.trim()} is not a number`);
      return;
    }
    pool.query(`SELECT * FROM meals LIMIT ${num}`, function (error,results,fields) {
      if (error) {
        return response.send(error);
      } else {
        response.json(results);
      }
    });
  } else {
    pool.query("SELECT * FROM meals", function (error, results, fields) {
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

// api/meals/{id} - Returns meal by id
router.get("/:id", (request, response) => {
  const { id } = request.params;
  if (!parseInt(id)) {
    response.status(400);
    response.send(`Bad request, ${id} is not a number`);
    return;
  }
  pool.query(`SELECT * FROM meals WHERE id = ${id}`, function (error,results,fields) {
    if (error) {
      return response.send(error);
    }
    if (results.length === 0) {
      response.status(404);
      response.send("Meal with the corresponding id is not found");
    } else {
      response.json(results);
    }
  });
});

// api/meals/ - POST - Adds a new meal
router.post("/", (request, response) => {
    const meal = request.body;
    pool.query("INSERT INTO meals SET ?", meal, function (error, results, fields) {
        if (error) {
          return response.send(error);
        }
        response.send("Meal added to DB");
      });
});

// api/meals/{id} - PUT	- Updates the meal by id
router.put("/:id", (request, response) => {
  const { id } = request.params;
  if (!parseInt(id)) {
    response.status(400);
    response.send(`Bad request, ${id} is not a number`);
    return;
  }
  pool.query(
    `UPDATE meals SET title = ?, description = ?, max_guests = ?, price = ?, created_at = ?, when_date = ? WHERE id = ?`,
    [
      request.body.title,
      request.body.description,
      request.body.max_guests,
      request.body.price,
      request.body.created_at,
      request.body.when_date,
      parseInt(id)
    ],
    function (error, results, fields) {
      if (error) {
        return response.send(error);
      }
      if (results.length === 0) {
        response.status(404);
        response.send("Meal with the corresponding id is not found");
      } else {
        response.send ('Meal has been updated.');
      }
    }
  );
});

// api/meals/{id} - DELETE - Deletes the meal by id
router.delete("/:id", (request, response) => {
    const { id } = request.params;
    if (!parseInt(id)) {
      response.status(400);
      response.send(`Bad request, ${id} is not a number`);
      return;
    }
    pool.query(`DELETE FROM meals WHERE id = ${id}`, function (error,results,fields) {
      if (error) {
        return response.send(error);
      }
      if (results.length === 0) {
        response.status(404);
        response.send("Meal with the corresponding id is not found");
      } else {
        response.send(`Meal with id ${id} has been deleted!`);
      }
    });
  });
  
module.exports = router;
