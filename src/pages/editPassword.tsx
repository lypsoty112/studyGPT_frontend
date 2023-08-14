import Footer from "@/components/pageLayout/footer";
import MainContainer from "@/components/pageLayout/mainContainer";
import Navbar from "@/components/pageLayout/navbar";
import PageContent from "@/components/pageLayout/pageContent";
import FormGrey from "@/components/misc/formGrey";
import BaseButton from "@/components/interactions/baseButton";
import { useState } from "react";
import { nextInputOnEnter } from "@/components/interactions/nextInputOnEnter";
import { editPassword } from "@/api/user";
import { useNavigate } from "react-router-dom";
const EditPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    let response = await editPassword(
      newPassword,
      newPasswordConfirm,
      currentPassword
    );
    if (response.status === 200) {
      navigate("/account");
    } else {
      // TODO: handle error
      alert("Password change failed: " + response.message);
    }
  };

  const focusOnEnter = (e: any) => {
    nextInputOnEnter(
      e,
      ["newPassword", "newPasswordConfirm", "currentPassword"],
      handleChangePassword
    );
  };

  const handleNewPasswordChange = (e: any) => {
    setNewPassword(e.target.value);
  };

  const handleNewPasswordConfirmChange = (e: any) => {
    setNewPasswordConfirm(e.target.value);
  };

  const handleCurrentPasswordChange = (e: any) => {
    setCurrentPassword(e.target.value);
  };

  return (
    <MainContainer>
      {/*Navbar*/}
      <Navbar />
      {/*Content*/}
      <PageContent>
        <FormGrey title="Change password">
          <div className="inputWrapper">
            <span>New password</span>
            <input
              type="password"
              id="newPassword"
              onKeyDown={focusOnEnter}
              onChange={handleNewPasswordChange}
            />
          </div>
          <div className="inputWrapper">
            <span>Repeat new password</span>
            <input
              type="password"
              id="newPasswordConfirm"
              onKeyDown={focusOnEnter}
              onChange={handleNewPasswordConfirmChange}
            />
          </div>
          <br />
          <div className="inputWrapper">
            <span>Current password</span>
            <input
              type="password"
              id="currentPassword"
              onKeyDown={focusOnEnter}
              onChange={handleCurrentPasswordChange}
            />
          </div>
          <BaseButton color={1} onClick={handleChangePassword}>
            Edit password
          </BaseButton>
        </FormGrey>
      </PageContent>
      {/*Footer*/}
      <Footer height={5}></Footer>
    </MainContainer>
  );
};

export default EditPassword;
