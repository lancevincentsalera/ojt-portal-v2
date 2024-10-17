import { useEffect } from 'react';
import { Modal } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const OkayModal = ({ open, onClose, message }) => {
  useEffect(() => {
    let timer;
    if (open) {
      timer = setTimeout(() => {
        onClose();
      }, 500); 
    }

    return () => clearTimeout(timer);
  }, [open, onClose]);

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CheckCircleOutlined style={{ color: '#4caf50', marginRight: '8px', fontSize: '24px' }} />
          <span style={{ color: '#374151', fontSize: '18px', fontWeight: 'bold' }}>Success</span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      // style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}
      centered
    >
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <p style={{ color: '#4caf50', fontSize: '16px' }}>{message}</p>
      </div>
    </Modal>
  );
};

export default OkayModal;
