import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

import {
  Table,
  TableRow,
  TableHeader,
  TableCell,
} from "@tiptap/extension-table";

import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";

interface Props {
  content?: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({
  content = "",
  onChange,
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,

      Underline,

      Link.configure({
        openOnClick: false,
      }),

      Image,

      TextStyle,

      Color.configure({
        types: ["textStyle"],
      }),

      Highlight.configure({
        multicolor: true,
      }),

      Table.configure({
        resizable: true,
      }),

      TableRow,
      TableHeader,
      TableCell,
    ],

    content,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">

      {/* TOOLBAR */}
      <div className="flex flex-wrap gap-1 border-b border-slate-200 p-3 dark:border-slate-800">

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="toolbar-btn"
        >
          <strong>B</strong>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="toolbar-btn"
        >
          <em>I</em>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="toolbar-btn"
        >
          <u>U</u>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="toolbar-btn"
        >
          <s>S</s>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className="toolbar-btn"
        >
          {"</>"}
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="toolbar-btn"
        >
          H2
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className="toolbar-btn"
        >
          H3
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className="toolbar-btn"
        >
          • Liste
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          className="toolbar-btn"
        >
          1. Liste
        </button>

        {/* COULEUR */}
        <input
          type="color"
          title="Couleur du texte"
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
          className="h-8 w-8 cursor-pointer rounded"
        />

        {/* HIGHLIGHT */}
        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHighlight({ color: "#fef08a" })
              .run()
          }
          className="toolbar-btn"
        >
          Surligner
        </button>

        {/* LINK */}
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("URL du lien");

            if (url) {
              editor
                .chain()
                .focus()
                .setLink({ href: url })
                .run();
            }
          }}
          className="toolbar-btn"
        >
          Lien
        </button>

        {/* IMAGE */}
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("URL de l'image");

            if (url) {
              editor
                .chain()
                .focus()
                .setImage({ src: url })
                .run();
            }
          }}
          className="toolbar-btn"
        >
          Image
        </button>

        {/* TABLE */}
        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({
                rows: 3,
                cols: 3,
                withHeaderRow: true,
              })
              .run()
          }
          className="toolbar-btn"
        >
          Tableau
        </button>

        {/* CODE BLOCK */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleCodeBlock().run()
          }
          className="toolbar-btn"
        >
          Code
        </button>

        {/* QUOTE */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          className="toolbar-btn"
        >
          Citation
        </button>
      </div>

      {/* EDITOR */}
      <EditorContent
        editor={editor}
        className="prose-editor min-h-[500px] p-6 sm:p-8"
      />
    </div>
  );
}