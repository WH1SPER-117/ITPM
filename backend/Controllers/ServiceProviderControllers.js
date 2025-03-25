const pendingServiceProvider = require("../Model/PendingServiceProviderModel");

//data insert - pending service provider
const addPendingServiceProvider = async (req, res, next) => {
    const{pendingServiceProviderID,name, nic, dob, address, phoneNo, email, serviceCategory, service, username, password} = req.body;
    let pendingServiceProviderData;

    try{
        const formattedDob = new Date(dob).toLocaleDateString();
        pendingServiceProviderData = new pendingServiceProvider ({
            pendingServiceProviderID,
            name,
            nic,
            dob: formattedDob,
            address,
            phoneNo,
            email,
            serviceCategory,
            service,
            username,
            password,
            createdDate: new Date().toLocaleDateString(),
         });
         await pendingServiceProviderData.save();
    }catch(err){
        console.log(err);
    }

    //not inserting orders to db
    if(!pendingServiceProviderData){
        return res.status(404).json({message: "unable to add pending service providers"});

    }
    return res.status(200).json({pendingServiceProviderData});
};

exports.addPendingServiceProvider = addPendingServiceProvider;
