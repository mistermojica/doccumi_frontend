import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios';
import * as Config from '../utils/config';

const Employee = () => {
    const [Data, SetData] = useState([]);
    const [RowData, SetRowData] = useState([]);

    const [ViewShow, SetViewShow] = useState(false);
    const handleViewShow = () => {SetViewShow(true)};
    const handleViewClose = () => {SetViewShow(false)};

    //For Edit Model
    const [EditShow, SetEditShow] = useState(false);
    const handleEditShow = () => {SetEditShow(true)};
    const handleEditClose = () => {SetEditShow(false)};

    //For Delete Model
    const [DeleteShow, SetDeleteShow] = useState(false);
    const handleDeleteShow = () => {SetDeleteShow(true)};
    const handleDeleteClose = () => {SetDeleteShow(false)};

    //For Add New Model
    const [AddNewShow, SetAddNewShow] = useState(false);
    const handleAddNewShow = () => {SetAddNewShow(true)};
    const handleAddNewClose = () => {SetAddNewShow(false)};

    //Define here local state that store the form data
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [nic, setNic] = useState("");
    const [address, setAddress] = useState("");

    const [Delete, SetDelete] = useState(false);
    //Id for update record and Delete
    const [_id, SetId] = useState("");

    const GetEmployeeData = () => {
        //here we will get all employees data
        const url = Config.gatDomainName().concat('/empleados/list');
        axios.get(url)
        .then(response => {
            const result = response.data;
            const {status, message, data} = result;
            if (status !== 'SUCCESS'){
                alert(message, status);
            }
            else {
                SetData(data);
                // console.log(data);
            }
        })
        .catch(err => {
            console.log("err:", err);
        });
    }

    const handleAddNew = () => {
        const url = Config.gatDomainName().concat('/empleados/create');
        const body = {name, email, number, nic, address};
        axios.post(url, body)
        .then(response => {
            const result = response.data;
            const {status, message, data} = result;
            if (status !== 'SUCCESS'){
                alert(message, status);
            }
            else {
                alert(message);
                window.location.reload();
                // SetData(data);
                // console.log(data);
            }
        })
        .catch(err => {
            console.log("err:", err);
        });
    }

    const handleEdit = () => {
        const url = Config.gatDomainName().concat('/empleados/update');
        const body = {_id, name, email, number, nic, address};
        axios.post(url, body)
        .then(response => {
            const result = response.data;
            const {status, message, data} = result;
            if (status !== 'SUCCESS'){
                alert(message, status);
            }
            else {
                alert(message);
                window.location.reload();
                // SetData(data);
                // console.log(data);
            }
        })
        .catch(err => {
            console.log("err:", err);
        });
    }

    const handleDelete = () => {
        const url = Config.gatDomainName().concat(`/empleados/delete/${_id}`);
        axios.get(url)
        .then(response => {
            const result = response.data;
            const {status, message, data} = result;
            if (status !== 'SUCCESS'){
                alert(message, status);
            }
            else {
                alert(message);
                window.location.reload();
                // SetData(data);
                // console.log(data);
            }
        })
        .catch(err => {
            console.log("err:", err);
        });
    }

    //call this function in useEffect

    useEffect(() => {
        GetEmployeeData();
    },[]); //ESTOS CORCHETES SON OBLIGATORIOS SIEMPRE!!!

    return (
        <div>
            <div className='row'>
                <div className='mt-5 mb-4'>
                    <Button variant='primary' onClick={() => {handleAddNewShow()}}><i className='fa fa-plu'></i>
                        Add New Employee
                    </Button>
                </div>
            </div>
            <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Number</th>
                                <th>NIC</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.number}</td>
                                    <td>{item.nic}</td>
                                    <td>{item.address}</td>
                                    <td style={{minWidth:190}}>
                                        <Button size='sm' variant='primary' onClick={() => {handleViewShow(SetRowData(item), SetDelete(false))}}>View</Button>|
                                        <Button size='sm' variant='warning' onClick={() => {handleEditShow(SetRowData(item), SetId(item._id))}}>Edit</Button>|
                                        <Button size='sm' variant='danger' onClick={() => {handleViewShow(SetRowData(item), SetId(item._id), SetDelete(true))}}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='model-box-view'>
                <Modal 
                    show={ViewShow}
                    onHide={handleViewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>View Employee Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={RowData.name} readOnly  />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' value={RowData.email} readOnly  />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.number} readOnly  />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.nic} readOnly  />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.address} readOnly  />
                            </div>
                            {
                                Delete && (
                                    <Button type='submit' className='btn btn-danger mt-4' onClick={handleDelete}>Delete Employee</Button>
                                )
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleViewClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* Modal for submit new data to database */}
            <div className='model-box-view'>
                <Modal 
                    show={AddNewShow}
                    onHide={handleAddNewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Add New Employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' onChange={(e) => setName(e.target.value)} placeholder="Please enter Name" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' onChange={(e) => setEmail(e.target.value)} placeholder="Please enter Email"  />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setNumber(e.target.value)} placeholder="Please enter Number"  />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setNic(e.target.value)} placeholder="Please enter NIC"  />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setAddress(e.target.value)} placeholder="Please enter Addres"  />
                            </div>
                            <Button type='submit' className='btn btn-success mt-4' onClick={handleAddNew}>Add Employee</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleAddNewClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* Modal for Edit employee record */}
            <div className='model-box-view'>
                <Modal 
                    show={EditShow}
                    onHide={handleEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Edit Employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Name</label>
                                <input type="text" className='form-control' onChange={(e) => setName(e.target.value)} placeholder="Please enter Name" defaultValue={RowData.name} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Email</label>
                                <input type="email" className='form-control' onChange={(e) => setEmail(e.target.value)} placeholder="Please enter Email" defaultValue={RowData.email} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Number</label>
                                <input type="text" className='form-control' onChange={(e) => setNumber(e.target.value)} placeholder="Please enter Number" defaultValue={RowData.number} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>NIC</label>
                                <input type="text" className='form-control' onChange={(e) => setNic(e.target.value)} placeholder="Please enter NIC" defaultValue={RowData.nic} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Address</label>
                                <input type="text" className='form-control' onChange={(e) => setAddress(e.target.value)} placeholder="Please enter Addres" defaultValue={RowData.address} />
                            </div>
                            <Button type='submit' className='btn btn-warning mt-4' onClick={handleEdit}>Edit Employee</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleEditClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* Modal for Delete employee record */}
            <div className='model-box-view'>
                <Modal 
                    show={DeleteShow}
                    onHide={handleDeleteClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Delete Employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Name</label>
                                <input type="text" className='form-control' value={RowData.name} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Email</label>
                                <input type="email" className='form-control' defaultValue={RowData.email} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Number</label>
                                <input type="text" className='form-control' defaultValue={RowData.number} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <label>NIC</label>
                                <input type="text" className='form-control' defaultValue={RowData.nic} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Address</label>
                                <input type="text" className='form-control' defaultValue={RowData.address} readOnly />
                            </div>
                            <Button type='submit' className='btn btn-danger mt-4' onClick={handleDelete}>Delete Employee</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleDeleteClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Employee;