require("dotenv").config();
const express = require('express');
const axios = require('axios');
require('./config/dbConnect')();



const genearateToken = require('./utils/generateToken');
const authMiddleWare = require('./middleware/authMiddleware');

const Company = require('./Model/companyModel');
const Train = require('./Model/trainModel');

const app = express();

app.use(express.json());



app.post('/train/register', async (req, res) => {
        const checkAlreadyRegister = await Company.find({ rollNo: req.body.rollNo });
        if (checkAlreadyRegister.length == 0) {
                try {
                        const response = await axios.post("http://20.244.56.144/train/register", req.body)
                        req.body.clientID = response.data.clientID;
                        req.body.clientSecret = response.data.clientSecret;
                        const createCompany = await Company.create(req.body);
                        return res.status(201).json({
                                companyData: createCompany,
                                message: "New Resource Created"
                        })
                } catch (err) {
                        return res.json({
                                message: "Something went wrong"
                        });
                }
        }
        else {
                return res.json({
                        message: "Resource Alredy Registered"
                });
        }
})

// After Register requesting for Auth

app.post("/train/register/auth", async (req, res) => {

});

// Get Trains according to the price and date
app.get('/train/trains', authMiddleWare, async (req, res) => {
        const trains = await Train.find();
        return res.json({
                Trains: trains,
                message: "Success"
        })
});

// get Train With Train ID

app.get("/train/trains/:Number", authMiddleWare, async (req, res) => {
        const train = await Train.findOne(req.params.Number);
        return res.json(train);
});

app.post('/train/addTrain', async (req, res) => {
        const createTrain = await Train.create(req.body);
        return res.json(createTrain);
});

app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`);
});