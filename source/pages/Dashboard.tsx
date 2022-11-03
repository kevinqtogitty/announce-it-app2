import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { animated, useTransition } from "react-spring";
import styled from "styled-components";
import AlertDialog from "../components/AlertDialog";
import CreateNewTeamForm from "../components/forms/CreateNewTeamForm";
import { SubmitButton } from "../components/forms/SignInForm";
import Tiptap from "../components/TextEditor";
import UsersTeamInfo from "../components/UsersTeamInfo";
import { logoutUser, deleteFirebaseAccount } from "../firebase/accountServices";
import { deletOneUser } from "../server/axiosRequests/requests";
import { Props } from "../utils/privateRoutes";

const Dashboard: React.FC<Props> = ({ auth }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const notificationTransition = useTransition(isActive, {
    from: { opacity: 0, transform: "translateY(100%)" },
    enter: { opacity: 1, transform: "translateY(0%)" },
    leave: { opacity: 0, transform: "translateY(100%)" },
  });

  const navigate = useNavigate();

  const logout = async (): Promise<void> => {
    try {
      await logoutUser(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await deletOneUser(auth.currentUser!.uid);
      await deleteFirebaseAccount(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DashboardGrid>
        <UsersTeamInfo />
        <FormEditorWrapper>
          <Tiptap setNotification={setIsActive} />
          <FormButtonContainer>
            <CreateNewTeamForm />
            <ButtonWrapper>
              <SubmitButton onClick={logout}>Logout</SubmitButton>
              <AlertDialog
                handleDeleteUser={handleDeleteUser}
                switchKey={3}
                buttonName={"Delete account"}
              />
            </ButtonWrapper>
          </FormButtonContainer>
        </FormEditorWrapper>
      </DashboardGrid>

      {notificationTransition(
        (styles, item) =>
          item && (
            <ErrorNotification style={styles}>
              You need to select a team to post to!
            </ErrorNotification>
          )
      )}
    </>
  );
};

export default Dashboard;

const DashboardGrid = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 2rem;
  /* border: 2px solid red; */
  @media (max-width: 950px) {
    flex-direction: column-reverse;
    row-gap: 2rem;
  }

  @media (max-width: 500px) {
    position: absolute;
    top: 10rem;
    left: 0rem;
    padding: 0.5rem;
    width: 100vw;
  }
`;

const FormEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
  /* border: 2px solid blue; */
  @media (max-width: 950px) {
    flex-direction: column-reverse;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

const FormButtonContainer = styled.div`
  display: flex;
  column-gap: 1rem;
  width: 100%;
  justify-content: space-between;
  /* border: 2px solid green; */
  align-items: center;

  @media (max-width: 500px) {
    flex-direction: row-reverse;
  }
`;

export const ErrorNotification = styled(animated.div)`
  display: flex;
  border-radius: 5px;
  justify-content: center;
  border: 1px solid orange;
  align-items: center;
  top: calc(50% - 7.5rem);
  left: calc(50% - 10rem);
  position: fixed;
  padding: 0.5rem;
  color: white;
  background-color: black;
  z-index: 2;
`;
