const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
        companyName: {
                type: String,
        },
        ownerName: {
                type: String,
        },
        rollNo: {
                type: String,
        },
        ownerMailId: {
                type: String,
        },
        accessCode: {
                type: String,
                require: true,
        },
        clientID: {
                type: String,
                default: ""
        },
        clientSecret: {
                type: String,
                default: ""
        }
});

const companyModel = mongoose.model("company", companySchema);

module.exports = companyModel;
