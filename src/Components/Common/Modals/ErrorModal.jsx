import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const ErrorModal = ({ open, onClose, errorMessage }) => (
  <Modal
    title={
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ExclamationCircleOutlined style={{ color: '#e74c3c', marginRight: '8px', fontSize: '24px' }} />
        <span style={{ color: '#374151', fontSize: '18px', fontWeight: 'bold' }}>Error</span>
      </div>
    }
    open={open}
    onCancel={onClose}
    footer={null}
    style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}
    centered
  >
    <div style={{ textAlign: 'center', marginTop: '16px' }}>
      <p style={{ color: '#ff6b6b', fontSize: '16px' }}>{errorMessage}</p>
    </div>
  </Modal>
);

export default ErrorModal;
