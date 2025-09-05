import React, { useState } from 'react';
import { QrCodeIcon, CalendarIcon, MapPinIcon, InfoIcon, ClockIcon, WalletIcon, ArrowRightIcon, CopyIcon } from 'lucide-react';
import './wallet-styles.css';
interface WalletCouponProps {
  coupon: {
    id: string;
    title: string;
    description: string;
    code: string;
    discount: {
      type: 'percentage' | 'fixed' | 'bogo' | 'free';
      value: number;
    };
    validity: {
      startDate: string;
      endDate: string;
      isActive: boolean;
    };
    business: {
      name: string;
      logo?: string;
      location: string;
    };
    displayOptions: {
      primaryColor: string;
      secondaryColor?: string;
      textColor?: string;
    };
  };
  onAddToWallet?: () => void;
  onCopyCode?: () => void;
}
export function WalletCoupon({
  coupon,
  onAddToWallet,
  onCopyCode
}: WalletCouponProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  // Get discount display text
  const getDiscountText = (discount: {
    type: string;
    value: number;
  }) => {
    switch (discount.type) {
      case 'percentage':
        return `${discount.value}% off`;
      case 'fixed':
        return `$${discount.value} off`;
      case 'bogo':
        return 'Buy one get one free';
      case 'free':
        return 'Free item';
      default:
        return `${discount.value}% off`;
    }
  };
  // Calculate days left until expiration
  const getDaysLeft = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  const daysLeft = getDaysLeft(coupon.validity.endDate);
  const isExpired = daysLeft <= 0;
  const isExpiringSoon = daysLeft > 0 && daysLeft <= 7;
  // Handle add to wallet
  const handleAddToWallet = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip
    if (onAddToWallet) {
      onAddToWallet();
    }
  };
  // Handle copy code
  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip
    navigator.clipboard.writeText(coupon.code);
    if (onCopyCode) {
      onCopyCode();
    }
  };
  return <div className={`wallet-card-container ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>
      <div className="wallet-card">
        {/* Front of card */}
        <div className="wallet-card-front" style={{
        backgroundColor: coupon.displayOptions.primaryColor || '#3B82F6',
        color: coupon.displayOptions.textColor || 'white'
      }}>
          <div className="wallet-card-header">
            {coupon.business.logo ? <img src={coupon.business.logo} alt={coupon.business.name} className="wallet-card-logo" /> : <div className="wallet-card-logo-placeholder">
                {coupon.business.name.charAt(0)}
              </div>}
            <div className="wallet-card-business">
              <h3 className="wallet-card-business-name">
                {coupon.business.name}
              </h3>
              <div className="wallet-card-location">
                <MapPinIcon className="wallet-card-icon-small" />
                <span>{coupon.business.location}</span>
              </div>
            </div>
          </div>
          <div className="wallet-card-content">
            <h2 className="wallet-card-title">{coupon.title}</h2>
            <p className="wallet-card-description">{coupon.description}</p>
            <div className="wallet-card-discount">
              {getDiscountText(coupon.discount)}
            </div>
            <div className="wallet-card-validity">
              <CalendarIcon className="wallet-card-icon" />
              <div>
                <div>Valid until {formatDate(coupon.validity.endDate)}</div>
                {isExpired ? <div className="wallet-card-expired">Expired</div> : isExpiringSoon ? <div className="wallet-card-expiring-soon">
                    Expires in {daysLeft} days
                  </div> : <div>{daysLeft} days remaining</div>}
              </div>
            </div>
            <div className="wallet-card-code-container">
              <div className="wallet-card-code">
                <span>{coupon.code}</span>
                <button className="wallet-card-copy-button" onClick={handleCopyCode} aria-label="Copy code">
                  <CopyIcon className="wallet-card-icon-small" />
                </button>
              </div>
            </div>
          </div>
          <div className="wallet-card-footer">
            <div className="wallet-card-hint">Tap to flip</div>
            <button className="wallet-card-add-button" onClick={handleAddToWallet} disabled={isExpired}>
              <WalletIcon className="wallet-card-icon-small" />
              <span>Add to Wallet</span>
            </button>
          </div>
        </div>
        {/* Back of card */}
        <div className="wallet-card-back" style={{
        backgroundColor: coupon.displayOptions.secondaryColor || '#F9FAFB',
        color: '#111827'
      }}>
          <div className="wallet-card-back-header">
            <h3>Redeem this Coupon</h3>
          </div>
          <div className="wallet-card-qr">
            <QrCodeIcon className="wallet-card-qr-placeholder" />
            <div className="wallet-card-code-display">{coupon.code}</div>
          </div>
          <div className="wallet-card-instructions">
            <div className="wallet-card-instruction-item">
              <ClockIcon className="wallet-card-icon" />
              <div>
                <strong>Valid Period</strong>
                <div>
                  {formatDate(coupon.validity.startDate)} -{' '}
                  {formatDate(coupon.validity.endDate)}
                </div>
              </div>
            </div>
            <div className="wallet-card-instruction-item">
              <InfoIcon className="wallet-card-icon" />
              <div>
                <strong>How to use</strong>
                <div>Show this coupon to the cashier or scan at checkout</div>
              </div>
            </div>
          </div>
          <div className="wallet-card-back-footer">
            <div className="wallet-card-hint">Tap to flip</div>
            <button className="wallet-card-add-button" onClick={handleAddToWallet} disabled={isExpired}>
              <WalletIcon className="wallet-card-icon-small" />
              <span>Add to Wallet</span>
            </button>
          </div>
        </div>
      </div>
    </div>;
}