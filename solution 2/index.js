const express = require('express');
const axios = require('axios');
const port= 8000;

const app = express();

app.get('/', (req, res) => {
    res.send(`Server is working fine.`);
})

app.get('/numbers', async (req, res) => {
    try {
        let urls = req.query?.url;
        if (!Array.isArray(urls)) urls = [urls];
        
        const result = [];
        
        for (const url of urls) {
            try {
                const response = await axios.get(url);
                result.push(...response.data?.numbers);
            } catch (err) {
                console.log("Error:", err.message);
            }
        }

        console.log(result);
        
        res.status(200).json({
            message: "success",
            result: result
        });
    } catch (error) {
        console.log("Unexpected error:", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});








app.listen(port,(err)=>{
    if(err){
        console.log("Error in connection");
    }

    console.log( `Connected to port: ${port}`);
} 
)