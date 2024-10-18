import { Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingModal = ({ open }) => (
  <Modal
    open={open}
    footer={null}
    closable={false}
    style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}
    centered
  >
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <LoadingOutlined style={{ color: '#bdc3c7', fontSize: '28px', marginRight: '8px' }} />
      <p style={{ color: '#94a3b8', fontSize: '16px', fontWeight: '500' }}>Loading...</p>
    </div>
  </Modal>
);

export default LoadingModal;
