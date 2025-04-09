import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const PaymentForm = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [useCredits, setUseCredits] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock booking data - would be retrieved from session storage or API
  const bookingData = {
    id: 'bk_123456',
    trainerId: '1',
    trainerName: 'Sarah Johnson',
    date: '2025-04-10',
    startTime: '09:00',
    endTime: '10:00',
    sessionType: 'virtual',
    sessionFocus: 'Beginner Yoga',
    price: 45
  };

  // Mock user data - would be fetched from API
  const userData = {
    credits: 30
  };

  const formatCardNumber = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };

  const formatExpiryDate = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    
    return digits;
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(formatExpiryDate(e.target.value));
  };

  const handleCvvChange = (e) => {
    // Limit to 3 or 4 digits
    const digits = e.target.value.replace(/\D/g, '');
    setCvv(digits.slice(0, 4));
  };

  const handleApplyCoupon = () => {
    if (!couponCode) {
      setError('Please enter a coupon code');
      return;
    }

    setLoading(true);

    // This would be replaced with actual API call
    setTimeout(() => {
      // Mock coupon validation
      if (couponCode.toUpperCase() === 'FITTRIBE10') {
        setCouponApplied(true);
        setCouponDiscount(4.5); // 10% of $45
        setError(null);
      } else {
        setCouponApplied(false);
        setCouponDiscount(0);
        setError('Invalid coupon code');
      }
      setLoading(false);
    }, 500);
  };

  const calculateTotal = () => {
    let total = bookingData.price;
    
    // Apply coupon discount if valid
    if (couponApplied) {
      total -= couponDiscount;
    }
    
    // Apply credits if selected
    if (useCredits) {
      const creditsToUse = Math.min(userData.credits, total);
      total -= creditsToUse;
    }
    
    return Math.max(0, total);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (paymentMethod === 'credit_card' && calculateTotal() > 0) {
      // Validate credit card details
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        setError('Please fill in all credit card details');
        return;
      }
      
      // Basic validation
      if (cardNumber.replace(/\s/g, '').length < 16) {
        setError('Please enter a valid card number');
        return;
      }
      
      if (expiryDate.length < 5) {
        setError('Please enter a valid expiry date (MM/YY)');
        return;
      }
      
      if (cvv.length < 3) {
        setError('Please enter a valid CVV');
        return;
      }
    }
    
    setLoading(true);
    
    // This would be replaced with actual API call
    setTimeout(() => {
      // Simulate successful payment
      const paymentData = {
        bookingId: bookingData.id,
        paymentMethod,
        amount: calculateTotal(),
        creditsUsed: useCredits ? Math.min(userData.credits, bookingData.price) : 0,
        couponApplied: couponApplied ? couponCode : null,
        couponDiscount: couponDiscount,
        status: 'completed'
      };
      
      // Store payment data in session storage for confirmation page
      sessionStorage.setItem('paymentData', JSON.stringify(paymentData));
      
      // Redirect to success page
      router.push('/payment/success');
      
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-display font-bold text-primary-900 mb-8">Payment</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
                <h2 className="text-xl font-semibold text-primary-900 mb-4">Payment Method</h2>
                
                {error && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  {/* Payment Method Selection */}
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          paymentMethod === 'credit_card'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => setPaymentMethod('credit_card')}
                      >
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full border ${
                            paymentMethod === 'credit_card'
                              ? 'border-primary-500 bg-primary-500'
                              : 'border-gray-400'
                          }`}>
                            {paymentMethod === 'credit_card' && (
                              <div className="w-2 h-2 bg-white rounded-full m-auto mt-1"></div>
                            )}
                          </div>
                          <span className="ml-2 font-medium">Credit Card</span>
                        </div>
                        <div className="flex mt-2 space-x-2">
                          <div className="w-10 h-6 bg-gray-200 rounded"></div>
                          <div className="w-10 h-6 bg-gray-200 rounded"></div>
                          <div className="w-10 h-6 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                      <div
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          paymentMethod === 'paypal'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => setPaymentMethod('paypal')}
                      >
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full border ${
                            paymentMethod === 'paypal'
                              ? 'border-primary-500 bg-primary-500'
                              : 'border-gray-400'
                          }`}>
                            {paymentMethod === 'paypal' && (
                              <div className="w-2 h-2 bg-white rounded-full m-auto mt-1"></div>
                            )}
                          </div>
                          <span className="ml-2 font-medium">PayPal</span>
                        </div>
                        <div className="mt-2">
                          <div className="w-16 h-6 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Credit Card Details */}
                  {paymentMethod === 'credit_card' && calculateTotal() > 0 && (
                    <div className="space-y-4 mb-6">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          maxLength={19}
                        />
                      </div>
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="John Smith"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="123"
                            value={cvv}
                            onChange={handleCvvChange}
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* PayPal Message */}
                  {paymentMethod === 'paypal' && (
                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                      <p className="text-blue-700">
                        You will be redirected to PayPal to complete your payment after clicking "Complete Payment".
                      </p>
                    </div>
                  )}
                  
                  {/* Use Credits Option */}
                  {userData.credits > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="useCredits"
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          checked={useCredits}
                          onChange={(e) => setUseCredits(e.target.checked)}
                        />
                        <label htmlFor="useCredits" className="ml-2 text-gray-700">
                          Use my credits ({userData.credits} available - ${userData.credits.toFixed(2)} value)
                        </label>
                      </div>
                    </div>
                  )}
                  
                  {/* Coupon Code */}
                  <div className="mb-6">
                    <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Coupon Code (Optional)
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="couponCode"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        disabled={couponApplied}
                      />
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-r-lg ${
                          couponApplied
                            ? 'bg-green-500 text-white'
                            : 'bg-primary-600 hover:bg-primary-700 text-white'
                        }`}
                        onClick={handleApplyCoupon}
                        disabled={couponApplied || loading}
                      >
                        {couponApplied ? 'Applied' : 'Apply'}
                      </button>
                    </div>
                    {couponApplied && (
                      <p className="text-green-600 text-sm mt-1">
                        Coupon applied: ${couponDiscount.toFixed(2)} discount
                      </p>
                    )}
                  </div>
                  
                  {/* Submit Button */}
                  <div className="flex justify-between items-center">
                    <Link 
                      href="/booking/confirmation"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      &larr; Back to Booking
                    </Link>
                    <button
                      type="submit"
                      className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-lg transition-colors"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                          Processing...
                        </>
                      ) : (
                        'Complete Payment'
                      )}
                    </button>
                  </div>
                </form>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Secure Payment:</span> All transactions are secure and encrypted. Your credit card information is never stored on our servers.
                </p>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-soft p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-primary-900 mb-4">Order Summary</h2>
                
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <p className="font-medium text-gray-800">{bookingData.sessionType === 'virtual' ? 'Virtual' : 'In-Person'} Session with {bookingData.trainerName}</p>
                  <p className="text-gray-600 text-sm">
                    {new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}, {bookingData.startTime} - {bookingData.endTime}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Focus: {bookingData.sessionFocus}
                  </p>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Session Price</span>
                    <span className="text-gray-800">${bookingData.price.toFixed(2)}</span>
                  </div>
                  
                  {couponApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon Discount</span>
                      <span>-${couponDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {useCredits && (
                    <div className="flex justify-between text-blue-600">
                      <span>Credits Applied</span>
                      <span>-${Math.min(userData.credits, bookingData.price - (couponApplied ? couponDiscount : 0)).toFixed(2)}</span>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-bold">
                    <span className="text-gray-800">Total</span>
                    <span className="text-primary-900">${calculateTotal().toFixed(2)}</span>
                  </div>
                  
                  {calculateTotal() === 0 && (
                    <p className="text-green-600 text-sm mt-2">
                      Your session is fully covered by credits and/or coupon!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
