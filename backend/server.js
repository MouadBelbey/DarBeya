import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";

import pg from "pg";
import crypto from "crypto";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
dotenv.config();

const randomImageName = (bytes = 16) =>
  crypto.randomBytes(bytes).toString("hex");

const user = process.env.POSTGRES_USER;
const host = process.env.POSTGRES_HOST;
const database = process.env.POSTGRES_DB;
const password = process.env.POSTGRES_PASSWORD;
const portDB = process.env.POSTGRES_PORT;

const port = process.env.PORT || 5000;

const secretSession = process.env.SESSION_SECRET;

const db = new pg.Client({
  user: user,
  host: host,
  database: database,
  password: password,
  port: portDB,
});
db.connect();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

// Use compression for all responses
app.use(compression());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: secretSession,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/image/:id', async (req, res) => {
  const selectQuery = "SELECT image_id, name, mimetype, image_data FROM images WHERE image_id = $1";
  const id = req.params.id;

  db.query(selectQuery, [id], async (err, result) => {
    if (err) {
      console.error("Erreur lors de l'execution de la requete", err.stack);
      res.status(500).send("Erreur lors de la récupération de l'image");
      return;
    }

    if (result.rows.length === 0) {
      return res.status(404).send("Image non trouvée");
    }

    // Send the binary image data directly with cache headers
    const image = result.rows[0];

    // Set caching headers - cache for 1 day
    res.set({
      'Content-Type': image.mimetype,
      'Cache-Control': 'public, max-age=86400',
      'ETag': `"image-${id}"`,
    });

    res.send(image.image_data);
  });
});

app.get('/robes', async (req, res) => {
  const selectQuery = "SELECT * FROM robes";

  db.query(selectQuery, async (err, result) => {
    if (err) {
      console.error("Erreur lors de l'execution de la requete", err.stack);
      res.status(500).send("Erreur lors de la récupération des robes");
      return;
    }

    const promises = result.rows.map((robe) => {
      return new Promise((resolve, reject) => {
        const selectImageQuery = "SELECT image_id, name FROM images WHERE robe_id = $1;";
        db.query(selectImageQuery, [robe.robe_id], async (err, resultImage) => {
          if (err) {
            console.error(
              "Erreur lors de l'execution de la requete",
              err.stack
            );
            reject("Erreur lors de la récupération de l'image");
            return;
          }

          // Create image URLs that point to our image retrieval endpoint
          const images = resultImage.rows.map(image => {
            return {
              ...image,
              imageUrl: `/image/${image.image_id}`
            };
          });

          robe.images = images;
          resolve(robe);
        });
      });
    });

    Promise.all(promises)
      .then((robes) => {
        res.status(200).json(robes);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });
});

app.get("/robe/:id", async (req, res) => {
  const selectQuery = "SELECT * FROM robes WHERE robe_id = $1";
  const id = req.params.id;

  db.query(selectQuery, [id], async (err, result) => {
    if (err) {
      console.error("Erreur lors de l'execution de la requete", err.stack);
      res.status(500).send("Erreur lors de la récupération de la robe");
      return;
    }

    if (result.rows.length === 0) {
      return res.status(404).send("Robe non trouvée");
    }

    const selectImageQuery = "SELECT image_id, name FROM images WHERE robe_id = $1;";
    db.query(selectImageQuery, [id], async (err, resultImage) => {
      if (err) {
        console.error("Erreur lors de l'execution de la requete", err.stack);
        res.status(500).send("Erreur lors de la récupération de l'image");
        return;
      }

      // Create image URLs that point to our image retrieval endpoint
      const images = resultImage.rows.map(image => {
        return {
          ...image,
          imageUrl: `/image/${image.image_id}`
        };
      });

      result.rows[0].images = images;
      res.status(200).json(result.rows[0]);
    });
  });
});


app.get('/accessoires', async (req, res) => {
  const selectQuery = "SELECT * FROM accessoires";

  db.query(selectQuery, async (err, result) => {
    if (err) {
      console.error("Erreur lors de l'execution de la requete", err.stack);
      res.status(500).send("Erreur lors de la récupération des accessoires");
      return;
    }

    const promises = result.rows.map((accessoire) => {
      return new Promise((resolve, reject) => {
        const selectImageQuery = "SELECT image_id, name FROM images WHERE accessoire_id = $1;";
        db.query(
          selectImageQuery,
          [accessoire.accessoire_id],
          async (err, resultImage) => {
            if (err) {
              console.error(
                "Erreur lors de l'execution de la requete",
                err.stack
              );
              reject("Erreur lors de la récupération de l'image");
              return;
            }

            // Create image URLs that point to our image retrieval endpoint
            const images = resultImage.rows.map(image => {
              return {
                ...image,
                imageUrl: `/image/${image.image_id}`
              };
            });

            accessoire.images = images;
            resolve(accessoire);
          }
        );
      });
    });

    Promise.all(promises)
      .then((accessoires) => {
        res.status(200).json(accessoires);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });
});

app.get("/accessoire/:id", async (req, res) => {
  const selectQuery = "SELECT * FROM accessoires WHERE accessoire_id = $1";
  const id = req.params.id;

  db.query(selectQuery, [id], async (err, result) => {
    if (err) {
      console.error("Erreur lors de l'execution de la requete", err.stack);
      res.status(500).send("Erreur lors de la récupération de l'accessoire");
      return;
    }

    if (result.rows.length === 0) {
      return res.status(404).send("Accessoire non trouvé");
    }

    const selectImageQuery = "SELECT image_id, name FROM images WHERE accessoire_id = $1;";
    db.query(selectImageQuery, [id], async (err, resultImage) => {
      if (err) {
        console.error("Erreur lors de l'execution de la requete", err.stack);
        res.status(500).send("Erreur lors de la récupération de l'image");
        return;
      }

      // Create image URLs that point to our image retrieval endpoint
      const images = resultImage.rows.map(image => {
        return {
          ...image,
          imageUrl: `/image/${image.image_id}`
        };
      });

      result.rows[0].images = images;
      res.status(200).json(result.rows[0]);
    });
  });
});




app.delete("/image/:id", async (req, res) => {
  const deleteQuery = "DELETE FROM images WHERE image_id = $1";
  const id = req.params.id;

  // No need to fetch the image first, we can directly delete from the database
  db.query(deleteQuery, [id], async (err, result) => {
    if (err) {
      console.error("Erreur lors de l'execution de la requete", err.stack);
      res.status(500).send("Erreur lors de la suppression de l'image");
      return;
    }

    if (result.rowCount === 0) {
      return res.status(404).send("Image non trouvée");
    }

    res.status(200).send("Image supprimée avec succès");
  });
});

app.delete('/robe/:id', async (req, res) => {
  const deleteQuery = "DELETE FROM robes WHERE robe_id = $1";
  const id = req.params.id;

  // Thanks to CASCADE constraint in the database, all related images will be automatically deleted
  db.query(deleteQuery, [id], async (err, result) => {
    if (err) {
      console.error("Erreur lors de l'execution de la requete", err.stack);
      res.status(500).send('Erreur lors de la suppression de la robe');
      return;
    }

    if (result.rowCount === 0) {
      return res.status(404).send("Robe non trouvée");
    }

    res.status(200).send('Robe supprimée avec succès');
  });
});


app.post("/upload-robes", upload.array("photo", 12), async (req, res) => {
  let images = req.files;
  let nomRobe = req.body.nomRobe;
  let couleurRobe = req.body.couleurRobe;
  let categorieRobe = req.body.categorieRobe;

  const insertQueryRobe =
    "INSERT INTO robes (nom, couleur, categorie) VALUES ($1, $2, $3) RETURNING robe_id";
  const robeValues = [nomRobe, couleurRobe, categorieRobe];

  let robeId;
  try {
    const robeResult = await db.query(insertQueryRobe, robeValues);
    robeId = robeResult.rows[0].robe_id;
  } catch (err) {
    console.error("Error executing query:", err.stack);
    return res.status(500).send("Error while saving the robe");
  }
  const insertQueryImage = "INSERT INTO images (robe_id, name, mimetype, image_data, image_size, is_primary) VALUES ($1, $2, $3, $4, $5, $6)";

  try {
    for (const [index, image] of images.entries()) {
      const imageName = randomImageName() + '.' + image.originalname.split('.').pop();

      // Store the image directly in the database
      // Set the first image as primary
      await db.query(insertQueryImage, [
        robeId,
        imageName,
        image.mimetype,
        image.buffer,
        image.size,
        index === 0 // first image is primary
      ]);

      console.log("Image enregistrée avec succès");
    }
    res.status(201).send("ok");
  } catch (err) {
    console.error("Erreur lors de l'enregistrement de l'image:", err.stack);
    res.status(500).send("Erreur lors de l'enregistrement de l'image");
  }
});


app.post('/upload-accessoires', upload.array('photo', 12), async (req, res) => {
  let images = req.files;
  let nomAccessoire = req.body.nomAccessoire;
  let descriptionAccessoire = req.body.descriptionAccessoire;

  const insertQueryAccessoire =
    "INSERT INTO accessoires (name, description) VALUES ($1, $2) RETURNING accessoire_id";
  const accessoireValues = [nomAccessoire, descriptionAccessoire];

  let accessoireId;
  try {
    const accessoireResult = await db.query(
      insertQueryAccessoire,
      accessoireValues
    );
    accessoireId = accessoireResult.rows[0].accessoire_id;
  } catch (err) {
    console.error("Error executing query:", err.stack);
    return res.status(500).send("Error while saving the accessoire");
  }
  const insertQueryImage = "INSERT INTO images (accessoire_id, name, mimetype, image_data, image_size, is_primary) VALUES ($1, $2, $3, $4, $5, $6)";

  try {
    for (const [index, image] of images.entries()) {
      const imageName = randomImageName() + '.' + image.originalname.split('.').pop();

      // Store the image directly in the database
      await db.query(insertQueryImage, [
        accessoireId,
        imageName,
        image.mimetype,
        image.buffer,
        image.size,
        index === 0 // first image is primary
      ]);

      console.log("Image enregistrée avec succès");
    }
    res.status(201).send("Ok");
  } catch (err) {
    console.error("Erreur lors de l'enregistrement de l'image:", err.stack);
    res.status(500).send("Erreur lors de l'enregistrement de l'image");
  }
});

app.put('/robe/:id', upload.array('photo', 12), async (req, res) => {
  const id = req.params.id;
  let images = req.files;
  let nomRobe = req.body.nomRobe;
  let couleurRobe = req.body.couleurRobe;
  let categorieRobe = req.body.categorieRobe;

  try {
    // Update robe details
    const updateQueryRobe = "UPDATE robes SET nom = $1, couleur = $2, categorie = $3, updated_at = CURRENT_TIMESTAMP WHERE robe_id = $4";
    const robeValues = [nomRobe, couleurRobe, categorieRobe, id];

    const result = await db.query(updateQueryRobe, robeValues);

    if (result.rowCount === 0) {
      return res.status(404).send('Robe non trouvée');
    }    // Add new images if provided
    if (images && images.length > 0) {
      // Check if this robe already has images
      const currentImagesQuery = "SELECT COUNT(*) as count FROM images WHERE robe_id = $1";
      const currentImagesResult = await db.query(currentImagesQuery, [id]);
      const hasExistingImages = currentImagesResult.rows[0].count > 0;

      const insertQueryImage = "INSERT INTO images (robe_id, name, mimetype, image_data, image_size, is_primary) VALUES ($1, $2, $3, $4, $5, $6)";

      for (const [index, image] of images.entries()) {
        const imageName = randomImageName() + '.' + image.originalname.split('.').pop();

        // Store the image directly in the database
        // Only set as primary if it's the first image and there are no existing images
        await db.query(insertQueryImage, [
          id,
          imageName,
          image.mimetype,
          image.buffer,
          image.size,
          !hasExistingImages && index === 0 // first image is primary only if no existing images
        ]);

        console.log('Image enregistrée avec succès');
      }
    }

    res.status(200).send("Robe mise à jour avec succès");
  } catch (err) {
    console.error("Erreur lors de la mise à jour:", err.stack);
    res.status(500).send('Erreur lors de la mise à jour de la robe');
  }
});

app.put("/accessoire/:id", upload.array("photo", 12), async (req, res) => {
  const id = req.params.id;
  let images = req.files;
  let nomAccessoire = req.body.nomAccessoire;
  let descriptionAccessoire = req.body.descriptionAccessoire;

  try {
    // Update accessoire details
    const updateQueryAccessoire =
      "UPDATE accessoires SET name = $1, description = $2, updated_at = CURRENT_TIMESTAMP WHERE accessoire_id = $3";
    const accessoiresValues = [nomAccessoire, descriptionAccessoire, id];

    const result = await db.query(updateQueryAccessoire, accessoiresValues);

    if (result.rowCount === 0) {
      return res.status(404).send('Accessoire non trouvé');
    }    // Add new images if provided
    if (images && images.length > 0) {
      // Check if this accessoire already has images
      const currentImagesQuery = "SELECT COUNT(*) as count FROM images WHERE accessoire_id = $1";
      const currentImagesResult = await db.query(currentImagesQuery, [id]);
      const hasExistingImages = currentImagesResult.rows[0].count > 0;

      const insertQueryImage = "INSERT INTO images (accessoire_id, name, mimetype, image_data, image_size, is_primary) VALUES ($1, $2, $3, $4, $5, $6)";

      for (const [index, image] of images.entries()) {
        const imageName = randomImageName() + '.' + image.originalname.split('.').pop();

        // Store the image directly in the database
        await db.query(insertQueryImage, [
          id,
          imageName,
          image.mimetype,
          image.buffer,
          image.size,
          !hasExistingImages && index === 0 // first image is primary only if no existing images
        ]);

        console.log('Image enregistrée avec succès');
      }
    }

    res.status(200).send("Accessoire mis à jour avec succès");
  } catch (err) {
    console.error("Erreur lors de la mise à jour:", err.stack);
    res.status(500).send('Erreur lors de la mise à jour de l\'accessoire');
  }
});

app.delete("/accessoire/:id", async (req, res) => {
  const deleteQuery = "DELETE FROM accessoires WHERE accessoire_id = $1";
  const id = req.params.id;

  // Thanks to CASCADE constraint in the database, all related images will be automatically deleted
  db.query(deleteQuery, [id], async (err, result) => {
    if (err) {
      console.error("Erreur lors de l'execution de la requete", err.stack);
      res.status(500).send("Erreur lors de la suppression de l'accessoire");
      return;
    }

    if (result.rowCount === 0) {
      return res.status(404).send("Accessoire non trouvé");
    }

    res.status(200).send("Accessoire supprimé avec succès");
  });
});


// Routes d'authentification

app.post("/inscription", async (req, res) => {
  let adminID = req.body.username;
  let adminPassword = req.body.password;

  bcrypt.hash(adminPassword, saltRounds, async (err, hash) => {
    if (err) {
      console.error("Erreur lors du hashage du mot de passe", err.stack);
      res.status(500).send("Erreur lors de l'enregistrement de l'utilisateur");
      return;
    }

    const insertQuery =
      "INSERT INTO Admin (username, password) VALUES ($1, $2)";
    db.query(insertQuery, [adminID, hash], (err, result) => {
      if (err) {
        console.error("Erreur lors de l'execution de la requete", err.stack);
        res
          .status(500)
          .send("Erreur lors de l'enregistrement de l'utilisateur");
        return;
      }

      res.status(201).send("Utilisateur enregistré avec succès");
    });
  });
});

app.get("/session-info", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});

app.post("/connexion", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (!user) {
      return res.status(401).json({ error: "failed" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({ error: err });
      }
      return res.status(200).json({ status: "succeeded", user: user });
    });
  })(req, res, next);
});

app.post('/deconnexion', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.json({ status: 'loggedOut' });
  });
});

passport.use(
  new Strategy(async function verify(username, password, cb) {
    try {
      const selectQuery = await db.query(
        "SELECT * FROM Admin WHERE username = $1",
        [username]
      );

      if (selectQuery.rows.length > 0) {
        const user = selectQuery.rows[0];
        const DBPassword = user.password;

        bcrypt.compare(password, DBPassword, (err, result) => {
          if (err) {
            return cb(err);
          } else {
            if (result) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("Utilisateur introuvable !");
      }
    } catch (err) {
      return cb(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// Utility endpoint to get image metadata without the binary data
app.get('/image-info/:id', async (req, res) => {
  const selectQuery = "SELECT image_id, name, mimetype, robe_id, accessoire_id, created_at FROM images WHERE image_id = $1";
  const id = req.params.id;

  db.query(selectQuery, [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'execution de la requete", err.stack);
      res.status(500).send("Erreur lors de la récupération des informations de l'image");
      return;
    }

    if (result.rows.length === 0) {
      return res.status(404).send("Image non trouvée");
    }

    res.status(200).json(result.rows[0]);
  });
});

// Utility endpoint to get a thumbnail version of an image (scaled down)
app.get('/thumbnail/:id', async (req, res) => {
  const selectQuery = "SELECT image_id, name, mimetype, image_data FROM images WHERE image_id = $1";
  const id = req.params.id;

  db.query(selectQuery, [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'execution de la requete", err.stack);
      res.status(500).send("Erreur lors de la récupération de l'image");
      return;
    }

    if (result.rows.length === 0) {
      return res.status(404).send("Image non trouvée");
    }

    // Send the binary image data with a smaller cache time for thumbnails
    const image = result.rows[0];
    res.set('Content-Type', image.mimetype);
    res.set('Cache-Control', 'public, max-age=1800'); // 30 minutes cache
    res.send(image.image_data);
  });
});

app.listen(port, () => {
  console.log(`l'app est sur le port ${port}`);
});
