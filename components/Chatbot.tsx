'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome messages matching the detected language or user entry
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        {
          id: 1,
          text: "Hi! Welcome to D-ANMOL ENTERPRISES Chat Support. How can I help you today? \n\n(मैं English, Hindi और Hinglish समझ सकता हूँ!)",
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (unread) setUnread(false);
  };

  const getLanguage = (text: string): 'hi' | 'hinglish' | 'en' => {
    const input = text.toLowerCase();
    
    // Check for native Hindi devanagari characters
    if (/[\u0900-\u097F]/.test(input)) {
      return 'hi';
    }

    // Hinglish keywords list
    const hinglishKeywords = [
      'kaise', 'kya', 'hai', 'hu', 'hoon', 'apka', 'apki', 'se', 'ko', 'kitna', 'rate', 'kiraya',
      'karo', 'karein', 'gaadi', 'milega', 'chahiye', 'shifting', 'shuru', 'jaldi', 'batao',
      'karna', 'karke', 'kab', 'tempo', 'noida', 'delhi', 'phone', 'number', 'passengers'
    ];

    const hasHinglish = hinglishKeywords.some(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      return regex.test(input);
    });
    return hasHinglish ? 'hinglish' : 'en';
  };

  const generateReply = (input: string): string => {
    const text = input.toLowerCase().trim();
    const lang = getLanguage(text);

    // Topic matching
    const isGreeting = /\b(hi|hello|hey|namaste|hola|greetings|नमस्ते|राम|helo)\b/.test(text);
    const isCab = /\b(cab|car|taxi|suv|hatchback|sedan|passenger|passenger|कैब|टैक्सी|गाड़ी|कार)\b/.test(text);
    const isTempo = /\b(tempo|cargo|goods|tata ace|jeeto|pickup|shifting|delivery|truck|सामान|टैम्पो|छोटा हाथी|ट्रक)\b/.test(text);
    const isRate = /\b(rate|fare|price|cost|charges|estimate|kiraya|paisa|bhada|किराया|रेट|प्राइस|खर्च|दाम)\b/.test(text);
    const isBooking = /\b(book|booking|reserve|how to book|order|kaise book|काइसे बुक|बुक)\b/.test(text);
    const isStatus = /\b(status|track|tracking|id|booking id|confirm|check|चेक|स्टेटस|आईडी)\b/.test(text);
    const isContact = /\b(contact|phone|number|support|call|address|email|office|contact details|फोन|नंबर|कॉल|ऑफिस|पता)\b/.test(text);

    if (isGreeting) {
      if (lang === 'hi') {
        return "नमस्ते! डी अनमोल एंटरप्राइजेज सपोर्ट में आपका स्वागत है। आप मुझसे कैब बुकिंग, टेम्पो रेट या कॉन्टैक्ट नंबर के बारे में पूछ सकते हैं।";
      } else if (lang === 'hinglish') {
        return "Hello! D-Anmol Enterprises support me aapka swagat hai. Aap mujhse cab/tempo bookings, rates, booking status ya contact details pooch sakte hain.";
      } else {
        return "Hello! Welcome to D-Anmol Enterprises support. How can I assist you today? You can query me about cab bookings, cargo tempos, rates, or support.";
      }
    }

    if (isRate || isCab || isTempo) {
      // Rates specific query
      if (isCab && (isRate || text.includes('rate') || text.includes('fare') || text.includes('kiraya'))) {
        if (lang === 'hi') {
          return "हमारी कैब दरें:\n• Hatchback: ₹250 बेस + ₹11/किमी\n• Sedan: ₹300 बेस + ₹13/किमी\n• SUV (6 सीटर): ₹450 बेस + ₹18/किमी\n• Premium: ₹700 बेस + ₹24/किमी\n• Tempo Traveller: ₹800 बेस + ₹25/किमी\nअनुमान लगाने के लिए होमपेज पर 'Cab Booking' फ़ॉर्म का उपयोग करें।";
        } else if (lang === 'hinglish') {
          return "Cab rates details:\n• Hatchback: ₹250 base + ₹11/km\n• Sedan: ₹300 base + ₹13/km\n• SUV: ₹450 base + ₹18/km\n• Premium: ₹700 base + ₹24/km\n• Tempo Traveller: ₹800 base + ₹25/km\nExact estimate ke liye homepage par 'Cab Booking' form check karein.";
        } else {
          return "Our passenger cab rates:\n• Hatchback: ₹250 base + ₹11/km\n• Sedan: ₹300 base + ₹13/km\n• SUV: ₹450 base + ₹18/km\n• Premium: ₹700 base + ₹24/km\n• Tempo Traveller: ₹800 base + ₹25/km\nYou can calculate estimated rates using our booking form on the homepage.";
        }
      }
      
      if (isTempo && (isRate || text.includes('rate') || text.includes('fare') || text.includes('kiraya'))) {
        if (lang === 'hi') {
          return "हमारी टेम्पो माल डिलीवरी दरें:\n• Mahindra Jeeto: ₹500 बेस + ₹22/किमी\n• Tata Ace (छोटा हाथी): ₹600 बेस + ₹25/किमी\n• Pickup: ₹800 बेस + ₹30/किमी\n• Small Truck: ₹1200 बेस + ₹40/किमी\n• Medium Truck: ₹2000 बेस + ₹60/किमी\nबुकिंग फॉर्म से सटीक दूरी और किराया मिल जाएगा।";
        } else if (lang === 'hinglish') {
          return "Goods Transportation (Tempo) rates:\n• Mahindra Jeeto: ₹500 base + ₹22/km\n• Tata Ace: ₹600 base + ₹25/km\n• Pickup: ₹800 base + ₹30/km\n• Small Truck: ₹1200 base + ₹40/km\n• Medium Truck: ₹2000 base + ₹60/km\nHomepage par 'Tempo Booking' form se exact calculate kar sakte hain.";
        } else {
          return "Our tempo/cargo delivery rates:\n• Mahindra Jeeto: ₹500 base + ₹22/km\n• Tata Ace: ₹600 base + ₹25/km\n• Pickup: ₹800 base + ₹30/km\n• Small Truck: ₹1200 base + ₹40/km\n• Medium Truck: ₹2000 base + ₹60/km\nUse our live estimator on the homepage.";
        }
      }

      if (isCab) {
        if (lang === 'hi') {
          return "हम लोकल और आउटस्टेशन दोनों यात्राओं के लिए सुरक्षित कैब प्रदान करते हैं। हमारे पास हैचबैक, सेडान, एसयूवी, और टेम्पो ट्रैवलर गाड़ियां हैं। क्या आप इनका किराया जानना चाहते हैं?";
        } else if (lang === 'hinglish') {
          return "Hum local aur outstation trips ke liye reliable cabs provide karte hain. Sedan, Hatchback, SUV, Premium aur Tempo Traveller available hain. Rates check karne ke liye 'Cab Rates' pooch sakte hain.";
        } else {
          return "We offer premium local and outstation taxi bookings with verified professional drivers. Fleet includes Hatchbacks, Sedans, SUVs, and Tempo Travellers. Type 'Cab Fares' to view rates.";
        }
      }

      if (isTempo) {
        if (lang === 'hi') {
          return "घरेलू सामान शिफ्टिंग या कमर्शियल डिलीवरी के लिए हमारे पास महिंद्रा जीतो, टाटा एस और पिकअप ट्रक उपलब्ध हैं। हमारी गाड़ियां पूरी तरह से सुरक्षित हैं। क्या आप इनका किराया जानना चाहते हैं?";
        } else if (lang === 'hinglish') {
          return "Ghar shifting ya delivery ke liye Tata Ace (Chota Hathi), Jeeto aur Pickup trucks available hain. Rates check karne ke liye 'Tempo Rates' poochiye.";
        } else {
          return "We support logistics, cargo, and home shifting. Vehicles include Tata Ace, Jeeto, Pickup, and larger trucks. Type 'Tempo Fares' to view pricing.";
        }
      }
    }

    if (isBooking) {
      if (lang === 'hi') {
        return "बुकिंग करने के लिए:\n1. होमपेज के 'Book Now' सेक्शन पर जाएं।\n2. 'Cab' या 'Tempo' चुनें।\n3. नाम, नंबर, पिकअप और ड्रॉप लोकेशन भरें।\n4. 'Book Now' दबाएं। आपको तुरंत एक बुकिंग आईडी मिल जाएगी!";
      } else if (lang === 'hinglish') {
        return "Booking process behad simple hai:\n1. Homepage par niche 'Book Now' form me jaayein.\n2. 'Cab' ya 'Tempo' choose karein.\n3. Pickup/Drop details aur basic info fill karein.\n4. 'Book Now' click karein. Confirmation page par Booking ID show ho jaegi.";
      } else {
        return "To book a ride or truck:\n1. Scroll to the booking form on the homepage.\n2. Pick the 'Cab' or 'Tempo' tab.\n3. Input name, mobile, locations, date, and vehicle tier.\n4. Submit. You will be redirected to the booking confirmation screen containing your unique Booking ID.";
      }
    }

    if (isStatus) {
      if (lang === 'hi') {
        return "अपनी बुकिंग का स्टेटस चेक करने के लिए, कृपया हमारे सपोर्ट नंबर +91 90416 87157 या +91 99113 44396 पर अपनी बुकिंग आईडी (जैसे: CAB-2026-00001) के साथ कॉल करें। हमारी टीम तुरंत जांच करके आपको अपडेट देगी।";
      } else if (lang === 'hinglish') {
        return "Booking status check karne ke liye apna Booking ID (e.g. CAB-2026-00001) humare support numbers +91 90416 87157 / +91 99113 44396 par call karke batayein. Humari team aapko live update kar degi.";
      } else {
        return "To track your booking status, call our 24/7 corporate desk at +91 90416 87157 or +91 99113 44396 and share your Booking ID (e.g., CAB-2026-00001). Our team will provide instant updates.";
      }
    }

    if (isContact) {
      if (lang === 'hi') {
        return "हमसे संपर्क करने के विवरण:\n• 📞 फोन: +91 90416 87157, +91 99113 44396 (24/7 चालू)\n• ✉️ ईमेल: support@danmol.com\n• 📍 कार्यालय: शॉप नंबर 298, पहली मंजिल, गली नंबर 4, बुडैल, सेक्टर 45, चंडीगढ़ - 160047\nआप कभी भी कॉल कर सकते हैं!";
      } else if (lang === 'hinglish') {
        return "Humare contact details:\n• Call Us: +91 90416 87157, +91 99113 44396 (24/7 Support)\n• Email: support@danmol.com\n• Office: Shop No. 298, 1st Floor, Gali No. 4, Burail, Sector 45, Chandigarh\nAap call ya mail karke direct details le sakte hain.";
      } else {
        return "D-Anmol Enterprises contact info:\n• Phone: +91 90416 87157, +91 99113 44396 (24/7 support line)\n• Email: support@danmol.com\n• Headquarters: Shop No. 298, 1st Floor, Gali No. 4, Burail, Sector 45, Chandigarh - 160047, India\nFeel free to call our dispatch team directly!";
      }
    }

    // Default Fallback
    if (lang === 'hi') {
      return "माफ़ कीजिये, मैं इसे पूरी तरह समझ नहीं पाया। कृपया कैब किराया, टेम्पो रेट, बुकिंग प्रक्रिया या ऑफिस फोन नंबर के बारे में पूछें।";
    } else if (lang === 'hinglish') {
      return "Sorry, main thoda samajh nahi paya. Kya aap please cab fare, tempo rate, booking step ya customer call number ke baare me pooch sakte hain?";
    } else {
      return "I apologize, I didn't quite catch that. Can you please ask about cab fares, cargo tempo rates, booking directions, or our contact details?";
    }
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // 1. Append user message
    const userMsg: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // 2. Simulate typing indicator and bot response
    setTimeout(() => {
      const replyText = generateReply(text);
      const botMsg: Message = {
        id: Date.now() + 1,
        text: replyText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleChipClick = (label: string, query: string) => {
    handleSend(query);
  };

  return (
    <div className="fixed top-24 right-6 z-50 flex flex-col items-end">
      {/* 1. Floating Circular Toggle Button */}
      <button
        onClick={handleToggle}
        type="button"
        className={`h-14 w-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 transform hover:scale-105 relative cursor-pointer outline-none
          ${isOpen ? 'bg-slate-700' : 'bg-brand-800 hover:bg-brand-900'}`}
        aria-label="Toggle Help Chatbot"
      >
        {isOpen ? (
          // Minimize Icon
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          // Chat bubbles Icon
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}

        {/* Orange notification badge */}
        {!isOpen && unread && (
          <span className="absolute -top-1 -right-1 flex h-5 w-11 items-center justify-center rounded-full bg-brand-orange-500 text-[8px] font-black tracking-wider uppercase px-1 border border-white animate-bounce shadow-sm">
            Help
          </span>
        )}
      </button>

      {/* 2. Chat Window Container */}
      {isOpen && (
        <div className="flex flex-col w-[340px] sm:w-[380px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden mt-4 animate-fadeIn backdrop-blur-md">
          {/* Header */}
          <div className="bg-brand-900 text-white p-4 flex items-center justify-between border-b border-brand-950">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Logo"
                width={30}
                height={30}
                className="h-7 w-auto bg-white p-0.5 rounded object-contain"
              />
              <div className="flex flex-col text-left">
                <span className="text-sm font-black font-logo text-brand-orange-500 tracking-wide uppercase leading-none">
                  D-ANMOL
                </span>
                <span className="text-[7.5px] font-extrabold font-logo text-brand-100 tracking-wider mt-0.5 leading-none uppercase">
                  ENTERPRISES HELP
                </span>
              </div>
            </div>
            
            <button
              onClick={handleToggle}
              type="button"
              className="text-slate-300 hover:text-white transition-colors cursor-pointer text-lg p-1"
              aria-label="Close Chat"
            >
              ✕
            </button>
          </div>

          {/* Messages Window */}
          <div 
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto bg-slate-50/50 flex flex-col gap-3.5 scrollbar"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[80%] ${
                  msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                }`}
              >
                <div
                  className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-brand-orange-500 text-white rounded-br-none'
                      : 'bg-white text-slate-800 rounded-bl-none border border-slate-100'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="self-start flex flex-col items-start max-w-[80%]">
                <div className="px-4 py-3 bg-white border border-slate-100 rounded-2xl rounded-bl-none shadow-xs flex items-center gap-1">
                  {/* Bouncing typing dots */}
                  <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Quick Action Chips */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
            <button
              onClick={() => handleChipClick('🚕 Cab Fares', 'Cab Booking Rates')}
              type="button"
              className="px-2.5 py-1 bg-white hover:bg-brand-50 border border-slate-200 text-slate-700 hover:text-brand-800 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              🚕 Cab Rates / कैब किराया
            </button>
            <button
              onClick={() => handleChipClick('🚚 Tempo Fares', 'Tempo Booking Rates')}
              type="button"
              className="px-2.5 py-1 bg-white hover:bg-brand-50 border border-slate-200 text-slate-700 hover:text-brand-800 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              🚚 Tempo Rates / टेम्पो रेट
            </button>
            <button
              onClick={() => handleChipClick('📞 Contact Info', 'Contact details phone number')}
              type="button"
              className="px-2.5 py-1 bg-white hover:bg-brand-50 border border-slate-200 text-slate-700 hover:text-brand-800 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              📞 Call Support / फोन नंबर
            </button>
            <button
              onClick={() => handleChipClick('ℹ️ How to Book', 'How to book cab or tempo')}
              type="button"
              className="px-2.5 py-1 bg-white hover:bg-brand-50 border border-slate-200 text-slate-700 hover:text-brand-800 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              ℹ️ How to Book / बुकिंग कैसे करें
            </button>
          </div>

          {/* Input Panel */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputVal);
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask support in Hindi or English..."
              className="flex-1 px-3 py-2 bg-slate-50 text-slate-800 rounded-xl text-sm placeholder-slate-400 outline-none border border-transparent focus:border-brand-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2.5 bg-brand-orange-500 hover:bg-brand-orange-600 disabled:opacity-40 disabled:hover:bg-brand-orange-500 text-white rounded-xl transition-all shadow-sm flex items-center justify-center shrink-0 cursor-pointer outline-none"
              aria-label="Send Message"
            >
              {/* Send icon */}
              <svg className="h-4 w-4 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
