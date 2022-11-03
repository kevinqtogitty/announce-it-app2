import React from "react";
import styled from "styled-components";
import {
  TypeBold,
  TypeItalic,
  TypeUnderline,
  TextLeft,
  TextRight,
  TextCenter,
  TypeStrikethrough,
  BlockquoteLeft,
  ListOl,
  ListUl,
  Code,
  TypeH1,
  TypeH2,
  TypeH3,
} from "@styled-icons/bootstrap";

const TextEditorMenuBar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }
  return (
    <EditorTextEditorButtonssWrapper>
      <TextEditorButtons
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <TypeBold size="1rem" />
      </TextEditorButtons>
      <TextEditorButtons
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <TypeItalic size="1rem" />
      </TextEditorButtons>
      <TextEditorButtons
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
      >
        <TypeUnderline size="1rem" />
      </TextEditorButtons>
      <TextEditorButtons
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <TypeStrikethrough size="1rem" />
      </TextEditorButtons>
      <TextEditorButtons
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
      >
        <TextLeft size="1rem" />
      </TextEditorButtons>
      <TextEditorButtons
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
      >
        <TextCenter size="1rem" />
      </TextEditorButtons>
      <TextEditorButtons
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
      >
        <TextRight size="1rem" />
      </TextEditorButtons>
      <TextEditorButtons
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <ListUl size="1rem" />
      </TextEditorButtons>
      <TextEditorButtons
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <ListOl size="1rem" />
      </TextEditorButtons>
      <TextEditorButtons
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        <TypeH1 size="1rem" />
      </TextEditorButtons>
      <TextEditorButtons
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        <TypeH2 size="1rem" />
      </TextEditorButtons>
      <TextEditorButtons
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        <TypeH3 size="1rem" />
      </TextEditorButtons>

      <TextEditorButtons
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        <BlockquoteLeft size="1rem" />
      </TextEditorButtons>
      <TextEditorButtons
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        <Code size="1rem" />
      </TextEditorButtons>
    </EditorTextEditorButtonssWrapper>
  );
};

export default TextEditorMenuBar;

const EditorTextEditorButtonssWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.5rem;
  row-gap: 0.5rem;
  margin-bottom: 0.1rem;
  border-radius: 10px;
  justify-content: center;
`;

const TextEditorButtons = styled.button`
  align-self: center;
  margin: 0.1rem;
  background-color: #fff;
  border-radius: 5px;
  padding: 0.5rem;
  box-shadow: transparent 0 0 0 1px, rgba(10, 10, 10, 0.1) 0 6px 5px;
  color: #121212;
  cursor: pointer;
  /* font-family: Inter, sans-serif; */
  justify-content: center;
  line-height: 1;
  outline: none;
  text-align: center;
  text-decoration: none;
  transition: box-shadow 0.2s, -webkit-box-shadow 0.2s;
  border: 0;
  &:hover {
    box-shadow: #121212 0 0 0 3px, transparent 0 0 0 0;
  }

  &.is-active {
    box-shadow: #121212 0 0 0 3px, transparent 0 0 0 0;
  }
`;
