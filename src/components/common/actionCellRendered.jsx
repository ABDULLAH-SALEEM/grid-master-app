import { ICONS } from 'src/assets/library';
import { useModal } from 'src/hooks/useModal';
import MenuPopover from '../menu/menu';
import { useNavigate } from 'react-router-dom';
import { DELETE_GRID_DATA } from 'src/apiService/apiDeclaration';
import { showErrorTost, showSuccessTost } from 'src/constants';

const ActionCellRenderer = ({ actions, data, onRefresh }) => {
  const navigate = useNavigate();
  const { setDialogData, handleModalClose } = useModal();

  const onDelete = async (id) => {
    try {
      const response = await DELETE_GRID_DATA(id);
      showSuccessTost(response.message);
      handleModalClose();
      onRefresh();
    } catch (error) {
      showErrorTost(error.message);
      console.log(error.message);
    }
  };
  const handleDelete = () => {
    setDialogData({
      showModal: true,
      description: 'Are you sure you want to delete this row?',
      onConfirm: () => onDelete(data.id),
    });
  };

  const handleEdit = () => {
    navigate('/grid-data-details', { state: { data, isEdit: true } });
  };
  const handleView = () => {
    navigate('/grid-data-details', { state: { data, isEdit: false } });
  };

  const actionsConfig = {
    Delete: {
      icon: ICONS.DELETE,
      action: handleDelete,
    },
    View: { icon: ICONS.VIEW, action: handleView },
    Edit: { icon: ICONS.EDIT, action: handleEdit },
  };

  return (
    <MenuPopover
      menuArray={actions.map((action) => ({
        name: action.label,
        ...actionsConfig[action.label],
      }))}
    />
  );
};

export default ActionCellRenderer;
