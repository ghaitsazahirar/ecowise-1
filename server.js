/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
require('dotenv').config();
const Hapi = require('@hapi/hapi');
const path = require('path');
const multer = require('multer');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
const fs = require('fs').promises; // Import fs.promises untuk readFile dan writeFile
const { v4: uuidv4 } = require('uuid'); // Untuk menghasilkan UUID unik
const Vision = require('@hapi/vision');
const Handlebars = require('handlebars');

// Inisialisasi Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Sesuaikan dengan path ke service account key
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ecowise-47f54-default-rtdb.asia-southeast1.firebasedatabase.app" // Sesuaikan dengan databaseURL
});

// const db = admin.firestore();
const storage = new Storage({
    projectId: "ecowise-47f54", // Sesuaikan dengan projectId
    keyFilename: './serviceAccountKey.json' // Sesuaikan dengan path ke service account key
});
const bucket = storage.bucket("ecowise-47f54.appspot.com"); // Sesuaikan dengan storageBucket

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'], // Atur sesuai kebutuhan Anda
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        }
    });

    await server.register(Vision);

    server.views({
        engines: {
            html: Handlebars
        },
        relativeTo: __dirname,
        path: 'src/templates'
    });

// Route untuk mendapatkan semua articles
server.route({
    method: 'GET',
    path: '/articles',
    handler: async (request, h) => {
        try {
            const articlesPath = path.join(__dirname, 'src', 'public', 'data', 'articles.json');
            const rawData = await fs.readFile(articlesPath, 'utf8');
            const articles = JSON.parse(rawData);
            return articles;
        } catch (err) {
            console.error(err);
            return h.response({ error: 'Gagal membaca file articles' }).code(500);
        }
    }
});

// Route untuk menambahkan articles baru
server.route({
    method: 'POST',
    path: '/articles',
    handler: async (request, h) => {
        const newArticle = request.payload;

        // Validate the new article payload
        if (!newArticle.img || !newArticle.title || !newArticle.description || !newArticle.content) {
            return h.response({ error: 'Invalid article data' }).code(400);
        }

        try {
            const articlesPath = path.join(__dirname, 'src', 'public', 'data', 'articles.json');
            const rawData = await fs.readFile(articlesPath, 'utf8');
            const articles = JSON.parse(rawData);

            // Check if an article with the same title already exists
            if (articles.some(article => article.title === newArticle.title)) {
                return h.response({ error: 'Article with the same title already exists' }).code(400);
            }

            articles.push(newArticle);
            await fs.writeFile(articlesPath, JSON.stringify(articles, null, 2));
            return { message: 'Article added successfully', title: newArticle.title };
        } catch (err) {
            console.error(err);
            return h.response({ error: 'Failed to add article' }).code(500);
        }
    }
});

// Route untuk mengupdate articles berdasarkan title
server.route({
    method: 'PUT',
    path: '/articles/{title}',
    handler: async (request, h) => {
        const articleTitle = request.params.title;
        const updatedArticle = request.payload;

        // Validate the updated article payload
        if (!updatedArticle.img || !updatedArticle.title || !updatedArticle.description || !updatedArticle.content) {
            return h.response({ error: 'Invalid article data' }).code(400);
        }

        try {
            const articlesPath = path.join(__dirname, 'src', 'public', 'data', 'articles.json');
            const rawData = await fs.readFile(articlesPath, 'utf8');
            const articles = JSON.parse(rawData);
            const index = articles.findIndex(article => article.title === articleTitle);

            if (index === -1) {
                return h.response({ message: 'Article not found' }).code(404);
            }

            articles[index] = { ...articles[index], ...updatedArticle };
            await fs.writeFile(articlesPath, JSON.stringify(articles, null, 2));
            return { message: 'Article updated successfully' };
        } catch (err) {
            console.error(err);
            return h.response({ error: 'Failed to update article' }).code(500);
        }
    }
});

// Route untuk menghapus articles berdasarkan title
server.route({
    method: 'DELETE',
    path: '/articles/{title}',
    handler: async (request, h) => {
        const articleTitle = request.params.title;

        try {
            const articlesPath = path.join(__dirname, 'src', 'public', 'data', 'articles.json');
            const rawData = await fs.readFile(articlesPath, 'utf8');
            const articles = JSON.parse(rawData);
            const index = articles.findIndex(article => article.title === articleTitle);

            if (index === -1) {
                return h.response({ message: 'Article not found' }).code(404);
            }

            articles.splice(index, 1);
            await fs.writeFile(articlesPath, JSON.stringify(articles, null, 2));
            return { message: 'Article deleted successfully' };
        } catch (err) {
            console.error(err);
            return h.response({ error: 'Failed to delete article' }).code(500);
        }
    }
});
    
// Route untuk mendapatkan semua tantangan
server.route({
    method: 'GET',
    path: '/api/challenges',
    handler: async (request, h) => {
      try {
        const challengesPath = path.join(__dirname, 'src', 'public', 'data', 'challenges.json');
        const rawData = await fs.readFile(challengesPath, { encoding: 'utf8' });
        const challenges = JSON.parse(rawData);
        return challenges; // Mengembalikan struktur challenges.json yang diperbarui
      } catch (err) {
        console.error(err);
        return h.response({ error: 'Gagal membaca file tantangan' }).code(500);
      }
    }
  });
  
  // Route untuk menambahkan tantangan baru
  server.route({
    method: 'POST',
    path: '/api/challenges',
    handler: async (request, h) => {
      const newChallenge = request.payload;
  
      try {
        const challengesPath = path.join(__dirname, 'src', 'public', 'data', 'challenges.json');
        const rawData = await fs.readFile(challengesPath, { encoding: 'utf8' });
        const challenges = JSON.parse(rawData);
  
        // Mendapatkan tipe tantangan dari payload (daily, weekly, atau base)
        const kind = newChallenge.kind;
  
        // Pastikan tipe tantangan yang dimasukkan ada dalam data challenges
        if (!challenges[kind]) {
          return h.response({ error: `Invalid challenge kind: ${kind}` }).code(400);
        }
  
        // Tambahkan tantangan baru ke dalam array sesuai dengan tipe
        challenges[kind].push(newChallenge);
  
        // Simpan perubahan ke dalam file challenges.json
        await fs.writeFile(challengesPath, JSON.stringify(challenges, null, 2));
  
        return { message: 'Challenge added successfully' };
      } catch (err) {
        console.error(err);
        return h.response({ error: 'Failed to add challenge' }).code(500);
      }
    }
  });
  
  // Route untuk mendapatkan tantangan berdasarkan kind dan nama
  server.route({
    method: 'GET',
    path: '/api/challenges/{name}',
    handler: async (request, h) => {
      const { name } = request.params;
  
      try {
        const challengesPath = path.join(__dirname, 'src', 'public', 'data', 'challenges.json');
        const rawData = await fs.readFile(challengesPath, { encoding: 'utf8' });
        const challenges = JSON.parse(rawData);
  
        // Cari tantangan dengan nama yang cocok
        for (const kind in challenges) {
          const challenge = challenges[kind].find(ch => ch.name === name);
          if (challenge) {
            return challenge;
          }
        }
  
        console.log(`Challenge '${name}' not found in any kind of challenges`);
        return h.response({ error: `Challenge '${name}' not found in any kind of challenges` }).code(404);
      } catch (err) {
        console.error(err);
        return h.response({ error: 'Failed to read challenges file' }).code(500);
      }
    }
  });  
  
  const db = admin.firestore();

// Tambahkan route API upload
server.route({
    method: 'POST',
    path: '/api/upload',
    handler: async (request, h) => {
        try {
            const file = request.payload.image;
            const { name, userID } = request.payload;

            // Log payload for debugging
            console.log('Received payload:', request.payload);
            console.log('Received file:', file);
            console.log('Received name:', name);
            console.log('Received userID:', userID);

            // Ensure file, name, and userID are present
            if (!file || !name || !userID) {
                return h.response({ error: 'Missing file, name, or userID' }).code(400);
            }

            // Validate file type
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/heic'];
            const fileType = file.hapi.headers['content-type'];
            console.log('File type:', fileType);

            if (!validTypes.includes(fileType)) {
                console.error('Invalid file type');
                return h.response({ error: 'Invalid file type. Only JPG, JPEG, and PNG are allowed.' }).code(400);
            }

            console.log('Starting upload process for name:', name);

            // Path in Firebase Storage
            const activityFolder = `${name}/`;
            const filename = `${activityFolder}${Date.now()}${path.extname(file.hapi.filename)}`;
            const fileRef = bucket.file(filename);

            const options = {
                gzip: true,
                metadata: {
                    contentType: fileType,
                },
            };

            await new Promise((resolve, reject) => {
                const stream = file.pipe(fileRef.createWriteStream(options));

                stream.on('finish', async () => {
                    try {
                        console.log('Upload finished successfully.');
                        const fileUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;

                        await db.collection('uploads').add({
                            url: fileUrl,
                            name: name,
                            userID: userID,
                            timestamp: admin.firestore.FieldValue.serverTimestamp()
                        });

                        console.log('File URL saved to Firestore:', fileUrl);
                        resolve();
                    } catch (err) {
                        console.error('Failed to save file URL to Firestore:', err);
                        reject(err);
                    }
                });

                stream.on('error', (err) => {
                    console.error('Error uploading image:', err);
                    reject(err);
                });
            });

            return h.response({ message: 'Image uploaded successfully', url: `https://storage.googleapis.com/${bucket.name}/${filename}` }).code(200);

        } catch (err) {
            console.error('Error uploading image:', err);
            return h.response({ error: 'Failed to upload image' }).code(500);
        }
    },
    options: {
        payload: {
            output: 'stream',  // Corrected from 'tream' to 'stream'
            parse: true,
            multipart: true,
            maxBytes: 10 * 1024 * 1024 // Contoh: batas ukuran file 10MB
        }
    }
});

server.route({
  method: 'POST',
  path: '/api/register',
  handler: async (request, h) => {
      const { name, email, password } = request.payload;

      try {
          // Buat pengguna menggunakan email dan password
          const userCredential = await admin.auth().createUser({
              displayName: name,
              email: email,
              password: password
          });

          // Simpan data pengguna ke Firestore
          const userData = {
              uid: userCredential.uid,
              name: name,
              email: email,
              created_at: new Date().toString(),
              points: 0 // Poin default diatur ke 0 saat registrasi
          };
          await db.collection('users').doc(userCredential.uid).set(userData);

          return h.response({ message: `Akun berhasil dibuat untuk ${name}` }).code(200);
      } catch (error) {
          console.error('Error during registration:', error);
          return h.response({ error: 'Gagal membuat akun. Periksa kembali informasi yang dimasukkan.' }).code(500);
      }
  }
});

     // Route untuk menambah poin
     server.route({
      method: 'POST',
      path: '/add-points',
      handler: async (request, h) => {
          const { uid, pointsToAdd } = request.payload;
          const userRef = db.collection('users').doc(uid);
          
          try {
              await db.runTransaction(async transaction => {
                  const userDoc = await transaction.get(userRef);
                  if (!userDoc.exists) {
                      throw new Error('User document does not exist!');
                  }

                  const currentPoints = userDoc.data().points || 0;
                  const newPoints = currentPoints + pointsToAdd;
                  transaction.update(userRef, { points: newPoints });
              });
              return h.response({ status: 'success' }).code(200);
          } catch (error) {
              console.error('Error adding points to Firestore:', error);
              return h.response({ status: 'error', message: error.message }).code(500);
          }
      }
  });

  // Route untuk mendapatkan poin
  server.route({
      method: 'GET',
      path: '/get-points/{uid}',
      handler: async (request, h) => {
          const { uid } = request.params;
          const userRef = db.collection('users').doc(uid);
          
          try {
              const userDoc = await userRef.get();
              if (!userDoc.exists) {
                  throw new Error('User document does not exist!');
              }

              const points = userDoc.data().points || 0;
              return h.response({ points }).code(200);
          } catch (error) {
              console.error('Error getting points from Firestore:', error);
              return h.response({ status: 'error', message: error.message }).code(500);
          }
      }
  });

  // Route untuk menghapus poin
  server.route({
      method: 'POST',
      path: '/delete-points',
      handler: async (request, h) => {
          const { uid } = request.payload;
          const userRef = db.collection('users').doc(uid);
          
          try {
              await db.runTransaction(async transaction => {
                  const userDoc = await transaction.get(userRef);
                  if (!userDoc.exists) {
                      throw new Error('User document does not exist!');
                  }

                  transaction.update(userRef, { points: 0 });
              });
              return h.response({ status: 'success' }).code(200);
          } catch (error) {
              console.error('Error deleting points from Firestore:', error);
              return h.response({ status: 'error', message: error.message }).code(500);
          }
      }
  });

  //meminta reward melalui email
  // API endpoint untuk menambahkan reward
  server.route({
    method: 'POST',
    path: '/api/addreward',
    handler: async (request, h) => {
        const { email, points } = request.payload;

        try {
            // Cari pengguna berdasarkan email
            const userRecord = await admin.auth().getUserByEmail(email);
            const userId = userRecord.uid;

            // Ambil data pengguna dari Firestore
            const userDoc = await db.collection('users').doc(userId).get();

            if (!userDoc.exists) {
                throw new Error('User not found in Firestore');
            }

            const userData = userDoc.data();

            // Tambahkan poin ke pengguna
            const newPoints = (userData.points || 0) + points;

            // Perbarui data pengguna di Firestore
            await db.collection('users').doc(userId).update({ points: newPoints });

            return h.response({ message: `Successfully added ${points} points to ${email}` }).code(200);
        } catch (error) {
            console.error('Error adding reward:', error);
            return h.response({ error: 'Failed to add reward. Please check the email and try again.' }).code(500);
        }
    }
});

//emailreward
// Route untuk menambahkan folder reward
server.route({
    method: 'POST',
    path: '/api/emailreward',
    handler: async (request, h) => {
      const { email } = request.payload;
      const updatedAt = new Date().toISOString();

      try {
        const rewardRef = db.collection('rewards').doc();
        await rewardRef.set({
          email: email,
          updatedAt: updatedAt
        });

        return h.response({ message: 'Reward folder added successfully' }).code(200);
      } catch (error) {
        console.error('Error adding reward folder:', error);
        return h.response({ error: 'Failed to add reward folder' }).code(500);
      }
    }
  });
  
  try {
    await server.start();
    console.log('Server running on %s', server.info.uri);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

// Fungsi untuk menambah poin (contoh sederhana)
async function addPointsToUser(userId, pointsToAdd) {
  // Implementasikan logika untuk menambah poin ke pengguna
  // Misalnya, update poin di database pengguna
  // Di sini contoh sederhana saja
  const currentPoints = 100; // Ambil poin pengguna dari database
  const updatedPoints = currentPoints + pointsToAdd;
  return updatedPoints;
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();