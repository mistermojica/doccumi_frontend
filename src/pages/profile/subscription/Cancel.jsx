import React, {useState, useContext} from 'react';
import AppContext from '@app/contexts/AppContext';
import './Subscription.css';

const Cancel = () => {
  const AppCtx = useContext(AppContext);

  const [cancelled, setCancelled] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();

    await fetch('http://localhost:8004/cancel-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subscriptionId: AppCtx.Navigate.data.subscription
      })
    });

    setCancelled(true);
    AppCtx.setNavigate({to: 'account', data: {}});
  };

  if (cancelled) {
    return '';
  }

  return (
    <div>
      <h1>Cancel</h1>
      <button onClick={handleClick}>Cancel</button>
    </div>
  );
};

export default Cancel;
