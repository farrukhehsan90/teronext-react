import React, { useState } from 'react';
import {Add,Delete} from '@material-ui/icons';
import { visible } from 'ansi-colors';
import { TextField,Select, MenuItem, Typography } from '@material-ui/core';

const Table = ({data}) => {

    const [tableData,setTableData]=useState([]);
    const initialState={
        item:'',
        materialFee:'',
        packingFee:'',
        unpackingFee:''
    };
    const [fields,setFields]=useState(initialState);
    const [visible,setVisible]=useState(false);
    const [temp,setTemp]=useState({});

    const setFieldsSync=()=>{

        


    }
    

    const onChange=(e,name)=>{



    setFields({...fields,[name]:e.target.value});

    if(item && materialFee && packingFee && (name==='unpackingFee' || unpackingFee)){

        setTemp({
            item,
            materialFee,
            packingFee,
            unpackingFee:name==='unpackingFee' && e.target.value
        });
    }
}


    const onAddItem=()=>{

        setVisible(true);

        if(Object.keys(temp).length>0){

            setTableData([...tableData,temp]);
            setTemp({});
            setFields(initialState);
        }



    }

    const onDeleteItem=(rowIndex)=>{

        const filteredData=tableData.filter((data,index)=>index!==rowIndex);

        setTableData(filteredData);


    }

    let tableHeaderContent;
    let tableRowContent;

    if(data.length>0){
        tableHeaderContent=data.map(column=>{

            return <th key={column.name}>
                {column.name}
            </th>


        })
    }

    if(tableData.length>0){

        //TODO:
        // switch(singleColumn){
        //     case "item":
        //     return <Select value={row[singleColumn]} onChange={(e)=>setStates(...states?states:{},{[row[singleColumn]]:e})}>{row[singleColumn]}</Select>
        //     case "materialFee":
        //     return <TextField value={row[singleColumn]} onChange={()=>setStates(...states?states:{},{[row[singleColumn]]:e})}>{row[singleColumn]}</TextField>
        //     case "packingFee":

        //         return <TextField value={row[singleColumn]} onChange={()=>setStates(...states?states:{},{[row[singleColumn]]:e})}>{row[singleColumn]}</TextField>
        //         case "unpackingFee":
        //             return <TextField value={row[singleColumn]} onChange={()=>setStates(...states?states:{},{[row[singleColumn]]:e})}>{row[singleColumn]}</TextField>

        // } 

        tableRowContent=tableData.map((row,index)=>{
            console.log('row',row);
            return <tr key={index}>
                {Object.keys(row).map(singleColumn=><td>{row[singleColumn]}</td>)}
                <td onClick={()=>onDeleteItem(index)}><Delete/></td>
            </tr>


        })

    }
   
    const {item,packingFee,unpackingFee,materialFee}=fields;
    
    return (
        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',width:'100vw',height:'70vh'}}>

        <table>
            <thead>
                {tableHeaderContent}
            </thead>
            <tbody>
                {tableRowContent}
                {visible && <tr>
                    {
                        data.map(row=>{
                            console.log('row',row);
                            const {name,inputType}=row;
                            switch(inputType){

                                case "select":
                                    return <td>
                                        <Select value={fields.item} onChange={(e)=>onChange(e,"item")}>
                            <MenuItem value={"Audi"}>Audi</MenuItem>
                                            </Select>
                                        </td>
                                case "currency":
                                    if(name.trim()==='Material Fee'){

                                        return <td>
                                            <div style={{display:'flex',flexDirection:'row'}}>
                                            <Typography>$</Typography>
                                            <TextField value={fields.materialFee} onChange={(e)=>onChange(e,"materialFee")}/>
                                            </div>
                                            </td>
                                    }
                                    if(name.trim()==='Packing Fee'){
                                        
                                        return <td>
                                            <div style={{display:'flex',flexDirection:'row'}}>
                                        <Typography>$</Typography>
                                            <TextField value={fields.packingFee} onChange={(e)=>onChange(e,"packingFee")}/>
                                            </div>
                                            </td>
                                    }
                                    if(name.trim()==='Unpacking Fee'){
                                        
                                        return <td>
                                            <div style={{display:'flex',flexDirection:'row'}}>
                                        <Typography>$</Typography>
                                            <TextField value={fields.unpackingFee} onChange={(e)=>onChange(e,"unpackingFee")}/>
                                            </div>
                                            </td>
                                    }
                                    default:
                                        return  <td>
                                            <div style={{display:'flex',flexDirection:'row'}}>
                                        <TextField value={fields.unpackingFee} onChange={(e)=>onChange(e,"unpackingFee")}/>
                                            </div>
                                        </td> 


                            }

                            
                        })
                    }
                    
                    </tr>}
            </tbody>
        </table>
        <div style={{position:'absolute',bottom:0,width:'100%',height:40,left:5}}>
            <div onClick={onAddItem} style={{borderRadius:'100px',width:'25px',height:'25px',border:'2px solid #904FB2',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Add style={{color:'#904FB2'}}/>
            </div>
        </div>
        </div>
    );
}

export default Table;