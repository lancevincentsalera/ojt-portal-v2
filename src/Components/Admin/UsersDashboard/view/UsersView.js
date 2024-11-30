import React from "react";
import { FaPlus } from "react-icons/fa6";
import UsersModalController from "../../Modals/Users/controller/UsersModalController";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

const UsersView = ({
  showModal,
  handleModalAction,
  users,
  handleConfirmAccountAction,
  setOpenAddSubmentorModal
}) => {
  return (
    <>
      {showModal && (
        <UsersModalController
          showModal={showModal}
          handleModalAction={handleModalAction}
        />
      )}
      <div className="main-dashboard">
      <div className="main-header">
      <p className="main-heading">Users</p>
      <div className="flex gap-x-2"> 
          <button
            type="button"
            className="button-main create"
            onClick={handleModalAction}
          >
            <FaPlus size={20} />
            &nbsp; Create New User
          </button>
          <button
            type="button"
            className="button-main create"
            onClick={() => setOpenAddSubmentorModal(true)}
          >
            <MdOutlineSubdirectoryArrowRight size={20}/>
            &nbsp; Transfer Mentorship
          </button>
        </div>
      </div>
        <div className="table-container">
          <div className="table">
            <ul className="thead">
              <li className="th">Name</li>
              <li className="th">Email</li>
              <li className="th">Role</li>
              <li className="th">Status</li>
              <li className="th">Actions</li>
            </ul>
            <ul className="tbody">
              {users.map((user, i) => (
                <li key={i} className="tr">
                  <p className="td">{`${user.firstName} ${user.lastName}`}</p>
                  <p className="td">{user.email}</p>
                  <p className="td">{user.userType}</p>
                  <p className="td">{user.accountStatus}</p>
                  <div className="td actions">
                    <button
                      type="button"
                      className="button-main btn-active"
                      disabled={
                        user.accountStatus === "Active" ||
                        user.accountStatus === "Pending Password Change" ||
                        user.accountStatus === "Deactivated"
                      }
                      onClick={() =>
                        handleConfirmAccountAction(
                          "Are you sure you want to activate this account?",
                          user.id
                        )
                      }
                    >
                      Activate
                    </button>
                    <button
                      type="button"
                      className="button-secondary btn-restrict"
                      disabled={user.accountStatus === "Deactivated"}
                      onClick={() =>
                        handleConfirmAccountAction(
                          "Are you sure you want to deactivate this account?",
                          user.id
                        )
                      }
                    >
                      Deactivate
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersView;
