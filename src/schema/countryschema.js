const joi = require('joi');

const addschema = joi.object({
    Country : joi.string().required(),
    TwoLetterSymbol : joi.string().required(),
    ThreeLetterSymbol :joi.string().required(),
    Infection_Risk : joi.number(),
    Case_Fatality_Rate : joi.number(),
    Test_Percentage :joi.number(),
    Recovery_Proporation :joi.number(),
    TotalCases :joi.number(),
    NewCases :joi.number(),
    TotalDeaths :joi.number(),
    NewDeaths :joi.number(),
    TotalRecovered :joi.number(),
    NewRecovered :joi.number(),
    ActiveCases :joi.number(),
    TotalTests :joi.number(),
    Population :joi.number(),
    Serious_Critical :joi.number(),
})
const addmultiple = joi.array().items(addschema)
module.exports={
    addschema,
    addmultiple
}