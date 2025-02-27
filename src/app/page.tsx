'use client';

import React, { useState } from 'react';
import QRCode from 'qrcode';

const Home: React.FC = () => {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);


  const generateQRCode = async (value: string) => {
    setIsLoading(true);
    try {
      const qrDataUrl = await QRCode.toDataURL(value, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      setQrCode(qrDataUrl);
    } catch (err) {
      console.error('Error generating QR code:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    if (value) {
      generateQRCode(value);
    } else {
      setQrCode('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 animate-fadeIn">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] animate-slideUp">
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
              QRGen
            </h1>
            <p className="text-gray-600 mt-4 text-lg">Transform your text or URL into a QR code instantly</p>
          </div>
          <div className="space-y-8">
            <div className="space-y-2">
              <input
                type="text"
                id="text"
                value={text}
                onChange={handleInputChange}
                placeholder="Type something..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 shadow-sm"
              />
            </div>
          
            {isLoading ? (
              <div className="flex justify-center items-center h-[300px] bg-gray-50 rounded-xl border border-gray-200 transition-all duration-300">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              </div>
            ) : qrCode && (
              <div className="flex flex-col items-center space-y-6 p-8 bg-gray-50 rounded-xl border border-gray-200 transition-all duration-300">
                <img
                  src={qrCode}
                  alt="Generated QR Code"
                  className="max-w-[300px] w-full h-auto rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                />
                <div className="flex space-x-4">
                  <a
                    href={qrCode}
                    download="qrcode.png"
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 font-medium shadow-md hover:shadow-lg flex items-center space-x-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>Download QR Code</span>
                  </a>
                  <button
                    onClick={() => setIsShareModalOpen(true)}
                    className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 active:bg-green-800 transition-colors duration-200 font-medium shadow-md hover:shadow-lg flex items-center space-x-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                    <span>Share</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md transform transition-all duration-300 scale-100 animate-slideUp shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Share QR Code</h3>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-full p-2 hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(text);
                  alert('Text copied to clipboard!');
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
                <span>Copy to Clipboard</span>
              </button>
              <button
                onClick={() => {
                  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
                  window.open(twitterUrl, '_blank');
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#1DA1F2] text-white hover:bg-[#1a91da] rounded-xl transition-colors duration-200"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                <span>Share on Twitter</span>
              </button>
              <button
                onClick={() => {
                  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
                  window.open(fbUrl, '_blank');
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#1877F2] text-white hover:bg-[#166fe5] rounded-xl transition-colors duration-200"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Share on Facebook</span>
              </button>
              <button
                onClick={() => {
                  const mailtoUrl = `mailto:?subject=Check out this QR Code&body=${encodeURIComponent(`${text}\n\nGenerated from: ${window.location.href}`)}`;
                  window.location.href = mailtoUrl;
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-600 text-white hover:bg-gray-700 rounded-xl transition-colors duration-200"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>Share via Email</span>
              </button>
              <a
                href={qrCode}
                download="qrcode.png"
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white hover:bg-green-700 rounded-xl transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>Download Image</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
