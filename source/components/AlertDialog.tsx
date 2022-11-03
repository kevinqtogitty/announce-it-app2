import React from "react";
import * as Dialog from "@radix-ui/react-alert-dialog";
import styled from "styled-components";

interface DialogProps {
  handleDissolveTeam?: (teamId: string, idNumber: number) => Promise<void>;
  handleUnsubscribe?: (teamId: string, idNumber: number) => Promise<void>;
  handleDeleteAnnouncement?: () => Promise<void>;
  handleDeleteUser?: () => Promise<void>;
  teamId?: string;
  switchKey?: number;
  children?: any;
  buttonName: string;
  idNumber?: number;
}

const AlertDialog: React.FC<DialogProps> = (props) => {
  const handleSwitchFunction = () => {
    if (props.switchKey === 1) {
      props.handleDissolveTeam(props.teamId, props.idNumber);
    } else if (props.switchKey === 2) {
      props.handleDeleteAnnouncement();
    } else if (props.switchKey === 3) {
      props.handleDeleteUser();
    } else {
      props.handleUnsubscribe(props.teamId, props.idNumber);
    }
  };
  return (
    <DialogRoot>
      <DialogTrigger>{props.buttonName}</DialogTrigger>
      <DialogPortal>
        <DialogOverlay>
          <DialogContent>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>This cannot be undone.</DialogDescription>
            <StyledButtonWrapper>
              <DialogAction onClick={handleSwitchFunction}>
                Confirm
              </DialogAction>
              <DialogCancel>Cancel</DialogCancel>
            </StyledButtonWrapper>
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </DialogRoot>
  );
};

export default AlertDialog;

const DialogRoot = styled(Dialog.Root)``;
const DialogTrigger = styled(Dialog.Trigger)`
  background-color: rgb(200, 70, 70);
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 3px;
  cursor: pointer;
  align-self: center;
  padding: 0.3rem;
`;
const DialogPortal = styled(Dialog.Portal)``;
const DialogOverlay = styled(Dialog.Overlay)`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
`;
const DialogContent = styled(Dialog.Content)`
  background-color: rgb(255, 255, 255);
  padding: 2rem 5rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DialogTitle = styled(Dialog.Title)`
  margin: 0;
  width: fit-content;
`;
const DialogDescription = styled(Dialog.Description)`
  max-width: 20rem;
`;
const DialogCancel = styled(Dialog.Cancel)`
  width: 5rem;
  height: 1.5rem;
  background-color: rgb(200, 70, 70);
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;
const DialogAction = styled(Dialog.Action)`
  width: 5rem;
  height: 1.5rem;
  border: none;
  border-radius: 3px;
  color: rgb(255, 255, 255);
  background-color: rgb(228, 132, 0);
  cursor: pointer;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  max-width: 15rem;
  column-gap: 1rem;
`;
