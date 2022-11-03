/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-named-as-default */
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent, generateJSON } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styled from "styled-components";
import TextAlign from "@tiptap/extension-text-align";
import Blockquote from "@tiptap/extension-blockquote";
import Underline from "@tiptap/extension-underline";
import { postAnnouncementToTeam } from "../server/axiosRequests/requests";
import TeamDropdownMenu from "./dropdowns/TeamDropdownMenu";
import { useTeamStore } from "../store/teamsStore";
import TextEditorMenuBar from "./TextEditorMenuBar";
import { useCurrentUserStore } from "../store/userStore";
import { useAnnouncementStore } from "../store/announcementStore";

interface EditorProps {
  setNotification: React.Dispatch<React.SetStateAction<boolean>>;
}

const Tiptap: React.FC<EditorProps> = ({ setNotification }): JSX.Element => {
  const [announcement, setAnnouncement] = useState<string>("");
  const [selectedTeamToSubmit, setSelectTeamToSubmit] = useState<string>("");
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const teamsUserIsALeaderOf = useTeamStore(
    (state) => state.teamsUserIsALeaderOf
  );
  const setLeaderOfAnnouncements = useAnnouncementStore(
    (state) => state.setLeaderOfAnnouncements
  );
  const setTeamsUserIsALeaderOf = useTeamStore(
    (state) => state.setTeamsUserIsALeaderOf
  );

  useEffect(() => {
    setTeamsUserIsALeaderOf(currentUser.userId);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Blockquote,
      Underline,
    ],
    content: "<h2>Let&apos;em know!</h2>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setAnnouncement(html);
    },
  });

  const generateJsonFromHtml = async () => {
    const jsonConverted = generateJSON(announcement, [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Blockquote,
      Underline,
    ]);
    try {
      await postAnnouncementToTeam(
        currentUser.userId,
        selectedTeamToSubmit,
        jsonConverted
      );
      setLeaderOfAnnouncements(currentUser.userId);
      editor.commands.clearContent();
    } catch (error) {
      setNotification((state) => !state);
      setTimeout(() => {
        setNotification((state) => !state);
      }, 3000);
      console.log(error);
    }
  };

  return (
    <EditorBarAndContentWrapper>
      <TextEditorMenuBar editor={editor} />
      <EditorContentStyled editor={editor} className="Content" />
      <DropdownSubmitWrapper>
        <TeamDropdownMenu
          teamsUserIsALeaderOf={teamsUserIsALeaderOf}
          setSelectTeamToSubmit={setSelectTeamToSubmit}
        />
        <SubmitButtonStyled onClick={generateJsonFromHtml}>
          submit
        </SubmitButtonStyled>
      </DropdownSubmitWrapper>
    </EditorBarAndContentWrapper>
  );
};

const DropdownSubmitWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SubmitButtonStyled = styled.button`
  border: none;
  border-radius: 3px;
  align-self: center;
  width: 10rem;
  padding: 0.3rem 0rem 0.3rem 0rem;
  color: rgb(255, 255, 255);
  background-color: rgb(228, 132, 0);
  cursor: pointer;
`;

const EditorBarAndContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
  padding: 0.5rem;
  background-color: white;
  border-radius: 10px;
  @media (max-width: 500px) {
    width: calc(100vw - 10%);
  }
`;

const EditorContentStyled = styled(EditorContent)`
  &.Content .ProseMirror {
    line-height: 1rem;
    min-height: 15rem;
    width: 100%;
    background-color: white;
    color: orange;
    border-radius: 0.1rem;
    &:focus {
      outline: black;
    }
    & p {
      margin: 0.1rem;
    }
  }
`;

export default Tiptap;
