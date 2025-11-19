import React from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <>
      {/* 배경 오버레이 */}
      <div className="modal-overlay" onClick={onClose} />

      {/* 모달 컨텐츠 */}
      <div className="modal-wrapper">
        <div className="modal-content">
          {/* 모달 헤더 */}
          <div className="modal-header">
            <h2>{title}</h2>
            <button className="modal-close-btn" onClick={onClose}>
              ×
            </button>
          </div>

          {/* 모달 본문 */}
          <div className="modal-body">
            {children}
          </div>

          {/* 모달 푸터 */}
          <div className="modal-footer">
            <button className="modal-btn modal-btn-cancel" onClick={onClose}>
              취소
            </button>
            <button className="modal-btn modal-btn-confirm" onClick={onClose}>
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;