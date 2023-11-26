import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdMenu } from "react-icons/io";
import {Link} from "react-router-dom"
export default function Home() {
  let [allData, setAllData] = useState([]);
  let [visible, setVisible] = useState(false);
  let [alluser,setAlluser] = useState([])
  const toggleVisibility = (itemId) => {
    setVisible((prevVisibleItem) =>
      prevVisibleItem === itemId ? null : itemId
    );
  };
  let handleRemoveTask = async(e) => {
    try {
      
      let Data =await axios.delete(`http://localhost:7000/post/${e.id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      alert(Data.data.message)
      data()
    } catch (error) {
      alert(error.response.data.error)
    }
  };
  let data = async (req, res) => {
    let alldata = await axios.get("http://localhost:7000/post/posts");
    setAllData(alldata.data);
  };
  let allUser =async(req,res)=>{
    let users = await axios.get("http://localhost:7000/user/allusers")
    setAlluser(users.data)
  }
  let handleMakeAdmin = async(e)=>{
    console.log(e)
    
    let makeadmin=async()=>{
        try {
        let admin = await axios.put(`http://localhost:7000/user/makeadmin/${e}`,{data:"hi"},{headers:{"token":localStorage.getItem("token")}})
        alert(admin.data.message)
        allUser();
      } catch (error) {
   alert(error.response.data.error)    
      }
      }
      makeadmin()
  }

  const handleDeleteUser=async(e)=>{
    try {
      let data = await axios.delete(`http://localhost:7000/user/deleteuser/${e}`,{headers:{"token":localStorage.getItem("token")}})
      alert(data.data.message)
      setVisible(false)
      allUser();
    } catch (error) {
      alert(error.response.data.error)
      setVisible(false)
    }
  }
  useEffect(() => {
    data();
    allUser();
  },[]);


  return (
    <div>
      <div className=" flex  w-[98vw]">
        <div className="flex flex-wrap  min-w-[80%px] bg-red-900">
          {allData.map((e) => (
            <div className="w-[350px]  bg-red-200 m-5 rounded-md p-2 overflow-hidden">
              <h3 className="text-center text-xl font-bold h-[10%]">
                {e.title}
              </h3>
              <h6 className="h-[70%] overflow-hidden ">{e.content}</h6>
              <div className="h-[20%] flex justify-between">
                <Link to={{pathname:`/Update/${e.id}`}}
                  className="p-2 bg-green-500 text-center rounded-lg hover:text-white "
                >
                  Update
                </Link>
                <button
                  onClick={() => handleRemoveTask(e)}
                  className="p-2 bg-red-500 text-center rounded-lg hover:text-white "
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="w-[20%] bg-pink-600 relative">
  {alluser.map((e) => (
    <div key={e.id} className={`${e.isAdmin?'bg-green-200':'bg-gray-200'} p-2 flex justify-between`}>
      <div>
        <div>Name: {e.name}</div>
        <div>Email: {e.email}</div>

        {visible === e.id && (
          <div className="absolute bg-red-100 w-[70%]  flex flex-col ">
            {!e.isAdmin &&
            <>
            <button onClick={()=>handleMakeAdmin(e.id)} className="hover:bg-gray-400">Make Admin</button>
            <button onClick={()=>handleDeleteUser(e.id)}  className="hover:bg-gray-400 bg-red-500 ">
              Delete user
            </button>
            </>
            }
          </div>
        )}
      </div>
      {!e.isAdmin &&
      <IoMdMenu onClick={() => toggleVisibility(e.id)} className="cursor-pointer" />
      }
    </div>
  ))}
</div>
      </div>
    </div>
  );
}
