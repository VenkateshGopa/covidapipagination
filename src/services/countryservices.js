const mongo  = require('../utils/connect');
const schema = require('../schema/countryschema')

const countries =  async (req, res) =>{
    let sort = {};
    let filter= {}
    var skip= 0;
    var limit = 0;
    if( "pagesize" in  req.query)
    {
        skip = (+req.query.pagesize) *(+req.query.page -1 )
        limit= +req.query.pagesize
    }
    if( "sort" in  req.query)
    {
        const data = req.query.sort.split(',')
        // console.log(data)
        data.forEach(ele => {
            const name = ele.split(':')[0]
            const value = ele.split(':')[1]==='asc' ? 1 : -1
            sort = { ...sort, [name]:value }
            // console.log(sort)
        });
    }
    if( "filter" in  req.query)
    {
        const data = req.query.filter.split(',')
        // console.log(data)
        data.forEach(ele => {
            const name = ele.split(':')[0]
            const value = ele.split(':')[1]
            if(value.indexOf('-') >0)
            {
                const filt = '$'+value.split('-')[0]
                const value1 = +value.split('-')[1]
                if(name in filter)
                {
                    filter = {...filter ,[name]:{...filter[name] ,[filt]:value1}}
                }
                else
                filter =  { ...filter , [name]:{[filt]:value1} }
            }
            else{
                filter = { ...filter, [name]:value }
            }
            // console.log(filter)
        });

    }
    // console.log(sort, filter)
    const countrycount = await mongo.db.collection('country').find(filter).sort(sort).toArray()
    const country = await mongo.db.collection('country').find(filter).sort(sort).skip(skip).limit(limit).toArray()
    res.send({page:+req.query.page||0, 
        pagesize:+req.query.pagesize||0, 
        records:countrycount.length, 
        numberofpages: Math.ceil(countrycount.length/req.query.pagesize)|| 0, 
        data:country})
};

const addcountry = async (req, res) =>{
    const {error, value}= await schema.addschema.validate(req.body)
    if(error) return res.status(400).send({error:error.details[0].message});
    const country = await mongo.db.collection('country').insertOne(value);
    res.send(country);
};

const addmultiplecountries = async (req, res) =>{
    const {error, value}= await schema.addmultiple.validate(req.body)
    if(error) return res.status(400).send({error:error.details[0].message});
    const country = await mongo.db.collection('country').insertMany(value);
    res.send(country);
};

module.exports={
    addcountry,
    addmultiplecountries,
    countries
}