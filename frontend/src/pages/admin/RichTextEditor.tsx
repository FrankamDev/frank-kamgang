import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";

import {
  Table,
  TableRow,
  TableHeader,
  TableCell,
} from "@tiptap/extension-table";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,

      Underline,

      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),

      Image,

      Link.configure({
        openOnClick: false,
      }),

      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],

    content: value,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt("URL du lien");

    if (!url) return;

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url,
      })
      .run();
  };

  const addImage = () => {
    const url = window.prompt("URL de l'image");

    if (!url) return;

    editor
      .chain()
      .focus()
      .setImage({
        src: url,
      })
      .run();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800">

        {/* Bold */}
        <button
          type="button"
          title="Gras"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          className="toolbar-btn"
        >
          <Bold size={17} />
        </button>

        {/* Italic */}
        <button
          type="button"
          title="Italique"
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          className="toolbar-btn"
        >
          <Italic size={17} />
        </button>

        {/* Underline */}
        <button
          type="button"
          title="Souligné"
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }
          className="toolbar-btn"
        >
          <UnderlineIcon size={17} />
        </button>

        {/* Strike */}
        <button
          type="button"
          title="Barré"
          onClick={() =>
            editor.chain().focus().toggleStrike().run()
          }
          className="toolbar-btn"
        >
          <Strikethrough size={17} />
        </button>

        {/* Code inline */}
        <button
          type="button"
          title="Code"
          onClick={() =>
            editor.chain().focus().toggleCode().run()
          }
          className="toolbar-btn"
        >
          <Code size={17} />
        </button>

        <div className="mx-1 h-6 w-px bg-slate-300 dark:bg-slate-600" />

        {/* H2 */}
        <button
          type="button"
          title="Titre 2"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 2 })
              .run()
          }
          className="toolbar-btn"
        >
          <Heading2 size={17} />
        </button>

        {/* H3 */}
        <button
          type="button"
          title="Titre 3"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 3 })
              .run()
          }
          className="toolbar-btn"
        >
          <Heading3 size={17} />
        </button>

        {/* Liste */}
        <button
          type="button"
          title="Liste à puces"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className="toolbar-btn"
        >
          <List size={17} />
        </button>

        {/* Liste numérotée */}
        <button
          type="button"
          title="Liste numérotée"
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          className="toolbar-btn"
        >
          <ListOrdered size={17} />
        </button>

        {/* Citation */}
        <button
          type="button"
          title="Citation"
          onClick={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          className="toolbar-btn"
        >
          <Quote size={17} />
        </button>

        <div className="mx-1 h-6 w-px bg-slate-300 dark:bg-slate-600" />

        {/* Lien */}
        <button
          type="button"
          title="Ajouter un lien"
          onClick={addLink}
          className="toolbar-btn"
        >
          <LinkIcon size={17} />
        </button>

        {/* Image */}
        <button
          type="button"
          title="Ajouter une image"
          onClick={addImage}
          className="toolbar-btn"
        >
          <ImageIcon size={17} />
        </button>

        {/* Tableau */}
        <button
          type="button"
          title="Ajouter un tableau"
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
          <TableIcon size={17} />
        </button>

        {/* Couleur */}
        <input
          type="color"
          title="Couleur du texte"
          onChange={(event) =>
            editor
              .chain()
              .focus()
              .setColor(event.target.value)
              .run()
          }
          className="h-8 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
        />
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="prose-editor min-h-[350px] p-5"
      />
    </div>
  );
}