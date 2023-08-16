function refreshPage() {
  window.location.reload();
}

export async function submitPaymentData(paymentData) {
  const url = 'http://localhost:8080/payments';
  const headers = {
    'Content-Type': 'application/json'
  };

  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(paymentData)
  };

  try {
    const response = await fetch(url, options);
    return response.text();
  } catch (error) {
    console.error('Error submitting data:', error);
    throw error;
  }
}

export async function clearPaymentData() {
  const url = 'http://localhost:8080/payments';
  const headers = {
    'Content-Type': 'application/json'
  };

  const options = {
    method: 'DELETE',
    headers: headers
  };

  try {
    const response = await fetch(url, options);
    const data = await response.text();
    refreshPage();
    return data;
  } catch (error) {
    console.error('Error clearing payment data:', error);
    throw error;
  }
}


export async function fetchPayments() {
  const url = 'http://localhost:8080/payments';

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error fetching payments');
  }
}

export async function deletePayment(paymentID) {
  const url = `http://localhost:8080/payments/delete/${paymentID}`;
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.text();
    refreshPage();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error deleting payment');
  }
}