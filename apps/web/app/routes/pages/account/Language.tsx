import React, { useState } from 'react';
import { useLoaderData, useRouteError, isRouteErrorResponse, useNavigate } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Header } from '../../../components/dtg/Header';
import { Footer } from '../../../components/dtg/Footer';
import { ChevronLeftIcon, CheckIcon, GlobeIcon } from 'lucide-react';
interface LanguageOption {
  code: string;
  name: string;
  localName: string;
  flag: string;
}
export default function Language() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [success, setSuccess] = useState(false);
  const languages: LanguageOption[] = [{
    code: 'en-US',
    name: 'English (US)',
    localName: 'English (US)',
    flag: '🇺🇸'
  }, {
    code: 'en-GB',
    name: 'English (UK)',
    localName: 'English (UK)',
    flag: '🇬🇧'
  }, {
    code: 'es',
    name: 'Spanish',
    localName: 'Español',
    flag: '🇪🇸'
  }, {
    code: 'fr',
    name: 'French',
    localName: 'Français',
    flag: '🇫🇷'
  }, {
    code: 'de',
    name: 'German',
    localName: 'Deutsch',
    flag: '🇩🇪'
  }, {
    code: 'it',
    name: 'Italian',
    localName: 'Italiano',
    flag: '🇮🇹'
  }, {
    code: 'pt',
    name: 'Portuguese',
    localName: 'Português',
    flag: '🇵🇹'
  }, {
    code: 'ja',
    name: 'Japanese',
    localName: '日本語',
    flag: '🇯🇵'
  }, {
    code: 'zh',
    name: 'Chinese (Simplified)',
    localName: '中文 (简体)',
    flag: '🇨🇳'
  }, {
    code: 'ko',
    name: 'Korean',
    localName: '한국어',
    flag: '🇰🇷'
  }, {
    code: 'ar',
    name: 'Arabic',
    localName: 'العربية',
    flag: '🇸🇦'
  }, {
    code: 'hi',
    name: 'Hindi',
    localName: 'हिन्दी',
    flag: '🇮🇳'
  }];
  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setSuccess(true);
    // In a real app, you would save the language preference to the user's account
    // and update the application's locale/translations
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  const goBack = () => {
    navigate('/settings#account');
  };
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center mb-6">
              <button onClick={goBack} className="mr-4 p-2 rounded-full hover:bg-gray-100">
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold">Language</h1>
            </div>
            {success && <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded flex items-center">
                <CheckIcon className="w-5 h-5 mr-2" />
                <span>Language updated successfully!</span>
              </div>}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b flex items-center">
                <GlobeIcon className="w-5 h-5 text-blue-600 mr-3" />
                <h2 className="text-lg font-semibold">Select Your Language</h2>
              </div>
              <div className="divide-y">
                {languages.map(language => <button key={language.code} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left" onClick={() => handleLanguageChange(language.code)}>
                    <div className="flex items-center">
                      <span className="text-xl mr-3" aria-hidden="true">
                        {language.flag}
                      </span>
                      <div>
                        <div className="font-medium">{language.name}</div>
                        <div className="text-sm text-gray-500">
                          {language.localName}
                        </div>
                      </div>
                    </div>
                    {selectedLanguage === language.code && <CheckIcon className="w-5 h-5 text-blue-600" />}
                  </button>)}
              </div>
              <div className="p-4 border-t">
                <p className="text-sm text-gray-500">
                  Changing your language will translate the interface but won't
                  affect user-generated content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}
