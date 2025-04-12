import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

import { initializeApp } from "firebase/app";
import {update, get, getDatabase, ref, set } from "firebase/database";

const app = express();
const port = 3000;
app.use(cors()); // To enable CORS for Vue.js frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname)
app.use(express.static(path.join(__dirname, '../dist')));

const firebaseConfig = {
    apiKey: "AIzaSyAqOFLpnmag9OFMG7yZ6H-NEHJIgEMZfUw",
    authDomain: "forbdtest.firebaseapp.com",
    databaseURL: "https://forbdtest-default-rtdb.firebaseio.com",
    projectId: "forbdtest",
    storageBucket: "forbdtest.firebasestorage.app",
    messagingSenderId: "55955102433",
    appId: "1:55955102433:web:2246045c97325ac1fff5a0"
};

const fireapp = initializeApp(firebaseConfig);
const db = getDatabase(fireapp);

async function setData(path, data) {
    const dbRef = ref(db, path);
    return set(dbRef, data)
        .then(() => {
            console.log('Data written successfully');
            return 1; // Return 1 if successful
        })
        .catch((error) => {
            console.error('Error writing data:', error);
            return 0; // Return 0 if an error occurs
        });
}

async function readData(path) {
    const dbRef = ref(db, path);
    try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            console.log('Data read successfully:', snapshot.val());
            return snapshot.val(); // Return the data if it exists
        } else {
            console.log('No data available');
            return 0; // Return 0 if no data is available
        }
    } catch (error) {
        console.error('Error reading data:', error);
        return 0; // Return 0 if an error occurs
    }
}

async function updateData(path, data) {
    const dbRef = ref(db, path);
    return update(dbRef, data)
        .then(() => {
            console.log('Data written successfully');
            return 1; // Return 1 if successful
        })
        .catch((error) => {
            console.error('Error writing data:', error);
            return 0; // Return 0 if an error occurs
        });
}

function filterByFieldValue(array, fieldName, value) {
    return array.filter(item => {
        const fieldValue = item[fieldName];
        if (typeof fieldValue === 'string') {
            return fieldValue.toLowerCase().includes(value.toLowerCase());
        } else if (typeof fieldValue === 'number') {
            return fieldValue.toString().includes(value.toString());
        }
        return false;
    });
}

function decodeValues(obj) {
    const decodedObj = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            try {
                const value = obj[key];
                if (typeof value === 'string') {
                    decodedObj[key] = decodeURIComponent(atob(value));
                } else {
                    decodedObj[key] = value; // Keep non-string values as is
                }
            } catch (e) {
                console.warn(`Failed to decode key "${key}":`, e);
                decodedObj[key] = obj[key]; // Fallback to original
            }
        }
    }
    return decodedObj;
}

function encodeValues(obj) {
    const decodedObj = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            try {
                const value = obj[key];
                if (typeof value === 'string') {
                    decodedObj[key] = btoa(encodeURI(value));
                } else {
                    decodedObj[key] = value; // Keep non-string values as is
                }
            } catch (e) {
                console.warn(`Failed to decode key "${key}":`, e);
                decodedObj[key] = obj[key]; // Fallback to original
            }
        }
    }
    return decodedObj;
}

function processData(...fields) {
    return (req, res, next) => {
        for (const field of fields) {
            const value = req.body[field];

            if (!value) {
                return res.status(400).send(`Field "${field}" is required`);
            }

            req.body[field] = encodeURIComponent(value);
        }

        next();
    };
}


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.post('/shelter/register', processData('email', 'password', 'name', 'surname','address', 'phone'), async (req, res) => {
    console.log('Registering user...');
    let { email, password, name, surname, address, phone } = req.body;

    const userPath = `volonteer/${email}`;
    const existingUser = await readData(userPath);

    if (existingUser) {
        return res.status(400).send('Email already registered');
    }

    const result = await setData(userPath, {email, password, name, surname, address, phone});
    if (result) {
        res.status(200).send('User registered successfully');
    } else {
        res.status(500).send('Error registering user');
    }
});


// Start the Express server
app.listen(port, () => {
    console.log('Server is running on http://localhost:3000');
});