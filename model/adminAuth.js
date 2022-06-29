const {makeDb}=require('../library/db.js')

const adminAuthModel=async(admin_name,admin_password)=>{
 const db=makeDb()
try {
const adminQry=`SELECT * FROM admin where name=? and password=?`
const response=await db.query(adminQry,[admin_name,admin_password])
if(response.length>0){
    return {success:true,response}
}else{
    return {success:false,error:'unauthorized access to this route'}
}    
 } catch (error) {
    return {success:false,error:'something went wrong please try again later'}
 }
}

module.exports={adminAuthModel}