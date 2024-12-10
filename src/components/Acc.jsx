import React, { useState } from 'react';
import axios from 'axios';

function Acc() {
    const API = 'http://localhost:8000/accounts/';

    // State to store the response data
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);

    const handleAcc = async () => {
        try {
            const res = await axios.get(API);
            console.log(res.data);
            setAccounts(res.data);  // Set the fetched data in state
        } catch (err) {
            console.error('Error fetching accounts:', err);
            setError('Error fetching accounts'); // Handle error
        }
    };

    return (
        <div>
            <button onClick={handleAcc}>Fetch Accounts</button>
            
            {error && <p>{error}</p>}  {/* Display error message if any */}
            
            <ul>
                {accounts.length > 0 ? (
                    accounts.map(account => (
                        <li key={account.id}>
                            <h3>Account Type: {account.account_type}</h3>
                            <p>Balance: ${account.balance}</p>
                            
                            {/* Displaying transactions */}
                            <h4>Transactions:</h4>
                            <ul>
                                {account.transactions && account.transactions.length > 0 ? (
                                    account.transactions.map(transaction => (
                                        <li key={transaction.id}>
                                            <p>Transaction ID: {transaction.id}</p>
                                            <p>Date: {new Date(transaction.transaction_date).toLocaleString()}</p>
                                            <p>Type: {transaction.transaction_type || 'N/A'}</p>
                                            <p>Amount: ${transaction.amount}</p>
                                        </li>
                                    ))
                                ) : (
                                    <p>No transactions found.</p>
                                )}
                            </ul>
                        </li>
                    ))
                ) : (
                    <p>No accounts found.</p>
                )}
            </ul>
        </div>
    );
}

export default Acc;
