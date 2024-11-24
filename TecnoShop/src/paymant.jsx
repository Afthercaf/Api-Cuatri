import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51QNkz6AU7UFoerJE6cqMZvZz5Q9JE8XtMbcLzhRkBWxZWQKSar7BTGHS7ejnhRmOm75i5EwC2JlrjklgndhwiCZg00ParyAtga');

const CheckoutForm = ({ productId, quantity, userEmail, sellerId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    try {
      // Solicita el clientSecret al backend
      const response = await fetch('http://localhost:4000/api/payments/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity, userEmail}),
      });

      if (!response.ok) {
        throw new Error('Error al obtener el clientSecret del servidor.');
      }

      const { clientSecret } = await response.json();

      if (!clientSecret) {
        throw new Error('No se recibió el clientSecret del servidor.');
      }

      // Confirmar el pago en el frontend
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { email: userEmail },
        },
      });

      if (result.error) {
        setMessage(`Error: ${result.error.message}`);
      } else if (result.paymentIntent.status === 'succeeded') {
        setMessage('Pago exitoso. Gracias por tu compra.');
      }
    } catch (error) {
      setMessage(`Error al procesar el pago: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      <button type="submit" disabled={!stripe || isLoading}>
        {isLoading ? 'Procesando...' : 'Pagar'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

const PaymentPage = () => {
  const productId = '67425cb026351b95cd1afa87'; // Reemplaza con un ID de producto válido
  const quantity = 1; // Cantidad a comprar
  const userEmail = 'joseuicabmex@gmail.com'; // Correo electrónico del comprador
  const sellerId = '6742590f26351b95cd1ac395'; // ID del vendedor

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm productId={productId} quantity={quantity} userEmail={userEmail} />
    </Elements>
  );
};

export default PaymentPage;
