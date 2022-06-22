export default function login(req, res){
    console.log(req.body)
    res.json({status: "success"})
}