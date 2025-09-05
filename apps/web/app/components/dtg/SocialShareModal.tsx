import React, { useState, Component } from 'react';
import { XIcon, FacebookIcon, TwitterIcon, LinkedinIcon, MailIcon, LinkIcon, CopyIcon, CheckIcon } from 'lucide-react';
interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
}
export function SocialShareModal({
  isOpen,
  onClose,
  title,
  description,
  url,
  imageUrl
}: SocialShareModalProps) {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;
  const shareLinks = [{
    name: 'Facebook',
    icon: <FacebookIcon className="w-5 h-5 text-[#1877F2]" />,
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    color: 'bg-[#1877F2]/10 hover:bg-[#1877F2]/20'
  }, {
    name: 'Twitter',
    icon: <TwitterIcon className="w-5 h-5 text-[#1DA1F2]" />,
    href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(description)}`,
    color: 'bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20'
  }, {
    name: 'LinkedIn',
    icon: <LinkedinIcon className="w-5 h-5 text-[#0A66C2]" />,
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    color: 'bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20'
  }, {
    name: 'Email',
    icon: <MailIcon className="w-5 h-5 text-gray-600" />,
    href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${url}`)}`,
    color: 'bg-gray-100 hover:bg-gray-200'
  }];
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold">Share this page</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <XIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-4">
          {imageUrl && <div className="mb-4 rounded-lg overflow-hidden">
              <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
            </div>}
          <div className="mb-4">
            <h4 className="font-medium">{title}</h4>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {shareLinks.map(link => <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className={`flex flex-col items-center p-3 rounded-lg ${link.color}`}>
                {link.icon}
                <span className="text-xs mt-1">{link.name}</span>
              </a>)}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <LinkIcon className="w-4 h-4 text-gray-500" />
              </div>
              <input type="text" value={url} readOnly className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm bg-gray-50" />
            </div>
            <button onClick={copyToClipboard} className={`p-2 rounded-lg ${copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
              {copied ? <CheckIcon className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>;
}
