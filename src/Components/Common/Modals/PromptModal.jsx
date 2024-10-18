import { Modal, Button } from 'antd';
import { FaQuestionCircle } from 'react-icons/fa';

const PromptModal = ({ open, onClose, onConfirm, message }) => (
  <Modal
    title={
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FaQuestionCircle style={{ color: '#f59e0b', marginRight: '8px', fontSize: '24px' }} />
        <span style={{ color: '#374151', fontSize: '18px', fontWeight: 'bold' }}>Confirmation</span>
      </div>
    }
    open={open}
    onCancel={onClose}
    footer={
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
        <Button style={{ backgroundColor: '#4caf50', color: '#ffffff', borderRadius: '5px', padding: '6px 12px' }} onClick={onConfirm}>
          Confirm
        </Button>
        <Button style={{ backgroundColor: '#94a3b8', color: '#ffffff', borderRadius: '5px', padding: '6px 12px' }} onClick={onClose}>
          Cancel
        </Button>
      </div>
    }
    // style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}
    centered
  >
    <div style={{ textAlign: 'center', marginTop: '16px' }}>
      <p style={{ color: '#6b7280', fontSize: '16px' }}>{message}</p>
    </div>
  </Modal>
);

export default PromptModal;
