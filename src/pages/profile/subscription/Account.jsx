import React, {useState, useEffect, useContext} from 'react';
import AppContext from '@app/contexts/AppContext';
import './Subscription.css';

const AccountSubscription = ({subscription}) => {
  const AppCtx = useContext(AppContext);

  console.log('AppCtx.Navigate.data', AppCtx.Navigate.data);

  const handleCancel = () => {
    AppCtx.setNavigate({to: 'cancel', data: {subscription: subscription.id}});
  };

  return (
    <section>
      <hr />
      <h4>
        <a
          href={`https://dashboard.stripe.com/test/subscriptions/${subscription.id}`}
        >
          {subscription.id}
        </a>
      </h4>
      <p>Status: {subscription.status}</p>
      <p>Card last4: {subscription.default_payment_method?.card?.last4}</p>
      <p>
        Current period end:
        {new Date(subscription.current_period_end * 1000).toString()}
      </p>
      {/* <Link to={{pathname: '/change-plan', state: {subscription: subscription.id }}}>Change plan</Link><br /> */}
      {/* <Link to={{pathname: '/cancel', state: {subscription: subscription.id }}}>Cancel</Link> */}
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </section>
  );
};

const Account = () => {
  const AppCtx = useContext(AppContext);

  const [subscriptions, setSubscriptions] = useState([]);

  const handleAddNew = () => {
    AppCtx.setNavigate({to: 'prices', data: {}});
  };

  useEffect(() => {
    const fetchData = async () => {
      const {subscriptions} = await fetch(
        'http://localhost:8004/subscriptions'
      ).then((r) => r.json());

      setSubscriptions(subscriptions.data);
    };

    fetchData();
  }, []);

  if (!subscriptions) {
    return '';
  }

  return (
    <div>
      <h1>Account</h1>
      <button type="button" onClick={handleAddNew}>
        Add a subscription
      </button>
      &nbsp;
      <a href="/profile">Restart demo</a>
      <h2>Subscriptions</h2>
      <div id="subscriptions">
        {subscriptions.map((s) => {
          return <AccountSubscription key={s.id} subscription={s} />;
        })}
      </div>
    </div>
  );
};

export default Account;
