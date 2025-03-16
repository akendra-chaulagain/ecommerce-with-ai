


const shippingdetails = async (req, res) => {
    try {
        const {} = req.body
        
    } catch (error) {
        return res.status(401).json({message:"server error! unable to add shippimg address",message:message.error})
    }
};

export { shippingdetails };
