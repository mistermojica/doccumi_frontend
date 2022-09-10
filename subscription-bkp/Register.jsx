/* eslint-disable no-unused-vars */

import React, {useState, useContext, useEffect} from 'react';
import {Button} from '@components';
// import {useNavigate} from 'react-router-dom';
import axios from 'axios';
// import {Redirect} from 'react-router-dom';
// @ts-ignore
import AppContext from '@app/contexts/AppContext';
import './Subscription.css';

const Register = (props) => {
  const AppCtx = useContext(AppContext);
  const {user} = props;

  const [name, setName] = useState(user.profile.nombre);
  const [email, setEmail] = useState(user.profile.email);
  // const [customer, setCustomer] = useState(null);

  // const navigate = useNavigate();

  const handleSubmit = async () => {
    // e.preventDefault();

    axios
      .post('http://localhost:8004/create-customer', {
        email: user.profile.email,
        name: user.profile.nombre,
        phone: user.profile.telefono
      })
      .then((response) => {
        const {customer} = response.data;
        if (customer) {
          AppCtx.setNavigate({to: 'prices', data: {}});
        }
      })
      .catch((err) => {
        console.log('handleSubmit() => err:', err);
      });

    // const {customer} = await fetch('http://localhost:8004/create-customer', {
    // method: 'post',
    // credentials: 'include',
    // mode: 'no-cors',
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    // body: JSON.stringify({
    //   email: email
    // })
    // }).then((r) => r.json());

    // console.log({customer});

    // // setCustomer(customer);
    // AppCtx.setNavigate({to: 'prices', data: {}});
  };

  // if (customer) {
  //   // return <Redirect to={{pathname: '/prices'}} />;
  //   // navigate('/prices');
  //   console.log('customer:', customer);

  //   AppCtx.setNavigate({to: 'prices', data: {}});
  // }

  // useEffect(() => {
  //   if (user.profile.usuario_stripe !== '') {
  //     AppCtx.setNavigate({to: 'prices', data: {}});
  //   } else {
  //     handleSubmit();
  //   }
  // }, []);

  return (
    <></>
    // <main>
    //   <h1>Sample Photo Service</h1>
    //   <img
    //     src="https://picsum.photos/280/320?random=4"
    //     alt="picsum generated"
    //     width="140"
    //     height="160"
    //   />
    //   <p>Unlimited photo hosting, and more. Cancel anytime.</p>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       Nombre:&nbsp;
    //       <input
    //         type="text"
    //         name="name"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //         required
    //         style={{width: '250px'}}
    //       />
    //     </label>
    //     <br />
    //     <label>
    //       Email:&nbsp;
    //       <input
    //         type="text"
    //         name="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //         style={{width: '250px'}}
    //       />
    //     </label>
    // {/* <button type="submit">Register</button> */}
    // <hr />
    // <div className="form-group row">
    //   <div className="">
    //     <Button type="submit" theme="primary">
    //       Registrarme
    //     </Button>
    //   </div>
    // {/* <div className="col-sm-8">
    //   <Button type="button" theme="success" onClick={showPaymentDialog}>
    //     Realizar Subscripción
    //   </Button>
    // </div> */}
    //     </div>
    //   </form>
    // </main>
  );
};

export default Register;
