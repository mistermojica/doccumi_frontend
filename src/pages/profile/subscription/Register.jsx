import React, {useState, useContext} from 'react';
// import {useNavigate} from 'react-router-dom';
import axios from 'axios';
// import {Redirect} from 'react-router-dom';
// @ts-ignore
import AppContext from '@app/contexts/AppContext';
import './Subscription.css';

const Register = () => {
  const AppCtx = useContext(AppContext);

  const [email, setEmail] = useState('jenny.rosen@example.com');
  // const [customer, setCustomer] = useState(null);

  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(
        'http://localhost:8004/create-customer',
        {
          email: email
        }
        // {
        //   withCredentials: true
        // }
      )
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

  return (
    <main>
      <h1>Sample Photo Service</h1>
      <img
        src="https://picsum.photos/280/320?random=4"
        alt="picsum generated"
        width="140"
        height="160"
      />
      <p>Unlimited photo hosting, and more. Cancel anytime.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </main>
  );
};

export default Register;
