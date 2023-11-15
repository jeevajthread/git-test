import React, { useEffect, useState } from 'react';
import BlockService from '../service/BlockService';
import '../css/List.css';
const ListBlock = () => {

    const[blocks,setBlocks]=useState([])

    useEffect(()=>{
        const jwtToken = localStorage.getItem('jwtToken');
        if(jwtToken== null){
            window.location.href = 'http://localhost:3000';
           }
        const headers = {
          'Authorization':'Bearer '+jwtToken,
        };
        BlockService.getAllBlocks(headers).then((res)=>{
             
            setBlocks(res.data)
                  })
     },[])

     const  updateBlock=(blockId)=>{
       
        window.location.href = 'http://localhost:3000/updateBlock/'+blockId;
    }
    const deleteBlock=(blockId)=>{
        const jwtToken = localStorage.getItem('jwtToken');
          
        const headers = {
          'Authorization':'Bearer '+jwtToken,
        };
        BlockService.deleteBlock(blockId,headers)
        window.location.href = 'http://localhost:3000/listBlock';
    }
    const goBack = () => {
        window.location.href = 'http://localhost:3000/adminHome';
      }
      const logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.href = 'http://localhost:3000'; // Redirect to the login page or home page
    };


    return (
        <div >
           
            <div>
           <h1>List Blocks</h1> 
           <table className="table" border="1">
            <thead>
                <tr>
                    <th>Block Name</th>
                    <th>Block Decription</th>
                    
                </tr>
            </thead>
            <tbody>
                {
                    blocks.map(
                        block =>
                            <tr key={block.blockId}>
                                
                                <td>{block.blockName}</td>
                                <td>{block.blockDescription}</td>
                               
                                <td>
                                   <button type="submit" onClick={()=>deleteBlock(block.blockId)}>Delete</button>
                               </td>
                               <td>
                                   <button type="submit" onClick={()=>updateBlock(block.blockId)} >Update</button>
                               </td>

                            </tr>
                    )
                }
            </tbody>
        </table>
        <button onClick={goBack}>Back</button> <br/><br/>
        <button class="logout-button"  onClick={logout}>Logout</button>

        </div>

        </div>
    );
};

export default ListBlock;